from rest_framework import generics
from .models import Listing
from .serializers import ListingSerializer

class ListingListAPIView(generics.ListCreateAPIView):
    queryset = Listing.objects.all().order_by('-created_at')
    serializer_class = ListingSerializer

class ListingDetailAPIView(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
