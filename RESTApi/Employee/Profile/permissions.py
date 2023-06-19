from rest_framework.permissions import BasePermission, SAFE_METHODS

class JuniorOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated and request.user.is_junior)
        return False


class SeniorOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated and request.user.is_senior)
        return False