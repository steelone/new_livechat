from rest_framework import permissions


class UserPermissions(permissions.BasePermission):

    # Must check Contact == request user
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user
