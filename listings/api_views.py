from rest_framework import generics, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .pagination import CustomPagination
from .models import Listing
from .serializers import (
    ListingSerializer,
    JobListingDetailSerializer,
    ServiceListingDetailSerializer,
    ProductListingDetailSerializer
)

class ListingList(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-created_at')
    serializer_class = ListingSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    filterset_fields = ['location', 'price', 'listing_type'] 
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'price']
    pagination_class = CustomPagination

class ListingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
    
    def get(self, request, *args, **kwargs):
        listing = self.get_object()
        
        if hasattr(listing, 'joblisting'):
            serializer = JobListingDetailSerializer(listing.joblisting)
        elif hasattr(listing, 'servicelisting'):
            serializer = ServiceListingDetailSerializer(listing.servicelisting)
        elif hasattr(listing, 'productlisting'):
            serializer = ProductListingDetailSerializer(listing.productlisting)
        else:
            serializer = ListingSerializer(listing)

        return Response(serializer.data)
