from django.db import models
from .managers import CustomUserManager, VerifyUserManager, PasswordResetManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

# Create your models here

GENDER_CHOICES = (
    ("Male", "Male"),
    ("Female", "Female"),
)


class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    first_name = models.CharField(max_length=20)
    last_name = models.CharField(max_length=20)
    gender = models.CharField(max_length=6, choices=GENDER_CHOICES)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['email', ]
        indexes = models.Index(fields=['email', 'first_name']),

    def __str__(self):
        return self.email


class VerifyUserToken(models.Model):
    user = models.OneToOneField(CustomUser, primary_key=True, on_delete=models.CASCADE,
                                related_name="verify_user_token")
    otp = models.CharField(unique=True, max_length=200)
    created_at = models.DateTimeField(auto_now=True)

    objects = VerifyUserManager()

    def __str__(self):
        return self.user.email


class PasswordResetToken(models.Model):
    user = models.OneToOneField(CustomUser, primary_key=True, on_delete=models.CASCADE,
                                related_name="pass_reset_confirmation")
    otp = models.CharField(unique=True, max_length=200)
    created_at = models.DateTimeField(auto_now=True)

    objects = PasswordResetManager()

    def __str__(self):
        return self.user.email
