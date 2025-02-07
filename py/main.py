import requests
from bs4 import BeautifulSoup
import json

# Діапазон сторінок для парсингу
start_page = 7
end_page = 46

base_url = "https://www.fortress.com.ua/product/modulnij-budinok-mh-"
data = []

for page in range(start_page, end_page + 1):
    url = f"{base_url}{page}/"
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Отримання заголовку
        title = soup.find("h1").text.strip() if soup.find("h1") else f"MH-{page}"

        # Отримання характеристик
        characteristics = {}
        characteristics_section = soup.find_all("p")
        for characteristic in characteristics_section:
            text = characteristic.get_text(strip=True)
            if ":" in text:
                key, value = text.split(":", 1)
                characteristics[key.strip()] = value.strip()

        # Отримання опису
        description_section = soup.find("div", class_="woocommerce-product-details__short-description")
        description = description_section.get_text(strip=True) if description_section else "Опис відсутній"

        # Отримання зображень
        images = []
        image_tags = soup.find_all("img")
        for img in image_tags:
            src = img.get("src")
            if src and "uploads" in src:
                images.append(src)

        # Додавання зібраних даних до списку
        data.append({
            "id": page,
            "title": title,
            "url": url,
            "characteristics": characteristics,
            "description": description,
            "images": images
        })

        print(f"Дані зібрано з {url}")
    else:
        print(f"Не вдалося отримати дані з {url}")

# Збереження даних у JSON-файл
with open("modular_houses_data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4, ensure_ascii=False)

print("Усі дані збережено у modular_houses_data.json")
