import deepl
from bs4 import BeautifulSoup
import re

# Ваш API-ключ DeepL
DEEPL_API_KEY = "f71406f3-bdc5-413f-bb57-79140bc32536:fx"

# Ініціалізація Translator
translator = deepl.Translator(DEEPL_API_KEY)

# Функція для перекладу тексту
def translate_text(text):
    try:
        result = translator.translate_text(text, target_lang="EN-US")  # або іншу мову
        return result.text  # Отримуємо чистий текст з результату
    except deepl.exceptions.AuthorizationException:
        print("❌ Невірний API-ключ або проблеми з підключенням.")
        return text

# Завантаження HTML файлу
with open('faq.html', 'r', encoding='utf-8') as file:
    html_content = file.read()

# Використовуємо BeautifulSoup для парсингу HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Знаходимо всі текстові елементи (наприклад, p, h1, h2, h3, li тощо)
texts_to_translate = soup.find_all(string=True)

# Переклад всіх текстових елементів
for element in texts_to_translate:
    if element.strip():  # Перекладаємо лише не порожні елементи
        translated = translate_text(element)
        element.replace_with(translated)  # Заміняємо старий текст на перекладений

# Збереження результату в новий HTML файл
with open('faq_en.html', 'w', encoding='utf-8') as file:
    file.write(str(soup))

print("✅ Переклад завершено! Збережено у translated_file.html")
