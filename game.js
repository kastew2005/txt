(() => {
  'use strict';

  const TAB_SCREENS = Object.freeze({
    world: 'screen-world',
    battle: 'screen-battle',
    citadel: 'screen-citadel',
    hero: 'screen-hero',
    more: 'screen-more'
  });
  const VALID_SCREENS = new Set([
    ...Object.values(TAB_SCREENS),
    'screen-full-map', 'screen-taverna', 'screen-bestiary', 'screen-legacy',
    'screen-alchemy', 'screen-merchant', 'screen-forge', 'screen-settings'
  ]);

  const state = {
    location: 'Прибрежная таверна',
    hp: 78, maxHp: 78,
    mana: 30, maxMana: 34,
    gold: 55,
    level: 1
  };
  let toastTimer = null;

  function byId(id) { return document.getElementById(id); }

  function showToast(message) {
    const toast = byId('toast-v56');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('visible');
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2200);
  }

  function switchScreen(screenId) {
    if (!VALID_SCREENS.has(screenId)) {
      showToast('Этот раздел пока недоступен.');
      return false;
    }
    const target = byId(screenId);
    if (!target) {
      showToast('Экран не найден. Открыт безопасный стартовый экран.');
      screenId = 'screen-world';
    }
    document.querySelectorAll('.game-screen').forEach((screen) => {
      screen.classList.toggle('active', screen.id === screenId);
    });
    const tabName = Object.keys(TAB_SCREENS).find((name) => TAB_SCREENS[name] === screenId);
    if (tabName) updateNavBtns(tabName);
    const activeScreen = byId(screenId);
    if (activeScreen) activeScreen.scrollTop = 0;
    return true;
  }

  function updateNavBtns(tabName) {
    document.querySelectorAll('.nav-btn-v56').forEach((button) => {
      button.classList.toggle('active', button.getAttribute('data-tab') === tabName);
    });
  }

  function updateStats() {
    const values = {
      'stat-hp': `${state.hp}/${state.maxHp}`,
      'stat-mana': `${state.mana}/${state.maxMana}`,
      'stat-gold': String(state.gold),
      'stat-lvl': String(state.level),
      'hero-hp': `${state.hp}/${state.maxHp}`,
      'hero-mana': `${state.mana}/${state.maxMana}`,
      'hero-gold': String(state.gold),
      'hero-level': String(state.level)
    };
    Object.entries(values).forEach(([id, value]) => {
      const element = byId(id);
      if (element) element.textContent = value;
    });
  }

  function travelTo(locationName) {
    const allowedLocations = new Set(['Тёмный лес', 'Заброшенные руины', 'Прибрежная таверна']);
    if (!allowedLocations.has(locationName)) return;
    state.location = locationName;
    const title = document.querySelector('.current-place-title');
    const description = document.querySelector('.current-place-desc');
    if (title) title.textContent = locationName;
    if (description) {
      const descriptions = {
        'Тёмный лес': 'Мрачная чаща на севере. Между деревьями слышится шорох; путешествуй осторожно.',
        'Заброшенные руины': 'Разрушенные стены хранят следы старого королевства и, возможно, нечто опасное.',
        'Прибрежная таверна': 'Шумное прибрежное пристанище. Здесь можно передохнуть, послушать слухи или взять контракт.'
      };
      description.textContent = descriptions[locationName];
    }
    switchScreen('screen-world');
    showToast(`Путь выбран: ${locationName}`);
  }

  function handleClick(event) {
    const trigger = event.target.closest('button[data-tab], button[data-screen], button[data-back], button[data-travel]');
    if (!trigger) return;
    event.preventDefault();

    if (trigger.hasAttribute('data-tab')) {
      const tab = trigger.getAttribute('data-tab');
      const screenId = TAB_SCREENS[tab];
      if (screenId) switchScreen(screenId);
      return;
    }
    if (trigger.hasAttribute('data-back')) {
      switchScreen('screen-world');
      return;
    }
    if (trigger.hasAttribute('data-travel')) {
      travelTo(trigger.getAttribute('data-travel'));
      return;
    }
    const screen = trigger.getAttribute('data-screen');
    if (screen) switchScreen(`screen-${screen}`);
  }

  function initTelegram() {
    try {
      const tg = window.Telegram && window.Telegram.WebApp;
      if (tg) {
        if (typeof tg.ready === 'function') tg.ready();
        if (typeof tg.expand === 'function') tg.expand();
        if (tg.setHeaderColor) tg.setHeaderColor('#130c22');
        if (tg.setBackgroundColor) tg.setBackgroundColor('#0b0714');
      }
    } catch (error) {
      console.warn('Telegram WebApp initialization skipped:', error);
    }
  }

  function init() {
    initTelegram();
    document.addEventListener('click', (event) => {
      try { handleClick(event); }
      catch (error) {
        console.error('UI click handler error:', error);
        showToast('Произошла ошибка интерфейса. Попробуй ещё раз.');
      }
    });
    updateStats();
    switchScreen('screen-world');
    document.documentElement.dataset.appVersion = '56.0';
    console.info('Пепел Королевства v56.0: аварийный контент загружен.');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }

  // Оставлено глобальным для совместимости с простыми HTML-вызовами.
  window.travelTo = travelTo;
  window.switchScreen = switchScreen;
})();
