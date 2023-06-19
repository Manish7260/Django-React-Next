from django.urls import path, include
from . import views
from django.contrib.auth.views import LoginView, LogoutView
urlpatterns = [
    path('driver',views.driver, name='driver-page'),
    path('',views.passenger, name='passenger-page'),
    path('ride',views.ride, name='ride-page'),

    # login-section
    path("login/", LoginView.as_view(template_name="loginPage.html"), name="login-user"),
    path("logout/", LogoutView.as_view(), name="logout-user"),
]