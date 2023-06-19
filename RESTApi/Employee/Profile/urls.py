from django.urls import path, include
from . import views

urlpatterns = [
    path('register/',views.RegiterUser.as_view()),
    path('login/',views.LoginUser.as_view()),
    path('logout/',views.User_logout),
    path('changepassword/',views.ChangePassword.as_view()),
    path('generatetoken/',views.SendResetPasswordToken().as_view()),
    path('reset_password', views.ResetPasswordUsingToken().as_view()),
    path('update/', views.UserProfileUpdateView().as_view()),
    path('senioruser/', views.ShowUser().as_view()),
    path('junioruser/',views.ShowJunior().as_view()),
]