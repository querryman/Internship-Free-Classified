from rest_framework import serializers
from .models import Listing, JobListing, ServiceListing, ProductListing

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = '__all__'


# Detail Serializers
class JobListingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = '__all__'

class ServiceListingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceListing
        fields = '__all__'

class ProductListingDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductListing
        fields = '__all__'
