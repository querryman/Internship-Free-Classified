from django.shortcuts import render
from django.http import HttpResponse
from .models import Listing

def listings(request):
    listings = Listing.objects.all().order_by('-created_at')
    return render(request, 'listings\listings.html', {'listings': listings})

