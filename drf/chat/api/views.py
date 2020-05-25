from ..models import Chat, Contact, BlacklistChat
from django.shortcuts import render
from .serializers import ChatSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView,\
    CreateAPIView, DestroyAPIView, UpdateAPIView
from django.db.models import Count

User = get_user_model()


def get_last_10_messages(chatID):
    chat = get_object_or_404(Chat, id=chatID)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_current_chat(chatID):
    return get_object_or_404(Chat, id=chatID)


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    contacts = Contact.objects.filter(user__id=user.id)
    return get_object_or_404(Contact, user__id=user.id)


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        print('=============== get_queryset  ==============')
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        chatID = self.request.query_params.get('chatID', None)
        stayHere = self.request.query_params.get('stayHere', None)
        if chatID and stayHere:
            current_chat = get_current_chat(chatID)
            queryset = [current_chat]
            print('==== stayHere!!! queryset ==== ', queryset)
            return queryset
        user = get_object_or_404(User, username=username)
        if username is not None:
            contact = get_user_contact(username)
            contact.available = True
            contact.save()
            blacklist = BlacklistChat.objects.get(contact=contact.id)
            if chatID:
                # CASE New chat(I don't want to be in this chat anymore)
                print(" === ADD rel to the private blacklist === ", blacklist)
                current_chat = get_current_chat(chatID)
                current_chat.blacklists.add(blacklist.id)
                current_chat.participants.remove(contact.id)
                print('Remove from previous chat', current_chat)

            chats = Chat.objects.all()
            print('=== Before filter Available chats:', chats)
            q_chats = Chat.objects.annotate(
                Count('participants')
            ).filter(
                participants__count=1
            ).exclude(
                blacklists__id=blacklist.id
            ).order_by('participants__count')
            print('===! After filter  Available q_chats:', q_chats)
            if q_chats:
                target_chat = [q_chats.first()]
                if target_chat:
                    queryset = target_chat
                    contact = get_user_contact(user)
                    new_chat = get_current_chat(target_chat[0].id)
                    new_chat.participants.add(contact.id)
                    return queryset
            else:
                # No available chats! Let's create a new one!
                chat = Chat.objects.create()
                print('=== New chat', chat)
                # Put current contact in this chat
                chat.participants.add(contact.id)
                queryset = [chat]
                return queryset
        return queryset


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )
