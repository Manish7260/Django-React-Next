from django.db import models

# Create your models here.

DESIGNAITON_CHOICES = [
    ('CEO',"CEO"),
    ('Manager',"Manager"),
    ("Developer","Developer"),
    ("Helper","Helper"),
]

class Employee(models.Model):
    EmpName = models.CharField(max_length=50)
    EmpAge = models.IntegerField()
    EmpJoining = models.DateField()
    EmpDesignation = models.CharField(choices=DESIGNAITON_CHOICES,default='Developer',max_length=50)
    #EmpDuration = models.DurationField(Null = False)
    EmpEmail = models.EmailField(max_length=250)
    EmpProfile = models.FileField(upload_to = 'uploads/')
    #EmpProfile2 = models.ImageField(NULL = True)
    EmpAddress = models.TextField()