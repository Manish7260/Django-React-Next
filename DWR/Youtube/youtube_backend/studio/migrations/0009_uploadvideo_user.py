# Generated by Django 4.2 on 2023-06-02 10:41

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('studio', '0008_alter_uploadvideo_tags_alter_uploadvideo_thumbnail'),
    ]

    operations = [
        migrations.AddField(
            model_name='uploadvideo',
            name='user',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, related_name='uploadvideo_user', to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
    ]
