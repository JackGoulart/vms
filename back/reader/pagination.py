from rest_framework import pagination
from rest_framework.response import Response


class PageNumberPagination(pagination.PageNumberPagination):
    """
        Paginacao customizada retornando a query passada de acordo
        com a configuracao do page_size.
        Tambem retornara os links para navegacao proximao e anterior,
        quantide de resultados da query, numero da pagina atual e
        quantidades de pagina geradas.
    """
    page_size_query_param = "page_size"

    def get_paginated_response(self, data):
        return Response({
            "links": {
                "next": self.get_next_link(),
                "previous": self.get_previous_link()
            },
            "count": self.page.paginator.count,
            "pageCount": self.page.paginator.num_pages,
            "pageNumber": self.page.number,
            "pageSize": self.page.paginator.per_page,
            "results": data,
        })
