from django.db import models
from user.models import CustomUser
from django.core.validators import FileExtensionValidator

# Create your models here.

CATEGORY_CHOICES = (
    ("Comedy", "Comedy"),
    ("Education", "Education"),
    ("Sports", "Sports"),
    ("Gaming", "Gaming"),
    ("Music", "Music"),
    ("News", "News"),
)


class channel(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="create_channel", unique=False)
    channel_name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now=True)
    handler = models.CharField(max_length=50)

    def __str__(self):
        return self.channel_name


class uploadVideo(models.Model):
    channel_name = models.ForeignKey(channel, on_delete=models.CASCADE, related_name="uploaded_video_channel",
                                     unique=False)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="uploadvideo_user", unique=False)
    video_file = models.FileField(validators=[
        FileExtensionValidator(allowed_extensions=['MOV', 'avi', 'mp4', 'webm', 'mkv'])], null=False, unique=False)
    thumbnail = models.TextField(null=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    age_restricted = models.BooleanField(default=False)
    tags = models.CharField(max_length=50)
    uploaded_at = models.DateTimeField(auto_now=True)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=15)

    def __str__(self):
        return self.title


class LikedVideo(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="liked_video", unique=False)
    video = models.ForeignKey(uploadVideo, on_delete=models.CASCADE, related_name="liked_video", unique=False)
    like = models.BooleanField(default=False)

    class Meta:
        unique_together = ('user', 'video')
    def __bool__(self):
        return self.like
