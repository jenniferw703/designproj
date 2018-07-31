# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from user_profile.models import user

# Create your models here.

class team(models.Model):
    team_name = models.CharField(max_length=100)
    team_description = models.TextField()
    project_id = models.BigIntegerField()
    availability = models.BigIntegerField()
    last_updated_date = models.DateTimeField()

class profile_view(models.Model):
    viewer = models.ForeignKey(user)
    viewed_team = models.ForeignKey(team)
    view_count = models.BigIntegerField()
    latest_view_date = models.DateField()

class team_recommendation(models.Model):
    target_user = models.ForeignKey(user)
    recommended_team = models.ForeignKey(team)
    rank = models.BigIntegerField()
    add_date = models.DateField()