"""
  Urls referente ao app reader
"""
from django.urls import path, include
from reader.views import  UploadViewSet, CsvRowViewSet, CsvFileView, StatisticsView
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'upload-csv', UploadViewSet, basename='upload-csv')
router.register(r'csv-file', CsvFileView, basename='csv-file')
router.register(r'csv-row', CsvRowViewSet, basename='csv-row')
router.register(r'statistics', StatisticsView, basename='statistics')
urlpatterns = router.urls

urlpatterns = [
    path("", include(urlpatterns)),
]