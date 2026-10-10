# Пепел Королевства — Global Update 2.0

Автономная браузерная Dark Fantasy RPG на чистом HTML/CSS/JavaScript.

## Файлы
- `index.html` — интерфейс, экран выбора расы, бой, заклинания, инвентарь и профиль.
- `style.css` — адаптивная готическая тема, кастомные кнопки, анимации боя, SVG-портретов, магии и погоды.
- `database.js` — данные рас, предметов, монстров, событий и заданий.
- `game.js` — бой, экипировка, карма, день/ночь, погода, заклинания, локальные сохранения.
- `manifest.json` — настройки PWA.
- `sw.js` — кэширование ресурсов для запуска офлайн.
- `assets/icons.svg`, `assets/icon.svg` — локальные векторные спрайты и иконка.

## Запуск
Открой через локальный HTTP-сервер либо размести весь каталог на HTTPS (например, GitHub Pages). Для офлайн-режима сначала открой опубликованную игру онлайн, чтобы Service Worker закэшировал файлы.

На iPhone: Safari → «Поделиться» → «На экран Домой». Некоторые версии iOS могут игнорировать SVG как значок ярлыка, но интерфейс игры не использует внешние изображения и останется векторным.

## Игровые системы Global Update 2.0
- Четыре расы с разными бонусами.
- Пошаговый бой с рывком, вспышкой удара и плавающими числами.
- Огненный шар, Щит веры и Ядовитый укол с расходом MP.
- День, ночь, туман, дождь и Кровавая Луна; опасные фазы усиливают врагов и увеличивают добычу.
- Карма меняет цветовую тему интерфейса.
- Инвентарь, экипировка, задания, события, профиль и localStorage.


## Global Update v2.1
- Combat turns use a token-guarded scheduler and a shared action lock; victory, defeat and escape clear pending combat timers.
- Rage gauge charges from dealt/taken damage; a full gauge unlocks a 3× Crushing Blow.
- Short synthesized UI/combat sounds use Web Audio API after a user gesture; no external audio files are needed.
- Rain uses a lightweight canvas particle layer; the former repeating-gradient rain overlay is disabled.
- Combat portraits and interface text are larger on phones and desktop.
- Service Worker cache version is bumped so the browser requests the v2.3 assets.


## Global Update v2.3
- Автоматический возврат на карту после победы, поражения или побега с дорожным событием в логе.
- Ежедневные задания с прогрессом, наградами и сбросом по локальной календарной дате.
- Случайные древние алтари: золото, здоровье или осквернение в обмен на временные боевые усиления.
- Ежедневный прогресс и эффект алтаря включены в сохранение.
