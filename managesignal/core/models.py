from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

# Create your models here.
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(verbose_name='email address',max_length=255,unique=True)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_senior = models.BooleanField(default=False)
    is_junior = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

class Result(models.Model):
    user = models.OneToOneField(CustomUser, primary_key=True, on_delete=models.CASCADE, related_name="result_master")
    mark1 = models.IntegerField(default=1)
    mark2 = models.IntegerField(default=2)
    mark3 = models.IntegerField(default=3)
    mark4 = models.IntegerField(default=4)

    class Meta:
        ordering = ["user"]
        indexes = [models.Index(fields=['user', ])]