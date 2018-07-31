# -*- coding: utf-8 -*-
from __future__ import unicode_literals


# Create your models here.
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class team(models.Model):
    team_name = models.CharField(max_length=100)
    team_description = models.TextField()
    project_id = models.BigIntegerField()
    availability = models.BigIntegerField()
    last_updated_date = models.DateTimeField()

class work_experience(models.Model):
    position = models.CharField(max_length=100)
    company = models.CharField(max_length=100)
    job_description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    location = models.CharField(max_length=50)

class skill(models.Model):
    skill_name = models.CharField(max_length=50)
    add_date = models.DateField()

class profile_view(models.Model):
    viewer = models.ForeignKey(User)
    viewed = models.ForeignKey(User, related_name="viewed_user", null=True)
    view_count = models.BigIntegerField()
    latest_view_date = models.DateField()

class project_interest(models.Model):
    #project = models.ForeignKey(project)
    project = models.BigIntegerField()
    add_date = models.DateField()

class team_view(models.Model):
    viewer = models.ForeignKey(User)
    viewed_team = models.ForeignKey(team)
    view_count = models.BigIntegerField()
    latest_view_date = models.DateField()

class user_recommendation(models.Model):
    target_user = models.ForeignKey(User)
    recommended = models.ForeignKey(User, related_name = 'recommended_user', null=True)
    rank = models.BigIntegerField()
    add_date = models.DateField()

class team_recommendation(models.Model):
    target_user = models.ForeignKey(User)
    recommended = models.ForeignKey(team, related_name = 'recommended_team', null=True)
    rank = models.BigIntegerField()
    add_date = models.DateField()

class user_info(models.Model):
    user = models.ForeignKey(User)
    gender = models.CharField(max_length=10)
    joined_team = models.ForeignKey(team, null=True)
    availability = models.BooleanField()
    team_role = models.BigIntegerField()
    experiences = models.ManyToManyField(work_experience)
    skills = models.ManyToManyField(skill)
    project_interest = models.ManyToManyField(project_interest)
