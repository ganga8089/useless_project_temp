export type Recipe = {
  slug: string;
  name: string;
  nameEn: string;
  time: string;
  level: string;
  desc: string;
  descEn: string;
  ingredients: string[];
  tools: string[];
  steps: string[];
  chefTip: string;
  tint: string;
};

export const recipes: Recipe[] = [
  {
    slug: "ila-curry",
    name: "Ila Curry",
    nameEn: "Leaf Curry",
    time: "5 minute",
    level: "Eluppam",
    desc: "Ilayum kurachu vellavum kallum. Muttathe ettavum famous curry!",
    descEn: "A leaf, a little water, a few pebbles — the courtyard classic.",
    ingredients: [
      "Valiya plaav ila - 2",
      "Kinattile vellam - kurachu",
      "Cheriya kallukal - 5",
      "Mulla poovu - 3",
    ],
    tools: ["Chirattayil undaakkiya bowl", "Marathinte spoon", "Ilathanda"],
    steps: [
      "Ila nannayi kazhuki, bowl pole madakkuka.",
      "Vellam ozhichu, kallukal onnonnaayi ittu koduka.",
      "Marathinte spoon kondu pathukke ilaki, curry-yude 'nirram' nokkuka.",
      "Mulla poovu mukalil vachu decorate cheyyuka. Ready!",
    ],
    chefTip: "Kallu adhikam venda ketto, curry kanam aakum!",
    tint: "var(--leaf-soft)",
  },
  {
    slug: "manchatti-payasam",
    name: "Manchatti Payasam",
    nameEn: "Mud-Pot Payasam",
    time: "8 minute",
    level: "Kurachu budhimuttu",
    desc: "Manninteyum vellathinteyum kalarnna nammude onam payasam.",
    descEn: "Mud, water and imagination — our own Onam payasam.",
    ingredients: [
      "Chuvanna mannu - 1 kai",
      "Vellam - 1 chirattayil",
      "Pullu kothiyathu - kurachu",
      "Manjal poovu - 2",
    ],
    tools: ["Cheriya manchatti", "Kolu vadi", "Ila plate"],
    steps: [
      "Manchattiyil mannum vellavum cherthu ilakkuka.",
      "Pullu chherthu 'semiya' aakkuka.",
      "Kolu vadi kondu nannayi ilaki, veyilathu vaykkuka.",
      "Manjal poovu ittu ella koottukarkkum vilambuka.",
    ],
    chefTip: "Payasam vilambumbol 'aaha' parayaan marakkaruthu!",
    tint: "var(--peach)",
  },
  {
    slug: "kallu-biryani",
    name: "Kallu Biryani",
    nameEn: "Pebble Biryani",
    time: "10 minute",
    level: "Kurachu budhimuttu",
    desc: "Kallukal ari aayi maarum, ila dum aayi maarum. Full biryani!",
    descEn: "Pebbles become rice, a leaf becomes the dum lid.",
    ingredients: [
      "Cheriya vella kallukal - 20",
      "Pacha ila - 3",
      "Manal - kurachu",
      "Chuvanna poovu - 2",
    ],
    tools: ["Valiya chiratta", "Ila lid", "Kolu vadi"],
    steps: [
      "Kallukal manalil kazhuki 'ari' aakkuka.",
      "Chirattayil ittu ila kondu moodi dum vaykkuka.",
      "Pathu ennam ennitt lid thurakkuka - nalla manam!",
      "Chuvanna poovu ittu serve cheyyuka.",
    ],
    chefTip: "Dum thurakkumbol kannu adachu manam pidikkanam!",
    tint: "var(--sunny)",
  },
  {
    slug: "poovu-juice",
    name: "Poovu Juice",
    nameEn: "Flower Juice",
    time: "3 minute",
    level: "Eluppam",
    desc: "Chuvanna chembarathi poovum vellavum. Nammude first juice shop.",
    descEn: "Hibiscus petals and water — the very first juice shop.",
    ingredients: ["Chembarathi poovu - 4", "Vellam - kurachu", "Ila - 1"],
    tools: ["Chiratta glass", "Kolu vadi"],
    steps: [
      "Poovinte ithalukal pathukke pizhiyuka.",
      "Vellathil ittu nirram varunna vare ilakkuka.",
      "Chiratta glass-il ozhichu ila straw vaykkuka.",
    ],
    chefTip: "Nirram pinkaayaal juice super aayi ennu artham!",
    tint: "var(--blush)",
  },
  {
    slug: "manal-dosa",
    name: "Manal Dosa",
    nameEn: "Sand Dosa",
    time: "6 minute",
    level: "Eluppam",
    desc: "Pareethiyile pole manal maavu, pareppu kallu chammanthi.",
    descEn: "Sand batter and a pebble chutney on the side.",
    ingredients: ["Nallla manal - 2 kai", "Vellam - kurachu", "Ila - 2"],
    tools: ["Pattiya kallu (dosa kallu)", "Ila spoon"],
    steps: [
      "Manalum vellavum cherthu maavu pruthiyil kalakkuka.",
      "Pattiya kallil maavu vitharthuka.",
      "Veyilathu unangumbol ila kondu maattuka.",
    ],
    chefTip: "Dosa vattathil aayaal ninakku 5 star!",
    tint: "var(--sand)",
  },
  {
    slug: "chiratta-sambar",
    name: "Chiratta Sambar",
    nameEn: "Coconut-Shell Sambar",
    time: "7 minute",
    level: "Kurachu budhimuttu",
    desc: "Chirattayil pullum poovum vellavum. Manam mathram imagination!",
    descEn: "Grass, petals and water in a coconut shell.",
    ingredients: ["Pullu - kurachu", "Poovu - 3", "Vellam", "Cheriya kallu - 4"],
    tools: ["Chiratta", "Kolu vadi", "Ila plate"],
    steps: [
      "Pullu cheriyathaayi murikkuka.",
      "Chirattayil vellam ozhichu ellaam cherkkuka.",
      "Nannayi ilakki, ila plate-il vilambuka.",
    ],
    chefTip: "Sambar-inu ottiri poovu venda, randu mathi!",
    tint: "var(--leaf-soft)",
  },
];

