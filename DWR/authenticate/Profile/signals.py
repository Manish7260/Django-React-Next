from django.db.models.signals import post_save
from .models import CustomUser, VerifyUserToken
from django.dispatch import receiver
from django.conf import settings
from django.core.mail import send_mail
from django.contrib.auth import user_logged_in

@receiver(post_save, sender = CustomUser)
def send_email(sender, instance, created, **kwargs):
    if created:
        otp = VerifyUserToken.objects.generated(user=instance)
        verify_user_url = f"127.0.0.1:8000/verifyuser/{otp.otp}"
        email = instance.email
        subject = 'Welcome to logistics'
        message = f"hi {email}, thank you for connecting with logistic infotech : click on this link to verify your accout {verify_user_url}"
        email_from = settings.EMAIL_HOST_USER
        mail = [email, ]
        send_mail(subject, message, email_from, mail)