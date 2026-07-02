from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('add-to-cart/', views.add_to_cart, name='add_to_cart'),
    path('get-cart/<int:member_id>/', views.get_cart, name='get_cart'),
]