import React, { useState } from "react";
import classNames from "classnames";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";
import { useExamStore } from "@/src/store";
import { motion } from "framer-motion";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
);
interface QuestionProps {
  technology: number;
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
  previewMode = false,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const { selectedTechnology } = useExamStore();

  const handleAnswer = (key: string) => {
    setSelectedAnswer(key);
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
        "mt-4 h-[80%] w-[100%] space-y-4 overflow-y-auto rounded-lg bg-white p-4 px-16 py-10 shadow-2xl",

        "transition-colors duration-500",
      )}
    >
      <Badge
        className={`w-fit ${
          selectedTechnology.technologyAlias == "js"
            ? "bg-yellow-200"
            : selectedTechnology.technologyAlias == "go"
            ? "bg-blue-400 "
            : selectedTechnology.technologyAlias == "py"
            ? "bg-sky-400 "
            : selectedTechnology.technologyAlias == "java"
            ? "bg-red-400 text-white"
            : selectedTechnology.technologyAlias == "sql"
            ? "bg-blue-400 text-white"
            : selectedTechnology.technologyAlias == "php"
            ? "bg-blue-400 text-white"
            : selectedTechnology.technologyAlias == "cs"
            ? "bg-violet-400 text-white"
            : selectedTechnology.technologyAlias == "c"
            ? "bg-blue-400 text-white"
            : ""
        }`}
        variant="outline"
      >
        {selectedTechnology.technologyName}
      </Badge>
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

      <div className="grid grid-cols-1 gap-2">
        {options.map((option, index) => (
          <div
            onClick={() => handleAnswer(option.key)}
            key={index}
            className="flex flex-row gap-x-[2px]"
          >
            <div
              className={`flex h-full items-center rounded-xl border-2 border-solid   px-4 pr-4 text-xl uppercase  ${
                selectedAnswer === option.key &&
                selectedAnswer === correctAnswer
                  ? "rounded-xl border-2 border-solid border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-400 "
                  : selectedAnswer === option.key &&
                    selectedAnswer !== correctAnswer
                  ? "rounded-xl border-2 border-solid border-red-500  bg-red-400 font-semibold  text-white  hover:bg-red-200 "
                  : "rounded-xl border-2 border-solid hover:bg-slate-100"
              }`}
            >
              {option.key}
            </div>
            <motion.button
              className={`flex h-14 w-full items-center gap-2  pl-2 text-left text-lg ${
                selectedAnswer === option.key &&
                selectedAnswer === correctAnswer
                  ? "rounded-xl border-2 border-solid  border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-400 "
                  : selectedAnswer === option.key &&
                    selectedAnswer !== correctAnswer
                  ? "rounded-xl border-2 border-solid border-red-500 bg-red-400 font-semibold text-white  hover:bg-red-200 "
                  : "rounded-xl border-2 border-solid hover:bg-slate-100"
              }`}
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.9 }}
              animate={
                selectedAnswer === option.key &&
                selectedAnswer !== correctAnswer
                  ? { x: [-10, 10, -10, 10, 0] }
                  : { x: 0 }
              }
              transition={{ duration: 0.5 }}
            >
              <div>{option.text}</div>
            </motion.button>
          </div>
        ))}
      </div>

      {anwerExplanation && previewMode && (
        <div className="mt-4">
          <h3 className="text-lg font-bold">Açıklama</h3>
          <Textarea readOnly defaultValue={anwerExplanation} />
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
