from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Employee
# Create your views here.
def home(request):
    if request.method == 'POST':
        EmpName = request.POST['EmpName']
        EmpAge = request.POST['EmpAge']
        EmpJoining = request.POST['EmpJoining']
        EmpDesignation = request.POST['EmpDesignation']
        #EmpDuration = request.POST['EmpDuration']
        EmpEmail = request.POST['EmpEmail']
        EmpProfile = request.POST['EmpProfile']
        #EmpProfile2 = request.POST['EmpProfile2']
        EmpAddress = request.POST['EmpAddress']
        data = Employee(EmpName=EmpName, EmpAge=EmpAge, EmpJoining=EmpJoining, EmpDesignation= EmpDesignation,
                        EmpEmail=EmpEmail, EmpProfile=EmpProfile, EmpAddress= EmpAddress)
        data.save()
        return HttpResponse('<a href="/practice"><----------Go to insert page</a>')
    return render(request,'practicehome.html')