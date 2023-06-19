import json
from channels.generic.websocket import AsyncWebsocketConsumer

class TaxiConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.roomGroupName = "book_taxi"
        await self.channel_layer.group_add(
            self.roomGroupName,
            self.channel_name
        )
        await self.accept()

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        status = text_data_json["status"]

        await self.channel_layer.group_send(
            self.roomGroupName, {
                "type": "sendMessage",
                "message": message,
                "status" : status,
            })

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.roomGroupName,
            self.channel_layer
        )

    async def sendMessage(self, event):
        message = event["message"]
        status = event["status"]
        await self.send(text_data=json.dumps({"message": message,'status': status}))