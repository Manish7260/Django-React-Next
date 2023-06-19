from django.db import models

# Create your models here.
class Song(models.Model):
    title = models.CharField(max_length=50)
    class Meta:
        ordering = ['title']

class Artist(models.Model):
    name = models.CharField(max_length=50)
    songs = models.ManyToManyField(Song)

    class Meta:
        ordering = ['name']