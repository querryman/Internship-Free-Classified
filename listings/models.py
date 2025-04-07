from django.db import models
from django.contrib.auth.models import User

class Listing(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    location = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class JobListing(Listing):
    company = models.CharField(max_length=255)
    salary_range = models.CharField(max_length=100)

class ServiceListing(Listing):
    service_hours = models.CharField(max_length=100)
    rate_per_hour = models.DecimalField(max_digits=6, decimal_places=2)

class ProductListing(Listing):
    brand = models.CharField(max_length=100)
    warranty_period = models.IntegerField()
