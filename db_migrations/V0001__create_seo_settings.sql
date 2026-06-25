CREATE TABLE seo_settings (
  id SERIAL PRIMARY KEY,
  page_key VARCHAR(100) NOT NULL UNIQUE,
  page_label VARCHAR(200) NOT NULL,
  title TEXT,
  description TEXT,
  keywords TEXT,
  schema_json TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO seo_settings (page_key, page_label, title, description, keywords) VALUES
  ('/', 'Главная', 'Химчистка мебели в Краснодаре с выездом | Аренда Чистоты', '★4.98/5 (1240 отзывов) Химчистка диванов, кресел, матрасов и ковров в Краснодаре. Выезд на дом, сушка 2–4 часа, безопасные средства. ☎ 8 918 968-28-82', 'химчистка мебели, химчистка мебели краснодар, химчистка диванов краснодар'),
  ('/nashi-raboty', 'Наши работы', 'Наши работы — фото до и после химчистки | Аренда Чистоты', 'Реальные примеры химчистки диванов, матрасов, кресел и ковров в Краснодаре. Фото до и после.', 'химчистка фото, наши работы, до и после'),
  ('/uslugi/himchistka-divanov', 'Услуга: Диваны', 'Химчистка диванов в Краснодаре с выездом | Аренда Чистоты', 'Химчистка диванов в Краснодаре с гарантией. Удаляем пятна, запахи, клещей. Ткань, кожа, велюр. Выезд на дом.', 'химчистка диванов, химчистка дивана краснодар'),
  ('/uslugi/himchistka-kresel', 'Услуга: Кресла', 'Химчистка кресел в Краснодаре | Аренда Чистоты', 'Профессиональная химчистка кресел в Краснодаре. Офисные, обеденные, игровые. Выезд на дом.', 'химчистка кресел краснодар'),
  ('/uslugi/himchistka-matrasov', 'Услуга: Матрасы', 'Химчистка матрасов в Краснодаре | Аренда Чистоты', 'Химчистка матрасов в Краснодаре. Устраняем клещей, грибок, пятна. Безопасно для детей.', 'химчистка матрасов краснодар'),
  ('/uslugi/himchistka-kovrov', 'Услуга: Ковры', 'Химчистка ковров в Краснодаре | Аренда Чистоты', 'Химчистка ковров в Краснодаре. Шерсть, синтетика, ковры ручной работы. Выезд на дом.', 'химчистка ковров краснодар'),
  ('/uslugi/himchistka-stulev', 'Услуга: Стулья', 'Химчистка стульев в Краснодаре | Аренда Чистоты', 'Химчистка стульев в Краснодаре. Обеденные группы, барные стулья, пуфики. Быстро и недорого.', 'химчистка стульев краснодар'),
  ('/uslugi/himchistka-avtosalona', 'Услуга: Автосалон', 'Химчистка автосалона в Краснодаре | Аренда Чистоты', 'Химчистка автосалона в Краснодаре. Сиденья, потолок, дверные панели. Профессиональное оборудование.', 'химчистка автосалона краснодар, химчистка авто');

CREATE TABLE seo_robots (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO seo_robots (content) VALUES (
'User-agent: *
Allow: /
Disallow: /cookie-policy
Disallow: /privacy
Disallow: /hello-world/
Disallow: /sample-page/
Disallow: /voprosy-i-otvety-faq.html
Disallow: /uslugi/khimchistka-divanov.html
Disallow: /uslugi/khimchistka-matrasov.html
Disallow: /akcii-i-skidki.html
Disallow: /uslugi/khimchistka-kovrov.html
Disallow: /uslugi/khimchistka-salona-avto.html

Host: https://arenda-chistoty.online
Sitemap: https://arenda-chistoty.online/sitemap.xml'
);
