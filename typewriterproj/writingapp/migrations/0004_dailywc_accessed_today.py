# Generated by Django 4.1.5 on 2023-01-30 23:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('writingapp', '0003_alter_dailywc_text_area'),
    ]

    operations = [
        migrations.AddField(
            model_name='dailywc',
            name='accessed_today',
            field=models.BooleanField(default=False),
        ),
    ]