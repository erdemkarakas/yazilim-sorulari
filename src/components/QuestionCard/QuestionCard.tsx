import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import CodeEditor from "@uiw/react-textarea-code-editor";

interface QuestionProps {
  questionText: string;
  questionCode?: string;
  options: { key: string; text: string }[];
  correctAnswer: string;
  nextQuestion: () => void;
  prevQuestion: () => void;
}

const QuestionCard: React.FC<QuestionProps> = ({
  questionText,
  questionCode,
  options,
  correctAnswer,
  nextQuestion,
  prevQuestion,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [borderColor, setBorderColor] = useState<string>("");
  const [code, setCode] = React.useState(
    `function add(a, b) {\n  return a + b;\n}`,
  );

  const handleAnswer = (key: string) => {
    setSelectedAnswer(key);

    if (key === correctAnswer) {
      setBorderColor("border-green-500");
    } else {
      setBorderColor("border-red-500");
    }
  };

  return (
    <div
      className={classNames(
        "rounded-lg bg-white p-4 px-16 py-10 shadow",
        borderColor,
        "transition-colors duration-500",
      )}
    >
      <h2 className="mb-4 text-lg font-bold">{questionText}</h2>
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

      <div className="mt-6 flex justify-between px-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={prevQuestion}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            <MdSkipPrevious size={25} color="white" /> Önceki
          </div>
        </button>

        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={nextQuestion}
        >
          <div className="flex flex-row items-center justify-center gap-2">
            Sonra
            <MdSkipNext size={25} color="white" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;
