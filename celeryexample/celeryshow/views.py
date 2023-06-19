from django.shortcuts import render
from django.http import HttpResponse
from .task import *
# Create your views here.
def index(request):
    sleepy.delay(30)
    return HttpResponse("<h1>Hello, from Manish </h3>")