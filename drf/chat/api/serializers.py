from rest_framework import serializers

from ..models import Chat
from ..serializers import ContactSerializer


class ChatSerializer(serializers.ModelSerializer):
    participants = ContactSerializer(many=True)

    class Meta:
        model = Chat
        fields = '__all__'
