import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
);
interface QuestionProps {
  technology: string;
  questionText: string;
  questionCode?: string;
  anwerExplanation?: string;
  answerA: string;
  answerB: string;
  answerC: string;
  answerD: string;
  correctAnswer: string;
  previewMode?: boolean;
}

const QuestionCard: React.FC<QuestionProps> = ({
  technology,
  questionText,
  questionCode,
  anwerExplanation,
  answerA,
  answerB,
  answerC,
  answerD,
  correctAnswer,
  previewMode,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [borderColor, setBorderColor] = useState<string>("");

  const handleAnswer = (key: string) => {
    setSelectedAnswer(key);

    if (key === correctAnswer) {
      setBorderColor("border-green-500");
    } else {
      setBorderColor("border-red-500");
    }
  };
  const options = [
    { key: "a", text: answerA },
    { key: "b", text: answerB },
    { key: "c", text: answerC },
    { key: "d", text: answerD },
  ];

  return (
    <div
      className={classNames(
        "space-y-4 rounded-lg bg-white p-4 px-16 py-10 shadow",
        borderColor,
        "transition-colors duration-500",
      )}
    >
      <Badge variant="outline">{technology.toUpperCase()}</Badge>
      <h2 className="mb-4 text-lg font-bold">{questionText}</h2>
      {questionCode && (
        <div className="space-y-2">
          <CodeEditor
            language="js"
            value={questionCode}
            placeholder="Kodu buraya giriniz."
            disabled={true}
            padding={15}
            data-color-mode="dark"
            style={{
              fontSize: 12,
              backgroundColor: "#f5f5f5",
              fontFamily:
                "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
            }}
          />
        </div>
      )}
      <div className="grid grid-cols-2 gap-6">
        {options.map((option, index) => (
          <button
            key={index}
            className={`w-full py-2 text-left ${
              selectedAnswer === option.key && selectedAnswer === correctAnswer
                ? "rounded-lg border-2 border-solid border-green-600 border-opacity-50  p-4 hover:bg-slate-100 "
                : selectedAnswer === option.key &&
                  selectedAnswer !== correctAnswer
                ? "rounded-lg border-2 border-solid border-red-600 border-opacity-50  p-4 hover:bg-slate-100 "
                : "rounded-lg border-2 border-solid border-opacity-25 p-4 hover:bg-slate-100"
            }`}
            onClick={() => handleAnswer(option.key)}
          >
            <span className="mr-2 border-r-2 border-solid border-black border-opacity-25 pr-3 text-lg uppercase">
              {option.key}
            </span>{" "}
            {option.text}
          </button>
        ))}
      </div>

      {anwerExplanation && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Açıklama</h3>
          <Textarea readOnly defaultValue={anwerExplanation} />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
