from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include
from rest_framework import routers

from chat.views import CustomUserViewSet, \
    CustomUserUpdateView, CustomUserPartialUpdateView, ContactUpdateView

router = routers.DefaultRouter()
router.register(r'users', CustomUserViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),

    url(r'^users/update/(?P<pk>\d+)/$',
        CustomUserUpdateView.as_view(), name='user_update'),
    url(r'^users/update-partial/(?P<pk>\d+)/$',
        CustomUserPartialUpdateView.as_view(), name='user_partial_update'),

    path('chat/', include('chat.api.urls', namespace='chat')),
    path('contact/<pk>/update/', ContactUpdateView.as_view()),
]
