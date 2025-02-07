import json

# Завантаження JSON-файлу
with open("modular_houses_data.json", "r", encoding="utf-8") as file:
    saved_data = json.load(file)

# Отримання всіх індексів з файлу
extracted_indices = {item["index"] for item in saved_data}

# Пошук відсутніх індексів
missing_indices = [i for i in range(7, 47) if i not in extracted_indices]

# Вивід результату
if missing_indices:
    print(f"⛔️ Відсутні індекси: {missing_indices}")
else:
    print("✅ Усі індекси 7-46 присутні у JSON файлі.")
