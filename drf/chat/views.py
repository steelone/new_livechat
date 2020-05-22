from .permissions import UserPermissions
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.generics import GenericAPIView
from django.shortcuts import render
from .models import CustomUser, Contact, Chat
from .serializers import CustomUserSerializer, ContactSerializer
from rest_framework import viewsets
from rest_framework.mixins import UpdateModelMixin


class ContactUpdateView(UpdateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = (IsAuthenticated, UserPermissions)


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
