from django.urls import path
from . import views
urlpatterns = [
    path('',views.index, name = 'index'),
    path('register/',views.register, name = 'register'),
    path('logout',views.logout_user,name = 'logout'),
    path('salerlogin',views.saler_login,name='saler-login'),
    path('buyerlogin',views.buyer_login,name='buyer-login'),
    path('salerview',views.saler_view,name='saler-view'),
    path('buyerview',views.buyer_view,name='buyer-view'),
]