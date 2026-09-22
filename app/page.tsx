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
  level?: "A" | "B" | "C";
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
const q=(level:Task["level"],text:string,answer:string,wrong:string[],skill:string,type="Есептеу"):Task=>({level,text,answer,options:[answer,...wrong],skill,type,hint:`${skill} ережесін есіңе түсіріп, амалды қайта таңда.`,correction:`Есепті бір қадамнан бөліп орындап, ${answer} нәтижесіне қалай жетуге болатынын тексер.`});
const bank:Record<string,Task[]>={
  "1-сынып":[
    q("A","7 + 2 = ?","9",["8","10","5"],"10 көлемінде қосу"),q("A","9 − 4 = ?","5",["4","6","13"],"10 көлемінде азайту"),q("A","6 санының алдында қандай сан тұр?","5",["4","6","7"],"Сандар қатары","Реттілік"),q("A","8 бен 5-тің қайсысы үлкен?","8",["5","Екеуі тең"],"Сандарды салыстыру","Салыстыру"),q("A","Бос орынды толтыр: 3 + □ = 8","5",["3","8","11"],"Белгісіз қосылғыш","Бос орынды толтыру"),
    q("B","Әлиде 5 алма болды. Анасы тағы 3 алма берді. Барлығы неше алма?","8 алма",["2 алма","7 алма","9 алма"],"Мәтін есеп","Өмірлік жағдаят"),q("B","10 кәмпиттің 4-еуін жеді. Неше кәмпит қалды?","6 кәмпит",["4 кәмпит","10 кәмпит","14 кәмпит"],"Азайтуды қолдану","Мәтін есеп"),q("B","Сандарды өсу ретімен орналастыр: 6, 2, 9, 4.","2, 4, 6, 9",["9, 6, 4, 2","2, 6, 4, 9","4, 2, 6, 9"],"Сандарды реттеу","Реттілік"),q("B","Салыстыр: 7 □ 9","7 < 9",["7 > 9","7 = 9"],"Сандарды салыстыру","Салыстыру"),q("B","Қатарды жалғастыр: 2, 4, 6, □, □","8, 10",["7, 8","6, 8","10, 12"],"Заңдылық","Реттілік"),
    q("C","Айшада 8 қарындаш бар. 3-еуі қызыл, қалғаны көк. Неше көк қарындаш бар?","5",["3","8","11"],"Логикалық мәтін есеп","Ойлау"),q("C","Үстелде 6 ойыншық тұр. 2-еуін алып кетті, кейін 4 ойыншық әкелді. Қазір неше ойыншық бар?","8",["4","6","12"],"Екі амалдық есеп","Ойлау")],
  "2-сынып":[
    q("A","34 + 25 = ?","59",["49","69","55"],"Екі таңбалы сандарды қосу"),q("A","76 − 43 = ?","33",["23","43","119"],"Екі таңбалы сандарды азайту"),q("A","58 = 50 + □","8",["5","50","108"],"Разрядтық қосылғыш"),q("A","72 санында неше ондық және неше бірлік бар?","7 ондық, 2 бірлік",["2 ондық, 7 бірлік","72 ондық","7 бірлік"],"Ондық және бірлік"),q("A","Салыстыр: 64 □ 46","64 > 46",["64 < 46","64 = 46"],"Екі таңбалы сандарды салыстыру","Салыстыру"),
    q("B","4 × 5 = ?","20",["9","16","25"],"Көбейту"),q("B","24 : 6 = ?","4",["3","6","18"],"Бөлу"),q("B","Бір қорапта 6 қарындаш бар. 4 қорапта неше қарындаш бар?","24",["10","20","28"],"Көбейтуді қолдану","Мәтін есеп"),q("B","35 + 27 − 12 = ?","50",["40","52","62"],"Екі амалдық өрнек"),q("B","80 − (20 + 15) = ?","45",["35","55","75"],"Жақшалы өрнек"),
    q("C","Дүкенде 45 дәптер болды. Таңертең 18, түстен кейін 12 дәптер сатылды. Неше дәптер қалды?","15",["27","30","33"],"Көп қадамды мәтін есеп","Функционалдық сауаттылық"),q("C","Бір бөтелкеде 2 литр су бар. 6 бөтелкеде қанша литр су болады?","12 л",["8 л","10 л","14 л"],"Көбейтуді қолдану","Өмірлік жағдаят"),q("C","1000 теңгеден 350 теңгеге дәптер, 250 теңгеге қалам алынды. Қанша теңге қалды?","400 тг",["350 тг","500 тг","600 тг"],"Ақшамен есептеу","Функционалдық сауаттылық")],
  "3-сынып":[
    q("A","245 + 136 = ?","381",["371","379","481"],"Үш таңбалы сандарды қосу"),q("A","573 − 248 = ?","325",["315","335","821"],"Үш таңбалы сандарды азайту"),q("A","7 × 8 = ?","56",["54","48","64"],"Көбейту кестесі"),q("A","54 : 6 = ?","9",["8","6","48"],"Бөлу кестесі"),q("A","326 санында неше жүздік, ондық және бірлік бар?","3 жүздік, 2 ондық, 6 бірлік",["3 ондық, 26 бірлік","2 жүздік, 3 ондық, 6 бірлік","326 бірлік"],"Разрядтар"),
    q("B","240 + 125 − 87 = ?","278",["268","288","452"],"Көп амалдық өрнек"),q("B","8 × 7 + 15 = ?","71",["56","63","81"],"Амалдардың реті"),q("B","72 : 8 + 34 = ?","43",["38","42","47"],"Амалдардың реті"),q("B","Ұзындығы 8 см, ені 5 см тіктөртбұрыштың периметрін тап.","26 см",["13 см","40 см","80 см"],"Периметр","Геометрия"),q("B","3 сағатта неше минут бар?","180 минут",["120 минут","150 минут","300 минут"],"Уақыт өлшемдері"),
    q("C","Кітапханада 245 кітап болды. 128 кітап әкелінді, 96 кітап берілді. Неше кітап қалды?","277",["269","373","469"],"Көп қадамды есеп","Функционалдық сауаттылық"),q("C","Автобус 1 сағатта 60 км жүреді. 4 сағатта қанша километр жүреді?","240 км",["64 км","180 км","300 км"],"Қозғалыс","Мәтін есеп"),q("C","Дәптер 120 тг, қалам 80 тг. 4 дәптер және 2 қалам үшін қанша төленеді?","640 тг",["560 тг","600 тг","720 тг"],"Баға–сан–құн","Функционалдық сауаттылық")],
  "4-сынып":[
    q("A","3456 + 2789 = ?","6245",["6145","6235","6345"],"Көп таңбалы сандарды қосу"),q("A","8000 − 3657 = ?","4343",["4243","4353","4657"],"Көп таңбалы сандарды азайту"),q("A","125 × 4 = ?","500",["400","450","625"],"Көбейту"),q("A","840 : 7 = ?","120",["110","140","147"],"Бөлу"),q("A","4567 санындағы 5 цифрының разрядтық мәні қандай?","500",["5","50","5000"],"Разрядтық мән"),
    q("B","245 × 3 + 180 = ?","915",["735","815","975"],"Амалдардың реті"),q("B","(560 − 125) : 5 = ?","87",["77","97","435"],"Жақшалы өрнек"),q("B","3 км 250 м = ? м","3250 м",["350 м","3025 м","325 м"],"Ұзындық өлшемдері"),q("B","2 сағат 35 минут = ? минут","155 минут",["135 минут","145 минут","235 минут"],"Уақыт өлшемдері"),q("B","Ұзындығы 12 см, ені 7 см тіктөртбұрыштың ауданын тап.","84 см²",["19 см²","38 см²","96 см²"],"Аудан","Геометрия"),
    q("C","Бірінші күні 18 л су, келесі күні 5 л аз жұмсалды. Екі күнде барлығы неше литр су жұмсалды?","31 л",["13 л","23 л","36 л"],"Көп қадамды есеп","Функционалдық сауаттылық"),q("C","Дәптер 150 тг, қалам 120 тг. 6 дәптер, 2 қалам алып, 2000 тг берді. Қайтарым қанша?","860 тг",["740 тг","900 тг","1140 тг"],"Ақшамен есептеу","Функционалдық сауаттылық"),q("C","Автобус сағатына 60 км жүрді. 3 сағат 30 минутта неше километр жүреді?","210 км",["180 км","200 км","240 км"],"Жылдамдық–уақыт–қашықтық","Функционалдық сауаттылық"),q("C","Мектептегі 240 оқушының 1/4 бөлігі спорт үйірмесіне қатысады. Неше оқушы?","60",["40","80","120"],"Санның үлесін табу","Бөлшек"),q("C","Кесте: Айдана — 4 кітап, Арман — 7, Сезім — 5, Нұрхан — 6. Ең көп оқыған оқушы кім?","Арман",["Айдана","Сезім","Нұрхан"],"Кестедегі мәліметті салыстыру","Кестемен жұмыс")]
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
  const task = bank[grade][index % bank[grade].length],
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
            <span>{task.level || (correct >= 3 ? "B" : "A")} деңгейі</span>
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
