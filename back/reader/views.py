from rest_framework import status, viewsets, filters, mixins, exceptions
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from user.authentication import JWTAuthentication
from .serializers import CsvUploadSerializer, CsvFileSerializer, CsvRowsSerializer
from .models import CsvRows, CsvFile
from .pagination import PageNumberPagination
from django_auto_prefetching import AutoPrefetchViewSetMixin
from django_filters.rest_framework import DjangoFilterBackend


class UploadViewSet(viewsets.ViewSet):
    """
     Endpoint destinado para o upload do arquivo csv
    """
    authentication_classes = [JWTAuthentication]
    allowed_methods = ['post']
    serializer_class = CsvUploadSerializer

    def create(self, request):
        """
        Action que corresponde ao metodo http post.
        :param request:
        :return:
        """
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['csv']
        serializer.save()
        return Response({"status": "o arquivo foi importado com sucesso"}, status.HTTP_201_CREATED)


class CsvFileView(AutoPrefetchViewSetMixin,
                  mixins.ListModelMixin,
                  viewsets.GenericViewSet):
    """
      Endpoint destinado para listagem dos arquivos csv importados.
      Podendo fazer buscas, aplicar filtros e ordenacao.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    allowed_methods = ['get']
    queryset = CsvFile.objects.all()
    serializer_class = CsvFileSerializer
    pagination_class = PageNumberPagination
    filter_backends = [filters.SearchFilter, DjangoFilterBackend, filters.OrderingFilter]
    ordering_fields = '__all__'
    filterset_fields = ['name', 'write']
    search_fields = ['name']

    def list(self, request):
        """
            Action que corresponde ao metodo http get.
            Lista as referencias dos arquivos csv salvos
            :param request:
            :return: csv
        """
        queryset = CsvFile.objects.all()
        serializer = CsvFileSerializer(queryset, context={"request": request}, many=True)
        return Response(serializer.data)


class CsvRowViewSet(AutoPrefetchViewSetMixin, mixins.ListModelMixin,
                    mixins.RetrieveModelMixin, mixins.UpdateModelMixin,
                    viewsets.GenericViewSet):
    """
      Endpoint destinado para listagem e update do status de corrigido das linhas
      contidas no arquivo csv.
      Podendo fazer buscas, aplicar filtros e ordenação.
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    allowed_methods = ['get', 'patch']
    queryset = CsvRows.objects.all()
    serializer_class = CsvRowsSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter, DjangoFilterBackend]
    filterset_fields = ['vulnerability_cvss', 'publication_date', 'fix']
    ordering_fields = ['vulnerability_cvss', 'publication_date']
    search_fields = ['asset_hostname', 'asset_ip_address',
                     'publication_date', 'vulnerability_cvss',
                     'vulnerability_severity', 'vulnerability_title']


class StatisticsView(viewsets.ViewSet):
    """
         Endpoint destinado para geração da media de risco do ambiente .
    """
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    allowed_methods = ['get']

    def list(self, request):
        """
            Action que corresponde ao metodo http get.
            :param request:
            :return: media de risco do ambiente
        """

        total = CsvRows.objects.values_list("vulnerability_cvss", flat=True)
        fixed = CsvRows.objects.filter(fix=False).values_list("vulnerability_cvss", flat=True)
        not_fixed = CsvRows.objects.filter(fix=False).values_list("vulnerability_cvss", flat=True)
        if total:
            risk = (len(not_fixed) / len(total)) * 100
            confiability = (100 - risk)
            return Response({"risk": round(risk,1), "confiability": round(confiability,1)})
        return Response({"risk": 0, "confiability": 0})