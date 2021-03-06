# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-14 05:43
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user_profile', '0005_auto_20180114_0533'),
    ]

    operations = [
        migrations.CreateModel(
            name='skill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill_name', models.CharField(max_length=50)),
                ('add_date', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='user_info',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gender', models.CharField(max_length=10)),
                ('availability', models.BooleanField()),
                ('team_role', models.BigIntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='skills',
            name='user',
        ),
        migrations.RemoveField(
            model_name='project_interest',
            name='target_user',
        ),
        migrations.RemoveField(
            model_name='work_experience',
            name='user',
        ),
        migrations.AlterField(
            model_name='profile_view',
            name='viewed',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='viewed_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='profile_view',
            name='viewer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='team_recommendation',
            name='target_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='team_view',
            name='viewer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user_recommendation',
            name='recommended',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recommended_user', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='user_recommendation',
            name='target_user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.DeleteModel(
            name='skills',
        ),
        migrations.DeleteModel(
            name='user',
        ),
        migrations.AddField(
            model_name='user_info',
            name='experiences',
            field=models.ManyToManyField(to='user_profile.work_experience'),
        ),
        migrations.AddField(
            model_name='user_info',
            name='joined_team',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='user_profile.team'),
        ),
        migrations.AddField(
            model_name='user_info',
            name='project_interest',
            field=models.ManyToManyField(to='user_profile.project_interest'),
        ),
        migrations.AddField(
            model_name='user_info',
            name='skills',
            field=models.ManyToManyField(to='user_profile.skill'),
        ),
        migrations.AddField(
            model_name='user_info',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
