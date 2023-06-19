# Generated by Django 3.2.12 on 2023-03-22 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20230322_0418'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='result',
            options={'ordering': ['user']},
        ),
        migrations.AddIndex(
            model_name='result',
            index=models.Index(fields=['user'], name='core_result_user_id_30d695_idx'),
        ),
    ]
