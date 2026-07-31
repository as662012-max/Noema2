import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  BookOpen,
  Compass,
  Sprout,
  Clock,
  User,
  X,
  ArrowRight,
  ArrowUpRight,
  Minus,
  Sparkles,
  Check,
  Moon,
  Sun,
} from "lucide-react";

/* ----------------------------------------------------------------------
   NOEMA — Natural Intelligence
   Design tokens
   Paper:   #F7F4EE (light) / #1C1A17 (dark)
   Ink:     #2B2926 (light) / #ECE7DD (dark)
   Muted:   #8B8579 (light) / #948E80 (dark)
   Line:    #E3DDCF (light) / #35312A (dark)
   Sage:    #6E7A5A  — Grow / affirmative
   Plum:    #6C5065  — Decide / depth
   Clay:    #A9714F  — Promises / warmth
   Display: "Fraunces"  Body: "Public Sans"
------------------------------------------------------------------------- */

const QUALITIES = [
  {
    name: "Confidence",
    note: "You started three difficult conversations this month without waiting to feel ready first.",
    trend: "rising",
  },
  {
    name: "Self-awareness",
    note: "You're catching your own patterns mid-sentence now, not after the fact.",
    trend: "rising",
  },
  {
    name: "Consistency",
    note: "Reflection has become something you return to, not something you force.",
    trend: "steady",
  },
  {
    name: "Decision-making",
    note: "You're starting to name your fears before they quietly name your choices.",
    trend: "emerging",
  },
  {
    name: "Communication",
    note: "Not enough recent reflection to say much here yet — this one is still listening.",
    trend: "quiet",
  },
  {
    name: "Emotional resilience",
    note: "Setbacks have been lasting hours lately, not days.",
    trend: "rising",
  },
];

const TREND_LABEL = {
  rising: "Rising",
  steady: "Steady",
  emerging: "Emerging",
  quiet: "Quiet",
};

const DECIDE_QUESTIONS = [
  "What's making you consider this right now?",
  "What are you afraid might happen?",
  "What happens if things stay exactly as they are?",
  "What happens if you make the change?",
  "Which of your values feels most at stake here?",
];

const INITIAL_MEMORIES = [
  { id: 1, text: "You value honesty, even when it's inconvenient." },
  { id: 2, text: "You often doubt yourself right before starting something new." },
  { id: 3, text: "You enjoy making things with your hands, not just thinking about them." },
  { id: 4, text: "You've wanted to start a YouTube channel for over a year." },
  { id: 5, text: "You care deeply about originality — copying feels dishonest to you." },
];

const INITIAL_PROMISES = [
  {
    id: 1,
    text: "I'm going to publish my first video, even if it's imperfect.",
    why: "Because waiting for 'ready' has cost you a year already.",
    fear: "Being judged by people who knew you before.",
    date: "Made 6 weeks ago",
  },
  {
    id: 2,
    text: "One day I will ask for the raise instead of hinting at it.",
    why: "Because you've earned it and you know it.",
    fear: "Hearing 'no' and having to sit with that.",
    date: "Made 3 weeks ago",
  },
];

const NAV = [
  { id: "home", label: "Home", icon: Sparkles, hideInNav: true },
  { id: "think", label: "Think", icon: MessageCircle },
  { id: "reflect", label: "Reflect", icon: BookOpen },
  { id: "decide", label: "Decide", icon: Compass },
  { id: "grow", label: "Grow", icon: Sprout },
  { id: "memory", label: "Memory", icon: Clock },
  { id: "profile", label: "Profile", icon: User },
];

