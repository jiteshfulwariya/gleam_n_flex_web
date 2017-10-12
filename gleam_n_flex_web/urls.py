"""gleam_n_flex_web URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from .views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),

    url(r'^$', loginIndex),
    url(r'^adminDashboard/$', adminDashboard),
    url(r'^customerDashboard/$', customerDashboard),
    url(r'^login/view/$', login_view),
    url(r'^add/bill/$', add_bill),
    url(r'^add/product/$', add_product),
    url(r'^get/all/bill/$', get_all_bill),
    url(r'^get/all/product/$', get_all_product),
    url(r'^get/bill/details/$', get_bill_details),
    url(r'^get/product/$', get_product_details),
]
