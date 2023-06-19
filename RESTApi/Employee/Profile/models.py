from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager
import uuid
from django.conf import settings
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    firstname = models.CharField(max_length=50, blank=True)
    lastname = models.CharField(max_length=50, blank=True)
    doj = models.DateTimeField('joining Date',null=True)
    salary = models.IntegerField(default=1000)
    phone = models.CharField('phone', null=True, blank=True, max_length=15)
    address = models.TextField('address', blank=True)
    is_senior = models.BooleanField(default=False)
    is_junior = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        ordering = ['email']
        indexes = models.Index(fields=['firstname','email']),

    def __str__(self):
        return self.email

class PasswordResetManager(models.Manager):
    def generated(self,**kwargs):
        token = str(uuid.uuid4())
        return self.create(token=token,**kwargs)

class PasswordResetToken(models.Model):
    user = models.OneToOneField(CustomUser, primary_key=True, on_delete=models.CASCADE, related_name="pass_reset_confirmation")
    token = models.CharField(unique=True, max_length=200)
    created_at = models.DateTimeField(auto_now=True)

    objects = PasswordResetManager()

    def __str__(self):
        return self.user.email

