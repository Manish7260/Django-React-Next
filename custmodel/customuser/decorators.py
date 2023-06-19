from functools import wraps
from django.contrib import messages
from django.shortcuts import redirect,render
from django.http import HttpResponse

def saler_test_function(user):
    if user.is_saler:
        return True
    else:
        return False

def buyer_test_function(user):
    if user.is_buyer:
        return True
    else:
        return False

def saler_access_only():
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not saler_test_function(request.user):
                context = {
                    'message' : 'You are not a saller and you are not allowed to access this page'
                }
                return render(request,'registration/salerlogin.html',{'user' : context})
            return view(request, *args, **kwargs)
        return _wrapped_view
    return decorator

def buyer_access_only():
    def decorator(view):
        @wraps(view)
        def _wrapped_view(request, *args, **kwargs):
            if not buyer_test_function(request.user):
                context = {
                    'message': 'You are not a buyer and you are not allowed to access this page'
                }
                return render(request, 'registration/buyerlogin.html', {'user': context})
            return view(request, *args, **kwargs)
        return _wrapped_view
    return decorator

# user
# scoreboard -
# url