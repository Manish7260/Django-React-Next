# Generated by Django 3.2.12 on 2023-04-11 07:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0003_alter_dashboard_end_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboard',
            name='end_year',
            field=models.CharField(max_length=20),
        ),
    ]
