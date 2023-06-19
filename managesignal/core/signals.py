from django.db.models.signals import post_save
from .models import CustomUser, Result
from django.dispatch import receiver

@receiver(post_save, sender = CustomUser)
def create_result(sender, instance, created, **kwargs):
    print("Before result object created")
    if created:
        print("Result Object Created")
        Result.objects.create(user=instance)