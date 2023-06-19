from django.shortcuts import render, redirect
#from django.http import HttpResponse
from .models import Student
# Create your views here.

def insert_result(request):
    if request.method == 'POST':
        FirstName = request.POST['FirstName']
        LastName = request.POST['LastName']
        Sub1 = request.POST['Sub1']
        Sub2 = request.POST['Sub2']
        Sub3 = request.POST['Sub3']
        Sub4 = request.POST['Sub4']
        Sub5 = request.POST['Sub5']
        data = Student(FirstName=FirstName, LastName=LastName, Sub1=Sub1, Sub2=Sub2, Sub3=Sub3, Sub4=Sub4, Sub5=Sub5)
        data.save()
        return redirect('/show')
    return render(request,'insert.html')

def show_result(request):
    students = Student.objects.all()
    return render(request, 'show.html', {'students': students})

def edit_result(request,pk):
    students = Student.objects.get(id=pk)
    if request.method=='POST':
        students.FirstName = request.POST['FirstName']
        students.LastName = request.POST['LastName']
        students.Sub1 = request.POST['Sub1']
        students.Sub2 = request.POST['Sub2']
        students.Sub3 = request.POST['Sub3']
        students.Sub4 = request.POST['Sub4']
        students.Sub5 = request.POST['Sub5']
        students.save()
        return redirect('/show')
    context = {
        'students' : students,
    }
    return render(request,'edit.html',context)

def delete_result(request,pk):
    students = Student.objects.get(id=pk)
    students.delete()
    return redirect('/show')