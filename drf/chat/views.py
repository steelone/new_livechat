from django.shortcuts import get_object_or_404
from .permissions import UserPermissions
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import GenericAPIView
from django.shortcuts import render
from .models import CustomUser, Contact, Chat
from .serializers import CustomUserSerializer, ContactSerializer
from rest_framework import viewsets
from rest_framework.mixins import UpdateModelMixin
from django.contrib.auth import get_user_model
from .api.views import get_current_chat, get_user_contact

User = get_user_model()


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        username = self.request.query_params.get('username', None)
        if username is not None:
            user = get_object_or_404(User, username=username)
            qs = Contact.objects.filter(user=user.id)
            return qs
        return qs

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        print(' ========== partial_update ==========')
        user_id = request.user.id
        contact = get_user_contact(request.user.username)
        if request.data == {'available': False}:
            print(' clean user-contact from chats...')
            chats = Chat.objects.filter(
                participants__id=contact.id)
            print('chats ===== ', chats)
            if chats:
                for chat in chats:
                    print('===== chat.id === ', chat.id)
                    chat = get_current_chat(chat.id)
                    print('========= contact.id =====', contact.id)
                    chat.participants.remove(contact.id)
        return self.update(request, *args, **kwargs)


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class CustomUserUpdateView(GenericAPIView, UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class CustomUserPartialUpdateView(GenericAPIView, UpdateModelMixin):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
