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
    MALE = 1
    FEMALE = 2
    GENDERCHOICE = ((MALE,'MALE'),(FEMALE,'FEMALE'))

    FACEBOOK = 1
    INSTAGRAM = 2
    WEBSITE = 3
    OTHERS = 4
    HOWYOUKNOWCHOICES = ((FACEBOOK,'FACEBOOK'),(INSTAGRAM,'INSTAGRAM'),(WEBSITE,'WEBSITE'),(OTHERS,'OTHERS'))

    COSMETIC = 1
    PHYSIOTHERAPY = 2
    REASONTOVISITUSCHOICES = ((COSMETIC, 'COSMETIC'),(PHYSIOTHERAPY, 'PHYSIOTHERAPY'))

    YES = 1
    NO = 2
    UPDATECHOICES = ((YES, 'YES'),(NO, 'NO'))

    FACIAL_CLEANUP_OF_BLEACH = 1
    THREADING_WAXING = 2
    OTHERS = 3
    REASONTOVISITPARLOURCHOICES = ((FACIAL_CLEANUP_OF_BLEACH, 'FACIAL_CLEANUP_OF_BLEACH'),
                                    (THREADING_WAXING, 'THREADING_WAXING'),
                                    (OTHERS,'OTHERS'))

    HYPERTENSION = 1
    DIABETS = 2
    ASTHMA = 3
    ALLERGIES = 4
    THYRIOD = 5
    KELOIDS = 6
    PSORIASIN = 7
    VITILIGO = 8
    OHERS = 9
    MEDICALHISTORYCHOICES = ((HYPERTENSION, 'HYPERTENSION'),(DIABETS, 'DIABETS'),
                             (ASTHMA, 'ASTHMA'),(ALLERGIES, 'ALLERGIES'),
                             (THYRIOD, 'THYRIOD'),(KELOIDS, 'KELOIDS'),
                             (PSORIASIN, 'PSORIASIN'),(VITILIGO, 'VITILIGO'),
                             (OHERS, 'OHERS'),
                            )

    CLEANSER = 1
    TONER = 2
    MOISTUSER= 3
    SUNSCREEN = 4
    OHERS = 5
    SKINCAREMETHODCHOICES = ((CLEANSER, 'CLEANSER'),(TONER, 'TONER'),
                             (MOISTUSER, 'MOISTUSER'),(SUNSCREEN, 'SUNSCREEN'),
                             (OHERS, 'OHERS')
                            )

    SELF_EMPLOYED = 1
    HOMEMAKER = 2
    SALARIED = 3
    OTHERS = 3
    PROFESSIONCHOICES = ((SELF_EMPLOYED,'Self Employed'),(HOMEMAKER,'Homemaker'),(SALARIED,'Salaried'),(OTHERS,'Others'))

    user = models.OneToOneField(User)
    age = models.IntegerField(null=True, blank=True)
    dob = models.DateTimeField(null=True, blank=True)
    mobile_no = models.CharField(max_length=15, null=True, blank=True)
    gender = models.IntegerField(choices=GENDERCHOICE, null=True,blank=True)
    address = models.TextField(null=True, blank=True)
    preferred_time_to_call = models.TimeField(null=True, blank=True)
    profession = models.IntegerField(choices = PROFESSIONCHOICES, null=True, blank=True)
    how_you_know = models.IntegerField(choices = HOWYOUKNOWCHOICES, null=True, blank=True)
    reason_to_visit_us = models.IntegerField(choices = REASONTOVISITUSCHOICES, null=True, blank=True)
    updates = models.IntegerField(choices = UPDATECHOICES, null=True, blank=True)
    reason_to_visit_parlour= models.IntegerField(choices = REASONTOVISITPARLOURCHOICES, null=True, blank=True)
    medical_history= models.IntegerField(choices = MEDICALHISTORYCHOICES, null=True, blank=True)
    skin_care_method= models.IntegerField(choices = SKINCAREMETHODCHOICES, null=True, blank=True)
    prescription_medicine_taken = models.TextField(null=True, blank=True)
    taken_isotrethnoier_medicine = models.NullBooleanField(default=False)
    prescribed_cream_ointment = models.TextField(null=True, blank=True)
    allergic_to_medicine = models.NullBooleanField(default=False)


    created=models.DateTimeField(auto_now_add=True)
    modified=models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '{} {} {}'.format(self.user.username, self.user.first_name, self.user.last_name)

    def get_json(self):
        result = {}
        result['id'] = self.id if self.user else None
        result['user_id'] = self.user.id if self.user else None
        result['age'] = self.age if self.age else None
        result['dob'] = self.dob if self.dob else None
        result['mobile_no'] = self.mobile_no if self.mobile_no else None
        result['gender'] = self.gender if self.gender else None
        result['address'] = self.address if self.address else None
        result['preferred_time_to_call'] = self.preferred_time_to_call if self.preferred_time_to_call else None
        result['profession'] = self.profession if self.profession else None
        result['how_you_know'] = self.how_you_know if self.how_you_know else None
        result['reason_to_visit_us'] = self.reason_to_visit_us if self.reason_to_visit_us else None
        result['updates'] = self.updates if self.updates else None
        result['reason_to_visit_parlour'] = self.reason_to_visit_parlour if self.reason_to_visit_parlour else None
        result['medical_history'] = self.medical_history if self.medical_history else None
        result['skin_care_method'] = self.skin_care_method if self.skin_care_method else None
        result['prescription_medicine_taken'] = self.prescription_medicine_taken if self.prescription_medicine_taken else None
        result['taken_isotrethnoier_medicine'] = self.taken_isotrethnoier_medicine if self.taken_isotrethnoier_medicine else None
        result['prescribed_cream_ointment'] = self.prescribed_cream_ointment if self.prescribed_cream_ointment else None
        result['allergic_to_medicine'] = self.allergic_to_medicine if self.allergic_to_medicine else None

        result['created'] = convert_date_to_epoch(selficreated) if self.created else None
        result['modified'] = convert_date_to_epoch(self.modified) if self.modified else None
        return result


