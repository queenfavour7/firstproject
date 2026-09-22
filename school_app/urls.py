from django.urls import path
from .import views

urlpatterns = [
    path('', views.display, name='home'),
    path("db/",views.db_display,name="db")
]
