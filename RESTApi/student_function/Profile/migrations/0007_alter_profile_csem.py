# Generated by Django 3.2.12 on 2023-03-29 05:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0006_auto_20230328_1249'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='csem',
            field=models.PositiveIntegerField(default=1),
        ),
    ]
