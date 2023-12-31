# Generated by Django 3.2.12 on 2023-03-13 09:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Employee',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('EmpName', models.CharField(max_length=50)),
                ('EmpAge', models.IntegerField()),
                ('EmpJoining', models.DateField()),
                ('EmpDesignation', models.CharField(choices=[('CEO', 'CEO'), ('Manager', 'Manager'), ('Developer', 'Developer'), ('Helper', 'Helper')], default='Developer', max_length=50)),
                ('EmpDuration', models.DurationField()),
                ('EmpEmail', models.EmailField(max_length=250)),
                ('EmpProfile', models.FileField(upload_to='')),
                ('EmpProfile2', models.ImageField(upload_to='')),
                ('EmpAddress', models.TextField()),
            ],
        ),
    ]
