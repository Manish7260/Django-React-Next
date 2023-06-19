from django.contrib import admin
from django.urls import path, include
from . import views


urlpatterns = [
    #path('',hello, name='hello'),
    path('',views.insert_emp,name='insert-emp'),
    path('show/',views.show_emp,name='show-emp'),
    path('edit/<int:pk>',views.edit_emp,name='edit-emp'),
    path('remove/<int:pk>',views.remove_emp,name='remove-emp'),
]
