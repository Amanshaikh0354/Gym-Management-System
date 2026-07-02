from django.contrib import admin
from .models import Member, Product, CartItem, BlogPost

class MemberAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'mobile')
    search_fields = ['name', 'email']

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'price')
    list_filter = ('category',)
    search_fields = ['name']

class CartItemAdmin(admin.ModelAdmin):
    list_display = ('member', 'product', 'quantity')
    list_filter = ('member', 'product')

class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'author', 'date_posted')
    list_filter = ('author', 'date_posted')
    search_fields = ['title', 'content']

admin.site.register(Member, MemberAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(CartItem, CartItemAdmin)
admin.site.register(BlogPost, BlogPostAdmin)