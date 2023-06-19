from django.shortcuts import render
from .decorators import (driver_access_only, passenger_access_only)

# Create your views here.
@driver_access_only()
def driver(request):
    return render(request, 'driver.html')


@passenger_access_only()
def passenger(request):
    return render(request, 'passenger.html')
@driver_access_only()
def ride(request):
    return render(request, 'ride.html')