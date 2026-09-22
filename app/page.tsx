"use client";
import { useState } from "react";
type View = "home" | "setup" | "lesson" | "teacher" | "judge";
type Task = {
  text: string;
  options: string[];
  answer: string;
  hint: string;
  correction: string;
  skill: string;
  type: string;
};
type Analysis = {
  grade: string;
  topic: string;
  goal: string;
  type: string;
  level: string;
  count: number;
  direction: string;
};
const topics: Record<string, string[]> = {
  "1-сынып": [
    "10 көлеміндегі қосу",
    "20 көлеміндегі азайту",
    "Сандарды салыстыру",
    "Қарапайым теңдеулер",
    "Геометриялық фигуралар",
  ],
  "2-сынып": [
    "Ондық және бірлік",
    "Қосу және азайту",
    "Көбейтуге кіріспе",
    "Ақша және уақыт",
    "Мәтін есептер",
  ],
  "3-сынып": [
    "Көбейту және бөлу",
    "Мәтін есептер",
    "Қозғалыс",
    "Кестемен жұмыс",
    "Периметр",
  ],
  "4-сынып": [
    "Көп таңбалы сандар",
    "Бөлшектер",
    "Аудан және периметр",
    "Баға–сан–құн",
    "PISA логикасы",
  ],
};
const students = [
  "Абдукарин Айлин", "Асан Бейбарыс", "Асылбек Аделья", "Алматұлы Дидар",
  "Абзалұлы Арсен", "Азатұлы СаянАйдархан", "Бейбітұлы Нұрасыл", "Берікұлы Арман",
  "Билал Айша", "Билал Мұстафа", "Ғалымжан Муслим", "Ермағанбет Сезім",
  "Жолдыбай Медина", "Қаратай Алинұр", "Қанатқызы Адина", "Қуанышбай Раяна",
  "Құрманғали Ғани", "Мұстафин Мұса", "Нұржанұлы Нұрхан", "Сарсенбай Зейін",
  "Сарқыт Кәусар", "Серікбай Айлин", "Серікбай Нариман",
];
const bank: Record<string, Task[]> = {
  "1-сынып": [
    {
      text: "Себетте 6 алма бар еді. Тағы 3 алма салынды. Барлығы неше алма?",
      options: ["8", "9", "10", "11"],
      answer: "9",
      hint: "6 санынан кейін үш қадам алға сана.",
      correction: "6 + 1 + 1 + 1 өрнегін есепте.",
      skill: "10 көлемінде қосу",
      type: "Өмірлік жағдаят",
    },
    {
      text: "Қай сан артық: 14 әлде 9?",
      options: ["14", "9", "Екеуі тең"],
      answer: "14",
      hint: "Сандар сызығында қайсысы оң жақта?",
      correction: "9-дан кейін 14-ке дейін санап көр.",
      skill: "Сандарды салыстыру",
      type: "Салыстыру",
    },
  ],
  "2-сынып": [
    {
      text: "63 санын разрядтық қосылғыштарға жікте.",
      options: ["60 + 3", "6 + 3", "30 + 6", "60 + 30"],
      answer: "60 + 3",
      hint: "63 санында неше ондық және неше бірлік бар?",
      correction: "6 ондықты санмен жаз, кейін 3 бірлікті қос.",
      skill: "Разрядтық қосылғыштар",
      type: "Бір жауапты таңдау",
    },
    {
      text: "Бір қорапта 4 қарындаш бар. 5 қорапта неше қарындаш бар?",
      options: ["9", "20", "25", "15"],
      answer: "20",
      hint: "4 саны 5 рет қайталанса, қандай қосынды шығады?",
      correction: "4 + 4 + 4 + 4 + 4 өрнегін есепте.",
      skill: "Көбейту мағынасы",
      type: "Функционалдық сауаттылық",
    },
  ],
  "3-сынып": [
    {
      text: "Кітапханаға 36 кітап әкелінді. 14-і ертегі. Танымдық кітап нешеу?",
      options: ["20", "22", "24", "50"],
      answer: "22",
      hint: "Барлық кітаптан ертегі кітаптарды азайт.",
      correction: "36 − 10, содан кейін тағы 4-ті азайт.",
      skill: "Мәтін есепті модельдеу",
      type: "Мәтін есеп",
    },
    {
      text: "Автобус сағатына 60 км жүреді. 3 сағатта қанша жол жүреді?",
      options: ["20 км", "63 км", "180 км", "240 км"],
      answer: "180 км",
      hint: "60 км үш рет қайталанады.",
      correction: "60 + 60 + 60 мәнін тап.",
      skill: "Жылдамдық пен уақыт",
      type: "Қозғалыс есебі",
    },
  ],
  "4-сынып": [
    {
      text: "Бір дәптер 120 теңге. 5 дәптер қанша тұрады?",
      options: ["125 тг", "500 тг", "600 тг", "620 тг"],
      answer: "600 тг",
      hint: "Бағаны дәптер санына көбейт.",
      correction: "12 × 5-ті тауып, нәтижеге бір нөл тірке.",
      skill: "Баға–сан–құн",
      type: "Функционалдық сауаттылық",
    },
    {
      text: "Тік төртбұрыштың ұзындығы 8 м, ені 5 м. Ауданы неше?",
      options: ["13 м²", "26 м²", "40 м²", "80 м²"],
      answer: "40 м²",
      hint: "Аудан үшін ұзындық пен енді көбейтеміз.",
      correction: "8 қатардың әрқайсысында 5 шаршыдан деп ойла.",
      skill: "Аудан",
      type: "Геометриялық тапсырма",
    },
  ],
};
function analyze(p: string): Analysis {
  const l = p.toLowerCase(),
    m = l.match(/[1-4]\s*[-–]?\s*сынып/),
    grade = m ? `${m[0].match(/[1-4]/)?.[0]}-сынып` : "2-сынып";
  const topic = l.includes("көбей")
    ? "Көбейту"
    : l.includes("бөлшек")
      ? "Бөлшектер"
      : l.includes("аудан")
        ? "Аудан"
        : l.includes("ақша") || l.includes("баға")
          ? "Ақша және баға"
          : l.includes("кесте")
            ? "Кестемен жұмыс"
            : l.includes("бөлу")
              ? "Бөлу"
              : l.includes("қосу")
                ? "Қосу"
                : l.includes("азайту")
                  ? "Азайту"
                  : l.includes("мәтін")
                    ? "Мәтін есеп"
                    : "Математикалық логика";
  const count = Math.min(
      10,
      Math.max(1, Number(l.match(/(\d+)\s*(тапсырма|есеп|тест)/)?.[1] || 5)),
    ),
    direction = l.includes("pisa")
      ? "PISA бағыты"
      : l.includes("функционал")
        ? "Функционалдық сауаттылық"
        : l.includes("ойын")
          ? "Ойын форматы"
          : "Адаптивті оқыту",
    type = l.includes("ойын")
      ? "Интерактивті ойын"
      : l.includes("тест")
        ? "Шағын тест"
        : l.includes("кесте")
          ? "Кестемен жұмыс"
          : l.includes("мәтін")
            ? "Мәтін есеп"
            : "Деңгейлік тапсырмалар";
  return {
    grade,
    topic,
    goal: `${topic} тақырыбын өмірлік жағдайда қолдану`,
    type,
    level: l.includes("күрделі")
      ? "C деңгейі"
      : l.includes("жеңіл")
        ? "A деңгейі"
        : "A → B → C",
    count,
    direction,
  };
}
function generate(a: Analysis): Task[] {
  return Array.from({ length: a.count }, (_, i) => {
    const x = (i + 2) * (Number(a.grade[0]) + 1),
      y = i + 3;
    if (a.topic === "Көбейту")
      return {
        text: `Бір бумада ${y} дәптер бар. Осындай ${Number(a.grade[0]) + 2} бумада неше дәптер бар?`,
        options: [
          `${y + Number(a.grade[0]) + 2}`,
          `${y * (Number(a.grade[0]) + 2)}`,
          `${y * (Number(a.grade[0]) + 3)}`,
          `${y * 2}`,
        ],
        answer: `${y * (Number(a.grade[0]) + 2)}`,
        hint: `${y} саны неше рет қайталанатынын анықта.`,
        correction: `${y} санын ${Number(a.grade[0]) + 2} рет қосып көр.`,
        skill: "Көбейтуді өмірде қолдану",
        type: a.direction,
      };
    if (a.topic === "Аудан")
      return {
        text: `Ұзындығы ${x} м, ені ${y} м алаңның ауданын тап.`,
        options: [
          `${x + y} м²`,
          `${x * y} м²`,
          `${2 * (x + y)} м²`,
          `${x * y + y} м²`,
        ],
        answer: `${x * y} м²`,
        hint: "Аудан — ұзындық пен еннің көбейтіндісі.",
        correction: `${x} × ${y} өрнегін есепте.`,
        skill: "Ауданды есептеу",
        type: "PISA тапсырмасы",
      };
    if (a.topic === "Бөлу")
      return {
        text: `${x * y} кәмпитті ${y} балаға тең бөлді. Әр бала неше кәмпит алды?`,
        options: [`${x}`, `${y}`, `${x + y}`, `${x * y - y}`],
        answer: `${x}`,
        hint: "Барлық кәмпитті бала санына бөл.",
        correction: `${x * y} ішінде ${y} саны неше рет бар?`,
        skill: "Бөлуді қолдану",
        type: a.type,
      };
    return {
      text: `${x + y} саны мен ${y} санының айырмасын тап.`,
      options: [`${x}`, `${x + y + y}`, `${x - y}`, `${y}`],
      answer: `${x}`,
      hint: "Үлкен саннан кіші санды азайт.",
      correction: `${x + y} − ${y} өрнегін орында.`,
      skill: a.topic,
      type: a.type,
    };
  });
}
export default function Home() {
  const [view, setView] = useState<View>("home"),
    [name, setName] = useState("Аружан"),
    [grade, setGrade] = useState("2-сынып"),
    [topic, setTopic] = useState(topics["2-сынып"][0]),
    [index, setIndex] = useState(0),
    [selected, setSelected] = useState(""),
    [phase, setPhase] = useState<"idle" | "wrong" | "hint" | "correct">("idle"),
    [correct, setCorrect] = useState(0),
    [errors, setErrors] = useState(0),
    [prompt, setPrompt] = useState(
      "2-сынып оқушыларына көбейту тақырыбы бойынша функционалдық сауаттылыққа арналған 5 деңгейлік тапсырма құрастыр. Қате жауапты талдап, түзету тапсырмасын бер.",
    ),
    [analysis, setAnalysis] = useState<Analysis | null>(null),
    [made, setMade] = useState<Task[]>([]),
    [ji, setJi] = useState(0),
    [ja, setJa] = useState(""),
    [jp, setJp] = useState<"idle" | "wrong" | "correct">("idle");
  const task = bank[grade][index % 2],
    score = Math.round((correct / Math.max(1, correct + errors)) * 100),
    jt = made[ji];
  const check = () => {
    if (selected === task.answer) {
      setPhase("correct");
      setCorrect((x) => x + 1);
    } else {
      setPhase("wrong");
      setErrors((x) => x + 1);
    }
  };
  return (
    <main>
      <header>
        <button className="brand" onClick={() => setView("home")}>
          <i>
            AI<b>+</b>
          </i>
          <span>
            AI-MATH <em>QADAM</em>
          </span>
        </button>
        {view !== "home" && (
          <div className="head-actions">
            <button onClick={() => setView("home")}>⌂ Басты бет</button>
            <i>А</i>
          </div>
        )}
      </header>
      {view === "home" && (
        <section className="home">
          <div className="hero">
            <span className="kicker">✦ ЖЕКЕ ОҚУ ТРАЕКТОРИЯСЫ</span>
            <h1>
              Әр қате —<br />
              <em>келесі оқу қадамы.</em>
            </h1>
            <p>
              Оқушының білімін диагностикалап, қатесін интеллектуалды талдап,
              жеке тапсырма мен келесі оқу қадамын ұсынатын цифрлық ұстаз.
            </p>
            <div className="roles">
              <button className="primary" onClick={() => setView("setup")}>
                <i>🎒</i>
                <span>
                  ОҚУШЫ<small>Оқуды бастау</small>
                </span>
                <b>→</b>
              </button>
              <button onClick={() => setView("teacher")}>
                <i>▤</i>
                <span>
                  ПЕДАГОГ<small>Сыныпты басқару</small>
                </span>
                <b>→</b>
              </button>
            </div>
            <button className="judge-entry" onClick={() => setView("judge")}>
              ✦ AI-ТАПСЫРМА ҚҰРАСТЫРУ <b>→</b>
            </button>
            <button className="how">▶ Платформа қалай жұмыс істейді?</button>
          </div>
          <div className="visual">
            <div className="orbit one" />
            <div className="orbit two" />
            <div className="bot">
              <div className="spark">✦</div>
              <div className="face">
                <i />
                <i />
                <span />
              </div>
              <div className="body">Q</div>
            </div>
            <div className="float top">
              <i>🎯</i>
              <span>
                <b>Жеке оқу қадамы</b>
                <small>Саған арнайы</small>
              </span>
            </div>
            <div className="float left">
              <i>🧠</i>
              <span>
                <b>AI талдау</b>
                <small>Қатенің себебін табады</small>
              </span>
            </div>
            <div className="float bottom">
              <i>↗</i>
              <span>
                <b>+24%</b>
                <small>Оқу прогресі</small>
              </span>
            </div>
          </div>
          <div className="cycle">
            <div>
              <i>01</i>
              <span>
                <b>Диагностика</b>
                <small>Деңгейді анықтаймыз</small>
              </span>
            </div>
            <b>→</b>
            <div>
              <i>02</i>
              <span>
                <b>Ақылды талдау</b>
                <small>Қатенің себебін табамыз</small>
              </span>
            </div>
            <b>→</b>
            <div>
              <i>03</i>
              <span>
                <b>Жеке қадам</b>
                <small>Саған сай тапсырма береміз</small>
              </span>
            </div>
          </div>
        </section>
      )}
      {view === "setup" && (
        <section className="setup">
          <button className="back" onClick={() => setView("home")}>
            ← Артқа
          </button>
          <div className="setup-card">
            <div className="setup-icon">
              ✦<i>÷</i>
            </div>
            <small className="steps">ОҚУШЫ ПРОФИЛІ</small>
            <h2>Танысайық! 👋</h2>
            <p>Саған сәйкес тапсырмалар дайындаймыз.</p>
            <label>Атың кім?</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
            <label>Сыныбың</label>
            <div className="grades">
              {Object.keys(topics).map((g) => (
                <button
                  className={g === grade ? "active" : ""}
                  onClick={() => {
                    setGrade(g);
                    setTopic(topics[g][0]);
                  }}
                  key={g}
                >
                  {g}
                </button>
              ))}
            </div>
            <label>Оқу тақырыбы</label>
            <select value={topic} onChange={(e) => setTopic(e.target.value)}>
              {topics[grade].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
            <button
              className="ai-choice"
              onClick={() =>
                setTopic(
                  topics[grade][
                    Math.floor(Math.random() * topics[grade].length)
                  ],
                )
              }
            >
              ✦ AI маған тақырып таңдасын
            </button>
            <button className="start" onClick={() => setView("lesson")}>
              Диагностиканы бастау <b>→</b>
            </button>
          </div>
        </section>
      )}
      {view === "lesson" && (
        <section className="app-layout">
          <aside>
            <div className="profile">
              <i>{name[0]}</i>
              <span>
                <b>{name}</b>
                <small>
                  {grade} · {topic}
                </small>
              </span>
            </div>
            <nav>
              <button className="active">◎ Тапсырма</button>
              <button>↗ Менің прогресім</button>
              <button>⌁ Оқу картасы</button>
            </nav>
            <div className="tip">
              💡<b>Есіңде болсын</b>
              <p>Қателесу — үйренудің бір бөлігі.</p>
            </div>
          </aside>
          <div className="lesson">
            <div className="lesson-title">
              <div>
                <small>{index < 5 ? "ДИАГНОСТИКА" : "ЖЕКЕ ТРАЕКТОРИЯ"}</small>
                <h2>{topic}</h2>
              </div>
              <span>{correct >= 3 ? "B деңгейі" : "A деңгейі"}</span>
            </div>
            <div className="progress">
              <div>
                <b>{index + 1}-тапсырма</b>
                <small>Прогресс: {score}%</small>
              </div>
              <i>
                <b style={{ width: `${Math.min(100, (index + 1) * 20)}%` }} />
              </i>
            </div>
            <article className="question">
              <i className="number">{index + 1}</i>
              <small className="task-type">{task.type}</small>
              <h3>{task.text}</h3>
              <div className="option-grid">
                {task.options.map((o) => (
                  <button
                    key={o}
                    className={selected === o ? "picked" : ""}
                    onClick={() => {
                      setSelected(o);
                      setPhase("idle");
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
              <button
                className="check-wide"
                disabled={!selected}
                onClick={check}
              >
                Жауапты тексеру
              </button>
              {phase === "wrong" && (
                <div className="feedback warn">
                  😊
                  <span>
                    <b>Қайта ойланып көрейік</b>
                    <p>
                      Қате түрі: {task.skill}. {task.hint}
                    </p>
                    <button onClick={() => setPhase("hint")}>
                      Түзету қадамы →
                    </button>
                  </span>
                </div>
              )}
              {phase === "hint" && (
                <div className="feedback info">
                  💡
                  <span>
                    <b>Шағын түзету тапсырмасы</b>
                    <p>{task.correction}</p>
                    <button
                      onClick={() => {
                        setSelected("");
                        setPhase("idle");
                      }}
                    >
                      Қайта орындау →
                    </button>
                  </span>
                </div>
              )}
              {phase === "correct" && (
                <div className="feedback success">
                  🌟
                  <span>
                    <b>Жарайсың, {name}!</b>
                    <p>{task.skill} дағдысы оқу картаңа қосылды.</p>
                    <button
                      onClick={() => {
                        setIndex((x) => x + 1);
                        setSelected("");
                        setPhase("idle");
                      }}
                    >
                      Келесі бейімделген тапсырма →
                    </button>
                  </span>
                </div>
              )}
            </article>
            <div className="learning-map">
              <div>
                <small>ДҰРЫС</small>
                <b>{correct}</b>
              </div>
              <div>
                <small>ҚАТЕ</small>
                <b>{errors}</b>
              </div>
              <div>
                <small>ДЕҢГЕЙ</small>
                <b>{correct >= 3 ? "Орта" : "Бастапқы"}</b>
              </div>
              <div>
                <small>КЕЛЕСІ ҚАДАМ</small>
                <b>{errors > correct ? "Түзету жұмысы" : "Күрделі тапсырма"}</b>
              </div>
            </div>
          </div>
        </section>
      )}
      {view === "judge" && (
        <section className="judge-page">
          <div className="judge-head">
            <span>✦ AI · ИНТЕРАКТИВТІ РЕЖИМ</span>
            <h1>AI-ТАПСЫРМА ҚҰРАСТЫРУ</h1>
            <p>
              Тапсырмаңыздың шартын немесе промтын енгізіңіз. AI-MATH QADAM
              берілген талаптарды талдап, сәйкес цифрлық оқу тапсырмасын
              автоматты түрде құрастырады.
            </p>
          </div>
          <div className="judge-workspace">
            <section className="prompt-card">
              <label>ТАПСЫРМА НЕМЕСЕ ПРОМТ</label>
              <textarea
                placeholder="Тапсырма немесе промтты осында жазыңыз..."
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  setAnalysis(null);
                  setMade([]);
                }}
              />
              <div className="prompt-examples">
                <button
                  onClick={() =>
                    setPrompt("3-сыныпқа бөлуді үйрететін ойын жаса.")
                  }
                >
                  3-сынып · Бөлу
                </button>
                <button
                  onClick={() =>
                    setPrompt(
                      "4-сыныпқа аудан тақырыбынан PISA тапсырмасын жаса.",
                    )
                  }
                >
                  4-сынып · PISA
                </button>
                <button
                  onClick={() =>
                    setPrompt(
                      "1-сыныпқа 10 көлемінде қосуға арналған 4 интерактивті тапсырма жаса.",
                    )
                  }
                >
                  1-сынып · Қосу
                </button>
              </div>
              <button
                className="analyze-btn"
                onClick={() => {
                  setAnalysis(analyze(prompt));
                  setMade([]);
                }}
              >
                ТАЛДАУ ЖӘНЕ ҚҰРАСТЫРУ
              </button>
            </section>
            {analysis && (
              <section className="analysis-card">
                <div className="analysis-ok">✓ Промт талданды</div>
                <h3>AI анықтаған талаптар</h3>
                <div className="analysis-grid">
                  <div>
                    <small>СЫНЫП</small>
                    <b>{analysis.grade}</b>
                  </div>
                  <div>
                    <small>ПӘН</small>
                    <b>Математика</b>
                  </div>
                  <div>
                    <small>ТАҚЫРЫП</small>
                    <b>{analysis.topic}</b>
                  </div>
                  <div>
                    <small>БАҒЫТ</small>
                    <b>{analysis.direction}</b>
                  </div>
                  <div>
                    <small>ТАПСЫРМА ТҮРІ</small>
                    <b>{analysis.type}</b>
                  </div>
                  <div>
                    <small>КҮРДЕЛІЛІК</small>
                    <b>{analysis.level}</b>
                  </div>
                  <div className="wide">
                    <small>ОҚУ МАҚСАТЫ</small>
                    <b>{analysis.goal}</b>
                  </div>
                </div>
                <button
                  className="create-resource"
                  onClick={() => {
                    setMade(generate(analysis));
                    setJi(0);
                    setJa("");
                    setJp("idle");
                  }}
                >
                  РЕСУРСТЫ ЖАСАУ <b>→</b>
                </button>
              </section>
            )}
          </div>
          {jt && (
            <section className="generated">
              <div className="generated-top">
                <div>
                  <span>AI ЖАСАҒАН ЖАҢА РЕСУРС</span>
                  <h2>
                    {analysis?.topic} · {analysis?.grade}
                  </h2>
                </div>
                <b>
                  {ji + 1} / {made.length}
                </b>
              </div>
              <article className="judge-task">
                <small>
                  {jt.type} · {ji < 2 ? "A" : ji < 4 ? "B" : "C"} деңгейі
                </small>
                <h3>{jt.text}</h3>
                <div className="option-grid">
                  {jt.options.map((o) => (
                    <button
                      key={o}
                      className={ja === o ? "picked" : ""}
                      onClick={() => {
                        setJa(o);
                        setJp("idle");
                      }}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <button
                  className="check-wide"
                  onClick={() => setJp(ja === jt.answer ? "correct" : "wrong")}
                  disabled={!ja}
                >
                  Тексеру
                </button>
                {jp === "wrong" && (
                  <div className="feedback warn">
                    🧠
                    <span>
                      <b>AI қате талдауы</b>
                      <p>{jt.hint}</p>
                      <p>
                        <strong>Түзету:</strong> {jt.correction}
                      </p>
                    </span>
                  </div>
                )}
                {jp === "correct" && (
                  <div className="feedback success">
                    🌟
                    <span>
                      <b>Дұрыс тәсіл!</b>
                      <p>{jt.skill} дағдысы меңгерілді.</p>
                      <button
                        onClick={() => {
                          setJi((x) => Math.min(made.length - 1, x + 1));
                          setJa("");
                          setJp("idle");
                        }}
                      >
                        Келесі тапсырма →
                      </button>
                    </span>
                  </div>
                )}
              </article>
            </section>
          )}
        </section>
      )}
      {view === "teacher" && (
        <section className="app-layout teacher">
          <aside>
            <div className="profile">
              <i>ҚБ</i>
              <span>
                <b>Қамидуллаева Ботагөз Еркебұланқызы</b>
                <small>ПЕДАГОГ · 2 «А» сынып жетекшісі</small>
              </span>
            </div>
            <nav>
              <button className="active">▦ Жалпы шолу</button>
              <button>♙ Оқушылар</button>
              <button>▣ Тақырыптар</button>
              <button>↗ Есептер</button>
            </nav>
          </aside>
          <div className="dashboard">
            <div className="dash-head">
              <div>
                <small>БҮГІНГІ НӘТИЖЕ</small>
                <h2>Қайырлы күн, Ботагөз Еркебұланқызы! 👋</h2>
                <p>Сыныптың оқу динамикасы мен келесі қадамы.</p>
              </div>
              <button
                onClick={() =>
                  alert(
                    "AI талдау: 7 оқушы разрядтарды шатастырады. Көрнекі түзету жұмысы ұсынылды.",
                  )
                }
              >
                ✦ AI талдау
              </button>
            </div>
            <div className="stats">
              {[
                ["♙", "Оқушылар", "24", "20 белсенді"],
                ["✓", "Орташа нәтиже", "78%", "↑ 8% осы аптада"],
                ["!", "Назар қажет", "4", "қолдау керек"],
                ["✦", "Орындалды", "126", "тапсырма"],
              ].map((x, i) => (
                <div key={x[1]}>
                  <i className={`c${i}`}>{x[0]}</i>
                  <span>
                    <small>{x[1]}</small>
                    <b>{x[2]}</b>
                    <em>{x[3]}</em>
                  </span>
                </div>
              ))}
            </div>
            <div className="dash-grid">
              <article className="panel">
                <div className="panel-head">
                  <span>
                    <b>Сынып прогресі</b>
                    <small>Диагностика → қорытынды</small>
                  </span>
                  <em>+23% ↗</em>
                </div>
                <div className="chart">
                  {[55, 64, 70, 78, 88].map((n, i) => (
                    <div key={n}>
                      <i style={{ height: `${n}%` }}>
                        <b>{n}%</b>
                      </i>
                      <span>{i + 1}-кезең</span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="panel ai-panel">
                <div className="panel-head">
                  <span>
                    <b>AI ұсынысы</b>
                    <small>Келесі оқу қадамы</small>
                  </span>
                  <em>✦</em>
                </div>
                <div className="insight">
                  🧠
                  <p>
                    <b>Негізгі қиындық</b>Разрядтар мен есеп шартын модельдеу.
                  </p>
                </div>
                <div className="recommend">
                  <b>Ұсынылатын әрекет</b>
                  <p>
                    7 оқушыға көрнекі блоктармен жеке түзету тапсырмасын беру.
                  </p>
                </div>
                <button>Түзету тапсырмасын құру →</button>
              </article>
            </div>
            <article className="panel student-roster">
              <div className="panel-head">
                <span><b>ОҚУШЫЛАР</b><small>2 «А» сыныбы · {students.length} оқушы</small></span>
              </div>
              <div className="roster-grid">
                {students.map((student, i) => (
                  <div key={student}><i>{i + 1}</i><span>{student}</span></div>
                ))}
              </div>
            </article>
          </div>
        </section>
      )}
    </main>
  );
}
