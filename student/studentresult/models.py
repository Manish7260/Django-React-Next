from django.db import models
from django.utils import timezone

# Create your models here.
class Student(models.Model):
    FirstName = models.CharField(max_length=20)
    LastName = models.CharField(max_length=20)
    Sub1 = models.IntegerField()
    Sub2 = models.IntegerField()
    Sub3 = models.IntegerField()
    Sub4 = models.IntegerField()
    Sub5 = models.IntegerField()
    sum = models.IntegerField()
    avg = models.FloatField()
    inserted = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def save(self):
        self.sum = int(self.Sub1) + int(self.Sub2) + int(self.Sub3) + int(self.Sub4) + int(self.Sub5)
        self.avg = int(self.sum)/5
        return super(Student,self).save()
