# Generated by Django 3.2.12 on 2023-03-16 06:54

from django.db import migrations, models
import django.db.models.manager


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(max_length=254)),
                ('name', models.CharField(max_length=50)),
                ('phone', models.IntegerField()),
                ('address', models.TextField()),
                ('role', models.CharField(choices=[('S', 'Seller'), ('B', 'Buyer')], max_length=10)),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('sallers', django.db.models.manager.Manager()),
            ],
        ),
    ]
