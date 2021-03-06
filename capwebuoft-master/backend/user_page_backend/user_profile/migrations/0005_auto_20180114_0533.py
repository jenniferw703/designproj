# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-01-14 05:33
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0004_auto_20180113_2335'),
    ]

    operations = [
        migrations.CreateModel(
            name='team_view',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('view_count', models.BigIntegerField()),
                ('latest_view_date', models.DateField()),
                ('viewed_team', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.team')),
                ('viewer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user_profile.user')),
            ],
        ),
        migrations.RemoveField(
            model_name='profile_view',
            name='viewed_team',
        ),
        migrations.RemoveField(
            model_name='team_recommendation',
            name='recommended_team',
        ),
        migrations.RemoveField(
            model_name='user_recommendation',
            name='recommended_user',
        ),
        migrations.AddField(
            model_name='profile_view',
            name='viewed',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='viewed_user', to='user_profile.user'),
        ),
        migrations.AddField(
            model_name='team_recommendation',
            name='recommended',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recommended_team', to='user_profile.team'),
        ),
        migrations.AddField(
            model_name='user_recommendation',
            name='recommended',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='recommended_user', to='user_profile.user'),
        ),
    ]
