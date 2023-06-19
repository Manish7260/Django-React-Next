import random
from django.contrib.auth.models import User
from datetime import timezone, datetime, timedelta
import pytz

from django.db import models
# Create your models here.
class PasswordResetManager(models.Manager):
    def generated(self,**kwargs):
        code = random.randint(100000,999999)
        return self.create(code=code,**kwargs)

class Otp(models.Model):
    generatedotp = models.IntegerField()
    username = models.CharField(max_length=50)
    generated = models.DateTimeField(auto_now_add=True)

    @property
    def is_expired(self):
        utc = pytz.UTC
        if datetime.now(utc) > self.generated.astimezone(utc) + timedelta(minutes=1):
            return True
        else:
            return False

    def save(self):
        self.generatedotp = random.randint(100001,999999)
        return super(Otp,self).save()


class PasswordResetConfirmation(models.Model):
    user = models.OneToOneField(User,primary_key=True, on_delete=models.CASCADE, related_name="pass_reset_confirmation")
    code = models.BigIntegerField(unique=True)
    created_at = models.DateTimeField(auto_now=True)

    objects = PasswordResetManager()

    @property
    def is_expired(self):
        utc = pytz.UTC
        if datetime.now(utc) > self.created_at.astimezone(utc) + timedelta(minutes=1):
            return True
        else:
            return False

    def __str__(self):
        return self.user.username