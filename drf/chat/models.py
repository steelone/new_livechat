from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    fav_color = models.CharField(blank=True, max_length=20)
    avatar = models.CharField(max_length=256, null=True)


class Contact(models.Model):
    user = models.ForeignKey(
        CustomUser, related_name='friends', on_delete=models.CASCADE)
    friends = models.ManyToManyField('self', blank=True)
    available = models.BooleanField(default=True)


class Message(models.Model):
    contact = models.ForeignKey(
        Contact, related_name='messages', on_delete=models.CASCADE)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content


class BlacklistChat(models.Model):
    contact = models.OneToOneField(Contact,
                                   null=True,  on_delete=models.CASCADE,
                                   related_name='blacklist',
                                   )

    def __str__(self):
        return self.contact.user.username


class Chat(models.Model):
    participants = models.ManyToManyField(Contact, related_name='chats')
    messages = models.ManyToManyField(Message, blank=True)
    blacklists = models.ManyToManyField(BlacklistChat, blank=True)

    def last_10_messages(self):
        return self.messages.order_by('-timestamp').all()[:5]


@receiver(post_save, sender=CustomUser)
def post_save_user(sender, instance, created, **kwargs):
    contact = Contact.objects.filter(user=instance)
    if not contact:
        contact = Contact.objects.create(user=instance)
        contact.save()
        blacklist = BlacklistChat.objects.create(contact=contact)
        blacklist.save()
