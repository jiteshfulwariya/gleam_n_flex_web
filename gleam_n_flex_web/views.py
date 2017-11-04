import json,datetime, re, os, random, string, csv, math

from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.models import User, Group
from django.template.loader import render_to_string
from django.core.mail import EmailMessage
from django.core.exceptions import ObjectDoesNotExist
from django.db import transaction, IntegrityError, connections, connection
from django.http import HttpResponseRedirect, HttpResponse, HttpRequest, JsonResponse
from django.shortcuts import render_to_response, render
from .models import Customer, Bill, Product

from helper_functions import convert_epoch_to_date
from .settings import EMAIL_HOST_USER, BASE_DIR

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

    if user.groups.filter(name='ADMIN'):
        return JsonResponse({"redirectUrl" : "adminDashboard/", "status": True})
    elif Customer.objects.filter(user=user):
        return JsonResponse({"redirectUrl" : "customerDashboard/", "status": True})
    else:
        logout(request)
        return JsonResponse({"validation" : "Invalid request", "status": False})


def add_bill(request):
    params = json.loads(request.body)
    bill_details = params.get('billDetails')
    patient_name = bill_details.get('patient_name')

    bill_no = bill_details.get('bill_no')
    op_no = bill_details.get('op_no')
    token = bill_details.get('token')
    consultant = bill_details.get('consultant')
    amount = bill_details.get('amount')
    particulars = bill_details.get('particulars')
    qty = bill_details.get('qty')
    payment_type = bill_details.get('payment_type')
    dob = bill_details.get('dob')
    patient_age = bill_details.get('patient_age')
    mobile_no = bill_details.get('mobile_no')
    gender = bill_details.get('gender')

    if not bill_no:
        return JsonResponse({"validation" : "Invalid Request", "status": False})

    bill_info = {}
    customer = create_customer(bill_details)
    if not customer:
        return JsonResponse({"validation" : "Invalid Request", "status": False})

    bill_info['customer'] = customer
    bill_info['bill_no'] = bill_no
    bill_info['op_no'] = op_no
    bill_info['token'] = token
    bill_info['consultant'] = consultant
    bill_info['amount'] = amount
    bill_info['particulars'] = particulars
    bill_info['qty'] = qty
    bill_info['payment_type'] = payment_type

    try:
       amount = int(amount)
    except Exception as e:
        print e
        return JsonResponse({"validation" : "Invalid Amount", "status": False})

    bill = Bill.objects.create(**bill_info)

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


def get_product_details(request):
    params = json.loads(request.body)
    product_id = params.get('product_id')

    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        print e
        return JsonResponse({"validation": 'Invalid Request', "status": False})

    return JsonResponse({"data": product.get_json(), "status": True})


def add_product(request):
    params = json.loads(request.body)
    product_details = params.get('productDetails')
    name = product_details.get('name')
    description = product_details.get('description')

    if not product_details.get('name'):
        return JsonResponse({"validation" : "Invalid Request", "status": False})

    print name, description, product_details

    product = Product.objects.create(**product_details)

    return JsonResponse({"validation" : "New Product Saved", "status": True})


def get_all_product(request):
    products = Product.objects.all()

    product_list = [product.get_json() for product in products]

    return JsonResponse({"data": product_list, "status": True})


def sale_product(request):
    params = json.loads(request.body)
    product_sale_details = params.get('product_sale_details')
    product_id = product_sale_details.get('product_id')
    sale_quantities = product_sale_details.get('sale_quantities')

    if not sale_quantities:
        return JsonResponse({"validation" : "Invalid Sale Quantities", "status": False})

    try:
        product = Product.objects.get(id=product_id)
    except Exception as e:
        print e
        return JsonResponse({"validation": 'Invalid Request', "status": False})

    product.quantity = product.quantity - int(sale_quantities)
    product.save()

    return JsonResponse({"validation" : "Product Sold", "status": True})

def get_choices(request):
    payment_type_choice_list = [{'id': payment_type[0], 'name': payment_type[1]} for payment_type in Bill.PAYMENTCHOICE]

    return JsonResponse({"data" : payment_type_choice_list, "status": True})


def create_customer(bill_details):
    patient_name = bill_details.get('patient_name')
    mobile_no = bill_details.get('mobile_no')
    email = bill_details.get('email')
    dob = bill_details.get('dob')
    age = bill_details.get('patient_age')
    gender = bill_details.get('gender')

    with transaction.atomic():
        if dob:
            bill_details['dob'] = convert_epoch_to_date(dob)
        else:
            bill_details['dob'] = None

        full_name = patient_name.split(' ')

        print 'patient_name: ', patient_name
        print 'full_name: ', full_name
        if len(full_name) == 2:
            first_name = full_name[0]
            last_name = full_name[1]
        elif len(full_name) == 3:
            first_name = full_name[0]
            middle_name = full_name[1]
            last_name = full_name[2]
        else:
            print 'Invalid Patient Name Format'
            return None

        try:
            user = User.objects.create(username=email, first_name=first_name, last_name=last_name)
        except Exception as e:
            print 'Error while saving user: ', e
            return None

        customer_info = {}
        customer_info['mobile_no'] = mobile_no
        customer_info['user'] = user
        customer_info['dob'] = bill_details['dob']
        customer_info['age'] = age
        customer_info['gender'] = gender

        try:
            customer = Customer.objects.create(**customer_info)
        except Exception as e:
            print 'Error while saving customer: ', e
            return None

        return customer


def send_invoice(request):
    data_dict = json.loads(request.body)
    invoice_id = data_dict.get('invoice_details')
    print 'invoice_id: ', invoice_id
    print 'Document Path: ', BASE_DIR+'/Media/pdf_sample.pdf'
    document_path = BASE_DIR+'/Media/pdf_sample.pdf'

    email = EmailMessage('Subject here', 'Here is the message.', EMAIL_HOST_USER, ['acwankhede@gmail.com'])
    email.attach_file(document_path)
    email.send()

    return JsonResponse({"validation" : 'Invoice sent', "status": True})
