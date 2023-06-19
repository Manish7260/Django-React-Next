from django.contrib import admin
from django.urls import path, include
from . import views
urlpatterns = [
    path('',views.index, name='index'),
    path('register/', views.RegisterUser.as_view()),
    path('verifytoken/',views.VerifyToken.as_view()),
    path('login/', views.LoginUser.as_view()),
    path('logout/', views.User_logout),
    path('changepassword/', views.ChangePassword.as_view()),
    path('generatetoken/', views.SendResetPasswordToken.as_view()),
    path('forgettedpassword/',views.ResetPasswordUsingToken.as_view()),
]
