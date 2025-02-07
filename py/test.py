import requests
from bs4 import BeautifulSoup
import json
import cloudscraper
import re

def split_paragraphs_with_numbers(text):
    # Розділення рядка за шаблоном числа з дефісом (N-)
    parts = re.split(r'(\d+-)', text)
    result = []
    temp = ""
    for part in parts:
        if re.match(r'\d+-', part):
            if temp:
                result.append(temp.strip())
            temp = part
        else:
            temp += part
    if temp:
        result.append(temp.strip())
    return result

def fetch_data(url):
    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')

        # Заголовок
        title = soup.find("h1").text.strip() if soup.find("h1") else "Без назви"

        # Характеристики (таблиця)
        characteristics = []
        table = soup.find("table")
        if table:
            for row in table.find_all("tr"):
                cells = row.find_all("td")
                if len(cells) == 2:
                    value = re.sub(r'[^0-9/,]', '', cells[1].get_text(strip=True))  # Видалення букв, залишаємо цифри, коми та /
                    characteristics.append(value)

        # Опис (масив descriptions з усіма <p> всередині кожного elementor-widget-text-editor > elementor-widget-container)
        descriptions = []
        for text_editor_div in soup.find_all("div", class_="elementor-widget-text-editor"):
            desc_container = text_editor_div.find("div", class_="elementor-widget-container")
            if desc_container:
                desc_texts = [p.get_text(strip=True) for p in desc_container.find_all("p")]
                if desc_texts:
                    descriptions.append("\n".join(desc_texts))

        # Деталі (дві секції після h4 з певним класом, витягуємо елементи p, a, strong)
        details = []
        h4_tag = soup.find("h4", class_="elementor-heading-title elementor-size-default")
        if h4_tag:
            section_count = 0
            current_element = h4_tag.find_next()
            while current_element and section_count < 2:
                if current_element.name == "section":
                    elements = current_element.find_all(["p", "a", "strong"])
                    section_details = []
                    for el in elements:
                        text = el.get_text(strip=True)
                        if "-" in text:
                            # Спліт тексту на підрядки за шаблоном
                            split_texts = split_paragraphs_with_numbers(text)
                            section_details.extend(split_texts)
                        else:
                            section_details.append(text)
                    details.append(section_details)
                    section_count += 1
                current_element = current_element.find_next()

        # Зображення
        images = [img.get("src") for img in soup.find_all("img") if img.get("src") and "uploads" in img.get("src")]

        # Індекс сторінки
        match = re.search(r"-mh-(\d+)/?$", url)
        index = int(match.group(1)) if match else None

        print(f"✅ Дані зібрано з {url}")
        return {
            "index": index,
            "title": title,
            "characteristics": characteristics,
            "descriptions": descriptions,
            "details": details,
            "images": images
        }

    print(f"⛔️ Не вдалося отримати дані з {url}")
    return None

# Тест
test_url = "https://www.fortress.com.ua/product/modulnaya-dacha-mh-7/"
result = fetch_data(test_url)

# Вивід результату у JSON файл
if result:
    with open("test_modular_house.json", "w", encoding="utf-8") as file:
        json.dump(result, file, indent=4, ensure_ascii=False)

    print("✅ Тестові дані збережено у test_modular_house.json")
else:
    print("⛔️ Не вдалося отримати тестові дані")
