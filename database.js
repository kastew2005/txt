/* База данных мира. Все предметы и события описаны здесь, игровая логика находится в game.js. */
"use strict";
const RPG_DB = {
  races: [
    {id:"human",name:"Человек",icon:"human",summary:"Универсальность и воля",lore:"Люди не сильнее древних рас, но их упорство меняет ход истории.",mods:{hp:0,str:0,dodge:0,crit:0,gold:15},detail:"+15 стартового золота. Без слабых сторон."},
    {id:"elf",name:"Эльф",icon:"leaf",summary:"Ловкость и точность",lore:"Последние дети старых лесов умеют видеть слабые места даже в темноте.",mods:{hp:-8,str:-1,dodge:8,crit:7,gold:0},detail:"+8% уворота, +7% крит. шанса, −8 здоровья, −1 сила."},
    {id:"orc",name:"Орк",icon:"hammer",summary:"Ярость и выносливость",lore:"Орки чтят силу, но самые мудрые из них знают цену милосердию.",mods:{hp:18,str:3,dodge:-3,crit:0,gold:-5},detail:"+18 здоровья, +3 силы, −3% уворота, −5 золота."},
    {id:"dwarf",name:"Гном",icon:"pickaxe",summary:"Стойкость и ремесло",lore:"Под горой гномы научились терпеть боль и находить ценность в любом камне.",mods:{hp:10,str:1,dodge:-1,crit:1,gold:10},detail:"+10 здоровья, +1 сила, +10 золота, −1% уворота."},
    {id:"undead",name:"Нежить",icon:"skeleton",summary:"Холодная стойкость",lore:"Проклятие не смогло удержать душу в могиле. Ты вернулся из пепла с холодным сердцем и волей, которой не страшна боль.",mods:{hp:8,str:2,dodge:-2,crit:3,gold:0},detail:"+8 здоровья, +2 силы, +3% критического шанса, −2% уворота."}
  ],
  items: {
    rusty_sword:{id:"rusty_sword",name:"Ржавый меч",icon:"sword",type:"weapon",slot:"weapon",attack:3,defense:0,price:8,rarity:"common",description:"Старый клинок. Всё ещё лучше голых рук."},
    hunters_bow:{id:"hunters_bow",name:"Лесной лук",icon:"bow",type:"weapon",slot:"weapon",attack:5,defense:0,price:26,rarity:"rare",description:"Тихое оружие для тех, кто предпочитает ударить первым."},
    iron_axe:{id:"iron_axe",name:"Кованый топор",icon:"hammer",type:"weapon",slot:"weapon",attack:7,defense:0,price:42,rarity:"rare",description:"Тяжёлый топор с насечками старого кузнеца."},
    leather_armor:{id:"leather_armor",name:"Кожаный доспех",icon:"leaf",type:"armor",slot:"armor",attack:0,defense:2,price:16,rarity:"common",description:"Грубая кожа смягчит удар, но не остановит клинок."},
    chainmail:{id:"chainmail",name:"Кольчуга дозорного",icon:"armor",type:"armor",slot:"armor",attack:0,defense:5,price:38,rarity:"rare",description:"Потёртая, но надёжная кольчуга."},
    iron_helm:{id:"iron_helm",name:"Железный шлем",icon:"helmet",type:"helmet",slot:"helmet",attack:0,defense:2,price:18,rarity:"common",description:"Защищает голову от случайного удара."},
    wooden_shield:{id:"wooden_shield",name:"Дубовый щит",icon:"shield",type:"shield",slot:"shield",attack:0,defense:2,price:14,rarity:"common",description:"Простой щит с железным умбоном. Удерживает удар и даёт уверенность."},
    wolf_ring:{id:"wolf_ring",name:"Кольцо волка",icon:"ring",type:"ring",slot:"ring",attack:1,defense:1,price:34,rarity:"epic",description:"На металле выгравирована крошечная волчья голова."},
    healing_potion:{id:"healing_potion",name:"Малое зелье",icon:"potion",type:"consumable",heal:35,price:12,rarity:"common",description:"Восстанавливает 35 здоровья."},
    moon_herb:{id:"moon_herb",name:"Лунная трава",icon:"herb",type:"material",price:5,rarity:"common",description:"Светится в полумраке. Алхимики платят за неё."},
    cursed_relic:{id:"cursed_relic",name:"Проклятый идол",icon:"relic",type:"treasure",price:44,rarity:"epic",description:"Внутри камня шевелится тёмная искра."},
    gold_charm:{id:"gold_charm",name:"Монета святого",icon:"relic",type:"treasure",price:20,rarity:"rare",description:"Старинная монета, которую суеверные торговцы считают добрым знаком."},
    mana_tonic:{id:"mana_tonic",name:"Настой синей луны",icon:"potion",type:"consumable",heal:0,mana:18,price:16,rarity:"rare",description:"Восстанавливает 18 маны."},
    iron_ore:{id:"iron_ore",name:"Железная руда",icon:"relic",type:"material",price:7,rarity:"common",description:"Тяжёлый кусок руды для ремесла."},
    ember_dust:{id:"ember_dust",name:"Пепельная пыль",icon:"relic",type:"material",price:9,rarity:"rare",description:"Магический остаток, добываемый в опасных местах."}
  },
  monsters: [
    {id:"wolf",name:"Голодный волк",icon:"wolf",hp:28,attack:5,defense:1,xp:12,gold:[4,10],dodge:8,description:"Зверь с рёбрами, проступающими сквозь шкуру."},
    {id:"bandit",name:"Дорожный головорез",icon:"sword",hp:36,attack:7,defense:2,xp:18,gold:[8,17],dodge:4,description:"Когда-то он тоже искал честную жизнь."},
    {id:"skeleton",name:"Костяной страж",icon:"skull",hp:43,attack:8,defense:3,xp:22,gold:[5,14],dodge:2,description:"Старая броня звенит на костях безымянного воина."},
    {id:"wraith",name:"Пепельный призрак",icon:"wraith",hp:51,attack:10,defense:2,xp:29,gold:[12,24],dodge:12,description:"Его шёпот напоминает голос того, кого ты потерял."},
    {id:"knight",name:"Падший рыцарь",icon:"knight",hp:72,attack:12,defense:5,xp:42,gold:[20,36],dodge:3,description:"Он всё ещё охраняет корону, которой больше нет."}
  ],
  events: [
    {id:"beggar",title:"Старик у обочины",icon:"human",text:"Слепой старик просит монету и называет тебя именем, которого ты никогда не слышал.",choices:[{label:"Дать 8 золота",kind:"pay",amount:8,karma:3,rep:{common:2},result:"Старик исчезает, оставив благословение. Дорога кажется чуть светлее."},{label:"Пройти мимо",kind:"ignore",karma:-1,result:"Старик не оборачивается. Но ты слышишь за спиной тихий смешок."}]},
    {id:"merchant",title:"Перевёрнутая повозка",icon:"scales",text:"Купец лежит возле разбитой повозки. Несколько мешков с золотом рассыпались по грязи.",choices:[{label:"Помочь купцу",kind:"help",karma:3,rep:{merchants:8},gold:7,result:"Купец благодарит тебя и обещает помнить добро."},{label:"Забрать монеты",kind:"steal",karma:-5,gold:18,rep:{merchants:-12},result:"Золото приятно звенит. Где-то впереди кто-то запоминает твоё лицо."}]},
    {id:"shrine",title:"Святилище без богов",icon:"sun",text:"На алтаре лежит свежая алая роза, хотя вокруг нет ни единого живого дерева.",choices:[{label:"Оставить подношение (5 золота)",kind:"offering",amount:5,karma:5,result:"Тишина отвечает теплом. Судьба будто кивает тебе."},{label:"Разбить алтарь",kind:"smash",karma:-6,gold:12,result:"Под камнем находишь старые монеты. Где-то далеко воет ветер."}]},
    {id:"stranger",title:"Незнакомец в плаще",icon:"moon",text:"Фигура предлагает обменять твою удачу на силу. Улыбка у неё слишком широкая.",choices:[{label:"Согласиться",kind:"deal",karma:-3,buff:2,result:"Вены холодеют. Твоя сила растёт, но тень становится длиннее."},{label:"Отказаться",kind:"refuse",karma:2,result:"Незнакомец растворяется в тумане, оставив запах горелой мяты."}]}
  ],
  rumors: [
    "На старом тракте видели рыцаря, который не отбрасывает тени.",
    "Торговцы платят больше тем, чьи руки не запятнаны кровью невинных.",
    "В развалинах часовни по ночам звенит колокол, хотя башня обрушилась сто лет назад.",
    "Говорят, судьба не любит тех, кто трижды отказывается от милосердия.",
    "К северу от леса лежит кольцо, которое помнит последнего короля."
  ],
  skills: [
    {id:"warrior_edge",tree:"warrior",name:"Закалённый клинок",desc:"Постоянно +2 к атаке за ранг.",max:3,icon:"⚔"},
    {id:"warrior_guard",tree:"warrior",name:"Стойка стража",desc:"Постоянно +2 к защите за ранг.",max:3,icon:"🛡"},
    {id:"rogue_crit",tree:"rogue",name:"Точный удар",desc:"+4% к критическому шансу за ранг.",max:3,icon:"🗡"},
    {id:"rogue_dodge",tree:"rogue",name:"Тень на ветру",desc:"+3% к уклонению за ранг.",max:3,icon:"🌘"},
    {id:"mage_power",tree:"mage",name:"Глубокий источник",desc:"+5 к максимальной мане за ранг.",max:3,icon:"✧"},
    {id:"mage_flame",tree:"mage",name:"Жар арканы",desc:"Огненная магия наносит больше урона.",max:3,icon:"🔥"}
  ],
  pets: [
    {id:"fox",name:"Пепельный лис",icon:"🦊",desc:"Проворный спутник: +3% уклонения.",buff:{dodge:3},unlock:0},
    {id:"raven",name:"Ворон-проводник",icon:"🐦‍⬛",desc:"Находит ценности: +8% золота за победу.",buff:{gold:8},unlock:2},
    {id:"wisp",name:"Огненный огонёк",icon:"🔥",desc:"Усиливает магию: +2 к атаке.",buff:{attack:2},unlock:5}
  ],
  recipes: [
    {id:"healing_potion",name:"Сварить лечебное зелье",desc:"2 лунные травы → лечебное зелье",cost:{moon_herb:2},result:"healing_potion",count:1},
    {id:"mana_tonic",name:"Настой синей луны",desc:"1 лунная трава + 1 пепельная пыль → настой маны",cost:{moon_herb:1,ember_dust:1},result:"mana_tonic",count:1},
    {id:"iron_ore",name:"Переплавить железную руду",desc:"3 железные руды → 18 золота",cost:{iron_ore:3},result:"gold",count:18}
  ],
  quests: [
    {id:"first_blood",name:"Первая кровь",description:"Победи любого врага на дороге.",goal:1,reward:{gold:15,xp:20},type:"kills"},
    {id:"kind_heart",name:"Не всё продаётся",description:"Совершить доброе событие дважды.",goal:2,reward:{gold:12,xp:18},type:"good"},
    {id:"road_wanderer",name:"Пыльный тракт",description:"Исследовать дорогу три раза.",goal:3,reward:{gold:20,xp:25},type:"travel"}
  ]
};
