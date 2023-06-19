from django.contrib import admin
from .models import channel, uploadVideo, LikedVideo
# Register your models here.

admin.site.register(channel)
admin.site.register(uploadVideo)
admin.site.register(LikedVideo)