from django.urls import path
from .consumers import TaxiConsumer

websocket_urlpatterns = [
    path('status', TaxiConsumer.as_asgi()),
]