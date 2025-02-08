import json

# Завантаження JSON-файлу
with open("modular_houses_data_pl.json", "r", encoding="utf-8") as file:
    saved_data = json.load(file)

# Перебір всіх елементів в головному масиві та видалення ключа 'images', якщо він існує
for item in saved_data:
    if isinstance(item, dict) and "images" in item:
        del item["images"]

# Отримання всіх індексів з файлу
extracted_indices = {item["index"] for item in saved_data}

# Пошук відсутніх індексів
missing_indices = [i for i in range(7, 47) if i not in extracted_indices]

# Вивід результату
if missing_indices:
    print(f"⛔️ Відсутні індекси: {missing_indices}")
else:
    print("✅ Усі індекси 7-46 присутні у JSON файлі.")

# За бажанням, можна зберегти зміни назад в файл
with open("modular_houses_data_pl_noimg.json", "w", encoding="utf-8") as file:
    json.dump(saved_data, file, ensure_ascii=False, indent=4)