export type Ingredient = {
  name: string;
  nameEn: string;
  desc: string;
  emoji: string;
  tint: string;
};

export const ingredients: Ingredient[] = [
  { name: "Kallu", nameEn: "Stone", desc: "Ari, urulakizhangu, ellaam aakum.", emoji: "🪨", tint: "var(--sand)" },
  { name: "Ila", nameEn: "Leaf", desc: "Plate, bowl, pinne currykk ulla ila.", emoji: "🍃", tint: "var(--leaf-soft)" },
  { name: "Poovu", nameEn: "Flower", desc: "Decoration-um juice-um randum.", emoji: "🌸", tint: "var(--blush)" },
  { name: "Kolu vadi", nameEn: "Stick", desc: "Spoon, ladle, chilappol kathi.", emoji: "🥢", tint: "var(--peach)" },
  { name: "Mannu", nameEn: "Mud", desc: "Payasathinum cake-inum base.", emoji: "🟤", tint: "var(--wood-light)" },
  { name: "Vellam", nameEn: "Water", desc: "Ella recipe-yudeyum jeevan.", emoji: "💧", tint: "var(--sky-soft)" },
  { name: "Pullu", nameEn: "Grass", desc: "Semiya, noodles, cheera.", emoji: "🌾", tint: "var(--leaf-soft)" },
  { name: "Chiratta", nameEn: "Coconut shell", desc: "Nammude ettavum nalla pathram.", emoji: "🥥", tint: "var(--wood-light)" },
  { name: "Maram / Kambu", nameEn: "Wood", desc: "Aduppu undaakkaan best.", emoji: "🪵", tint: "var(--peach)" },
  { name: "Kuru", nameEn: "Seeds", desc: "Masala, uppu, pinne 'kadala'.", emoji: "🫘", tint: "var(--sunny)" },
];

