/* Пепел Королевства v38.0 — compact standalone game architecture */
(() => {
  "use strict";

  const tg = window.Telegram?.WebApp;
  if (tg) {
    try { tg.ready(); } catch (_) {}
    try { tg.expand(); } catch (_) {}
    try { if (tg.setHeaderColor) tg.setHeaderColor("#140f26"); } catch (_) {}
    try { if (tg.setBackgroundColor) tg.setBackgroundColor("#0d0a1a"); } catch (_) {}
  }

  const SAVE_KEY = "ash_kingdom_v38_save";
  const classes = {
    human: { name: "Человек", icon: "🛡️", hp: 70, mana: 30, attack: 5, gold: 65 },
    elf: { name: "Лесной эльф", icon: "🏹", hp: 62, mana: 38, attack: 6, gold: 55 },
    dwarf: { name: "Горный дворф", icon: "⚒️", hp: 78, mana: 25, attack: 6, gold: 55 },
    undead: { name: "Возвращённый", icon: "💀", hp: 68, mana: 32, attack: 10, gold: 50 }
  };
  const buildingData = [
    { id: "townhall", name: "Ратуша", icon: "🏛️", desc: "Каждый уровень укрепляет королевство.", base: 25 },
    { id: "market", name: "Рынок", icon: "🪙", desc: "Повышает награды за исследования.", base: 30 },
    { id: "forge", name: "Кузня", icon: "⚒️", desc: "Увеличивает силу атак героя.", base: 35 },
    { id: "altar", name: "Алтарь", icon: "🔮", desc: "Помогает восстанавливать ману.", base: 40 }
  ];
  const itemData = {
    sword: { name: "Ржавый меч", icon: "🗡️", type: "Оружие" },
    armor: { name: "Кожаная броня", icon: "🥋", type: "Броня" },
    potion: { name: "Зелье лечения", icon: "🧪", type: "Расходник" },
    herb: { name: "Лунная трава", icon: "🌿", type: "Ресурс" },
    ore: { name: "Железная руда", icon: "⛏️", type: "Ресурс" },
    amulet: { name: "Сломанный амулет", icon: "📿", type: "Амулет" },
    fang: { name: "Клык падальщика", icon: "🦷", type: "Трофей" },
    dust: { name: "Пепельная пыль", icon: "✨", type: "Ресурс" }
  };
  const $ = id => document.getElementById(id);
  let selectedClass = "human";
  let selectedLocation = "forest";
  let toastTimer = 0;
  let state = freshState();

  function freshState() {
    return {
      hero: null, currentTab: "world", gold: 55, hp: 70, maxHp: 70, mana: 30, maxMana: 30,
      level: 1, xp: 0, attack: 5, defense: 1, potions: 2, inventory: ["sword","armor","potion","potion","herb"],
      equipment: { weapon: "sword", armor: "armor", amulet: null },
      buildings: { townhall: 0, market: 0, forge: 0, altar: 0 },
      enemy: null, wins: 0, log: ["Пепел оседает на старой дороге. Твой путь начинается."],
      battleLog: ["В этих землях опасность скрывается за каждым деревом."], location: "Тёмный лес"
    };
  }
  function loadState() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !parsed.hero) return false;
      state = { ...freshState(), ...parsed };
      state.equipment = { ...freshState().equipment, ...(parsed.equipment || {}) };
      state.buildings = { ...freshState().buildings, ...(parsed.buildings || {}) };
      state.inventory = Array.isArray(parsed.inventory) ? parsed.inventory.slice(0,12) : [];
      state.log = Array.isArray(parsed.log) ? parsed.log.slice(0,12) : [];
      state.battleLog = Array.isArray(parsed.battleLog) ? parsed.battleLog.slice(0,8) : [];
      return true;
    } catch (_) { return false; }
  }
  function saveState(notify = false) {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); if (notify) showToast("Прогресс сохранён."); }
    catch (_) { showToast("Не удалось сохранить прогресс."); }
  }
  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
  }
  function showToast(message) {
    const el = $("toast"); if (!el) return;
    el.textContent = message; el.classList.add("show");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("show"), 2100);
  }
  function addLog(message) {
    state.log.unshift(message); state.log = state.log.slice(0, 5); renderWorldUI();
  }
  function addBattleLog(message) {
    state.battleLog.unshift(message); state.battleLog = state.battleLog.slice(0, 5); renderBattleLog();
  }
  function updateStats() {
    $("stat-hp").textContent = `${Math.max(0,state.hp)}/${state.maxHp}`;
    $("stat-mana").textContent = `${state.mana}/${state.maxMana}`;
    $("stat-gold").textContent = String(state.gold);
    $("stat-lvl").textContent = String(state.level);
    $("hero-power").textContent = String(state.attack + (state.buildings.forge || 0));
    $("hero-name-display").textContent = state.hero || "Странник";
    $("hero-class-display").textContent = `${classes[state.classId || "human"].name} · Уровень ${state.level}`;
    $("hero-avatar").textContent = classes[state.classId || "human"].icon;
    $("potion-count").textContent = String(state.inventory.filter(id => id === "potion").length);
    $("inventory-count").textContent = String(state.inventory.length);
    $("detail-attack").textContent = String(state.attack + state.buildings.forge);
    $("detail-defense").textContent = String(state.defense + state.buildings.townhall);
    $("detail-mana").textContent = `${state.mana}/${state.maxMana}`;
    $("detail-xp").textContent = `${state.xp}/${state.level * 100}`;
    $("equip-weapon").textContent = itemData[state.equipment.weapon]?.name || "Пусто";
    $("equip-armor").textContent = itemData[state.equipment.armor]?.name || "Пусто";
    $("equip-amulet").textContent = itemData[state.equipment.amulet]?.name || "Пусто";
  }
  function renderWorldUI() {
    const log = $("world-log");
    if (log) log.innerHTML = state.log.map(line => `<p>${escapeHTML(line)}</p>`).join("");
    document.querySelectorAll("[data-travel]").forEach(btn => btn.classList.toggle("selected", btn.dataset.travel === selectedLocation));
  }
  function renderBattleLog() {
    const log = $("battle-log");
    if (log) log.innerHTML = state.battleLog.map(line => `<p>${escapeHTML(line)}</p>`).join("");
  }
  function renderCitadelUI() {
    const grid = $("citadel-grid"); if (!grid) return;
    grid.innerHTML = buildingData.map(b => {
      const level = Number(state.buildings[b.id] || 0);
      const cost = Math.floor(b.base * (1 + level * .7));
      return `<article class="building-card"><div class="building-top"><span class="building-icon">${b.icon}</span><div class="building-copy"><strong>${b.name}</strong><small>${b.desc}</small></div></div><div class="building-level"><span>Уровень ${level}</span><span>🪙 ${cost}</span></div><button class="btn btn-gold" data-upgrade="${b.id}">Улучшить</button></article>`;
    }).join("");
  }
  function renderHeroUI() {
    const grid = $("inventory-grid"); if (!grid) return;
    const items = state.inventory.slice(0,12);
    grid.innerHTML = Array.from({length:12}, (_, i) => {
      const id = items[i], item = id ? itemData[id] : null;
      return item
        ? `<button class="inventory-cell" data-item-index="${i}" title="${escapeHTML(item.name)}"><span class="item-icon">${item.icon}</span><strong>${escapeHTML(item.name)}</strong><small>${escapeHTML(item.type)}</small></button>`
        : `<div class="inventory-cell empty" aria-label="Пустая ячейка"><span class="item-icon">＋</span></div>`;
    }).join("");
    updateStats();
  }
  function renderMoreUI() {}
  function renderBattleUI() {
    const e = state.enemy;
    $("enemy-name").textContent = e ? e.name : "Лесной падальщик";
    $("enemy-desc").textContent = e ? e.desc : "Начни исследование, чтобы встретить врага.";
    $("enemy-avatar").textContent = e ? e.icon : "☠️";
    $("battle-state").textContent = e ? "⚔️ В бою" : "Враг не найден";
    $("enemy-hp").textContent = e ? `${Math.max(0,e.hp)}/${e.maxHp} HP` : "0/0 HP";
    $("enemy-health-bar").style.width = `${e ? Math.max(0,e.hp)/e.maxHp*100 : 0}%`;
    $("attack-btn").disabled = !e;
    $("spell-btn").disabled = !e || state.mana < 5;
    $("flee-btn").disabled = !e;
    renderBattleLog();
  }
  function switchTab(tab) {
    const allowed = new Set(["world","battle","citadel","hero","more"]);
    const targetTab = allowed.has(tab) ? tab : "world";
    document.querySelectorAll(".tab-screen").forEach(el => {
      el.hidden = true;
      el.classList.remove("active-screen");
      el.style.setProperty("display","none","important");
      el.setAttribute("aria-hidden","true");
    });
    document.querySelectorAll(".nav-btn").forEach(el => {
      el.classList.remove("active");
      el.removeAttribute("aria-current");
    });
    const activeScreen = $(`screen-${targetTab}`);
    const activeBtn = $(`nav-btn-${targetTab}`);
    if (activeScreen) {
      activeScreen.hidden = false;
      activeScreen.classList.add("active-screen");
      activeScreen.style.setProperty("display","flex","important");
      activeScreen.setAttribute("aria-hidden","false");
    }
    if (activeBtn) {
      activeBtn.classList.add("active");
      activeBtn.setAttribute("aria-current","page");
    }
    state.currentTab = targetTab;
    if (targetTab === "citadel") renderCitadelUI();
    if (targetTab === "hero") renderHeroUI();
    if (targetTab === "world") renderWorldUI();
    if (targetTab === "battle") renderBattleUI();
    if (targetTab === "more") renderMoreUI();
    updateStats();
    saveState(false);
  }
  function enterGame() {
    const cfg = classes[selectedClass] || classes.human;
    state = freshState();
    state.hero = $("hero-name").value.trim().slice(0,22) || "Безымянный";
    state.classId = selectedClass;
    state.gold = cfg.gold;
    state.hp = state.maxHp = cfg.hp;
    state.mana = state.maxMana = cfg.mana;
    state.attack = cfg.attack;
    state.inventory = ["sword","armor","potion","potion","herb"];
    state.log = [`${state.hero}, твоя история началась.`, "Управляющий ждёт тебя в цитадели. В лесу могут скрываться враги."];
    $("start-screen").hidden = true;
    $("game-screen").hidden = false;
    $("bottom-nav").hidden = false;
    updateStats(); renderCitadelUI(); renderHeroUI(); renderWorldUI(); renderBattleUI();
    switchTab("world");
    saveState(false);
    showToast(`Путь начат: ${cfg.name}`);
  }
  function startBattle() {
    if (state.enemy) { switchTab("battle"); return; }
    const pool = [
      { name:"Лесной падальщик", icon:"🐺", hp:24, attack:5, xp:24, gold:12, desc:"Голодный зверь рыщет среди корней." },
      { name:"Пепельный мародёр", icon:"💀", hp:31, attack:7, xp:32, gold:16, desc:"Воин, давно забывший свою клятву." },
      { name:"Болотная тварь", icon:"🦂", hp:37, attack:8, xp:40, gold:20, desc:"Из трясины доносится влажный шорох." }
    ];
    const enemy = pool[Math.floor(Math.random()*pool.length)];
    state.enemy = { ...enemy, maxHp: enemy.hp };
    addBattleLog(`На пути появился враг: ${enemy.name}.`);
    renderBattleUI(); switchTab("battle");
  }
  function gainXP(amount) {
    state.xp += amount;
    while (state.xp >= state.level * 100) {
      state.xp -= state.level * 100; state.level++;
      state.maxHp += 8; state.hp = state.maxHp; state.maxMana += 3; state.mana = state.maxMana; state.attack += 2;
      addLog(`Новый уровень: ${state.level}. Сила героя возросла.`);
      showToast(`Уровень повышен: ${state.level}`);
    }
  }
  function playerAttack(spell = false) {
    if (!state.enemy) return;
    if (spell) {
      if (state.mana < 5) { showToast("Недостаточно маны."); return; }
      state.mana -= 5;
    }
    const damage = Math.max(1, state.attack + state.buildings.forge + (spell ? 8 : 0) + Math.floor(Math.random()*4));
    state.enemy.hp -= damage;
    addBattleLog(`${spell ? "Магический удар" : "Атака"} наносит ${damage} урона.`);
    if (state.enemy.hp <= 0) {
      const enemyName = state.enemy.name, reward = state.enemy.gold, xp = state.enemy.xp;
      state.enemy = null; state.gold += reward; state.wins++; gainXP(xp);
      if (state.inventory.length < 12) state.inventory.push(Math.random() < .5 ? "fang" : "dust");
      addBattleLog(`${enemyName} повержен. Получено ${reward} золота и ${xp} опыта.`);
      addLog(`Победа над противником: ${enemyName}.`);
      showToast(`Победа! +${reward} 🪙`);
    } else {
      const damageBack = Math.max(1, state.enemy.attack - state.defense - state.buildings.townhall);
      state.hp = Math.max(0, state.hp - damageBack);
      addBattleLog(`${state.enemy.name} отвечает и наносит ${damageBack} урона.`);
      if (state.hp <= 0) {
        state.hp = Math.max(1, Math.floor(state.maxHp*.35));
        state.gold = Math.max(0, state.gold-10);
        state.enemy = null;
        addBattleLog("Герой потерял сознание. Ты очнулся у дороги и потерял 10 золота.");
        showToast("Ты отступил от смерти. Потеряно 10 золота.");
      }
    }
    updateStats(); renderBattleUI(); renderHeroUI(); renderWorldUI(); saveState(false);
  }
  function upgradeBuilding(id) {
    const b = buildingData.find(x => x.id === id); if (!b) return;
    const level = Number(state.buildings[id] || 0), cost = Math.floor(b.base * (1 + level*.7));
    if (state.gold < cost) { showToast(`Нужно ещё ${cost-state.gold} золота.`); return; }
    state.gold -= cost; state.buildings[id] = level + 1;
    if (id === "townhall") { state.defense++; state.maxHp += 3; state.hp = Math.min(state.maxHp,state.hp+3); }
    if (id === "market") state.gold += 0;
    if (id === "forge") state.attack++;
    if (id === "altar") { state.maxMana += 3; state.mana = Math.min(state.maxMana,state.mana+3); }
    renderCitadelUI(); updateStats(); saveState(false); showToast(`${b.name} улучшена до уровня ${level+1}.`);
  }
  function explore() {
    selectedLocation = document.querySelector("[data-travel].selected")?.dataset.travel || selectedLocation;
    const names = {tavern:"Прибрежная таверна",forest:"Тёмный лес",swamp:"Багровое болото",ruins:"Старые руины"};
    state.location = names[selectedLocation] || "Тёмный лес";
    if (Math.random() < .68) {
      const resource = selectedLocation === "swamp" ? "herb" : selectedLocation === "ruins" ? "ore" : "dust";
      if (state.inventory.length < 12 && Math.random() < .68) {
        state.inventory.push(resource); addLog(`В области «${state.location}» найден предмет: ${itemData[resource].name}.`);
        showToast(`Найдено: ${itemData[resource].name}`);
      } else {
        const reward = 5 + (state.buildings.market||0)*3;
        state.gold += reward; addLog(`В области «${state.location}» найдено ${reward} золота.`);
        showToast(`Найдено ${reward} золота.`);
      }
    } else {
      addLog(`В области «${state.location}» раздался рык. Кто-то преграждает путь.`);
      startBattle(); return;
    }
    if (Math.random() < .25) startBattle();
    updateStats(); renderHeroUI(); saveState(false);
  }
  function rest() {
    if (state.gold < 8) { showToast("Не хватает золота для отдыха."); return; }
    state.gold -= 8; state.hp = state.maxHp; state.mana = state.maxMana;
    updateStats(); saveState(false); showToast("Ты восстановил здоровье и ману.");
  }
  function usePotion() {
    const i = state.inventory.indexOf("potion");
    if (i < 0) { showToast("Зелий больше нет."); return; }
    if (state.hp >= state.maxHp) { showToast("Здоровье уже полное."); return; }
    state.inventory.splice(i,1); state.hp = Math.min(state.maxHp,state.hp+28);
    updateStats(); renderHeroUI(); renderBattleUI(); saveState(false); showToast("Зелье восстановило здоровье.");
  }
  function handleInventoryItem(index) {
    const id = state.inventory[index]; if (!id) return;
    if (id === "sword") { state.equipment.weapon = "sword"; showToast("Ржавый меч уже экипирован."); }
    else if (id === "armor") { state.equipment.armor = "armor"; showToast("Кожаная броня экипирована."); }
    else if (id === "amulet") { state.equipment.amulet = "amulet"; showToast("Амулет экипирован."); }
    else if (id === "potion") { usePotion(); return; }
    else showToast(`${itemData[id]?.name || "Предмет"}: найденный трофей.`);
    renderHeroUI(); updateStats(); saveState(false);
  }
  function handleMore(action) {
    if (action === "save") saveState(true);
    else if (action === "reset") {
      if (confirm("Начать новую игру? Текущий прогресс будет удалён.")) {
        localStorage.removeItem(SAVE_KEY); state = freshState();
        $("game-screen").hidden = true; $("bottom-nav").hidden = true; $("start-screen").hidden = false;
        switchTab("world"); updateStats(); showToast("Создай нового странника.");
      }
    } else if (action === "quests") showToast(`Побеждено врагов: ${state.wins}. Исследуй новые области.`);
    else if (action === "skills") { state.attack++; updateStats(); saveState(false); showToast("Сила атаки повышена на 1."); }
  }
  function bindEvents() {
    document.querySelectorAll("[data-class]").forEach(btn => btn.addEventListener("click", () => {
      selectedClass = btn.dataset.class || "human";
      document.querySelectorAll("[data-class]").forEach(el => el.classList.toggle("selected", el === btn));
    }));
    $("begin-btn").addEventListener("click", enterGame);
    document.querySelectorAll(".nav-btn").forEach(btn => btn.addEventListener("click", () => switchTab(btn.dataset.tab)));
    document.querySelectorAll("[data-travel]").forEach(btn => btn.addEventListener("click", () => {
      selectedLocation = btn.dataset.travel; document.querySelectorAll("[data-travel]").forEach(el => el.classList.toggle("selected",el===btn));
    }));
    $("explore-btn").addEventListener("click", explore);
    $("rest-btn").addEventListener("click", rest);
    $("attack-btn").addEventListener("click", () => playerAttack(false));
    $("spell-btn").addEventListener("click", () => playerAttack(true));
    $("potion-btn").addEventListener("click", usePotion);
    $("flee-btn").addEventListener("click", () => { if (!state.enemy) return; state.enemy = null; addBattleLog("Ты отступил и скрылся в тумане."); renderBattleUI(); switchTab("world"); showToast("Ты покинул бой."); saveState(false); });
    $("citadel-grid").addEventListener("click", e => { const btn = e.target.closest("[data-upgrade]"); if (btn) upgradeBuilding(btn.dataset.upgrade); });
    $("inventory-grid").addEventListener("click", e => { const btn = e.target.closest("[data-item-index]"); if (btn) handleInventoryItem(Number(btn.dataset.itemIndex)); });
    document.querySelectorAll("[data-more]").forEach(btn => btn.addEventListener("click", () => handleMore(btn.dataset.more)));
    window.addEventListener("beforeunload", () => saveState(false));
    document.addEventListener("visibilitychange", () => { if (document.visibilityState === "hidden") saveState(false); });
  }
  function boot() {
    bindEvents();
    if (loadState()) {
      $("start-screen").hidden = true; $("game-screen").hidden = false; $("bottom-nav").hidden = false;
      updateStats(); renderWorldUI(); renderBattleUI(); renderCitadelUI(); renderHeroUI(); switchTab(state.currentTab || "world");
    } else {
      $("start-screen").hidden = false; $("game-screen").hidden = true; $("bottom-nav").hidden = true;
      updateStats(); renderCitadelUI(); renderHeroUI();
    }
  }
  window.switchTab = switchTab;
  window.renderCitadelUI = renderCitadelUI;
  window.renderHeroUI = renderHeroUI;
  window.renderWorldUI = renderWorldUI;
  window.renderMoreUI = renderMoreUI;
  boot();
})();