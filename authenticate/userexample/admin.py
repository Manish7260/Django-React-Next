from django.contrib import admin
from .models import Otp, PasswordResetConfirmation

# Register your models here.
admin.site.register(Otp)
admin.site.register(PasswordResetConfirmation)