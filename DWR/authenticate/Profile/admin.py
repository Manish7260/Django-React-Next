from django.contrib import admin
from .models import CustomUser, PasswordResetToken, VerifyUserToken

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(PasswordResetToken)
admin.site.register(VerifyUserToken)