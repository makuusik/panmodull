import json
import os

def add_short_info_to_arrays(input_filename, output_filename):
    # Отримуємо шлях до вхідного файлу в тій самій папці, що й скрипт
    input_filepath = os.path.join(os.path.dirname(__file__), input_filename)
    output_filepath = os.path.join(os.path.dirname(__file__), output_filename)
    
    try:
        # Завантажуємо JSON
        with open(input_filepath, 'r', encoding='utf-8') as file:
            data = json.load(file)
        
        # Перевіряємо, чи основний об'єкт є масивом
        if isinstance(data, list):
            for item in data:
                if isinstance(item, dict):  # Переконуємось, що це словник
                    item['short-info'] = ""  # Додаємо ключ з пустим значенням
        
        # Записуємо зміни у новий файл
        with open(output_filepath, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
        
        print("Оновлення завершено! Файл збережено як", output_filename)
    except Exception as e:
        print(f"Помилка: {e}")

# Виклик функції з назвами вхідного та вихідного файлу
add_short_info_to_arrays('modular_houses_data_sorted.json', 'updated_data.json')