export default function Noema() {
  const [screen, setScreen] = useState("home");
  const [dark, setDark] = useState(false);
  const [homeInput, setHomeInput] = useState("");
  const [seedMessage, setSeedMessage] = useState("");

  const goThink = (text) => {
    setSeedMessage(text);
    setScreen("think");
  };

  return (
    <div
      data-theme={dark ? "dark" : "light"}
      className="noema-root w-full min-h-screen flex flex-col"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Public+Sans:wght@300;400;500;600&display=swap');

        .noema-root {
          --paper: #F7F4EE;
          --paper-soft: #F1EDE3;
          --card: #FFFFFF;
          --ink: #2B2926;
          --muted: #8B8579;
          --muted-2: #A29C8E;
          --line: #E3DDCF;
          --sage: #6E7A5A;
          --sage-soft: #EAEDE2;
          --plum: #6C5065;
          --plum-soft: #EEE7EC;
          --clay: #A9714F;
          --clay-soft: #F3E9E0;
          --shadow: 0 1px 2px rgba(43,41,38,0.04), 0 8px 24px rgba(43,41,38,0.05);
          background: var(--paper);
          color: var(--ink);
          font-family: 'Public Sans', sans-serif;
          transition: background 0.4s ease, color 0.4s ease;
        }
        .noema-root[data-theme='dark'] {
          --paper: #1C1A17;
          --paper-soft: #23201B;
          --card: #262320;
          --ink: #ECE7DD;
          --muted: #948E80;
          --muted-2: #726C60;
          --line: #35312A;
          --sage: #93A17C;
          --sage-soft: #2A2E23;
          --plum: #B598AC;
          --plum-soft: #2C2429;
          --clay: #CA9871;
          --clay-soft: #2E2620;
          --shadow: 0 1px 2px rgba(0,0,0,0.2), 0 8px 30px rgba(0,0,0,0.35);
        }
        .font-display { font-family: 'Fraunces', serif; }
        .grain::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          z-index: 1;
        }
        .thread {
          height: 1px;
          background: var(--line);
          transition: width 0.6s cubic-bezier(.4,0,.2,1);
        }
        .card-hover {
          transition: transform 0.35s cubic-bezier(.2,.8,.2,1), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .card-hover:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow);
        }
        .fade-in {
          animation: fadeIn 0.5s ease both;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        textarea:focus, input:focus, button:focus-visible {
          outline: 2px solid var(--muted-2);
          outline-offset: 2px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>

      <div className="grain" />

      {/* Top bar */}
      <header
        className="flex items-center justify-between px-6 md:px-10 py-6 z-10"
        style={{ borderBottom: screen === "home" ? "none" : `1px solid var(--line)` }}
      >
        <button
          onClick={() => setScreen("home")}
          className="font-display text-xl tracking-wide"
          style={{ color: "var(--ink)" }}
        >
          noema
        </button>
        <div className="flex items-center gap-3">
          <button
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
            className="w-9 h-9 rounded-full flex items-center justify-center card-hover"
            style={{ border: "1px solid var(--line)", color: "var(--muted)" }}
          >
            {dark ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <button
            onClick={() => setScreen("profile")}
            aria-label="Profile"
            className="w-9 h-9 rounded-full flex items-center justify-center card-hover"
            style={{ background: "var(--paper-soft)", color: "var(--muted)" }}
          >
            <User size={16} />
          </button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 px-6 md:px-10 pb-28 z-10">
        {screen === "home" && (
          <Home
            homeInput={homeInput}
            setHomeInput={setHomeInput}
            onThink={goThink}
            setScreen={setScreen}
          />
        )}
        {screen === "think" && <Think seed={seedMessage} />}
        {screen === "reflect" && <Reflect />}
        {screen === "decide" && <Decide />}
        {screen === "grow" && <Grow />}
        {screen === "memory" && <Memory />}
        {screen === "profile" && <Profile dark={dark} setDark={setDark} />}
      </main>

      {/* Bottom nav */}
      <nav
        className="fixed bottom-0 left-0 right-0 flex justify-center z-20"
        style={{ background: "var(--paper)", borderTop: "1px solid var(--line)" }}
      >
        <div className="flex gap-1 md:gap-3 py-2.5 px-3 overflow-x-auto max-w-3xl w-full justify-between md:justify-center">
          {NAV.filter((n) => !n.hideInNav).map((item) => {
            const Icon = item.icon;
            const active = screen === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className="flex flex-col items-center gap-1 px-3 md:px-5 py-1.5 rounded-2xl transition-colors"
                style={{
                  color: active ? "var(--ink)" : "var(--muted)",
                  background: active ? "var(--paper-soft)" : "transparent",
                }}
              >
                <Icon size={17} strokeWidth={active ? 2.1 : 1.6} />
                <span className="text-[10.5px] tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

/* ---------------------------------- HOME ---------------------------------- */

function Home({ homeInput, setHomeInput, onThink, setScreen }) {
  const threadWidth = Math.min(homeInput.length * 3, 100);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center pt-10 md:pt-16 fade-in">
      <span
        className="text-[11px] tracking-[0.2em] uppercase mb-6"
        style={{ color: "var(--muted)" }}
      >
        Natural Intelligence
      </span>
      <h1
        className="font-display text-center leading-tight mb-10"
        style={{ fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 400, color: "var(--ink)" }}
      >
        What are you thinking about?
      </h1>

      <div
        className="w-full rounded-3xl p-5 md:p-6"
        style={{ background: "var(--card)", boxShadow: "var(--shadow)", border: "1px solid var(--line)" }}
      >
        <textarea
          value={homeInput}
          onChange={(e) => setHomeInput(e.target.value)}
          placeholder="Start with whatever is on your mind..."
          rows={3}
          className="w-full bg-transparent resize-none text-[15px] md:text-base leading-relaxed"
          style={{ color: "var(--ink)" }}
        />
        <div className="thread mt-3 mb-4" style={{ width: `${threadWidth}%` }} />
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "var(--muted-2)" }}>
            No rush. Say it plainly.
          </span>
          <button
            onClick={() => homeInput.trim() && onThink(homeInput.trim())}
            disabled={!homeInput.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm transition-opacity"
            style={{
              background: "var(--ink)",
              color: "var(--paper)",
              opacity: homeInput.trim() ? 1 : 0.35,
            }}
          >
            Think
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full mt-8">
        <QuickCard
          icon={MessageCircle}
          title="Think"
          desc="For open conversations. Anything on your mind."
          onClick={() => setScreen("think")}
        />
        <QuickCard
          icon={BookOpen}
          title="Reflect"
          desc="Private journaling. Daily reflection, emotions, lessons learned."
          onClick={() => setScreen("reflect")}
        />
        <QuickCard
          icon={Compass}
          title="Decide"
          desc="A structured space for important decisions."
          accent="plum"
          onClick={() => setScreen("decide")}
        />
        <QuickCard
          icon={Sprout}
          title="Grow"
          desc="A dashboard of personal growth. Not productivity — growth."
          accent="sage"
          onClick={() => setScreen("grow")}
        />
      </div>
    </div>
  );
}

function QuickCard({ icon: Icon, title, desc, onClick, accent }) {
  const bg =
    accent === "sage" ? "var(--sage-soft)" : accent === "plum" ? "var(--plum-soft)" : "var(--paper-soft)";
  const iconColor = accent === "sage" ? "var(--sage)" : accent === "plum" ? "var(--plum)" : "var(--muted)";
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl p-5 card-hover"
      style={{ background: "var(--card)", border: "1px solid var(--line)" }}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center mb-4"
        style={{ background: bg, color: iconColor }}
      >
        <Icon size={16} />
      </div>
      <div className="font-display text-lg mb-1" style={{ color: "var(--ink)" }}>
        {title}
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
        {desc}
      </p>
    </button>
  );
}

/* ---------------------------------- THINK ---------------------------------- */

function Think({ seed }) {
  const initial = seed
    ? [
        { from: "user", text: seed },
        {
          from: "noema",
          text:
            "Before I say anything else — what's making this feel important to bring up right now, today?",
        },
      ]
    : [
        {
          from: "noema",
          text: "What are you thinking about? Take your time — there's no wrong way to start.",
        },
      ];

  const [messages, setMessages] = useState(initial);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input.trim() };
    setInput("");
    setMessages((m) => [...m, userMsg]);
    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          from: "noema",
          text:
            "That makes sense. Rather than jump to an answer, I'd rather understand it with you first — what would it look like if this went well?",
        },
      ]);
    }, 700);
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col pt-6 fade-in" style={{ minHeight: "60vh" }}>
      <div className="flex-1 flex flex-col gap-5 pb-6">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className="max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed"
              style={
                m.from === "user"
                  ? { background: "var(--ink)", color: "var(--paper)" }
                  : { background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink)" }
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>

      <div
        className="sticky bottom-24 rounded-2xl p-3 flex items-end gap-2"
        style={{ background: "var(--card)", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
          placeholder="Say more..."
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm px-2 py-1.5"
          style={{ color: "var(--ink)" }}
        />
        <button
          onClick={send}
          className="px-4 py-2 rounded-full text-sm"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------- REFLECT ---------------------------------- */

function Reflect() {
  const [mood, setMood] = useState(2);
  const moods = ["Heavy", "Uneasy", "Even", "Light", "Full"];

  const fields = [
    { key: "wins", label: "What went well", placeholder: "One or two things worth noticing..." },
    { key: "lessons", label: "What you're learning", placeholder: "A pattern, a mistake, a realization..." },
    { key: "regrets", label: "What you'd do differently", placeholder: "No judgment — just honesty..." },
    { key: "improve", label: "What you want to carry into tomorrow", placeholder: "A small intention..." },
  ];
  const [values, setValues] = useState({});

  return (
    <div className="max-w-2xl mx-auto pt-6 fade-in">
      <p className="text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: "var(--muted)" }}>
        {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}
      </p>
      <h1 className="font-display text-3xl mb-8" style={{ color: "var(--ink)" }}>
        Today's page
      </h1>

      <div
        className="rounded-2xl p-5 mb-5"
        style={{ background: "var(--card)", border: "1px solid var(--line)" }}
      >
        <p className="text-sm mb-4" style={{ color: "var(--muted)" }}>
          How does today sit with you?
        </p>
        <div className="flex justify-between items-center">
          {moods.map((m, i) => (
            <button key={m} onClick={() => setMood(i)} className="flex flex-col items-center gap-2 flex-1">
              <span
                className="w-3 h-3 rounded-full transition-transform"
                style={{
                  background: i === mood ? "var(--clay)" : "var(--line)",
                  transform: i === mood ? "scale(1.4)" : "scale(1)",
                }}
              />
              <span className="text-[11px]" style={{ color: i === mood ? "var(--ink)" : "var(--muted-2)" }}>
                {m}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {fields.map((f) => (
          <div
            key={f.key}
            className="rounded-2xl p-5"
            style={{ background: "var(--card)", border: "1px solid var(--line)" }}
          >
            <label className="text-sm font-medium block mb-2" style={{ color: "var(--ink)" }}>
              {f.label}
            </label>
            <textarea
              rows={2}
              placeholder={f.placeholder}
              value={values[f.key] || ""}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="w-full bg-transparent resize-none text-[14.5px] leading-relaxed"
              style={{ color: "var(--ink)" }}
            />
          </div>
        ))}
      </div>

      <button
        className="mt-6 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
        style={{ background: "var(--ink)", color: "var(--paper)" }}
      >
        Close today's page
        <Check size={14} />
      </button>
    </div>
  );
}

/* ---------------------------------- DECIDE ---------------------------------- */

function Decide() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState(Array(DECIDE_QUESTIONS.length).fill(""));
  const [answer, setAnswer] = useState("");
  const [done, setDone] = useState(false);

  const next = () => {
    const updated = [...answers];
    updated[step] = answer;
    setAnswers(updated);
    setAnswer("");
    if (step === DECIDE_QUESTIONS.length - 1) {
      setDone(true);
    } else {
      setStep(step + 1);
    }
  };

  if (!started) {
    return (
      <div className="max-w-xl mx-auto pt-16 text-center fade-in">
        <div
          className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: "var(--plum-soft)", color: "var(--plum)" }}
        >
          <Compass size={18} />
        </div>
        <h1 className="font-display text-3xl mb-4" style={{ color: "var(--ink)" }}>
          What are you deciding?
        </h1>
        <p className="text-sm mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
          Before Noema offers a view, it will ask a few honest questions. Answering them is the point —
          the guidance at the end is secondary.
        </p>
        <input
          placeholder="e.g. Whether I should quit my job"
          className="w-full rounded-2xl px-5 py-3.5 text-[15px] mb-5 text-center bg-transparent"
          style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
        />
        <button
          onClick={() => setStarted(true)}
          className="px-6 py-2.5 rounded-full text-sm"
          style={{ background: "var(--ink)", color: "var(--paper)" }}
        >
          Begin
        </button>
      </div>
    );
  }

  if (done) {
    return (
      <div className="max-w-xl mx-auto pt-14 fade-in">
        <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--plum)" }}>
          What Noema noticed
        </span>
        <h1 className="font-display text-2xl mt-3 mb-5" style={{ color: "var(--ink)" }}>
          A few honest observations
        </h1>
        <div
          className="rounded-2xl p-6 leading-relaxed text-[15px] mb-6"
          style={{ background: "var(--card)", border: "1px solid var(--line)", color: "var(--ink)" }}
        >
          You're not actually unsure what you want — you're unsure whether it's safe to want it. The fear
          you named shows up twice in what you wrote, and the value you named barely shows up at all yet.
          That gap is usually where the real decision is hiding.
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
          This isn't an answer. It's a mirror. Sit with it before you act.
        </p>
        <button
          onClick={() => {
            setStarted(false);
            setStep(0);
            setDone(false);
            setAnswers(Array(DECIDE_QUESTIONS.length).fill(""));
          }}
          className="text-sm underline"
          style={{ color: "var(--muted)" }}
        >
          Start a different decision
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto pt-14 fade-in">
      <div className="flex gap-1.5 mb-8">
        {DECIDE_QUESTIONS.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full flex-1"
            style={{ background: i <= step ? "var(--plum)" : "var(--line)" }}
          />
        ))}
      </div>
      <h1 className="font-display text-2xl md:text-3xl mb-6 leading-snug" style={{ color: "var(--ink)" }}>
        {DECIDE_QUESTIONS[step]}
      </h1>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={4}
        placeholder="Answer honestly. No one else reads this."
        className="w-full rounded-2xl p-5 text-[15px] leading-relaxed bg-transparent mb-5"
        style={{ border: "1px solid var(--line)", color: "var(--ink)" }}
      />
      <button
        onClick={next}
        disabled={!answer.trim()}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm"
        style={{ background: "var(--ink)", color: "var(--paper)", opacity: answer.trim() ? 1 : 0.35 }}
      >
        {step === DECIDE_QUESTIONS.length - 1 ? "See what Noema noticed" : "Next question"}
        <ArrowRight size={14} />
      </button>
    </div>
  );
}

/* ---------------------------------- GROW ---------------------------------- */

function Grow() {
  return (
    <div className="max-w-2xl mx-auto pt-6 fade-in">
      <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--sage)" }}>
        Not scores — insights
      </span>
      <h1 className="font-display text-3xl mt-3 mb-2" style={{ color: "var(--ink)" }}>
        How you've been growing
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Gathered from how you've been thinking, reflecting, and deciding — not from streaks.
      </p>

      <div className="flex flex-col gap-3">
        {QUALITIES.map((q) => (
          <div
            key={q.name}
            className="rounded-2xl p-5 flex items-start gap-4"
            style={{ background: "var(--card)", border: "1px solid var(--line)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{
                background: q.trend === "quiet" ? "var(--paper-soft)" : "var(--sage-soft)",
                color: q.trend === "quiet" ? "var(--muted-2)" : "var(--sage)",
              }}
            >
              {q.trend === "rising" && <ArrowUpRight size={14} />}
              {q.trend === "steady" && <Minus size={14} />}
              {q.trend === "emerging" && <Sparkles size={13} />}
              {q.trend === "quiet" && <Minus size={14} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display text-[16px]" style={{ color: "var(--ink)" }}>
                  {q.name}
                </span>
                <span
                  className="text-[10.5px] tracking-wide uppercase px-2 py-0.5 rounded-full"
                  style={{ color: "var(--muted)", border: "1px solid var(--line)" }}
                >
                  {TREND_LABEL[q.trend]}
                </span>
              </div>
              <p className="text-[13.5px] leading-relaxed" style={{ color: "var(--muted)" }}>
                {q.note}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- MEMORY ---------------------------------- */

function Memory() {
  const [memories, setMemories] = useState(INITIAL_MEMORIES);
  const [promises, setPromises] = useState(INITIAL_PROMISES);
  const [editingId, setEditingId] = useState(null);
  const [editVal, setEditVal] = useState("");

  const startEdit = (m) => {
    setEditingId(m.id);
    setEditVal(m.text);
  };
  const saveEdit = (id) => {
    setMemories((ms) => ms.map((m) => (m.id === id ? { ...m, text: editVal } : m)));
    setEditingId(null);
  };
  const removeMemory = (id) => setMemories((ms) => ms.filter((m) => m.id !== id));
  const removePromise = (id) => setPromises((ps) => ps.filter((p) => p.id !== id));

  return (
    <div className="max-w-2xl mx-auto pt-6 fade-in">
      <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--muted)" }}>
        Fully visible, fully yours
      </span>
      <h1 className="font-display text-3xl mt-3 mb-2" style={{ color: "var(--ink)" }}>
        What Noema remembers
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
        Nothing hidden. Edit anything that's wrong, or let go of anything that no longer fits.
      </p>

      <div className="flex flex-col gap-2.5 mb-10">
        {memories.map((m) => (
          <div
            key={m.id}
            className="rounded-2xl px-5 py-4 flex items-center justify-between gap-3"
            style={{ background: "var(--card)", border: "1px solid var(--line)" }}
          >
            {editingId === m.id ? (
              <input
                autoFocus
                value={editVal}
                onChange={(e) => setEditVal(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && saveEdit(m.id)}
                onBlur={() => saveEdit(m.id)}
                className="flex-1 bg-transparent text-[14.5px]"
                style={{ color: "var(--ink)" }}
              />
            ) : (
              <button
                onClick={() => startEdit(m)}
                className="flex-1 text-left text-[14.5px] leading-relaxed"
                style={{ color: "var(--ink)" }}
              >
                {m.text}
              </button>
            )}
            <button
              onClick={() => removeMemory(m.id)}
              aria-label="Forget this"
              className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
              style={{ color: "var(--muted-2)" }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
        {memories.length === 0 && (
          <p className="text-sm italic" style={{ color: "var(--muted-2)" }}>
            Nothing remembered yet.
          </p>
        )}
      </div>

      <span className="text-[11px] tracking-[0.2em] uppercase" style={{ color: "var(--clay)" }}>
        Promises to yourself
      </span>
      <h2 className="font-display text-xl mt-2 mb-5" style={{ color: "var(--ink)" }}>
        Things you said you'd do
      </h2>
      <div className="flex flex-col gap-3">
        {promises.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl p-5"
            style={{ background: "var(--clay-soft)", border: "1px solid var(--line)" }}
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <p className="font-display text-[16px] leading-snug" style={{ color: "var(--ink)" }}>
                "{p.text}"
              </p>
              <button
                onClick={() => removePromise(p.id)}
                className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{ color: "var(--muted-2)" }}
              >
                <X size={14} />
              </button>
            </div>
            <p className="text-[13px] mb-1" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--clay)" }}>Why it matters — </span>
              {p.why}
            </p>
            <p className="text-[13px] mb-3" style={{ color: "var(--muted)" }}>
              <span style={{ color: "var(--clay)" }}>What might stop you — </span>
              {p.fear}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-[11px]" style={{ color: "var(--muted-2)" }}>
                {p.date}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------- PROFILE ---------------------------------- */

function Profile({ dark, setDark }) {
  return (
    <div className="max-w-xl mx-auto pt-6 fade-in">
      <h1 className="font-display text-3xl mb-8" style={{ color: "var(--ink)" }}>
        Profile
      </h1>

      <div
        className="rounded-2xl p-5 flex items-center justify-between mb-3"
        style={{ background: "var(--card)", border: "1px solid var(--line)" }}
      >
        <div>
          <p className="text-[14.5px] font-medium" style={{ color: "var(--ink)" }}>
            Appearance
          </p>
          <p className="text-[13px]" style={{ color: "var(--muted)" }}>
            {dark ? "Dark, low-glare for evenings" : "Light, paper-toned for daytime"}
          </p>
        </div>
        <button
          onClick={() => setDark((d) => !d)}
          className="w-12 h-7 rounded-full relative"
          style={{ background: dark ? "var(--ink)" : "var(--line)" }}
        >
          <span
            className="absolute top-0.5 w-6 h-6 rounded-full transition-all"
            style={{ background: "var(--paper)", left: dark ? "22px" : "2px" }}
          />
        </button>
      </div>

      {[
        { label: "How Noema should challenge you", value: "Gently, but honestly" },
        { label: "Reflection reminders", value: "Evenings, softly" },
        { label: "Data & memory", value: "Fully visible, editable anytime" },
      ].map((row) => (
        <div
          key={row.label}
          className="rounded-2xl p-5 flex items-center justify-between mb-3"
          style={{ background: "var(--card)", border: "1px solid var(--line)" }}
        >
          <p className="text-[14.5px]" style={{ color: "var(--ink)" }}>
            {row.label}
          </p>
          <p className="text-[13px]" style={{ color: "var(--muted)" }}>
            {row.value}
          </p>
        </div>
      ))}
    </div>
  );
}
