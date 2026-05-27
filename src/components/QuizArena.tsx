/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Award, Timer, CheckCircle, XCircle, AlertTriangle, Play, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';
import { Quiz, QuizQuestion, TestAttempt } from '../types';

interface QuizArenaProps {
  quizzes: Quiz[];
  onQuizSubmit: (attempt: TestAttempt) => void;
  currentUser: any;
}

export default function QuizArena({ quizzes, onQuizSubmit, currentUser }: QuizArenaProps) {
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({}); // questionId -> selectedOptionIndex
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [quizTimerActive, setQuizTimerActive] = useState(false);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState(0);

  // Timer runner
  useEffect(() => {
    let timer: any;
    if (quizTimerActive && secondsRemaining > 0) {
      timer = setInterval(() => {
        setSecondsRemaining(prev => prev - 1);
        setTimeSpentSeconds(prev => prev + 1);
      }, 1000);
    } else if (secondsRemaining === 0 && quizTimerActive) {
      // Auto-submit on timeout
      handleQuizSubmit();
    }
    return () => clearInterval(timer);
  }, [quizTimerActive, secondsRemaining]);

  const handleStartQuiz = (quiz: Quiz) => {
    if (!currentUser) {
      alert("⚠️ Auth Required: Please Sign In to take exam quizzes and persist score records!");
      return;
    }
    setSelectedQuiz(quiz);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizSubmitted(false);
    setSecondsRemaining(quiz.durationMinutes * 60);
    setTimeSpentSeconds(0);
    setQuizTimerActive(true);
  };

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleQuizSubmit = () => {
    if (!selectedQuiz) return;
    setQuizTimerActive(false);
    setQuizSubmitted(true);

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    selectedQuiz.questions.forEach(q => {
      const selected = userAnswers[q.id];
      if (selected === undefined) {
        unansweredCount++;
      } else if (selected === q.correctAnswerIndex) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    const totalQuestions = selectedQuiz.questions.length;
    // Let's assume +4 marks for correct, -1 marks for incorrect, 0 for unanswered
    const score = (correctCount * 4) - (incorrectCount * 1);
    const maxScore = totalQuestions * 4;

    const attempt: TestAttempt = {
      id: 'attempt-' + Date.now(),
      quizId: selectedQuiz.id,
      quizTitle: selectedQuiz.title,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      score: Math.max(0, score),
      maxScore,
      timeSpentSeconds,
      correctCount,
      incorrectCount,
      unansweredCount
    };

    onQuizSubmit(attempt);
  };

  const minutesStr = Math.floor(secondsRemaining / 60).toString().padStart(2, '0');
  const secondsStr = (secondsRemaining % 60).toString().padStart(2, '0');

  return (
    <div className="space-y-8 select-none max-w-7xl mx-auto px-4 py-6">
      
      {/* Header Summary */}
      <div className="bg-slate-900 border border-slate-805 rounded-xl p-5 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 [content-visibility:auto]">
        <div>
          <span className="text-[10px] uppercase font-mono tracking-widest bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded border border-cyan-500/20">
            Testing Suite
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-100 mt-2">
            Quantrex Math Olympiad & JEE Arena
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Simulate the true computer-based examination workspace of JEE Advanced. Solve complex calculus proofs, complex rotations, vectors, and modular geometry.
          </p>
        </div>
        <div className="flex items-center gap-3 bg-slate-950 p-3.5 rounded-lg border border-slate-800">
          <HelpCircle className="text-amber-400 w-5 h-5 shrink-0" />
          <div className="text-xs font-mono text-slate-400">
            <span className="text-slate-200 font-bold block">JEE Grading Metric:</span>
            <span>+4 Point Correct • -1 Point Penalty • Timeout Auto-Stop</span>
          </div>
        </div>
      </div>

      {/* Main Container Workspace */}
      {!selectedQuiz ? (
        /* Quiz Catalog Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quizzes.map(quiz => (
            <div 
              key={quiz.id} 
              id={`quiz-card-${quiz.id}`}
              className="bg-slate-900 border border-slate-805 hover:border-slate-700 p-6 rounded-xl flex flex-col justify-between duration-200 hover:shadow-lg [content-visibility:auto]"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-[10px] uppercase font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-2 py-0.5 rounded font-bold">
                    {quiz.topic} Exam
                  </span>
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Timer className="w-3.5 h-3.5" /> {quiz.durationMinutes} min
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-100 tracking-tight">
                  {quiz.title}
                </h3>
                <p className="text-xs text-slate-405 mt-2 leading-relaxed">
                  {quiz.description}
                </p>

                <div className="mt-4 flex gap-4 bg-slate-950 p-2.5 rounded border border-slate-805 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 block text-[10px]">Total Marks</span>
                    <span className="text-slate-200 font-bold">{quiz.totalMarks} Marks</span>
                  </div>
                  <div className="border-l border-slate-800 pl-4">
                    <span className="text-slate-500 block text-[10px]">Problems</span>
                    <span className="text-slate-200 font-bold">{quiz.questions.length} Questions</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button
                  id={`start-quiz-${quiz.id}`}
                  onClick={() => handleStartQuiz(quiz)}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 active:bg-slate-950 rounded text-xs font-bold text-slate-200 border border-slate-750 flex items-center justify-center gap-2 transition cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-current text-cyan-400" /> Start CBT Mock Test
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Active Quiz Sandbox View */
        <div className="bg-slate-900 border border-slate-805 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[550px]">
          
          {/* Active CBT Control Bar */}
          <div className="bg-slate-950 px-6 py-4 border-b border-slate-805 flex flex-col sm:flex-row sm:items-center justify-between gap-4 [content-visibility:auto]">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
                JEE CBT Simulator Active
              </span>
              <h3 className="text-sm font-bold text-slate-100 mt-0.5 truncate max-w-md">
                {selectedQuiz.title}
              </h3>
            </div>

            {/* Timer and Submit state */}
            <div className="flex items-center gap-4">
              {!quizSubmitted ? (
                <div className="flex items-center gap-2.5 bg-rose-500/10 text-rose-300 border border-rose-500/20 px-3 py-1.5 rounded-md font-mono text-xs">
                  <Timer className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-bold">Time Left: {minutesStr}:{secondsStr}</span>
                </div>
              ) : (
                <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded font-bold">
                  Test Evaluated Successfully
                </span>
              )}

              <button
                id="quit-quiz-or-exit"
                onClick={() => setSelectedQuiz(null)}
                className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-semibold rounded duration-150 border border-slate-700 cursor-pointer"
              >
                Exit Arena
              </button>
            </div>
          </div>

          {/* Core Testing Panel */}
          {!quizSubmitted ? (
            <div className="flex flex-col lg:flex-row flex-1">
              {/* Question Space */}
              <div className="flex-1 p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-slate-805">
                <div className="flex items-center justify-between border-b border-slate-805 pb-3">
                  <span className="text-xs font-mono font-bold text-slate-400">
                    Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
                  </span>
                  <span className="text-[10px] bg-slate-950 text-indigo-300 border border-slate-805 px-2 py-0.5 rounded font-mono font-bold">
                    Difficulty: {selectedQuiz.questions[currentQuestionIndex].difficulty}
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <p className="text-sm text-slate-100 font-medium leading-relaxed bg-slate-950/40 p-4 rounded-lg border border-slate-805 whitespace-pre-wrap">
                    {selectedQuiz.questions[currentQuestionIndex].questionText}
                  </p>

                  {selectedQuiz.questions[currentQuestionIndex].latexFormula && (
                    <div className="p-4 bg-slate-950/20 rounded border border-slate-805/40 text-center font-mono text-cyan-300 text-xs md:text-sm">
                      {selectedQuiz.questions[currentQuestionIndex].latexFormula}
                    </div>
                  )}

                  {/* Options List */}
                  <div className="space-y-2.5 mt-6">
                    {selectedQuiz.questions[currentQuestionIndex].options.map((option, index) => {
                      const questionId = selectedQuiz.questions[currentQuestionIndex].id;
                      const isSelected = userAnswers[questionId] === index;

                      return (
                        <button
                          key={index}
                          id={`question-${questionId}-option-${index}`}
                          onClick={() => handleSelectOption(questionId, index)}
                          className={`w-full text-left p-4.5 rounded-lg border text-xs font-medium cursor-pointer transition flex items-center justify-between ${isSelected ? 'bg-cyan-500/10 border-cyan-500 text-cyan-100' : 'bg-slate-950/80 border-slate-805 text-slate-300 hover:border-slate-700 hover:bg-slate-900/60'}`}
                        >
                          <span>{option}</span>
                          <span className={`w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center text-[9px] font-bold ${isSelected ? 'border-cyan-500 text-cyan-300 bg-cyan-500/10' : 'border-slate-800 text-transparent'}`}>
                            ✓
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Foot Controls */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-slate-805">
                  <button
                    id="prev-question-button"
                    onClick={() => setCurrentQuestionIndex(i => Math.max(0, i - 1))}
                    disabled={currentQuestionIndex === 0}
                    className="px-4 py-2 bg-slate-950 hover:bg-slate-800 active:bg-slate-950 font-semibold border border-slate-805 text-xs text-slate-300 rounded duration-150 disabled:opacity-45 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Previous Question
                  </button>

                  <button
                    id="next-question-button"
                    onClick={() => {
                      if (currentQuestionIndex < selectedQuiz.questions.length - 1) {
                        setCurrentQuestionIndex(i => i + 1);
                      } else {
                        handleQuizSubmit();
                      }
                    }}
                    className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 font-bold text-xs text-slate-100 rounded duration-150 cursor-pointer flex items-center gap-1 shadow-md"
                  >
                    {currentQuestionIndex === selectedQuiz.questions.length - 1 ? 'Finish & Grade' : 'Next Question'}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Side CBT Questions Grid Navigation map */}
              <div className="w-full lg:w-72 bg-slate-950 p-6 flex flex-col justify-between">
                <div>
                  <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                    Exam Navigator Map
                  </h4>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedQuiz.questions.map((q, idx) => {
                      const isSelected = idx === currentQuestionIndex;
                      const hasAnswered = userAnswers[q.id] !== undefined;

                      return (
                        <button
                          key={q.id}
                          onClick={() => setCurrentQuestionIndex(idx)}
                          className={`py-2 rounded font-mono text-xs font-semibold cursor-pointer border transition text-center ${isSelected ? 'bg-cyan-500/10 border-cyan-500 text-cyan-300' : hasAnswered ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300' : 'bg-slate-900 border-slate-805 text-slate-400 hover:text-slate-100'}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-8 border-t border-slate-805 pt-4 space-y-3.5 text-xs">
                  <div className="flex justify-between items-center text-slate-400 font-mono">
                    <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded bg-emerald-500/20 border border-emerald-500 max-w-max"></span> Done:</span>
                    <span className="font-bold text-slate-200">
                      {Object.keys(userAnswers).length} / {selectedQuiz.questions.length}
                    </span>
                  </div>

                  <button
                    id="direct-submit-button"
                    onClick={handleQuizSubmit}
                    className="w-full py-2 bg-rose-600 hover:bg-rose-500 active:bg-rose-700 font-bold text-slate-100 rounded text-xs cursor-pointer shadow-md text-center"
                  >
                    Submit Test Paper
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Quiz Completed Results Workspace & Solution explanations */
            <div className="p-6 md:p-8 space-y-8 select-none">
              
              {/* Scorecard Dashboard */}
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-805 flex flex-col md:flex-row items-center justify-between gap-6 [content-visibility:auto]">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-cyan-500/10 rounded-full border border-cyan-500/20 text-cyan-400">
                    <Award className="w-8 h-8" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      Test Grading Completed
                    </span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1">
                      Your score: {quizzes.find(q=>q.id === selectedQuiz.id)?.questions.length ? 
                        (((selectedQuiz.questions.filter(q => userAnswers[q.id] === q.correctAnswerIndex).length * 4) - 
                        (selectedQuiz.questions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswerIndex).length * 1))) : 0} / {selectedQuiz.questions.length * 4} Marks
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Completed on: {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 font-mono text-center text-xs">
                  <div className="bg-emerald-500/10 p-3 rounded border border-emerald-500/20">
                    <span className="text-emerald-400 font-extrabold text-base block">
                      {selectedQuiz.questions.filter(q => userAnswers[q.id] === q.correctAnswerIndex).length}
                    </span>
                    <span className="text-slate-500 uppercase text-[9px] mt-0.5 block">Correct</span>
                  </div>
                  <div className="bg-rose-505/10 bg-rose-500/10 p-3 rounded border border-rose-500/20">
                    <span className="text-rose-400 font-extrabold text-base block">
                      {selectedQuiz.questions.filter(q => userAnswers[q.id] !== undefined && userAnswers[q.id] !== q.correctAnswerIndex).length}
                    </span>
                    <span className="text-slate-500 uppercase text-[9px] mt-0.5 block">Incorrect</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-805">
                    <span className="text-slate-300 font-extrabold text-base block">
                      {selectedQuiz.questions.filter(q => userAnswers[q.id] === undefined).length}
                    </span>
                    <span className="text-slate-500 uppercase text-[9px] mt-0.5 block">Skipped</span>
                  </div>
                </div>
              </div>

              {/* Detailed Solution Explanations */}
              <div className="space-y-6">
                <h3 className="text-sm font-bold text-slate-100 mb-3 block uppercase tracking-wider font-mono">
                  🔑 Step-by-Step Mathematical Solutions
                </h3>

                {selectedQuiz.questions.map((q, idx) => {
                  const selectedIdx = userAnswers[q.id];
                  const isCorrect = selectedIdx === q.correctAnswerIndex;
                  const hasAnswered = selectedIdx !== undefined;

                  return (
                    <div key={q.id} className="bg-slate-950 p-5 rounded-lg border border-slate-850 space-y-4">
                      
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-2.5">
                          <span className="bg-slate-900 px-2 py-0.5 rounded font-mono text-xs font-bold text-slate-400 mt-0.5">
                            Q{idx + 1}
                          </span>
                          <p className="text-xs text-slate-205 font-medium leading-relaxed">
                            {q.questionText}
                          </p>
                        </div>

                        {/* Tag */}
                        {hasAnswered ? (
                          isCorrect ? (
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1 shrink-0">
                              <CheckCircle className="w-3.5 h-3.5" /> +4 Correct
                            </span>
                          ) : (
                            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center gap-1 shrink-0">
                              <XCircle className="w-3.5 h-3.5" /> -1 Incorrect
                            </span>
                          )
                        ) : (
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold bg-slate-900 border border-slate-805 text-slate-400 shrink-0">
                            Skipped
                          </span>
                        )}
                      </div>

                      {/* Your answered choice vs correct choice */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-850">
                          <span className="text-[10px] text-slate-500 block">Your Answer:</span>
                          <span className={isCorrect ? "text-emerald-400 font-semibold" : hasAnswered ? "text-rose-400 font-semibold" : "text-slate-400 font-medium"}>
                            {hasAnswered ? q.options[selectedIdx] : 'None (No Selection)'}
                          </span>
                        </div>
                        <div className="p-2.5 rounded bg-slate-900 border border-slate-850">
                          <span className="text-[10px] text-slate-500 block">Correct Answer Key:</span>
                          <span className="text-emerald-400 font-semibold">{q.options[q.correctAnswerIndex]}</span>
                        </div>
                      </div>

                      {/* Solution statement */}
                      <div className="p-4 bg-emerald-500/5 rounded border border-emerald-500/10 text-xs">
                        <span className="font-bold text-emerald-400 uppercase tracking-widest text-[9px] block mb-1">
                          Calculated derivation steps:
                        </span>
                        <p className="text-slate-300 leading-normal font-sans whitespace-pre-wrap mt-1">
                          {q.solutionExplanation}
                        </p>
                      </div>

                    </div>
                  );
                })}
              </div>

              {/* Retry Control Button */}
              <div className="pt-4 text-center">
                <button
                  id="reset-quiz-attempt"
                  onClick={() => handleStartQuiz(selectedQuiz)}
                  className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-905 text-xs text-slate-205 font-bold rounded duration-150 border border-slate-750 inline-flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <RefreshCw className="w-4 h-4 text-cyan-400" /> Re-attempt Selected Exam
                </button>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
