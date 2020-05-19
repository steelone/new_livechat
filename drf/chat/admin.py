from django.contrib import admin
from .models import CustomUser, Chat, Contact, Message


admin.site.register(CustomUser)
admin.site.register(Chat)
admin.site.register(Contact)
admin.site.register(Message)
