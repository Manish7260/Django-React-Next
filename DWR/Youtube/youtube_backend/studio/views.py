from django.shortcuts import render
from .serializers import CreateChannelSerializer, UploadVideoSerializer, ChannelDetailSerializer, \
    SendVideoDetailSerializer, VideoSerializer, SendSingleVideoDetailSerializer, LikedVideoCreateSerializer, \
    LikedVideoSerializer, AllVideoSerializer
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import uploadVideo, LikedVideo
from user.models import CustomUser
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, status


# Create your views here.
class CreateChannel(CreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = CreateChannelSerializer


class UploadVideo(CreateAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = UploadVideoSerializer


class ChannelData(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        serializer = ChannelDetailSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class DispalyVideo(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        serializer = SendVideoDetailSerializer(data=request.query_params, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AllVideoListView(ListAPIView):
    permission_classes = [IsAuthenticated, ]
    serializer_class = AllVideoSerializer
    queryset = uploadVideo.objects.all()
    pagination_class = PageNumberPagination
    pagination_class.page_size = 20
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]

    filterset_fields = {
        'title': ['exact'],
    }

    search_fields = ['tags', 'channel_name__channel_name', 'title']


class SendSingleVideo(APIView):
    permission_classes = [AllowAny, ]

    def get(self, request):
        serializer = SendSingleVideoDetailSerializer(data=request.query_params, context={'request': request})
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data)


# class LikedVideoCreateView(CreateAPIView):
#     permission_classes = (AllowAny,)
#     serializer_class = LikedVideoCreateSerializer


class LikedVideoView(APIView):
    def get(self, request):
        videos = uploadVideo.objects.all()
        filtered_videos = []

        if request.user.is_authenticated:
            liked_videos = LikedVideo.objects.filter(user=request.user)
            liked_video_ids = liked_videos.values_list('video_id', flat=True)
            filtered_videos = videos.filter(id__in=liked_video_ids)

        serializer = AllVideoSerializer(filtered_videos, many=True,  context={'request': request})
        return Response(serializer.data)

class LikedVideoCreateView(CreateAPIView):
    serializer_class = LikedVideoCreateSerializer
    permission_classes = [AllowAny,]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data.get('user')
        video = serializer.validated_data.get('video')

        try:
            liked = LikedVideo.objects.get(user=user, video=video)
            liked.delete()
            return Response(False, status=status.HTTP_201_CREATED)
        except LikedVideo.DoesNotExist:
            LikedVideo.objects.create(user=user, video=video, like=True)
            return Response(True, status=status.HTTP_201_CREATED)
