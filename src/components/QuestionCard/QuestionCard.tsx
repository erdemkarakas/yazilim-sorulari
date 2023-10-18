import React, { useEffect, useState } from "react";
import classNames from "classnames";

import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";
import { useExamStore } from "@/src/store";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import {
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Volume2,
  VolumeX,
} from "lucide-react";
import { useRouter } from "next/router";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

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
  const { selectedTechnology, examType, randomQuestionIds, soundEnabled } =
    useExamStore();
  const router = useRouter();
  const { questionId } = router.query;
  const [progress, setProgress] = useState(0);
  const handleAnswer = (key: string) => {
    setSelectedAnswer(key);
  };
  const options = [
    { key: "a", text: answerA },
    { key: "b", text: answerB },
    { key: "c", text: answerC },
    { key: "d", text: answerD },
  ];
  useEffect(() => {
    const currentIndex = randomQuestionIds.findIndex(
      (qId) => qId == Number(questionId),
    );
    setProgress((currentIndex / randomQuestionIds.length) * 100);
  }, [questionId, randomQuestionIds]);

  const handleSound = (e: boolean) => {
    useExamStore.setState({ soundEnabled: e });
  };
  return (
    <div
      className={classNames(
        "mb:mt-4 relative h-[80%] w-[100%] space-y-4 overflow-y-auto rounded-lg bg-white pt-10 shadow-2xl",

        "transition-colors duration-500",
      )}
    >
      <div
        className="loading absolute top-0 z-40 h-1 w-[0%] bg-cyan-700 transition-all duration-200"
        style={{ width: `${progress}%` }}
      ></div>

      {!previewMode && (
        <div className="absolute right-2 top-2 flex items-center space-x-2">
          {soundEnabled ? <Volume2 /> : <VolumeX />}
          <Switch
            checked={soundEnabled}
            onCheckedChange={handleSound}
            id="sound-mode"
          />
          <Label htmlFor="sound-mode"></Label>
        </div>
      )}
      <div className="flex flex-col gap-x-2 px-2 md:px-4">
        {" "}
        <Badge
          className={`mb-2 w-fit md:ml-4 ${
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
        <h2 className="mb-4 ml-2 font-bold md:ml-5 md:text-lg">
          {questionText}
        </h2>
        {questionCode && (
          <div className="space-y-2 md:px-5">
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
        <div className="mt-2 grid grid-cols-1 gap-2 md:first-letter:px-4">
          {options.map((option, index) => (
            <div
              onClick={() => {
                if (!previewMode) handleAnswer(option.key);
              }}
              key={index}
              className="flex flex-row gap-x-[2px]"
            >
              <div
                className={`flex h-full items-center rounded-lg border-2 border-solid px-4 pr-4 text-xl uppercase  ${
                  selectedAnswer === option.key &&
                  selectedAnswer === correctAnswer &&
                  examType === "informDuringSession"
                    ? "rounded-lg border-2 border-solid border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-400 "
                    : selectedAnswer === option.key &&
                      examType === "informSessionEnd"
                    ? "rounded-lg border-2 border-solid  border-gray-600 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] "
                    : selectedAnswer === option.key &&
                      selectedAnswer !== correctAnswer &&
                      examType === "informDuringSession"
                    ? "rounded-lg border-2 border-solid border-red-500  bg-red-400 font-semibold  text-white  hover:bg-red-200 "
                    : "rounded-lg border-2 border-solid hover:bg-slate-100"
                }`}
              >
                {option.key}.
              </div>
              <motion.button
                className={`flex h-14 w-full items-center gap-2  pl-2 text-left sm:text-base ${
                  selectedAnswer === option.key &&
                  selectedAnswer === correctAnswer &&
                  examType === "informDuringSession"
                    ? "rounded-lg border-2 border-solid  border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-400 "
                    : selectedAnswer === option.key &&
                      examType === "informSessionEnd"
                    ? "rounded-lg border-2 border-solid  border-gray-600  shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]  "
                    : selectedAnswer === option.key &&
                      selectedAnswer !== correctAnswer &&
                      examType === "informDuringSession"
                    ? "rounded-lg border-2 border-solid border-red-500 bg-red-400 font-semibold text-white  hover:bg-red-200 "
                    : "rounded-lg border-2 border-solid hover:bg-slate-100"
                }`}
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.9 }}
                disabled={previewMode}
                animate={
                  selectedAnswer === option.key &&
                  selectedAnswer !== correctAnswer &&
                  examType === "informDuringSession"
                    ? { x: [-10, 10, -10, 10, 0] }
                    : { x: 0 }
                }
                transition={{ duration: 0.5 }}
              >
                <pre className="text-left">
                  <code>{option.text}</code>
                </pre>
              </motion.button>
            </div>
          ))}
        </div>
        {previewMode && (
          <div className="ml-4 mt-4 flex flex-row gap-1">
            <h4 className="text-lg font-bold">Doğru Cevap:</h4>
            <h4 className="text-lg font-bold text-cyan-600">
              {correctAnswer.toUpperCase()}
            </h4>
          </div>
        )}
        {anwerExplanation && previewMode && (
          <div className="mt-4 px-4">
            <h3 className="text-lg font-bold">Açıklama</h3>
            <Textarea readOnly defaultValue={anwerExplanation} />
          </div>
        )}
      </div>
      {!previewMode && (
        <div className="grid w-full grid-cols-2 divide-x-2">
          <div>
            <Button className="hover:from-cyan-850 h-14 w-full gap-x-4 rounded-none border-2 border-slate-400 bg-gradient-to-l from-cyan-900 to-gray-900 text-xl hover:to-cyan-600">
              <ArrowBigLeftDash size={30} />
              Geri
            </Button>
          </div>
          <div>
            <Button className="h-14 w-full gap-x-4 rounded-none border-2  border-slate-400 bg-gradient-to-l from-gray-900 to-cyan-900 text-xl  hover:from-cyan-600 ">
              Cevapla
              <ArrowBigRightDash size={30} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCard;
