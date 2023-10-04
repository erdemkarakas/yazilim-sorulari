/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Head from "next/head";
import Link from "next/link";

import { api } from "@/src/lib/api";
import TechnologyCard from "@/src/components/TechnologyCard/TechnologyCard";
import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { FormDescription, FormLabel } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const exampleData = [
  {
    id: 1,
    technology: "javascript",
    questionText: "Çıktısı Nedir?",
    questionCode: `function sayHi() {
      return console.log("Hello");
    }`,
    anwerExplanation: "Açıklama",
    answerA: "Hello",
    answerB: "undefined",
    answerC: "ReferenceError",
    answerD: "TypeError",
    correctAnswer: "a",
  },
];

export default function Home() {
  const [isSesionStart, setIsSesionStart] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [soundsOn, setSoundsOn] = useState(true);
  const { data: technologies } = api.technology.getAll.useQuery();
  const { data: questions } = api.questions.getRandom20Questions.useQuery({
    technologyId: 1,
    limit: 20,
  });

  function handleTechnologyCardClick() {
    setIsSesionStart(true);
  }

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentQuestionIndex((oldIndex) => oldIndex + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestionIndex((oldIndex) => oldIndex - 1);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#021e6d] to-[#15162c]">
        <div className="absolute right-20 top-20">
          <Button variant={"outline"}>
            <Link href={"/add-question"}>Soru Ekle</Link>{" "}
          </Button>
        </div>
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Yazılım <span className="text-[hsl(212,100%,70%)]">Soruları</span>
          </h1>
          <p className="text-center text-2xl font-extrabold text-white">
            Hazırlanıyor...
          </p>

          {!isSesionStart &&
            technologies
              ?.filter((item) => item.name === "javascript")
              .map((item) => (
                <TechnologyCard
                  onClick={handleTechnologyCardClick}
                  key={item.id}
                  technology={item}
                />
              ))}

          <div className="flex flex-col space-y-4 rounded-lg bg-white p-12">
            <RadioGroup
              className="rounded-xl border-2 border-solid p-4"
              defaultValue="informDuringSession"
            >
              <div className="flex flex-col space-y-2">
                <Label className="text-base font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ">
                  Soru cevaplarını
                </Label>
                <div className="flex flex-row items-center  space-x-2">
                  <div className="flex items-center space-x-2">
                    <Label className="text-xl" htmlFor="r1">
                      Anında öğren
                    </Label>
                    <RadioGroupItem value="informDuringSession" id="r1" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="informSessionEnd" id="r2" />
                    <Label className="text-xl" htmlFor="r2">
                      Sonunda öğren
                    </Label>
                  </div>
                </div>
                <Label className="text-sm text-muted-foreground">
                  Test çözüm esnasında sorular işaretlendiği anda veya sonunda
                  öğrenmek istiyorsanız.
                </Label>
              </div>
            </RadioGroup>

            <div className="flex flex-row items-center space-x-6">
              <div className="flex items-center justify-center space-x-2 ">
                <Label className="text-xl" htmlFor="r1">
                  {" "}
                  Soru sayısı
                </Label>
                <Select defaultValue={"20"}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Soru sayısı seç" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Soru sayısı</SelectLabel>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="40">40</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  onClick={() => setSoundsOn(!soundsOn)}
                  defaultChecked={!soundsOn}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode">
                  {soundsOn ? "Sesi Açık" : "Ses kapalı"}
                </Label>
              </div>
            </div>
          </div>
          {isSesionStart && (
            <div className="h-2/3 w-2/3">
              {exampleData.map((question, index) => (
                <QuestionCard
                  key={index}
                  technology={question.technology}
                  questionText={question.questionText}
                  questionCode={question.questionCode}
                  anwerExplanation={question.anwerExplanation}
                  answerA={question.answerA}
                  answerB={question.answerB}
                  answerC={question.answerC}
                  answerD={question.answerD}
                  correctAnswer={question.correctAnswer}
                  previewMode={false}
                />
              ))}

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
          )}
        </div>
      </main>
    </>
  );
}
