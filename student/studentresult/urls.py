from django.urls import path
from . import views



urlpatterns = [
    path('insert/',views.insert_result,name='insert-result'),
    path('show/',views.show_result,name='show-result'),
    path('',views.show_result,name='show-result'),
    path('edit/<int:pk>',views.edit_result,name='edit-result'),
    path('delete/<int:pk>',views.delete_result,name='delete-result'),
]

#appname