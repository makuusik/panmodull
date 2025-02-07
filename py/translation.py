import json
from deep_translator import GoogleTranslator
from tqdm import tqdm

translator = GoogleTranslator(source="uk", target="pl")

def translate_batch_texts(texts):
    """Перекладає список текстів через GoogleTranslator batch."""
    clean_texts = [text if text.strip() else "" for text in texts]  # Уникнення пустих рядків
    try:
        return translator.translate_batch(clean_texts)
    except Exception as e:
        print(f"❌ Помилка перекладу: {e}")
        return texts  # Якщо помилка, повертаємо оригінал

# Завантаження JSON
with open("modular_houses_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Переклад заголовків
titles = [entry["title"] for entry in data]
descriptions = [desc for entry in data for desc in entry["descriptions"]]
details = [detail for entry in data for section in entry["details"] for detail in section]

print("🔄 Переклад заголовків...")
translated_titles = translate_batch_texts(list(tqdm(titles, desc="📌 Заголовки")))

print("🔄 Переклад описів...")
translated_descriptions = translate_batch_texts(list(tqdm(descriptions, desc="📜 Опис")))

print("🔄 Переклад деталей...")
translated_details = translate_batch_texts(list(tqdm(details, desc="📋 Деталі")))

# Запис назад у структуру JSON
desc_index = 0
detail_index = 0
for i, entry in enumerate(data):
    entry["title"] = translated_titles[i]
    entry["descriptions"] = translated_descriptions[desc_index:desc_index + len(entry["descriptions"])]
    desc_index += len(entry["descriptions"])

    for j in range(len(entry["details"])):
        length = len(entry["details"][j])
        entry["details"][j] = translated_details[detail_index:detail_index + length]
        detail_index += length

# Збереження результату
with open("modular_houses_data_pl.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4, ensure_ascii=False)

print("✅ Переклад завершено! Збережено у modular_houses_data_pl.json")
