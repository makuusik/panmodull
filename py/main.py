import requests
from bs4 import BeautifulSoup
import json
import cloudscraper
import re

def split_paragraphs_with_numbers(text):
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

def fetch_data(urls):
    scraper = cloudscraper.create_scraper()
    for url in urls:
        response = scraper.get(url)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            
            title = soup.find("h1").text.strip() if soup.find("h1") else "Без назви"
            
            characteristics = []
            table = soup.find("table")
            if table:
                for row in table.find_all("tr"):
                    cells = row.find_all("td")
                    if len(cells) == 2:
                        value = re.sub(r'[^0-9/,]', '', cells[1].get_text(strip=True))
                        characteristics.append(value)
            
            descriptions = []
            for text_editor_div in soup.find_all("div", class_="elementor-widget-text-editor"):
                desc_container = text_editor_div.find("div", class_="elementor-widget-container")
                if desc_container:
                    desc_texts = [p.get_text(strip=True) for p in desc_container.find_all("p")]
                    if desc_texts:
                        descriptions.append("\n".join(desc_texts))
            
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
                                split_texts = split_paragraphs_with_numbers(text)
                                section_details.extend(split_texts)
                            else:
                                section_details.append(text)
                        details.append(section_details)
                        section_count += 1
                    current_element = current_element.find_next()
            
            images = [img.get("src") for img in soup.find_all("img") if img.get("src") and "uploads" in img.get("src")]
            
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
    
    print(f"⛔️ Не вдалося отримати дані з {urls}")
    return None

ranges = {
    "modulnaya-dacha": list(range(7, 17)),
    "modulna-dacha": list(range(7, 17)),
    "moduln": list(range(7, 17)),
    "modulnij-budinok": list(range(17, 39)),
    "modulnyj-budynok": list(range(17, 39)),
    "modulnyj-dom": list(range(17, 39)),
    "modulnij-bu": list(range(17, 39)),
    "modulnyj-ofis": list(range(40, 44)),
    "modulnij-ofis": list(range(40, 44)),
    "modulna-sauna": list(range(44, 47)),
    "modulnaya-sauna": list(range(44, 47))
}

ranges["modulnyj-ofis"].append(14)
ranges["modulnij-ofis"].append(14)

custom_urls = [
    "https://www.fortress.com.ua/product/modulnyj-ofis-mh-16/",
    "https://www.fortress.com.ua/product/moduln-mh-15/",
    "https://www.fortress.com.ua/product/modulnij-mh-24/",
    "https://www.fortress.com.ua/product/modulnij-of-mh-41/"
]

data = []

for category, indices in ranges.items():
    for index in indices:
        urls = [
            f"https://www.fortress.com.ua/product/{category}-mh-{index}/",
            f"https://www.fortress.com.ua/product/{category.replace('j', 'ij')}-mh-{index}/",
            f"https://www.fortress.com.ua/product/{category.replace('ij', 'j')}-mh-{index}/",
            f"https://www.fortress.com.ua/product/{category.replace('j', 'i')}-mh-{index}/"
        ]
        result = fetch_data(urls)
        if result:
            data.append(result)

for url in custom_urls:
    result = fetch_data([url])
    if result:
        data.append(result)

with open("modular_houses_data.json", "w", encoding="utf-8") as file:
    json.dump(data, file, indent=4, ensure_ascii=False)

print("✅ Усі дані збережено у modular_houses_data.json")
