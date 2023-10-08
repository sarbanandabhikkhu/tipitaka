const cped = [
  {
    w: "so",
    m: `he. ((nom. sin. of ta), m.)`,
  },
  {
    w: "bhagavā",
    m: `fortunate. (m.), the Buddha. (adj.)`,
  },
  {
    w: "arahaṃ",
    m: `worthy of; deserving. (adj.)`,
  },
  {
    w: "sammāsambuddho",
    m: `the perfectly Enlightened One. (m.)`,
  },
  {
    w: "sugato",
    m: `faring well; happy. (m.), the Buddha. (adj.)`,
  },
  {
    w: "anuttaro",
    m: `incomparable; unsurpassed. (adj.)`,
  },
  {
    w: "tena",
    m: `on account of it; because of it. (ind.)`,
  },
  {
    w: "kho",
    m: `indeed; really; surely; (an enclictic particle of affirmative and emphasis). (ind.)`,
  },
  {
    w: "pana",
    m: `and; yet; but; out the contrary; and now; more over. [(Adversative and interogative particle) ind.] (ind.)`,
  },
  {
    w: "samayena",
    m: `time; congregation; season; occasion; religion. (m.)`,
  },
];

const dictionaries = {};

dictionaries.config = {};

dictionaries.search = (word) => {
  const item = [];
  cped.map(({ w, m }) => {
    if (word.toLowerCase() === w) item.push({ word, m });
  });
  if (item.length) {
    alert(item.map(({ w, m }) => `${word}: ${m}\n`));
  }
};

dictionaries.click = () => {
  const regexp = /[a-zA-Z0-9āīūñṅṇṭḍṃḷঅ-ৰ]/;
  const punctuation = /[\,\;\.\!\?\’\”\{\}\[\]]/g;

  let selection = window.getSelection(),
    text = selection.anchorNode.data,
    index = selection.anchorOffset,
    symbol = "a";

  while (regexp.test(symbol) && symbol !== undefined) {
    symbol = text[index--];
  }
  index += 2;

  let word = "";
  symbol = "a";
  while (regexp.test(symbol) && index < text.length) {
    symbol = text[index++];
    word += symbol;
  }
  return word.replace(punctuation, ``).trim();
};

dictionaries.init = () => {
  document.addEventListener("click", (e) => {
    const isActive = document.querySelector("div[name='tab_content'].active");
    if (isActive) {
      const t1 = isActive === e.target.parentNode;
      const t2 = isActive === e.target.parentNode.parentNode;
      if (t1 || t2) dictionaries.search(dictionaries.click());
    }
  });
};

export default dictionaries;
