import json

# Завантаження JSON-файлу
with open("modular_houses_data_pl.json", "r", encoding="utf-8") as file:
    saved_data = json.load(file)

# Сортування списку за ключем "index"
saved_data.sort(key=lambda x: x["index"])

# Отримання всіх індексів з файлу
extracted_indices = {item["index"] for item in saved_data}

# Пошук відсутніх індексів у діапазоні 7-46
missing_indices = [i for i in range(7, 47) if i not in extracted_indices]

# Вивід результату
if missing_indices:
    print(f"⛔️ Відсутні індекси: {missing_indices}")
else:
    print("✅ Усі індекси 7-46 присутні у JSON файлі.")

# Збереження відсортованого списку назад у файл
with open("modular_houses_data_sorted.json", "w", encoding="utf-8") as file:
    json.dump(saved_data, file, ensure_ascii=False, indent=4)
