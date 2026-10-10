# Пепел Королевства — v18.0 Visual Inventory & Citadel Edition

Мобильная офлайн PWA Dark Fantasy RPG. Используются локальные файлы, Inline SVG и CSS; внешние изображения и библиотеки не нужны.

## Запуск

Разместите всё содержимое папки `project` на HTTPS-хостинге (например, GitHub Pages), сохранив каталог `assets`. Service Worker регистрируется на HTTPS или localhost. После первого открытия и завершения кэширования основные файлы доступны офлайн.

## v18.0

- Полнофигурные Inline SVG-портреты пяти рас.
- Race-locked экипировка: `usableBy` проверяется в интерфейсе, при надевании и в расчёте характеристик.
- Динамическая SVG-иллюстрация цитадели: руины, форт, замок по суммарному уровню построек.
- Отдельный «Смертельный удар» за 10 MP; заклинания и расходники с задержкой перед гарантированным вызовом ответного хода врага, если противник выжил.
- Обучение вызывается через `initTutorial()` после создания героя, если чекбокс включён.
- Формат экспорта AK18 с XOR-маскировкой, Base64 и контрольной суммой; импорт AK17/AK16/AK15/AK14 сохранён.

## Ограничения

Base64/XOR — маскировка, а не криптографическое шифрование. Проверка синтаксиса не заменяет реальный игровой прогон на iPhone. `navigator.vibrate` может не поддерживаться браузером iOS.


## v18.0 — Visual Inventory & Citadel Edition
- Added four inventory category filters and detailed inline SVG item artwork.
- Rarity frames distinguish common, rare, epic, and legendary loot.
- Item details show attack/defense values and compare them with currently equipped gear.
- Race-locked gear remains disabled for incompatible races.
- Export format is AK18; import compatibility with AK17/AK16/AK15/AK14 is retained.
- Inventory scrolling is confined to the inventory panel; the app shell remains viewport-sized.
