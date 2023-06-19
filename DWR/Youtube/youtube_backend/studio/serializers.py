from rest_framework import serializers
from .models import channel, uploadVideo, LikedVideo
from rest_framework.serializers import ModelSerializer, ValidationError
from user.models import CustomUser
from django.core.exceptions import ObjectDoesNotExist
from PIL import Image
from io import BytesIO
import base64


def get_object_or_none(model_name, identifier):
    try:
        if model_name == 'channel':
            return channel.objects.get(channel_name=identifier)
        elif model_name == 'CustomUser':
            return CustomUser.objects.get(email=identifier)
    except ObjectDoesNotExist:
        raise ValidationError("Object does not exist")


class ChannelSerializer(ModelSerializer):
    class Meta:
        model = channel
        fields = ['channel_name', 'created_at', 'handler']


class VideoSerializer(ModelSerializer):
    channel_name = serializers.SerializerMethodField("get_channel_name", read_only=True)
    liked_video = serializers.SerializerMethodField()

    def get_channel_name(self, obj):
        return obj.channel_name.channel_name

    def get_liked_video(self, obj):
        request = self.context.get('request')
        try:
            LikedVideo.objects.get(user=request.user, video=obj)
            return True
        except ObjectDoesNotExist:
            return False

    class Meta:
        model = uploadVideo
        fields = ['id', 'channel_name', 'video_file', 'thumbnail', 'title', 'description', 'age_restricted', 'tags',
                  'uploaded_at', 'category', 'liked_video']


class AllVideoSerializer(ModelSerializer):
    channel_name = serializers.SerializerMethodField("get_channel_name", read_only=True)

    def get_channel_name(self, obj):
        return obj.channel_name.channel_name

    class Meta:
        model = uploadVideo
        fields = ['id', 'channel_name', 'video_file', 'thumbnail', 'title', 'tags',
                  'category']


class CreateChannelSerializer(ModelSerializer):
    user = serializers.CharField(max_length=50, write_only=True)

    class Meta:
        model = channel
        fields = ['user', 'channel_name', 'handler']

    def create(self, validated_data):
        user_email = validated_data.pop('user')
        user = get_object_or_none("CustomUser", user_email)
        Channel = channel.objects.create(user=user, **validated_data)
        return Channel


class UploadVideoSerializer(ModelSerializer):
    channel_name = serializers.CharField(max_length=50, write_only=True)
    thumbnail = serializers.CharField(default=" ")
    user = serializers.CharField(write_only=True)

    class Meta:
        model = uploadVideo
        fields = ['user', 'channel_name', 'video_file', 'thumbnail', 'title', 'description', 'age_restricted', 'tags',
                  'uploaded_at', 'category']

    def create(self, validated_data):
        channel_name = validated_data.pop('channel_name')
        email = validated_data.pop('user')

        thumbnail_data = validated_data.get('thumbnail')

        if thumbnail_data:
            # Extract the base64 image data
            header, encoded_data = thumbnail_data.split(',', 1)
            decoded_data = base64.b64decode(encoded_data)

            # Convert the base64 data to an image object
            image = Image.open(BytesIO(decoded_data))

            # Convert RGBA image to RGB
            if image.mode == 'RGBA':
                image = image.convert('RGB')

            # Define the crop coordinates
            left = 0
            top = 0
            right = 450
            bottom = 300

            # Crop the image
            cropped_image = image.crop((left, top, right, bottom))

            # Save the cropped image to a buffer
            cropped_buffer = BytesIO()
            cropped_image.save(cropped_buffer, format='JPEG')

            # Encode the cropped image buffer as base64 string
            cropped_base64 = base64.b64encode(cropped_buffer.getvalue()).decode('utf-8')

            # Add the proper base64 header
            cropped_base64 = 'data:image/jpeg;base64,' + cropped_base64

            # Update the validated data with the cropped thumbnail
            validated_data['thumbnail'] = cropped_base64

        newVideo = uploadVideo.objects.create(
            user=get_object_or_none("CustomUser", email),
            channel_name=get_object_or_none("channel", channel_name),
            video_file=validated_data['video_file'],
            thumbnail=validated_data['thumbnail'],
            title=validated_data['title'],
            description=validated_data['description'],
            age_restricted=validated_data['age_restricted'],
            tags=validated_data['tags'],
            category=validated_data['category']
        )

        newVideo.save()
        return newVideo


class ChannelDetailSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    channels = serializers.SerializerMethodField()

    def get_channels(self, obj):
        username = obj['username']
        try:
            user = CustomUser.objects.get(email=username)
            channels = channel.objects.filter(user=user)
            serializer = ChannelSerializer(channels, many=True)
            return serializer.data
        except CustomUser.DoesNotExist:
            return []


class SendVideoDetailSerializer(serializers.Serializer):
    channelname = serializers.CharField(max_length=50)
    videos = serializers.SerializerMethodField()

    def get_videos(self, obj):
        channelname = obj['channelname']

        try:
            channels = channel.objects.get(channel_name=channelname)
            videos = uploadVideo.objects.filter(channel_name=channels)
            request = self.context.get('request')
            serializer = VideoSerializer(videos, many=True, context={'request': request})
            return serializer.data
        except uploadVideo.DoesNotExist:
            return []


class SendSingleVideoDetailSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    videos = serializers.SerializerMethodField()

    def get_videos(self, obj):
        id = obj['id']

        try:
            videos = uploadVideo.objects.get(pk=id)
            request = self.context.get('request')
            if request:
                serializer = VideoSerializer(videos, context={'request': request})
                return serializer.data
            else:
                return {}
        except uploadVideo.DoesNotExist:
            return []


# class LikedVideoCreateSerializer(serializers.ModelSerializer):
#     user = serializers.CharField(max_length=50, write_only=True)
#     video = serializers.CharField()
#     like = serializers.BooleanField()
#
#     class Meta:
#         model = LikedVideo
#         fields = ['user', 'video', 'like']
#
#     def get_video(self, id):
#         try:
#             video = uploadVideo.objects.get(pk=id)
#             return video
#         except ObjectDoesNotExist:
#             raise serializers.ValidationError("Video does not exist")
#
#     def create(self, validated_data):
#         user = validated_data.pop('user')
#         video_id = validated_data.pop('video')
#
#         user = get_object_or_none("CustomUser", user)
#         video = self.get_video(video_id)
#         like = validated_data.pop('like')
#
#         if like:
#             instance = LikedVideo.objects.create(user=user, video=video, like=True)
#         else:
#             instance = LikedVideo.objects.get(user=user, video=video).delete()
#             return ""
#
#         return instance

class LikedVideoCreateSerializer(serializers.ModelSerializer):
    user = serializers.CharField(max_length=50, write_only=True)
    video = serializers.CharField()

    class Meta:
        model = LikedVideo
        fields = ['user', 'video']

    def get_video(self, id):
        try:
            video = uploadVideo.objects.get(pk=id)
            return video
        except ObjectDoesNotExist:
            raise serializers.ValidationError("Video does not exist")

    def validate(self, attrs):
        user = attrs.get('user')
        video_id = attrs.get('video')

        user = get_object_or_none("CustomUser", user)
        video = self.get_video(video_id)

        attrs['user'] = user
        attrs['video'] = video

        return attrs

class LikedVideoSerializer(serializers.ModelSerializer):
    video = AllVideoSerializer()

    class Meta:
        model = LikedVideo
        fields = ['video']
