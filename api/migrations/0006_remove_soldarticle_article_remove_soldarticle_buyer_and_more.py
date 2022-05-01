# Generated by Django 4.0.4 on 2022-05-01 19:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_user_picture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='soldarticle',
            name='article',
        ),
        migrations.RemoveField(
            model_name='soldarticle',
            name='buyer',
        ),
        migrations.RemoveField(
            model_name='soldarticle',
            name='seller',
        ),
        migrations.AddField(
            model_name='article',
            name='is_sold',
            field=models.BooleanField(default=False),
        ),
        migrations.DeleteModel(
            name='DeletedArticle',
        ),
        migrations.DeleteModel(
            name='SoldArticle',
        ),
    ]
