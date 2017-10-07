import json,datetime, re, os, random, string, csv, math

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User, Group
from django.template.loader import render_to_string
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction, IntegrityError, connections, connection
from django.http import HttpResponseRedirect, HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render_to_response, render
from .models import Customer


def loginIndex(request):
    return render_to_response('html_templates/loginIndex.html')

def adminDashboard(request):
    return render_to_response('html_templates/adminDashboardIndex.html')

def customerDashboard(request):
    return render_to_response('html_templates/customerDashboardIndex.html')

def login_view(request):
    params = json.loads(request.body)
    username = params.get("username")
    password = params.get("password")

    user = authenticate(username=username, password=password)

    if not user:
        return JsonResponse({"validation": "Invalid login details", "status": False})

    if not user.is_active:
        return JsonResponse({"validation": "Invalid login details", "status": False})

    login(request, user)

    if Customer.objects.filter(user=user):
        return JsonResponse({"redirectUrl" : "customerDashboard/", "status": True})
    elif user.groups.filter(name='ADMIN'):
        return JsonResponse({"redirectUrl" : "adminDashboard/", "status": True})
    else:
        logout(request)
        return JsonResponse({"validation" : "Invalid request", "status": False})