export const quizQuestions = [
  {
    q: "Muttathe kitchen-il ettavum nalla 'plate' ethaanu?",
    options: ["Plaav ila", "Plastic cover", "Notebook page", "Chappal"],
    answer: 0,
    reaction: "Correct! Ila thanne aanu nammude royal plate!",
  },
  {
    q: "Kallu biryani-yil 'ari' aayi upayogikkunnathu enthu?",
    options: ["Manal", "Cheriya kallukal", "Pullu", "Poovu"],
    answer: 1,
    reaction: "Adipoli! Kallukal thanne nammude basmati!",
  },
  {
    q: "Poovu juice-inu ettavum nalla poovu?",
    options: ["Chembarathi", "Plastic poovu", "Kadalas poovu", "Onnumilla"],
    answer: 0,
    reaction: "Sheriyaanu! Chembarathi kondaal nirram pink aakum.",
  },
  {
    q: "Pretend food kondu enthu cheyyanam?",
    options: ["Kazhikkanam", "Kaanikkanam, kazhikkaruthu", "Vilkkanam", "Ottikkanam"],
    answer: 1,
    reaction: "Sheri! Ithokke kaanaan mathram, kazhikkaruthu ketto.",
  },
  {
    q: "Chiratta (coconut shell) kitchen-il enthinaanu upayogikkunnathu?",
    options: ["Cooking vessel / Bowl", "Football", "Pillow", "Hat"],
    answer: 0,
    reaction: "Super! Chiratta aanu nammude royal pot!",
  },
  {
    q: "Manchatti payasam (Mud payasam) base ingredient enthu?",
    options: ["Chuvanna mannu & vellam", "Chocolate syrup", "Ice cream", "Milk powder"],
    answer: 0,
    reaction: "Kollam! Mannum vellavum cherthoru payasam!",
  },
  {
    q: "Kuttikkaala pachakathil 'spoon' aayi ethaanu upayogikkarullathu?",
    options: ["Kolu vadi / Marathinte kambu", "Steel spoon", "Spatula", "Fork"],
    answer: 0,
    reaction: "Adipoli! Marathinte kolu vadi thanne best spoon!",
  },
  {
    q: "Ila curry-il decorate cheyyan ethu poov aanu best?",
    options: ["Mulla poovu / Jasmine", "Plastic poovu", "Paper rose", "Onnumilla"],
    answer: 0,
    reaction: "Correct! Mulla poovu vachal curry royal aakum!",
  },
  {
    q: "Courtyard kitchen-il 'aduppu' (stove) aayi enthaanu upayogikkarullathu?",
    options: ["Moottu kallukal (3 stones)", "Gas stove", "Micro-wave", "Induction"],
    answer: 0,
    reaction: "Sheriyaanu! Randu-moonnu kallu vachaal aduppu ready!",
  },
  {
    q: "Courtyard play-il 'Semiya' / 'Noodles' aayi upayogikkunna natural item?",
    options: ["Pullu (Grass)", "Kallu", "Vellam", "Mannu"],
    answer: 0,
    reaction: "Adipoli! Pullu murichal semiya ready!",
  },
  {
    q: "Manal dosa undaakkumbol 'dosa kallu' aayi upayogikkarulla samghathi?",
    options: ["Pattiya flat kallu", "Plastic tray", "Paper sheet", "Spoon"],
    answer: 0,
    reaction: "Super! Flat kallu aanu nammude dosa tava!",
  },
  {
    q: "Chiratta biryani 'dum' aakkaan mukalil moodunna item?",
    options: ["Valiya pacha ila", "Aluminum foil", "Glass lid", "Plastic wrap"],
    answer: 0,
    reaction: "Sheriyaanu! Valiya plaav ila moodiyaal dum biryani ready!",
  },
  {
    q: "Courtyard pretend cooking-il ettavum valiya rule enthaanu?",
    options: ["Kazhikkaruthu, imagination mathram!", "Bhakshanam kazhikkanam", "Kashu kodukkanam", "Dukham varanam"],
    answer: 0,
    reaction: "Correct! Pretend food kaanaan mathram, kazhikkaruthu!",
  },
  {
    q: "Courtyard pretend cooking-il 'Masala' / 'Uppu' aayi upayogikkunnathu?",
    options: ["Cheriya kuru / Podi manal", "Ketchup", "Salt packet", "Butter"],
    answer: 0,
    reaction: "Adipoli! Cheriya kuru & podi manal aanu nammude masala!",
  },
];

export const achievements = [
  { title: "First Recipe", desc: "Aadyathe recipe undaakki", emoji: "🍲", got: true },
  { title: "Ila Master", desc: "5 ila recipes kandu", emoji: "🍃", got: true },
  { title: "Kallu Collector", desc: "Ellaa ingredients-um kandu", emoji: "🪨", got: false },
  { title: "Quiz Champion", desc: "Quiz muzhuvan correct", emoji: "🏆", got: false },
  { title: "Ormma Keeper", desc: "Nostalgia page vayichu", emoji: "📖", got: true },
  { title: "Little Chef", desc: "Sontham recipe save cheythu", emoji: "👩‍🍳", got: false },
];

export const memories = [
  {
    title: "Mazhakkalathe adukkala",
    text: "Mazha peythu kazhinja muttathu, chirattayil vellam nirachu 'chaya' undaakkiya divasangal.",
    tag: "Mazhakkalam",
  },
  {
    title: "Onam sadhya, ilayil",
    text: "Ilayil manal choru, kallu upperi, pinne mannu payasam. Ellaam koodi oru sadhya!",
    tag: "Onam",
  },
  {
    title: "Ammayude adukkala jannal",
    text: "Ammayude adukkalayil ninnu varunna manam, purathu nammude cheriya adukkala.",
    tag: "Veedu",
  },
  {
    title: "Vaikittu vilikkunna amma",
    text: "'Veetil vaa!' ennu vilikkumbol, adukkala poottathe odiya nammal.",
    tag: "Sandhya",
  },
];
