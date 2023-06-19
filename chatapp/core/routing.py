from channels.auth import AuthmiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.routing

application  = ProtocolTypeRouter({
    'websocket' : AuthmiddlewareStack(
        URLRouter(
            chat.routing.websocker_urlpatterns
        )
    ),
})