from django.urls import path, include
from . import views

urlpatterns = [
    path('createchannel/', views.CreateChannel.as_view()),
    path('uploadvideo/', views.UploadVideo.as_view()),
    path('sendvideo/', views.DispalyVideo.as_view()),
    path('getchannel/', views.ChannelData.as_view()),
    path('allvideo/', views.AllVideoListView.as_view()),
    path('singlevideo/', views.SendSingleVideo.as_view()),
    path('createlikedvideo/', views.LikedVideoCreateView.as_view()),
    path('likedvideo/', views.LikedVideoView.as_view()),
]
