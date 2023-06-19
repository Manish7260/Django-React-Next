from functools import wraps
from django.contrib import messages
from django.shortcuts import redirect, render
from django.http import HttpResponse


def passenger_test_function(user):
    if user.is_passenger:
        return True
    else:
        return False


def driver_test_function(user):
    if user.is_driver:
        return True
    else:
        return False


def passenger_access_only():
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not passenger_test_function(request.user):
                return render(request, 'driver.html')
            return view(request, *args, **kwargs)

        return _wrapped_view

    return decorator


def driver_access_only():
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not driver_test_function(request.user):
                return render(request, 'loginPage.html')
            return view(request, *args, **kwargs)

        return _wrapped_view

    return decorator
