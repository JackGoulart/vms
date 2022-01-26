from django.db import models
from django.utils import timezone
from user.models import User


class CsvFile(models.Model):
    """
      Modelo para registrar a referencia do arquivo e data que foi importado
    """
    name = models.CharField(max_length=50)
    write = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.name} - {self.write}'


class CsvRows(models.Model):
    """
      Modelo que registrar as linhas do csv
    """
    csv_file = models.ForeignKey(CsvFile, related_name='csv_rows', on_delete=models.CASCADE)
    asset_hostname = models.CharField(max_length=50)
    asset_ip_address = models.CharField(max_length=20)
    vulnerability_title = models.CharField(max_length=120)
    vulnerability_severity = models.CharField(max_length=20)
    vulnerability_cvss = models.FloatField()
    publication_date = models.DateField()
    fix = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.csv_file} - {self.publication_date} - {self.asset_hostname} - {self.asset_ip_address} -' \
               f' {self.vulnerability_title} - {self.vulnerability_severity}  - {self.vulnerability_cvss} ' \
               f' - {self.publication_date}'

    class Meta:
        ordering = ['-publication_date', 'vulnerability_cvss']


class CsvLog(models.Model):
    """
      Modelo para persistir os logs
    """
    LOG_TYPE_CHOICES = (('import_ok', 'Import_ok'),
                        ('status_host','Status_host'),
                        ('import_error', 'Import_error'))
    log_type = models.CharField(
        max_length=20, choices=LOG_TYPE_CHOICES, default='import_ok')
    log_datetime = models.DateTimeField(default=timezone.now)
    log_who = models.ForeignKey(User, related_name='log_who', on_delete=models.SET_NULL, null=True)
    log_description = models.TextField()

    def __str__(self):
        return f'{self.log_type} - {self.log_datetime} - {self.log_who} - {self.log_description}'