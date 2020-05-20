from django.shortcuts import render
from .models import Chat, CustomUser
from .serializers import CustomUserSerializer
from rest_framework import viewsets
from rest_framework.mixins import UpdateModelMixin
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly


class CustomUserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


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
