import json,datetime, re, os, random, string, csv, math

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User, Group
from django.template.loader import render_to_string
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction, IntegrityError, connections, connection
from django.http import HttpResponseRedirect, HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render_to_response, render
from .models import Customer, Bill


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


def add_bill(request):
    params = json.loads(request.body)
    bill_details = params.get('billDetails')
    bill_no = bill_details.get('bill_no')
    op_no = bill_details.get('op_no')
    token = bill_details.get('token')
    patient_name = bill_details.get('patient_name')
    consultant = bill_details.get('consultant')
    perticulars = bill_details.get('perticulars')
    qty = bill_details.get('qty')
    patient_age = bill_details.get('patient_age')
    mobile_no = bill_details.get('mobile_no')
    gender = bill_details.get('gender')
    payment_type = bill_details.get('payment_type')

    if not bill_no:
        return JsonResponse({"validation" : "Invalid Request", "status": False})

    bill = Bill.objects.create(**bill_details)

    return JsonResponse({"validation" : "New Bill Saved", "status": True})


def get_all_bill(request):
    bills = Bill.objects.all()

    bill_list = [bill.get_json() for bill in bills]

    return JsonResponse({"data": bill_list, "status": True})


def get_bill_details(request):
    params = json.loads(request.body)
    bill_id = params.get('bill_id')

    try:
        bill = Bill.objects.get(id=bill_id)
    except Exception as e:
        print e
        return JsonResponse({"validation": 'Invalid Request', "status": False})

    return JsonResponse({"data": bill.get_json(), "status": True})
