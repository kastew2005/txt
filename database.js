/* RPG database · Citadel Crafting, Narrative Events & Web Audio SFX v29.0 */
/* База данных мира. Все предметы и события описаны здесь, игровая логика находится в game.js. */
"use strict";
const RPG_DB = {
  version: "33.0",
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
    cursed_blade:{id:"cursed_blade",name:"Клинок Чёрного Солнца",icon:"sword",type:"weapon",slot:"weapon",attack:14,defense:0,price:120,rarity:"legendary",usableBy:["undead","orc"],description:"Проклятый клинок доступен тем, кто принял Скверну. Даёт огромную силу, но простые люди отворачиваются."},
    gold_charm:{id:"gold_charm",name:"Монета святого",icon:"relic",type:"treasure",price:20,rarity:"legendary",description:"Старинная монета, которую суеверные торговцы считают добрым знаком."},
    mana_tonic:{id:"mana_tonic",name:"Настой синей луны",icon:"potion",type:"consumable",heal:0,mana:18,price:16,rarity:"rare",description:"Восстанавливает 18 маны."},
    blood_crown:{id:"blood_crown",name:"Корона Алой Жажды",icon:"cursed_relic",type:"helmet",slot:"helmet",attack:50,defense:12,price:0,rarity:"cursed",cursed:true,stepDamage:5,description:"Проклятая реликвия: +50 атаки и +12 защиты, но каждый переход отнимает 5 HP."},
    void_heart:{id:"void_heart",name:"Сердце Пустоты",icon:"cursed_relic",type:"treasure",attack:12,maxHp:100,manaCostMultiplier:1.2,price:0,rarity:"cursed",cursed:true,description:"Проклятая реликвия: +100 к максимальному здоровью и +12 атаки, но расход маны увеличен на 20%."},
    iron_ore:{id:"iron_ore",name:"Железная руда",icon:"relic",type:"material",price:7,rarity:"common",description:"Тяжёлый кусок руды для ремесла."},
    ember_dust:{id:"ember_dust",name:"Пепельная пыль",icon:"relic",type:"material",price:9,rarity:"rare",description:"Магический остаток, добываемый в опасных местах."},
    luminous_plate:{id:"luminous_plate",name:"Латы Света",icon:"armor",type:"armor",slot:"armor",attack:1,defense:8,price:90,rarity:"epic",usableBy:["human"],description:"Серебряные латы, созданные для защитника живых. Отталкивают тёмную магию."},
    bone_mantle:{id:"bone_mantle",name:"Мантия костяного короля",icon:"armor",type:"armor",slot:"armor",attack:2,defense:7,price:90,rarity:"epic",usableBy:["undead"],description:"Разорванная мантия, скреплённая костяными пластинами и некротической энергией."},
    moonbow:{id:"moonbow",name:"Лунный лук",icon:"bow",type:"weapon",slot:"weapon",attack:9,defense:0,price:90,rarity:"epic",usableBy:["elf"],description:"Тонкий эльфийский лук, чья тетива светится холодным лунным светом."},
    warcleaver:{id:"warcleaver",name:"Тяжёлый топор клана",icon:"hammer",type:"weapon",slot:"weapon",attack:10,defense:0,price:90,rarity:"epic",usableBy:["orc"],description:"Массивный топор с клановыми насечками. Для чужака он слишком тяжёл."},
    forgehammer:{id:"forgehammer",name:"Молот глубин",icon:"hammer",type:"weapon",slot:"weapon",attack:8,defense:3,price:90,rarity:"epic",usableBy:["dwarf"],description:"Рунический молот горных мастеров, уравновешенный как наковальня."}
    ,
    bandage:{id:"bandage",name:"Полевой бинт",icon:"potion",type:"consumable",heal:8,price:10,rarity:"rare",description:"Лечит одну боевую травму и восстанавливает немного здоровья."},
    heart_of_ash:{id:"heart_of_ash",name:"Сердце Пепла",icon:"relic",type:"relic",attack:9,defense:0,price:160,rarity:"cursed",stepDamage:2,description:"Проклятая реликвия: +9 атаки, но каждый шаг по карте отнимает 2 HP. Не надевается — действует, пока находится в рюкзаке."},
    thorn_crown:{id:"thorn_crown",name:"Терновая корона",icon:"helmet",type:"helmet",slot:"helmet",attack:5,defense:4,price:190,rarity:"cursed",stepDamage:1,description:"Черно-красная реликвия: усиливает атаку и защиту, но каждый переход по карте причиняет 1 урон."},
    saint_vessel:{id:"saint_vessel",name:"Сосуд святого",icon:"relic",type:"relic",price:120,rarity:"legendary",description:"Реликвия Света. Усиливает лечение и даёт небольшой бонус к защите, пока хранится в сумке."},
    void_root:{id:"void_root",name:"Корень Бездны",icon:"herb",type:"material",price:9,rarity:"rare",description:"Чёрный корень с холодным свечением. Нужен для сильной алхимии."},
    empty_vial:{id:"empty_vial",name:"Пустая склянка",icon:"potion",type:"material",price:3,rarity:"common",description:"Чистая стеклянная склянка для алхимических смесей."},
    poison_oil:{id:"poison_oil",name:"Ядовитое масло",icon:"potion",type:"consumable",price:24,rarity:"rare",attackBuff:0.25,buffTurns:3,description:"Нанеси масло на оружие: +25% урона на следующие 3 удара."},
    blood_rune:{id:"blood_rune",name:"Руна Крови",icon:"cursed_relic",type:"rune",price:42,rarity:"epic",socketAttack:3,description:"Инкрустированная руна даёт +3 атаки экипировке."},
    void_rune:{id:"void_rune",name:"Руна Бездны",icon:"cursed_relic",type:"rune",price:48,rarity:"epic",socketDefense:2,socketMaxHp:8,description:"Инкрустированная руна даёт +2 защиты и +8 максимального здоровья."},
    lightning_rune:{id:"lightning_rune",name:"Руна Молнии",icon:"gold_charm",type:"rune",price:52,rarity:"legendary",socketAttack:2,socketCrit:5,description:"Инкрустированная руна даёт +2 атаки и +5% критического шанса."}
  },
  monsters: [
    {id:"wolf",name:"Голодный волк",icon:"wolf",hp:28,attack:5,defense:1,xp:12,gold:[4,10],dodge:8,stance:"Aggressive",specialCooldown:3,weakness:["fire"],resist:["physical"],description:"Зверь с рёбрами, проступающими сквозь шкуру."},
    {id:"bandit",name:"Дорожный головорез",icon:"sword",hp:36,attack:7,defense:2,xp:18,gold:[8,17],dodge:4,stance:"Aggressive",specialCooldown:3,weakness:["holy"],resist:["physical"],description:"Когда-то он тоже искал честную жизнь."},
    {id:"skeleton",name:"Костяной страж",icon:"skull",hp:43,attack:8,defense:3,xp:22,gold:[5,14],dodge:2,stance:"Defensive",specialCooldown:3,weakness:["fire","holy"],resist:["physical","poison"],description:"Старая броня звенит на костях безымянного воина."},
    {id:"wraith",name:"Пепельный призрак",icon:"wraith",hp:51,attack:10,defense:2,xp:29,gold:[12,24],dodge:12,stance:"Parry",specialCooldown:2,weakness:["holy","fire"],resist:["physical","poison"],description:"Его шёпот напоминает голос того, кого ты потерял."},
    {id:"knight",name:"Падший рыцарь",icon:"knight",hp:72,attack:12,defense:5,xp:42,gold:[20,36],dodge:3,stance:"Defensive",specialCooldown:2,weakness:["lightning","holy"],resist:["physical","poison"],description:"Он всё ещё охраняет корону, которой больше нет."}
  ],
  roadEncounters: [
    {id:"bandit_ambush",title:"Засада разбойников",icon:"sword",text:"Из-за поваленной телеги выходят трое разбойников. Старший крутит нож и требует плату за проход.",choices:[{id:"fight",label:"Драться",tone:"danger",kind:"fight",result:"Ты не уступил дорогу головорезам."},{id:"pay",label:"Откупиться · 12 золота",tone:"gold",kind:"pay",amount:12,karma:-1,rep:{common:-1},result:"Разбойники забрали плату и скрылись в кустах."},{id:"flee",label:"Сбежать",tone:"ghost",kind:"flee",result:"Ты свернул с тракта и ушёл от засады."}]},
    {id:"wounded_traveler",title:"Раненый путник",icon:"heart",text:"У обочины лежит израненный странник. Он просит о помощи, но рядом валяется его раскрытая сумка.",choices:[{id:"help",label:"Помочь зельем",tone:"gold",kind:"help_potion",karma:3,rep:{common:4},result:"Путник выпил зелье, поблагодарил тебя и рассказал о безопасной тропе."},{id:"rob",label:"Ограбить",tone:"danger",kind:"rob",karma:-4,gold:18,rep:{common:-8},result:"Ты забрал монеты и оставил путника в пыли."},{id:"pass",label:"Пройти мимо",tone:"ghost",kind:"pass",karma:0,result:"Ты продолжил путь, не вмешиваясь в чужую беду."}]},
    {id:"abandoned_altar",title:"Заброшенный алтарь",icon:"sigil",text:"Между корнями выступает древний алтарь. На камне мерцают два знака: рассвет и чёрное солнце.",choices:[{id:"pray",label:"Помолиться · +Карма",tone:"gold",kind:"pray",karma:4,rep:{common:2},result:"Тёплый свет касается лица. Вера укрепила твою защиту."},{id:"desecrate",label:"Осквернить · +Скверна и золото",tone:"danger",kind:"desecrate",karma:-5,gold:22,rep:{common:-6},result:"Ты вырвал из алтаря тёмные монеты. Холодная сила проснулась внутри."}]}
  ],
  narrativeEvents: [
    {id:"corrupted_altar",title:"Осквернённый алтарь",icon:"sigil",text:"На развилке стоит алтарь из чёрного камня. В трещинах мерцает багровый свет, а с высеченных лиц стекает тёплая смола. Кажется, алтарь ждёт решения.",choices:[
      {label:"Помолиться",kind:"altar_pray",result:"Ты склонил голову перед забытыми именами."},
      {label:"Осквернить алтарь",kind:"altar_desecrate",result:"Камень треснул, и из него выпала древняя руна."},
      {label:"Пройти мимо",kind:"leave",result:"Ты оставил алтарь позади, не тревожа его покой."}
    ]},
    {id:"abandoned_cart",title:"Заброшенная повозка",icon:"scroll",text:"У дороги лежит перевёрнутая повозка. Колесо всё ещё вращается, хотя ветра нет. Под брезентом слышится тихий звон монет — и ещё что-то шевелится в темноте.",choices:[
      {label:"Обыскать повозку",kind:"cart_search",result:"Ты осторожно заглянул под порванный брезент."},
      {label:"Сжечь повозку",kind:"cart_burn",result:"Пламя пожирает брезент и освобождает дорогу."},
      {label:"Не рисковать",kind:"leave",result:"Ты решил не испытывать судьбу и пошёл дальше."}
    ]},
    {id:"pilgrim_note",title:"Записка паломника",icon:"scroll",text:"В расщелине камня спрятана записка: «Если дорога требует цену, спроси, кто её назначил». На обороте нарисован знак сокровищницы.",choices:[
      {label:"Следовать подсказке",kind:"pilgrim_follow",result:"Под камнем ты находишь припасы и несколько монет."},
      {label:"Оставить записку",kind:"leave",result:"Ты оставил чужие слова следующему путнику."}
    ]}
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
  mutations: [
    {id:"light_aegis",path:"light",name:"Эгида Рассвета",icon:"☼",karma:3,max:3,desc:"Каждый ранг даёт +2 защиты и снижает получаемый урон."},
    {id:"light_mend",path:"light",name:"Благословение живых",icon:"✚",karma:5,max:2,desc:"Лечение и зелья восстанавливают на 20% больше за ранг."},
    {id:"light_smite",path:"light",name:"Кара небес",icon:"✧",karma:7,max:3,desc:"Святой удар добавляет урон противникам."},
    {id:"dark_hunger",path:"dark",name:"Голод тени",icon:"☾",karma:-3,max:3,desc:"Вампиризм: восстанавливает 4% нанесённого урона за ранг."},
    {id:"dark_bloodprice",path:"dark",name:"Кровавая цена",icon:"♜",karma:-5,max:2,desc:"Потрать 5% текущего HP, чтобы усилить следующую атаку на 45% за ранг."},
    {id:"dark_spirit",path:"dark",name:"Призыв бесплотных",icon:"♧",karma:-7,max:2,desc:"Раз в бою тёмный дух наносит урон и ослабляет врага."}
  ],
  anomalies: [
    {id:"blood_altar",name:"Кровавый Алтарь",icon:"☠",desc:"Принеси 10 HP в жертву, чтобы получить проклятую реликвию и Скверну."},
    {id:"wandering_merchant",name:"Странствующий Купец",icon:"⚖",desc:"Редкая сделка: продай припасы по повышенной цене или купи реликвию."},
    {id:"forgotten_treasury",name:"Забытая Сокровищница",icon:"♜",desc:"Забери золото и шанс на редкую добычу."},
    {id:"rift",name:"Пепельный Разлом",icon:"ϟ",desc:"Разлом может даровать опыт и прозрение — или обжечь тело и душу."}
  ],
  pets: [
    {id:"fox",name:"Пепельный лис",icon:"🦊",desc:"Проворный спутник: +3% уклонения.",buff:{dodge:3},unlock:0},
    {id:"raven",name:"Ворон-проводник",icon:"🐦‍⬛",desc:"Находит ценности: +8% золота за победу.",buff:{gold:8},unlock:2},
    {id:"wisp",name:"Огненный огонёк",icon:"🔥",desc:"Усиливает магию: +2 к атаке.",buff:{attack:2},unlock:5}
  ],
  recipes: [
    {id:"healing_potion",name:"Сварить лечебное зелье",desc:"2 лунные травы + 1 склянка → лечебное зелье",station:"alchemy",cost:{moon_herb:2,empty_vial:1},result:"healing_potion",count:1},
    {id:"mana_tonic",name:"Настой синей луны",desc:"1 лунная трава + 1 пепельная пыль + 1 склянка → настой маны",station:"alchemy",cost:{moon_herb:1,ember_dust:1,empty_vial:1},result:"mana_tonic",count:1},
    {id:"poison_oil",name:"Ядовитое масло",desc:"1 Корень Бездны + 1 пепельная пыль + 1 склянка → масло на 3 удара",station:"alchemy",cost:{void_root:1,ember_dust:1,empty_vial:1},result:"poison_oil",count:1},
    {id:"blood_rune",name:"Руна Крови",desc:"2 пепельные пыли + 1 Корень Бездны → руна атаки",station:"rune",cost:{ember_dust:2,void_root:1},result:"blood_rune",count:1},
    {id:"void_rune",name:"Руна Бездны",desc:"2 Корня Бездны + 1 железная руда → защитная руна",station:"rune",cost:{void_root:2,iron_ore:1},result:"void_rune",count:1},
    {id:"lightning_rune",name:"Руна Молнии",desc:"2 пепельные пыли + 1 железная руда → руна критического удара",station:"rune",cost:{ember_dust:2,iron_ore:1},result:"lightning_rune",count:1},
    {id:"iron_ore",name:"Переплавить железную руду",desc:"3 железные руды → 18 золота",station:"forge",cost:{iron_ore:3},result:"gold",count:18}
  ],
  v30Talents: [
    {id:"blood_edge",tree:"blood",name:"Кровавое лезвие",icon:"🗡️",desc:"+4% физического урона за ранг",max:5},
    {id:"blood_thirst",tree:"blood",name:"Жажда крови",icon:"🩸",desc:"Вампиризм 2% за ранг",max:3},
    {id:"dark_focus",tree:"dark",name:"Фокус Бездны",icon:"🔮",desc:"Заклинания сильнее на 5% за ранг",max:5},
    {id:"mana_economy",tree:"dark",name:"Тихое течение",icon:"🌑",desc:"Стоимость заклинаний ниже на 1 MP за ранг",max:3},
    {id:"guardian_vitality",tree:"survival",name:"Стойкость стража",icon:"🛡️",desc:"+8 максимального HP за ранг",max:5},
    {id:"curse_resist",tree:"survival",name:"Непокорённая воля",icon:"✴️",desc:"Снижает риск негативных эффектов",max:3}
  ],
  abyssEnemies: [
    {id:"skeleton",name:"Костяной страж",icon:"skeleton",hp:38,attack:7,defense:1,xp:18,gold:[8,15],dodge:4,description:"Старый воин, чьи кости скреплены пеплом."},
    {id:"wraith",name:"Безликий шёпот",icon:"wraith",hp:32,attack:9,defense:0,xp:22,gold:[10,18],dodge:12,description:"Тень, которая помнит каждое имя."},
    {id:"knight",name:"Рыцарь без знамени",icon:"knight",hp:54,attack:10,defense:4,xp:28,gold:[12,22],dodge:5,description:"Доспехи служат хозяину, которого давно нет."}
  ],
  v30Events: [
    {id:"corrupted_altar",title:"Осквернённый алтарь",icon:"sigil",text:"На чёрном камне мерцает имя давно забытого бога. Алтарь ждёт, что ты выберешь.",choices:[{label:"🙏 Помолиться",kind:"altar_pray",result:"Ты доверился древней силе."},{label:"☠ Осквернить",kind:"altar_desecrate",result:"Ты забрал силу алтаря себе."},{label:"Пройти мимо",kind:"pass",result:"Ты не стал тревожить алтарь."}]},
    {id:"abandoned_cart",title:"Заброшенная повозка",icon:"chest",text:"Колесо сломано, следы обрываются в грязи. Под брезентом что-то тихо звенит.",choices:[{label:"🔎 Обыскать",kind:"cart_search",result:"Ты исследовал повозку."},{label:"🔥 Сжечь",kind:"cart_burn",result:"Огонь очистил дорогу."},{label:"Оставить в покое",kind:"pass",result:"Ты продолжил путь."}]}
  ],
  quests: [
    {id:"first_blood",name:"Первая кровь",description:"Победи любого врага на дороге.",goal:1,reward:{gold:15,xp:20},type:"kills"},
    {id:"kind_heart",name:"Не всё продаётся",description:"Совершить доброе событие дважды.",goal:2,reward:{gold:12,xp:18},type:"good"},
    {id:"road_wanderer",name:"Пыльный тракт",description:"Исследовать дорогу три раза.",goal:3,reward:{gold:20,xp:25},type:"travel"}
  ]
};
