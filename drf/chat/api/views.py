from ..models import Chat, Contact
from django.shortcuts import render
from .serializers import ChatSerializer
from .filters import ChatFilter
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
    return get_object_or_404(Contact, user=user)


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )
    filter_class = ChatFilter

    def get_queryset(self):
        queryset = Chat.objects.all()
        print('get_chats_by_username ===== ', self.request.query_params)
        username = self.request.query_params.get('username', None)
        print('username ======= ', username)
        if username is not None:
            contact = get_user_contact(username)
            # q_chats = Chat.objects.annotate(participants_num=Count(
            #     'participants')).exclude(participants__contact__available__exact=False)
            # print('q_chats ======= ', q_chats)
            queryset = contact.chats.all()
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
