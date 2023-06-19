from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('register/', views.register, name='register'),
    path('logout/', views.logout_user, name='logout-user'),
    path('updatepass', views.change_password, name='change-password'),
    path('forgetpass', views.forget_password, name='forget-password'),
    path('generateotp', views.generateotp, name='generate-otp'),
    path('verifyotp', views.verifyotp, name='verify-otp'),
    path('forgetpasschange', views.forget_pass_change, name='forget-pass-change'),
    path('paswordreset', views.passresetconfirm, name='pass-reset-confirm'),
    path('verifynewotp',views.verifynewotp,name = 'verify-new-otp')
]
