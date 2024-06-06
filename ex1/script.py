import json
import re

# Função para detectar e converter listas em strings para listas reais
def fix_list_string(value):
    if isinstance(value, str) and re.match(r'^\s*\[.*\]\s*$', value):
        try:
            # Remover espaços após colchetes
            value = re.sub(r'\s*(\{|\[|\]|\})\s*', r'\1', value)
            # Converter a string para lista
            return json.loads(value.replace("'", '"'))
        except json.JSONDecodeError:
            return value  # Se falhar, retornar valor original
    return value

# Função para converter string de autores separados por vírgulas em uma lista
def fix_author_string(author):
    if isinstance(author, str):
        # Dividir a string em uma lista, removendo espaços ao redor dos nomes
        return [name.strip() for name in author.split(',')]
    return author

# Função para percorrer recursivamente o JSON e corrigir listas em strings e campo 'author'
def fix_json(data):
    if isinstance(data, dict):
        # Verificar e renomear o campo bookId para _id
        if 'bookId' in data:
            data['_id'] = data.pop('bookId')
        # Corrigir o campo 'author'
        data = {key: fix_json(fix_author_string(fix_list_string(value))) if key == 'author' else fix_json(fix_list_string(value)) for key, value in data.items()}
    elif isinstance(data, list):
        data = [fix_json(item) for item in data]
    return data

# Carregar o JSON do arquivo
with open('livros.json', 'r', encoding='utf-8') as f:
    json_data = json.load(f)

# Corrigir o JSON
fixed_json_data = fix_json(json_data)

# Salvar o JSON corrigido em um novo arquivo
with open('saida.json', 'w', encoding='utf-8') as f:
    json.dump(fixed_json_data, f, indent=4, ensure_ascii=False)

print("JSON corrigido e salvo em 'saida.json'.")
