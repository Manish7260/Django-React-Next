# Generated by Django 3.2.12 on 2023-04-05 07:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Profile', '0007_alter_customuser_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_junior',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='is_senior',
            field=models.BooleanField(default=False),
        ),
    ]
