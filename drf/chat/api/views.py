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
    return get_object_or_404(Contact, user=user)


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            contact = get_user_contact(username)
            contact.available = True
            contact.save()
            q_chats = Contact.objects.filter(
                available=True,
                id__ne=contact.id
            ).prefetch_related('chats').annotate(
                Count('chats__participants')
            ).filter(chats__participants=1).values(
                'id', 'available', 'chats__id',
                'chats__participants__count'
            )
            if q_chats:
                print('There are some available people', q_chats)
            target_chat = q_chats.first()['chats__id']
            if target_chat:
                queryset = contact.chats.get(pk=target_chat)
                print('queryset ======= ', queryset)
                return queryset
            else:
                print('No one')
        return None


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
