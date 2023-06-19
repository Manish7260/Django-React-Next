from django.db.models.signals import post_save
from django.contrib.auth import user_logged_in
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.conf import settings
#from django_rest_passwordreset.signals import reset_password_token_created

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=None, **kwargs):
    if created:
        Token.objects.create(user=instance)

@receiver(user_logged_in)
def post_login(sender, user, **kwargs):
    Token.objects.get_or_create(user=user)