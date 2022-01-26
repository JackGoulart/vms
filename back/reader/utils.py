import filetype
import pandas as pd


def check_type_file(file):
    """
    Funcão para verificar tipo do arquivo
    :param file:
    :return: png, pdf ...
    """
    return filetype.guess_extension(file)


def read_csv_file(file):
    """
     Funcão de leitura do arquivo csv que vem na requisicão Com auxilo do pandas.
     Retorna duas lista, uma lista de dicionário com as linhas ok do csv
     ao qual será persistido na tabela CsvRows e um lista com as linhas que falta alguma coluna ao qual ser
    :param file:
    :return: [[{}],[]]
    """
    reader_df = pd.read_csv(file)
    headers = reader_df.columns.values
    reader_df[headers[-1]] = pd.to_datetime(reader_df[headers[-1]], format='%Y-%m-%d', errors='raise')
    missing_values = reader_df[reader_df.isna().any(axis=1)]
    reader_df = reader_df.dropna()
    clean_data = [{'asset_hostname': row[0],
                   'asset_ip_address': row[1],
                   'vulnerability_title': row[2],
                   'vulnerability_severity': row[3],
                   'vulnerability_cvss': row[4],
                   'publication_date': row[5]} for _, row in reader_df.iterrows()]
    return [clean_data, missing_values]


