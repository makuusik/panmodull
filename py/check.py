import json

# Завантаження JSON-файлу
with open("modular_houses_data_sorted.json", "r", encoding="utf-8") as file:
    saved_data = json.load(file)

# Видалення ключа "details" у кожному елементі
for item in saved_data:
    item.pop("details", None)  # None запобігає помилкам, якщо ключа немає
    
    # # Видалення елементів 0-3 та 5 у "descriptions"
    # if "descriptions" in item and isinstance(item["descriptions"], list):
    #     item["descriptions"] = [desc for i, desc in enumerate(item["descriptions"]) if i not in {0, 1, 2, 3, 5}]

# Збереження оновленого JSON у файл
with open("modular_houses_data_cleaned.json", "w", encoding="utf-8") as file:
    json.dump(saved_data, file, ensure_ascii=False, indent=4)

print("✅ Всі ключі 'details' та вказані елементи 'descriptions' успішно видалені та дані збережені у modular_houses_data_cleaned.json")
