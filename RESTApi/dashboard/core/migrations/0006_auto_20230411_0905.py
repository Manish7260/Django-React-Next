# Generated by Django 3.2.12 on 2023-04-11 09:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_alter_dashboard_end_year'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dashboard',
            name='added',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='dashboard',
            name='published',
            field=models.CharField(max_length=50),
        ),
    ]
