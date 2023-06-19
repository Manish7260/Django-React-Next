from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

#url
app_name = "profile"

urlpatterns = [
    #path('',views.index,name='index'),
    path(app_name,views.ProfileList.as_view()),
    path(f'{app_name}/<int:pk>',views.ProfileDetail.as_view()),
    path('student/', views.ShowStudent.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns, allowed=['json','html'])