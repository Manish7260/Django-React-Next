from django.db import models

# Create your models here.
class Profile(models.Model):
    name = models.CharField('name',max_length=255)
    dob = models.DateField()
    csem = models.PositiveIntegerField(default=1)
    status = models.BooleanField(default=True)
    address = models.TextField('address', blank=True)
    yis = models.CharField(max_length=10)
    email = models.EmailField()

    class Meta:
        ordering = ['-name']
        indexes = models.Index(fields=['name','email']),

    def __str__(self) -> str:
        return self.name