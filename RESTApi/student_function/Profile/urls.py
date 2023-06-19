from django.urls import path, include
from . import views
from rest_framework.urlpatterns import format_suffix_patterns

#url
app_name = "profile"

urlpatterns = [
    path('',views.list_profile,name = 'list-profile'),
    path('display/<int:pk>',views.detail_profile,name = 'detail-profile'),
    path('create/',views.create_profile,name = 'create-profile'),
    path('update/<int:pk>',views.update_profile,name = 'update-profile'),
    path('partialupdate/<int:pk>',views.partial_update_profile,name = 'parital-update-profile'),
    path('delete/<int:pk>',views.delete_profile,name = 'delete-profile'),
]
