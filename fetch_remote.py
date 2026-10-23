import requests
from pathlib import Path
root = Path('target_remote')
root.mkdir(exist_ok=True)
html = requests.get('https://agro-ai-zuda.onrender.com').text
css = requests.get('https://agro-ai-zuda.onrender.com/static/style.css').text
(root / 'index.html').write_text(html, encoding='utf-8')
(root / 'style.css').write_text(css, encoding='utf-8')
print('saved', root / 'index.html', root / 'style.css')
