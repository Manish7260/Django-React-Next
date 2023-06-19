# Generated by Django 3.2.12 on 2023-03-21 11:53

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='result',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='result_master', serialize=False, to='core.customuser')),
                ('mark1', models.IntegerField(default=1)),
                ('mark2', models.ImageField(default=2, upload_to='')),
                ('mark3', models.ImageField(default=3, upload_to='')),
                ('mark4', models.ImageField(default=4, upload_to='')),
            ],
        ),
    ]
