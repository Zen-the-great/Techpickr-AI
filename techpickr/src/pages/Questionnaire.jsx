import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import "./Questionnaire.css";

const TOTAL_STEPS = 5;
const MAX_USES = 7; // how many uses a person can choose (7 = all of them)

const deviceOptions = [
  { value: "laptop", title: "Laptop", text: "Portable and ready to use. Harder to upgrade." },
  { value: "desktop", title: "Custom desktop PC", text: "Coming soon.", disabled: true },
];

const useCaseOptions = [
  { value: "gaming", title: "Gaming" },
  { value: "video-editing", title: "Video editing" },
  { value: "programming", title: "Programming" },
  { value: "studying", title: "Studying" },
  { value: "graphic-design", title: "Graphic design" },
  { value: "everyday", title: "Everyday use" },
  { value: "ai-ml", title: "AI / Machine learning" },
];

const detailsHint = {
  gaming: "Which games do you want to play? (optional)",
  "video-editing": "Which editing software do you use? (optional)",
  programming: "Which tools or languages do you use? (optional)",
  studying: "Any specific software you need? (optional)",
  "graphic-design": "Which design software do you use? (optional)",
  everyday: "Anything specific you do often? (optional)",
  "ai-ml": "Which frameworks or models do you use? (optional)",
};

const performanceOptions = [
  { value: "basic", title: "Basic", text: "Smooth for simple tasks." },
  { value: "balanced", title: "Balanced", text: "Handles most things well." },
  { value: "high", title: "High", text: "Heavy tasks and demanding software." },
];

const portabilityOptions = [
  { value: "portable", title: "Light & portable", text: "Easy to carry every day." },
  { value: "balanced", title: "Balanced", text: "Reasonable to carry, good power." },
  { value: "performance", title: "Performance first", text: "Heavier, but more power." },
];

const priorityOptions = [
  { value: "performance", title: "Performance" },
  { value: "value", title: "Value for money" },
  { value: "low-noise", title: "Low noise" },
  { value: "efficiency", title: "Power efficiency" },
  { value: "upgradeability", title: "Upgradeability" },
];

function formatINR(amount) {
  return "₹" + amount.toLocaleString("en-IN");
}

