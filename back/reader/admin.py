from django.contrib import admin
from .models import CsvRows, CsvFile, CsvLog


class CsvRowAdmin(admin.ModelAdmin):
    list_display = ['csv_file',  'asset_hostname','asset_ip_address',
            'vulnerability_title', 'vulnerability_severity',
            'vulnerability_cvss', 'publication_date','fix']


class CsvFileAdmin(admin.ModelAdmin):
    model = CsvFile
    list_display = ['id', 'name', 'write']


class CsvLogAdmin(admin.ModelAdmin):
    model = CsvLog
    list_display =  ('id', 'log_type', 'log_datetime', 'log_who',  'log_description')

    def has_add_permission(self, request):
        return False


admin.site.register(CsvFile, CsvFileAdmin)
admin.site.register(CsvRows, CsvRowAdmin)
admin.site.register(CsvLog, CsvLogAdmin)