# Generated by Django 4.2 on 2023-06-02 10:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('studio', '0007_alter_uploadvideo_thumbnail'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uploadvideo',
            name='tags',
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name='uploadvideo',
            name='thumbnail',
            field=models.TextField(null=True),
        ),
    ]
