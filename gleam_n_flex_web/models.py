import re, os

from django.db import models
from django.contrib.auth.models import User, Group
from helper_functions import convert_date_to_epoch
from time import time



def upload_product_image(instance, filename):
    filename = get_updated_filename_for_upload(filename)
    if os.path.isdir(BASE_DIR+'/Media/PRODUCT') == True: # will go in if statement, if required directory is exist.
        return os.path.join('PRODUCT/'+"%s" %(re.sub('[^a-zA-Z0-9 \.\_]', '', filename).replace(' ', ''), ))
    else:
        os.makedirs(BASE_DIR+'/Media/PRODUCT')
        return os.path.join('PRODUCT/'+"%s" %(re.sub('[^a-zA-Z0-9 \.\_]', '', filename).replace(' ', ''), ))

class Customer(models.Model):
    user = models.OneToOneField(User)
    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{} {}'.format(self.user.first_name, self.user.last_name)


class Bill(models.Model):
    MALE = 1
    FEMALE = 2
    GENDERCHOICE=((MALE,'MALE'),(FEMALE,'FEMALE'))

    CASH = 1
    CARD = 2
    NETBANKING = 3
    PAYMENTCHOICE=((CASH,'CASH'),(CARD,'CARD'),(NETBANKING,'NETBANKING'))

    bill_no = models.CharField(max_length=20)
    op_no = models.CharField(max_length=20, null=True, blank=True)
    token = models.CharField(max_length=20, null=True, blank=True)
    patient_name = models.CharField(max_length=500, null=True, blank=True)
    consultant = models.CharField(max_length=500, null=True, blank=True)
    perticulars = models.CharField(max_length=500, null=True, blank=True)
    qty = models.FloatField(max_length=500, null=True, blank=True)
    patient_age = models.IntegerField(null=True, blank=True)
    mobile_no = models.CharField(max_length=15, null=True, blank=True)
    gender = models.IntegerField(choices=GENDERCHOICE, null=True,blank=True)
    payment_type = models.IntegerField(choices=PAYMENTCHOICE, null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return 'Bill Number: {} | Patient: {}'.format(self.bill_no, self.patient_name)

    def get_json(self):
        result = {}
        result['bill_no'] = self.bill_no if self.bill_no else None
        result['op_no'] = self.op_no if self.op_no else None
        result['token'] = self.token if self.token else None
        result['patient_name'] = self.patient_name if self.patient_name else None
        result['consultant'] = self.consultant if self.consultant else None
        result['perticulars'] = self.perticulars if self.perticulars else None
        result['qty'] = self.qty if self.qty else None
        result['patient_age'] = self.patient_age if self.patient_age else None
        result['mobile_no'] = self.mobile_no if self.mobile_no else None
        result['gender'] = self.gender if self.gender else None
        result['payment_type'] = self.payment_type if self.payment_type else None
        result['created'] = convert_date_to_epoch(self.created) if self.created else None
        result['modified'] = convert_date_to_epoch(self.modified) if self.modified else None
        return result


class Product(models.Model):
    name = models.CharField(max_length=100)
    image = models.FileField(upload_to=upload_product_image,null=True,blank=True)
    caption = models.TextField(null=True,blank=True)
    description = models.TextField(null=True,blank=True)
    detail = models.TextField(null=True,blank=True)
    quantity = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return 'Product Name: {}'.format(self.name)
