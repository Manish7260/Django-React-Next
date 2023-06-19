from django.shortcuts import render
from django.http import HttpResponse
from .forms import UserCreationForm
# Create your views here.
def index(request):
    return HttpResponse("<h1>Welcome</h1>")

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return HttpResponse("<h1>User Registered Successfully</h1>")
    else:
        form = UserCreationForm()
        context = {
            'form': form,
        }
        return render(request, 'registration/register.html', context)
