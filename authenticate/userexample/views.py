from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import logout
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from .models import Otp, PasswordResetConfirmation
from django.http import HttpResponse
from django.conf import settings
from django.core.mail import send_mail

# Create your views here.
def index(request):
    return render(request, 'userexample/index.html')

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
        else:
            return HttpResponse("<h1>Sorry</h1>")
    else:
        form = UserCreationForm()
        context = {
            'form' : form,
        }
        return render(request, 'registration/register.html', context)

#Update user password
def change_password(request):

    #getting user detail
    user = request.user

    # check user is authenticated and submitted form it's will not work in direct url
    if user.is_authenticated and request.method=='POST':
        oldpassword = request.POST['oldpassword']
        newpassword = request.POST['newpassword']
        confirmpassword = request.POST['confirmpassword']

        #check old password and newpassword and confirm password mathching
        if user.check_password(oldpassword) and newpassword==confirmpassword:
            u = User.objects.get(username = str(user.username))
            u.set_password(newpassword)
            u.save()
            return redirect('login')

        #if old password is valid but new and confirm password is not matching
        elif(user.check_password(oldpassword)):
            message = {
                'user': user,
                'message': "New password and Confirm Password is not same"
            }
        #old password is not valid
        else:
            message  = {
                'user' : user,
                'message' : "Your entered old password is not matching"
            }
        return render(request, 'registration/changepassword.html',{'user':message})

    # change password url
    elif user.is_authenticated:
        return render(request, 'registration/changepassword.html',{'user':user})

    # if user enter direct url go to login page
    else:
        return redirect('login')

def forget_password(request):
    return render(request,'registration/forgetpassworduser.html')

def generateotp(request):
    if request.method=="POST":
        username = request.POST['username']
        try:
            user = User.objects.get(username=username)
            try:
                otp = Otp.objects.get(username=username)
                otp.delete()
                data = Otp(username=username)
                data.save()

            except ObjectDoesNotExist:
                data = Otp(username=username)
                data.save()

        except ObjectDoesNotExist:
            context = {
                'message': "Please Enter valid username for otp",
            }
            return render(request, 'registration/forgetpassworduser.html', {'message': context})

        context = {
            'username' : username,
            'message': "Otp generated Please Enter OTP",
        }

        return render(request, 'registration/forgetpassworduser.html',{'message' :context })

    return render(request, 'registration/forgetpassworduser.html')

def verifyotp(request):
    if request.method=="POST":
        username = request.POST['username']
        try:
            user = User.objects.get(username=username)
            otp = request.POST['otp']
            username = request.POST['username']
            verify = Otp.objects.get(username = username)

            if verify.is_expired==False and int(otp)==int(verify.generatedotp):
                return render(request,'registration/newpassword.html',{'user': user})
            else:
                context = {
                    'message': "Entered OTP Does not match",
                }
                return render(request, 'registration/forgetpassworduser.html', {'message': context})

        except ObjectDoesNotExist:
            context = {
                'message': "Username Is not Valid",
            }
            return render(request, 'registration/forgetpassworduser.html', {'message': context})
    else:
        return render(request, 'registration/forgetpassworduser.html')


def forget_pass_change(request):
    if request.method == 'POST':
        username = request.POST['username']
        newpassword = request.POST['newpassword']
        confirmpassword = request.POST['confirmpassword']
        if newpassword == confirmpassword:
            u = User.objects.get(username = username)
            u.set_password(newpassword)
            u.save()
            return redirect('login')
        else:
            context = {
                'username' : request.POST['username'],
                'message' : "Your Password does not match"
            }
            return render(request,'registration/newpassword.html',{'user': context})
    else:
        return redirect('index')

def logout_user(request):
    logout(request)
    return redirect('index')


def passresetconfirm(request):
    if request.method=="POST":
        username = request.POST['username']
        try:
            user = User.objects.get(username=username)
            try:
                otp = PasswordResetConfirmation.objects.get(user=user)
                otp.delete()

            finally:
                PasswordResetConfirmation.objects.generated(user=user)

        except ObjectDoesNotExist:
            context = {
                'message': "Please Enter valid username for otp",
            }
            return render(request, 'registration/forgetpassworduser.html', {'message': context})

        context = {
            'username' : username,
            'message': "Otp generated Please Enter OTP",
        }

        return render(request, 'registration/forgetpassworduser.html',{'message' :context })

    return render(request,'registration/forgetpassworduser.html')

def verifynewotp(request):
    if request.method=="POST":
        otp = request.POST['otp']
        try:
            verify = PasswordResetConfirmation.objects.get(code = otp)
            if verify and verify.is_expired==False:
                user = verify.user
                verify.delete()
                return render(request,'registration/newpassword.html',{'user': user})
            else:
                context = {
                    'message': "Otp time is expired",
                }
                return render(request, 'registration/forgetpassworduser.html', {'message': context})

        except ObjectDoesNotExist:
                context = {
                    'message': "Entered OTP Does not match",
                }
                return render(request, 'registration/forgetpassworduser.html', {'message': context})
    else:
        return render(request, 'registration/forgetpassworduser.html')
