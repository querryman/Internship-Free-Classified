from django.urls import path
from .api_views import ListingList, ListingDetail

urlpatterns = [
    path('', ListingList.as_view(), name='listings-list'),
    path('<int:pk>/', ListingDetail.as_view(), name='listings-detail'),
]
