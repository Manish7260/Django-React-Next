# Generated by Django 3.2.12 on 2023-03-16 08:48

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('customuser', '0003_customuser_is_staff'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='is_admin',
            new_name='is_superuser',
        ),
    ]