from django.db import transaction
from rest_framework import serializers
from .models import CsvFile, CsvRows, CsvLog
from .utils import check_type_file, read_csv_file


class CsvUploadSerializer(serializers.Serializer):
    """
      Serializer que trata upload do arquivo csv.
    """
    csv = serializers.FileField(max_length=None, allow_empty_file=False)

    def validate(self, validated_data):
        """
         Reescrita do metodo validate utilizando as funcoes auxiliares utils
        :param validated_data:
        :return: validated_data
        """
        file_type = check_type_file(validated_data['csv'])
        if not str(validated_data['csv']).split('.')[-1] == 'csv' or file_type is not None:
            raise serializers.ValidationError({'non_field_erros': f'o arquivo não é csv. {file_type}'})
        return validated_data

    def create(self, validated_data):
        """
        Visto que o arquivo nao salvo em disco.
        Reescrita do metodo create para salvar os dados do csv em CsvRows e registrar logs.
        :param validated_data:
        :return:
        """
        file_name = str(validated_data['csv']).split('.')[0]
        read_csv = read_csv_file(validated_data['csv'])
        user = self.context.get('request').user
        with transaction.atomic():
            try:
                csv_file = CsvFile(name=file_name)
                csv_file.save()

                [CsvRows(csv_file=csv_file, **row).save() for row in read_csv[0]]

                CsvLog(log_type='import_ok',
                       log_who=user,
                       log_description={'file_name': file_name}).save()

                CsvLog(log_type='import_error',
                       log_who=user,
                       log_description={'file_name': file_name, 'row': read_csv[1].values.tolist()}).save()
            except Exception as e:
                CsvLog(log_type='import_error',
                       log_who=user,
                       log_description={'file_name': file_name, 'SystemError': e}).save()
                raise serializers.ValidationError(
                    {'SystemError': 'o arquivo csv parece não ser compatível com o importador'})
        return validated_data


class CsvRowsSerializer(serializers.ModelSerializer):
    """
      Serializer que manipula as linhas do CSVRows para leitura e update.
    """
    class Meta:
        model = CsvRows
        fields = "__all__"
        read_only_fields = [
            'asset_hostname', 'asset_ip_address',
            'vulnerability_title', 'vulnerability_severity',
            'vulnerability_cvss', 'publication_date']


class CsvFileSerializer(serializers.ModelSerializer):
    """
      Serializer que manipula leitura e escrita da referencia do arquivo.
    """
    class Meta:
        model = CsvFile
        fields = ["id", "name", "write"]