class Bill(models.Model):
    MALE = 1
    FEMALE = 2
    GENDERCHOICE=((MALE,'MALE'),(FEMALE,'FEMALE'))

    CASH = 1
    CARD = 2
    NETBANKING = 3
    PAYMENTCHOICE=((CASH,'CASH'),(CARD,'CARD'),(NETBANKING,'NETBANKING'))

    customer = models.OneToOneField(Customer, null=True, blank=True, related_name='customer')
    bill_no = models.CharField(max_length=20)
    op_no = models.CharField(max_length=20, null=True, blank=True)
    token = models.CharField(max_length=20, null=True, blank=True)
    patient_name = models.CharField(max_length=500, null=True, blank=True)
    consultant = models.CharField(max_length=500, null=True, blank=True)
    amount = models.FloatField(null=True, blank=True, default=0)
    particulars = models.CharField(max_length=500, null=True, blank=True)
    qty = models.FloatField(max_length=500, null=True, blank=True)
    # patient_age = models.IntegerField(null=True, blank=True)
    # dob = models.DateTimeField(null=True, blank=True)
    # mobile_no = models.CharField(max_length=15, null=True, blank=True)
    # gender = models.IntegerField(choices=GENDERCHOICE, null=True,blank=True)
    payment_type = models.IntegerField(choices=PAYMENTCHOICE, null=True,blank=True)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return 'Bill Number: {} | Patient: {}'.format(self.bill_no, self.patient_name)

    def get_json(self):
        result = {}
        result['id'] = self.id
        result['bill_no'] = self.bill_no if self.bill_no else None
        result['op_no'] = self.op_no if self.op_no else None
        result['token'] = self.token if self.token else None
        result['amount'] = self.amount if self.amount else None
        result['patient_name'] = '{} {}'.format(self.customer.user.first_name if self.customer else '', self.customer.user.last_name if self.customer else '')
        result['consultant'] = self.consultant if self.consultant else None
        result['particulars'] = self.particulars if self.particulars else None
        # result['dob'] = convert_date_to_epoch(self.dob) if self.dob else None
        result['qty'] = self.qty if self.qty else None
        # result['patient_age'] = self.patient_age if self.patient_age else None
        result['mobile_no'] = self.customer.mobile_no if self.customer else None
        # result['gender'] = self.gender if self.gender else None
        result['payment_type'] = self.payment_type if self.payment_type else None
        result['payment_type_name'] = self.get_payment_type_display() if self.payment_type else None
        result['created'] = convert_date_to_epoch(self.created) if self.created else None
        result['modified'] = convert_date_to_epoch(self.modified) if self.modified else None
        return result


class Product(models.Model):
    name = models.CharField(max_length=100)
    image = models.FileField(upload_to=upload_product_image,null=True,blank=True)
    caption = models.TextField(null=True,blank=True)
    price = models.FloatField(null=True,blank=True, default=0)
    description = models.TextField(null=True,blank=True)
    detail = models.TextField(null=True,blank=True)
    quantity = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return 'Product Name: {}'.format(self.name)

    def get_json(self):
        result = {}
        result['id'] = self.id
        result['name'] = self.name
        result['image'] = str(self.image) if self.image else None
        result['caption'] = self.caption if self.caption else None
        result['price'] = self.price if self.price else None
        result['description'] = self.description if self.description else None
        result['detail'] = self.detail if self.detail else None
        result['quantity'] = self.quantity if self.quantity else None
        result['created'] = convert_date_to_epoch(self.created) if self.created else None
        result['modified'] = convert_date_to_epoch(self.modified) if self.modified else None
        return result
