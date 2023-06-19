from django.contrib import admin
from .models import CustomUser, VerifyUserToken, PasswordResetToken

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(VerifyUserToken)
admin.site.register(PasswordResetToken)
