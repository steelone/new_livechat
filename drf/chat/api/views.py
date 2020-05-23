from ..models import Chat, Contact
from django.shortcuts import render
from .serializers import ChatSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework.generics import ListAPIView, RetrieveAPIView,\
    CreateAPIView, DestroyAPIView, UpdateAPIView
from django.db.models import Count, Q
from .lookup import NotEqual

User = get_user_model()


def get_last_10_messages(chatID):
    chat = get_object_or_404(Chat, id=chatID)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_current_chat(chatID):
    return get_object_or_404(Chat, id=chatID)


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    contacts = Contact.objects.filter(user__id=user.id)
    if contacts.count() > 1:
        print('==== More then one related Contact ====', contacts.values())
    return get_object_or_404(Contact, user__id=user.id)


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        user = get_object_or_404(User, username=username)
        if username is not None:
            contact = get_user_contact(username)
            contact.available = True
            contact.save()
            q_chats = Chat.objects.annotate(
                Count('participants')).filter(
                    participants__count=1).order_by('participants__count')
            if q_chats:
                print('There are some available people', q_chats)
                target_chat = [q_chats.first()]
                if target_chat:
                    queryset = target_chat
                    print('=== get queryset ====== ', queryset)
                    print('=== target_chat id ====== ', target_chat[0].id)
                    print('=== get user ====== ', user)
                    contact = get_user_contact(user)
                    chat = get_current_chat(target_chat[0].id)
                    chat.participants.add(contact.id)
                    return queryset
            else:
                print("No chats! Let's create by post_save")
                chat = Chat.objects.create()
                chat.save()
                # Put current contact in this chat
                chat.participants.add(contact.id)
                chat.save()
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
