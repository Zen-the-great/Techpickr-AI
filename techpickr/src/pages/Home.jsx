import Button from "../components/Button";
import HeroBackground from "../components/HeroBackground";
import "./Home.css";
import "./HomeSections.css";

const steps = [
  {
    title: "Tell us what you need",
    text: "Share your budget in rupees, what you'll use the computer for, and what matters most to you.",
  },
  {
    title: "We match and check",
    text: "TechPickr scores builds against your needs and checks that the parts work together.",
  },
  {
    title: "Compare and choose",
    text: "See three options side by side, with a plain-language reason for every part.",
  },
];

const features = [
  {
    tag: "Personalized",
    title: "Recommendations that fit you",
    text: "Your budget, your use case and your priorities decide the result, not a generic list.",
  },
  {
    tag: "Verified",
    title: "Compatibility checks",
    text: "We check sockets, memory type, power and case fit, and we say clearly when something can't be confirmed.",
  },
  {
    tag: "Clear",
    title: "Explanations in plain language",
    text: "Every part comes with a simple reason why it was picked, so you understand what you're buying.",
  },
];

function Home() {
  return (
    <>
      <section className="hero">
        <HeroBackground />

        <div className="container hero-inner">
          <div className="hero-text">
            <span className="badge">Personalized PC advice</span>
            <h1>The right PC. Without the guesswork.</h1>
            <p className="hero-sub">
              Tell TechPickr your budget and what you'll use your computer for.
              We recommend builds that fit, check that the parts work together,
              and explain every choice in plain language.
            </p>
            <div className="hero-actions">
              <Button href="#build">Build My PC</Button>
              <Button href="#explore" variant="secondary">
                Explore Builds
              </Button>
            </div>
            <p className="hero-note">
              Budget in ₹ · Compatibility checks · Plain-language explanations
            </p>
          </div>
        </div>
      </section>

      <section className="section" id="how-it-works">
        <div className="container">
          <div className="section-head">
            <h2>How TechPickr works</h2>
            <p>Three simple steps from "I don't know where to start" to a build you understand.</p>
          </div>
          <div className="steps">
            {steps.map((step, index) => (
              <div className="card" key={step.title}>
                <span className="step-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="features">
        <div className="container">
          <div className="section-head">
            <h2>Built for beginners</h2>
            <p>No spec-sheet knowledge needed. We handle the technical parts and explain them simply.</p>
          </div>
          <div className="features">
            {features.map((feature) => (
              <div className="card" key={feature.title}>
                <span className="feature-tag">{feature.tag}</span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="build">
        <div className="container">
          <div className="cta">
            <h2>Ready to find your PC?</h2>
            <p>Answer a few quick questions and get three build options that match your budget.</p>
            <Button href="#build">Build My PC</Button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;