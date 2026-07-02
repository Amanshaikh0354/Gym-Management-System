from django.shortcuts import render
from django.http import JsonResponse
from .models import Member, Product, CartItem, BlogPost
from django.views.decorators.csrf import csrf_exempt
import json

def home(request):
    products = Product.objects.all()
    blog_posts = BlogPost.objects.all().order_by('-date_posted')[:3]
    return render(request, 'main/index.html', {'products': products, 'blog_posts': blog_posts})

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        member = Member.objects.create(
            name=data['name'],
            email=data['email'],
            password=data['password'],  # In a real-world scenario, hash the password
            mobile=data['mobile']
        )
        return JsonResponse({'success': True})
    return JsonResponse({'success': False})

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        try:
            member = Member.objects.get(email=data['email'], password=data['password'])
            return JsonResponse({'success': True})
        except Member.DoesNotExist:
            return JsonResponse({'success': False})
    return JsonResponse({'success': False})

@csrf_exempt
def add_to_cart(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        member = Member.objects.get(id=data['member_id'])
        product = Product.objects.get(id=data['product_id'])
        cart_item, created = CartItem.objects.get_or_create(member=member, product=product)
        if not created:
            cart_item.quantity += 1
            cart_item.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False})

def get_cart(request, member_id):
    cart_items = CartItem.objects.filter(member_id=member_id)
    cart_data = [{'name': item.product.name, 'price': float(item.product.price), 'quantity': item.quantity} for item in cart_items]
    return JsonResponse({'cart': cart_data})