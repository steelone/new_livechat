from django.shortcuts import render
from .models import Chat, CustomUser
from .serializers import CustomUserSerializer, ChatSerializer
from .filters import ChatFilter
from rest_framework import viewsets
from rest_framework.mixins import UpdateModelMixin
from rest_framework.generics import GenericAPIView


class ChatViewSet(viewsets.ModelViewSet):
    serializer_class = ChatSerializer
    queryset = Chat.objects.all()
    filter_class = ChatFilter


class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer


class CustomUserUpdateView(GenericAPIView, UpdateModelMixin):
    '''
    CustomUser update API, need to submit both 'name' and 'author_name' fields
    At the same time, or django will prevent to do update for field missing
    '''
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)


class CustomUserPartialUpdateView(GenericAPIView, UpdateModelMixin):
    '''
    You just need to provide the field which is to be modified.
    '''
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)
