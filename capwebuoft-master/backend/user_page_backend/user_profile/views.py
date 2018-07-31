# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.db import connection


def index(request):
    return HttpResponse("Hello")

def user_profile(request):
    #When method==GET. Provide all tags avaliable, and others infos which needed by dropdown field
    #When method==POST. Save data into the database. return success if save success. return error message other wise
    return HttpResponse("User profile page")