from django.urls import path
from .api_views import ListingListAPIView, ListingDetailAPIView

urlpatterns = [
    path('', ListingListAPIView.as_view(), name='listings-list'),
    path('<int:pk>/', ListingDetailAPIView.as_view(), name='listings-detail'),
]
