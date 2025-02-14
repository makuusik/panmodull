import json
import time
from deepl import Translator
from tqdm import tqdm

# Вставте ваш API-ключ DeepL тут
DEEPL_API_KEY = "f71406f3-bdc5-413f-bb57-79140bc32536:fx"

translator = Translator(DEEPL_API_KEY)

def translate_batch_texts(texts, source_lang="PL", target_lang="EN-US"):
    """Перекладає список текстів через DeepL API."""
    translated_texts = []
    
    for text in tqdm(texts, desc="🔄 Переклад"):
        if not text.strip():
            translated_texts.append("")  # Пропускаємо пусті рядки
            continue
        
        try:
            translation = translator.translate_text(text, source_lang=source_lang, target_lang=target_lang)
            translated_texts.append(translation.text)
            time.sleep(0.2)  # Запобігання перевищенню ліміту запитів
        except Exception as e:
            print(f"❌ Помилка перекладу: {e}")
            translated_texts.append(text)  # Якщо помилка, повертаємо оригінал

    return translated_texts

# Завантаження JSON
with open("updated_data.json", "r", encoding="utf-8") as file:
    data = json.load(file)

# Переклад заголовків та описів
titles = [entry["title"] for entry in data]
shortinfo = [entry["short-info"] for entry in data]
descriptions = [desc for entry in data for desc in entry["descriptions"]]

print("📌 Переклад заголовків...")
translated_titles = translate_batch_texts(titles)

print("📜 Переклад описів...")
translated_descriptions = translate_batch_texts(descriptions)
print("📜 Переклад которкої інформації...")
translated_shortinfo = translate_batch_texts(shortinfo)

# Запис назад у структуру JSON
desc_index = 0
for i, entry in enumerate(data):
    entry["title"] = translated_titles[i]
    entry["descriptions"] = translated_descriptions[desc_index:desc_index + len(entry["descriptions"])]
    desc_index += len(entry["descriptions"])
    entry["short-info"] = translated_shortinfo[i]

# Збереження результату
with open("updated_data_en.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4, ensure_ascii=False)

print("✅ Переклад завершено! Збережено у updated_data_en.json")
