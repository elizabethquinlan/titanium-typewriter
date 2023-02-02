# Generated by Django 4.1.5 on 2023-02-02 18:51

import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyWc',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('project_name', models.CharField(blank=True, default='', max_length=200)),
                ('todays_wc', models.IntegerField(default=0)),
                ('text_area', models.CharField(blank=True, default='Text here.', max_length=500000)),
                ('date', models.DateField(default=datetime.date.today, verbose_name="today's date")),
                ('accessed_today', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