function Questionnaire() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    device: "laptop",
    portability: "balanced",
    budget: 60000,
    useCases: [],
    details: "",
    performance: "balanced",
    priorities: [],
  });

  const update = (key, value) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  // Choose several uses (up to MAX_USES). Click again to remove one.
  const toggleUseCase = (value) => {
    setAnswers((prev) => {
      if (prev.useCases.includes(value)) {
        return { ...prev, useCases: prev.useCases.filter((u) => u !== value) };
      }
      if (prev.useCases.length >= MAX_USES) return prev;
      return { ...prev, useCases: [...prev.useCases, value] };
    });
  };

  const togglePriority = (value) => {
    setAnswers((prev) => {
      const selected = prev.priorities.includes(value);
      if (selected) {
        return { ...prev, priorities: prev.priorities.filter((p) => p !== value) };
      }
      if (prev.priorities.length >= 3) return prev; // maximum 3
      return { ...prev, priorities: [...prev.priorities, value] };
    });
  };

  const canContinue =
    (step === 1 && answers.device !== "") ||
    step === 2 ||
    (step === 3 && answers.useCases.length >= 1) ||
    step === 4 ||
    (step === 5 && answers.priorities.length >= 1);

  const goNext = () => {
    if (!canContinue) return;
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    } else {
      navigate("/results", { state: answers });
    }
  };

  const goBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <main className="container quiz">
      <div className="quiz-progress">
        <p className="quiz-step-label">
          Step {step} of {TOTAL_STEPS}
        </p>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      <div className="quiz-body" key={step}>
        {step === 1 && (
          <>
            <h2>What are you looking for?</h2>
            <p className="quiz-help">Pick one. You can go back and change it later.</p>
            <div className="option-grid two">
              {deviceOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  disabled={o.disabled}
                  className={`option ${answers.device === o.value ? "selected" : ""}`}
                  aria-pressed={answers.device === o.value}
                  onClick={() => update("device", o.value)}
                >
                  <span className="option-title">{o.title}</span>
                  <span className="option-text">{o.text}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2>What is your budget?</h2>
            <p className="quiz-help">Drag the slider. We will stay within this amount.</p>
            <div className="budget-value">{formatINR(answers.budget)}</div>
            <input
              className="slider"
              type="range"
              min="25000"
              max="300000"
              step="5000"
              value={answers.budget}
              onChange={(e) => update("budget", Number(e.target.value))}
              aria-label="Budget in rupees"
            />
            <div className="slider-labels">
              <span>{formatINR(25000)}</span>
              <span>{formatINR(300000)}</span>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h2>What will you mainly use it for?</h2>
            <p className="quiz-help">
              {MAX_USES >= useCaseOptions.length
                ? "Choose all that apply."
                : `Choose all that apply, up to ${MAX_USES}.`}{" "}
              Selected: {answers.useCases.length}.
            </p>
            <div className="option-grid three">
              {useCaseOptions.map((o) => {
                const selected = answers.useCases.includes(o.value);
                const locked = !selected && answers.useCases.length >= MAX_USES;
                return (
                  <button
                    key={o.value}
                    type="button"
                    disabled={locked}
                    className={`option ${selected ? "selected" : ""}`}
                    aria-pressed={selected}
                    onClick={() => toggleUseCase(o.value)}
                  >
                    <span className="option-title">{o.title}</span>
                  </button>
                );
              })}
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <h2>How demanding are your tasks?</h2>
            <p className="quiz-help">Not sure? Keep Balanced.</p>
            <div className="option-grid three">
              {performanceOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`option ${answers.performance === o.value ? "selected" : ""}`}
                  aria-pressed={answers.performance === o.value}
                  onClick={() => update("performance", o.value)}
                >
                  <span className="option-title">{o.title}</span>
                  <span className="option-text">{o.text}</span>
                </button>
              ))}
            </div>

            <h3 className="quiz-subhead">How portable should it be?</h3>
            <div className="option-grid three">
              {portabilityOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`option ${answers.portability === o.value ? "selected" : ""}`}
                  aria-pressed={answers.portability === o.value}
                  onClick={() => update("portability", o.value)}
                >
                  <span className="option-title">{o.title}</span>
                  <span className="option-text">{o.text}</span>
                </button>
              ))}
            </div>

            <label className="field-label" htmlFor="details">
              {detailsHint[answers.useCases[0]] || detailsHint.everyday}
            </label>
            <input
              id="details"
              className="text-input"
              type="text"
              placeholder="Type here, or skip"
              value={answers.details}
              onChange={(e) => update("details", e.target.value)}
            />
          </>
        )}

        {step === 5 && (
          <>
            <h2>What matters most to you?</h2>
            <p className="quiz-help">
              Pick up to 3. Selected: {answers.priorities.length} of 3.
            </p>
            <div className="option-grid three">
              {priorityOptions.map((o) => (
                <button
                  key={o.value}
                  type="button"
                  className={`option ${answers.priorities.includes(o.value) ? "selected" : ""}`}
                  aria-pressed={answers.priorities.includes(o.value)}
                  onClick={() => togglePriority(o.value)}
                >
                  <span className="option-title">{o.title}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="quiz-actions">
        {step > 1 ? (
          <Button variant="secondary" onClick={goBack}>
            Back
          </Button>
        ) : (
          <span />
        )}
        <button
          type="button"
          className="btn btn-primary"
          onClick={goNext}
          disabled={!canContinue}
        >
          {step === TOTAL_STEPS ? "See my builds" : "Continue"}
        </button>
      </div>
    </main>
  );
}

export default Questionnaire;