from django.contrib import admin
from .models import CustomUser, Chat, Contact, Message, BlacklistChat


admin.site.register(CustomUser)
admin.site.register(Chat)
admin.site.register(Contact)
admin.site.register(Message)
admin.site.register(BlacklistChat)
