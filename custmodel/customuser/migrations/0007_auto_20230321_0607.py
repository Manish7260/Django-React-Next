# Generated by Django 3.2.12 on 2023-03-21 06:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customuser', '0006_auto_20230316_0904'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='is_buyer',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='customuser',
            name='is_saler',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='customuser',
            name='phone',
            field=models.CharField(blank=True, max_length=15, null=True, verbose_name='phone'),
        ),
    ]
