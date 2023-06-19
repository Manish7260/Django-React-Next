from django.db import models

# Create your models here.
class Employee(models.Model):
    empid = models.CharField(max_length=3)
    empname = models.CharField(max_length=200)
    empgender = models.CharField(max_length=10)
    empemail = models.EmailField()
    empdesignation = models.CharField(max_length=150)

    class Meta:
        db_table="Employee"