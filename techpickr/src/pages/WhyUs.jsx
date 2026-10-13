import { useState } from "react";
import Button from "../components/Button";
import Reveal from "../components/Reveal";
import "./WhyUs.css";

const reasons = [
  {
    id: "personal",
    label: "Made for you",
    title: "Recommendations built around your needs",
    text: "Your budget, your use case and your priorities decide the result. A student who edits video and a student who studies get different builds, because their needs are different.",
    points: [
      "Budget in rupees, up to your limit",
      "Use case: gaming, editing, programming and more",
      "Up to three priorities that change the scoring",
    ],
  },
  {
    id: "honest",
    label: "Honest data",
    title: "We say when we don't know",
    text: "Many sites show confident numbers they can't back up. TechPickr keeps the match score separate from data confidence, and labels sample data as sample.",
    points: [
      "No invented prices or benchmarks",
      "Clear labels when information is unverified",
      "Compatibility shown as pass, conditional or unknown",
    ],
  },
  {
    id: "clear",
    label: "Plain language",
    title: "Every part comes with a reason",
    text: "You don't need to read spec sheets. Each part has a short explanation of why it was picked, what it means for you and what you could upgrade later.",
    points: [
      "A 'Why this part?' note for each choice",
      "Terms explained in beginner-friendly words",
      "Upgrade tips and alternatives",
    ],
  },
  {
    id: "compare",
    label: "Easy compare",
    title: "Three options, side by side",
    text: "Instead of one answer you have to trust, you get Save Money, Best Fit and Performance+. Compare them and decide for yourself.",
    points: [
      "Price, performance and upgradeability together",
      "Strengths and compromises listed plainly",
      "Pick the trade-off that suits you",
    ],
  },
];

const compare = [
  { without: "Hundreds of confusing specs", with: "Three clear options" },
  { without: "Unsure if parts fit together", with: "Compatibility checks, with honest 'unknown' flags" },
  { without: "Jargon and marketing claims", with: "A plain-language reason for each part" },
  { without: "One-size-fits-all lists", with: "Results based on your budget and goals" },
];

const faqs = [
  {
    q: "Is TechPickr free?",
    a: "Yes. It is a school hackathon project and has no paid plans.",
  },
  {
    q: "Are the prices real?",
    a: "Right now the builds use clearly labelled sample data. Real prices will appear only once verified data is connected, and we will say so on every page.",
  },
  {
    q: "Do I need to know about PC parts?",
    a: "No. The questions are about what you do and what you can spend. We handle the technical side and explain it simply.",
  },
  {
    q: "Can it recommend laptops too?",
    a: "Yes. You choose a custom desktop or a laptop on the first question.",
  },
];

function WhyUs() {
  const [active, setActive] = useState(reasons[0].id);
  const [openFaq, setOpenFaq] = useState(0);
  const current = reasons.find((r) => r.id === active);

  return (
    <main className="why">
      <section className="why-hero">
        <div className="container why-hero-inner">
          <Reveal>
            <span className="badge">Why TechPickr</span>
            <h1>Buying a PC should feel clear, not stressful.</h1>
            <p className="why-lead">
              TechPickr is built for people who are not sure where to start.
              We turn your budget and goals into options you can understand.
            </p>
            <div className="why-actions">
              <Button to="/build" arrow>
                Build My PC
              </Button>
              <Button href="#reasons" variant="secondary">
                See the reasons
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" id="reasons">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h2>What makes it different</h2>
              <p>Tap a topic to see how it works.</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="tabs" role="tablist">
              {reasons.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  role="tab"
                  aria-selected={active === r.id}
                  className={`tab ${active === r.id ? "active" : ""}`}
                  onClick={() => setActive(r.id)}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="tab-panel" key={current.id} role="tabpanel">
              <div>
                <h3>{current.title}</h3>
                <p>{current.text}</p>
              </div>
              <ul className="points">
                {current.points.map((p) => (
                  <li key={p}>
                    <span className="tick" aria-hidden="true">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="section-head">
              <h2>Without it, and with it</h2>
            </div>
          </Reveal>

          <div className="compare">
            {compare.map((row, i) => (
              <Reveal key={row.without} delay={i * 80}>
                <div className="compare-row">
                  <div className="compare-cell no">
                    <span className="mark" aria-hidden="true">✕</span>
                    {row.without}
                  </div>
                  <div className="compare-cell yes">
                    <span className="mark" aria-hidden="true">✓</span>
                    {row.with}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container faq-wrap">
          <Reveal>
            <div className="section-head">
              <h2>Questions</h2>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="faq">
              {faqs.map((f, i) => (
                <div
                  key={f.q}
                  className={`faq-item ${openFaq === i ? "open" : ""}`}
                >
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <span className="faq-icon" aria-hidden="true">+</span>
                  </button>
                  <div className="faq-a">
                    <div>
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="cta">
              <h2>Ready to find your PC?</h2>
              <p>Answer five quick questions and get three options that fit.</p>
              <Button to="/build" arrow>
                Build My PC
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

export default WhyUs;