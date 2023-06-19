from channels.consumer import SyncConsumer, AsyncConsumer

class MySyncConsumer(SyncConsumer):
    def websocket_connect(self, event):
        print("Websocket connected.......", event)

    def websocket_receive(self, event):
        print("Websocket Received......", event)

    def websocket_disconnect(self, event):
        print("Websocket disconnected......", event)

class MyAsyncConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        print("Websocket connected.......", event)

    async def websocket_receive(self, event):
        print("Websocket Received......", event)

    async def websocket_disconnect(self, event):
        print("Websocket disconnected......", event)