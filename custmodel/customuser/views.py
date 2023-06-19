from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth import authenticate,login, logout
from .forms import UserCreationForm
from .decorators import (saler_access_only, buyer_access_only)
from .models import CustomUser
from django.conf import settings
from django.core.mail import send_mail
from django.template import RequestContext

# Create your views here.
def index(request):
    return render(request, 'userexample/index.html')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        email = request.POST["email"]
        if form.is_valid():
            form.save()
            subject = 'Welcome to logistics'
            message = f"hi {email}, thank you for connecting with logistic infotech"
            email_from = settings.EMAIL_HOST_USER
            mail = [email,]
            send_mail(subject, message, email_from, mail)
            return HttpResponse("<h1>Welcome Username</h1>")
    else:
        form = UserCreationForm()
        context = {
            'form': form,
        }
        return render(request, 'registration/register.html', context)

def logout_user(request):
    logout(request)
    return redirect('index')

def saler_login(request):
    if request.method=='POST':
        email = request.POST['username']
        password = request.POST['password']
        user = authenticate(email = email, password=password)
        if user is not None:
            login(request, user)
            return redirect('saler-view')
        else:
            return HttpResponse("<h1>Please Enter valid login detail</h1>")
    else:
        return render(request, 'registration/salerlogin.html')

def buyer_login(request):
    if request.method == 'POST':
        email = request.POST['username']
        password = request.POST['password']
        user = authenticate(email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('buyer-view')
        else:
            return HttpResponse("<h1>Please Enter valid login detail</h1>")
    else:
        return render(request, 'registration/buyerlogin.html')

@saler_access_only()
def saler_view(request, *args, **kwargs):
    return HttpResponse("<h1>Hello this is saler page.</h1>")

@buyer_access_only()
def buyer_view(request, *args, **kwargs):
    return HttpResponse("<h1>Hello this is buyer page.</h1>")