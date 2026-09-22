from django.shortcuts import render
from .models import Post
from django.http.response import JsonResponse

# Create your views here.

def display(request):
    return render(request,"index.html")

def db_display(request):
    Posts = Post.objects.all()
    return render(request,"db.dsp.html",{"Posts":Posts})