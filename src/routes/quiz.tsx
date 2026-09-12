import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Trophy, RefreshCw, CheckCircle, XCircle, Shuffle } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { quizQuestions } from "@/lib/site-data";
import { playClick } from "@/lib/click-sound";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Mini Quiz — Kanjiyum Kariyum" },
      {
        name: "description",
        content: "Test your 90s Kerala Kali Adukkala childhood pretend cooking knowledge!",
      },
    ],
  }),
  component: QuizPage,
});

function getShuffledQuestions() {
  const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5);
  // Select 5 random questions per quiz round
  return shuffled.slice(0, 5).map((q) => {
    const correctAnswerText = q.options[q.answer];
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    const newAnswerIdx = shuffledOptions.indexOf(correctAnswerText);
    return {
      ...q,
      options: shuffledOptions,
      answer: newAnswerIdx,
    };
  });
}

export function QuizPage() {
  const [questions, setQuestions] = useState(() => getShuffledQuestions());
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const q = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (selectedOpt !== null) return; // already answered
    playClick("pop");
    setSelectedOpt(idx);

    if (idx === q.answer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    playClick("tap");
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    playClick("tap");
    setQuestions(getShuffledQuestions());
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <AppShell>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6">
        {/* Header */}
        <div className="card-soft relative overflow-visible bg-blush p-6 sm:p-8 text-center sm:text-left">
          <div className="flex items-center justify-between">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-cream px-3 py-1 text-xs font-bold text-wood-dark">
              <Sparkles className="h-4 w-4 text-primary" /> Kali Adukkala Quiz
            </span>
            <button
              type="button"
              onClick={handleRestart}
              className="flex items-center gap-1 text-xs font-bold text-wood-dark hover:text-primary transition"
              title="Shuffle New Questions"
            >
              <Shuffle className="h-3.5 w-3.5" /> Shuffle New Quiz
            </button>
          </div>

          <h1 className="font-display text-3xl text-wood-dark sm:text-4xl mt-2">
            90s Pretend Cooking Quiz 💡
          </h1>
          <p className="text-sm text-wood-dark/80 mt-1">
            Test your nostalgia! Questions & options are randomly generated for every attempt.
          </p>
        </div>

        {/* Quiz Card */}
        {isCompleted ? (
          <div className="card-soft flex flex-col items-center justify-center gap-5 p-8 text-center bg-cream">
            <span className="text-6xl animate-bounce">🏆</span>
            <h2 className="font-display text-3xl text-wood-dark">Quiz Complete!</h2>
            <p className="text-lg font-bold text-primary">
              Your Score: {score} / {questions.length}
            </p>

            <div className="rounded-2xl border-2 border-dashed border-wood-light bg-sand p-4 max-w-md">
              <p className="hand-text text-xl text-wood-dark">
                {score === questions.length
                  ? "Adipoli! Ningal oru true Master Kali Chef aanu! 👑"
                  : "Super! Nalla ormmakal undu! 🍃"}
              </p>
            </div>

            <button
              type="button"
              onClick={handleRestart}
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95"
            >
              <RefreshCw className="h-4 w-4" /> Play Random Quiz Again
            </button>
          </div>
        ) : (
          <div className="card-soft flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex items-center justify-between text-xs font-bold text-muted-foreground">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>

            <h2 className="font-display text-2xl text-wood-dark">{q.q}</h2>

            {/* Options */}
            <div className="flex flex-col gap-2.5">
              {q.options.map((opt, idx) => {
                let btnStyle = "border-border bg-card hover:bg-leaf-soft text-foreground";
                if (selectedOpt !== null) {
                  if (idx === q.answer) {
                    btnStyle = "border-emerald-500 bg-emerald-100 text-emerald-900 font-bold";
                  } else if (idx === selectedOpt) {
                    btnStyle = "border-rose-500 bg-rose-100 text-rose-900 font-bold";
                  }
                }

                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedOpt !== null}
                    className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left font-medium transition ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt !== null && idx === q.answer && (
                      <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />
                    )}
                    {selectedOpt !== null && idx === selectedOpt && idx !== q.answer && (
                      <XCircle className="h-5 w-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Reaction Message & Next Button */}
            {selectedOpt !== null && (
              <div className="flex flex-col gap-4 animate-bubble-in">
                {selectedOpt === q.answer ? (
                  <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-4 text-sm font-bold text-emerald-900 flex items-start gap-2.5 shadow-sm">
                    <span className="text-xl">🎉</span>
                    <div>
                      <p className="font-display text-base text-emerald-950">Sheriyaanu! (Correct!)</p>
                      <p className="mt-0.5 font-medium">{q.reaction}</p>
                    </div>
                  </div>
                ) : (
                  <div className="rounded-2xl border-2 border-rose-400 bg-rose-50 p-4 text-sm text-rose-900 flex items-start gap-2.5 shadow-sm">
                    <span className="text-xl">🙈</span>
                    <div>
                      <p className="font-display text-base font-bold text-rose-950">Ayyoda! തെറ്റാണ് (Wrong Answer)</p>
                      <p className="mt-0.5 font-semibold text-rose-800">
                        Sheriyaaya uttharam: <span className="underline font-bold text-rose-950">{q.options[q.answer]}</span>
                      </p>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full rounded-2xl bg-primary py-3.5 font-display text-lg font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition hover:brightness-110 active:scale-95"
                >
                  {currentIdx + 1 < questions.length ? "Next Question →" : "See Results 🏆"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </AppShell>
  );
}
