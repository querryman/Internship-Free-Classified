# listings/pagination.py
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class CustomPagination(PageNumberPagination):
    page_size = 10  # Default items per page
    page_size_query_param = 'page_size'  # Allow client to override page size
    max_page_size = 100  # Max items per page

    def get_paginated_response(self, data):
        return Response({
            'pagination': {
                'total_count': self.page.paginator.count,
                'total_pages': self.page.paginator.num_pages,
                'current_page': self.page.number,
                'next_page': self.page.next_page_number() if self.page.has_next() else None,
                'previous_page': self.page.previous_page_number() if self.page.has_previous() else None
            },
            'data': data
        })
