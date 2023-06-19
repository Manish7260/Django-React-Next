from django.shortcuts import render,redirect
from .models import Employee


def insert_emp(request):
    if request.method=='POST':

        EmpId = request.POST['EmpId']
        EmpName = request.POST['EmpName']
        EmpGender = request.POST['EmpGender']
        EmpEmail = request.POST['EmpEmail']
        EmpDesignation = request.POST['EmpDesignation']
        data = Employee(empid=EmpId, empname=EmpName, empgender=EmpGender, empemail=EmpEmail, empdesignation=EmpDesignation)
        data.save()
        return redirect('show/')

    else:
        return render(request,'insert.html')

def show_emp(request):
    employees = Employee.objects.all()
    return render(request, 'show.html',{'employees':employees})

def edit_emp(request):
    print("edit")

def remove_emp(request):
    print("Remove")

