/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/src/lib/api";
import TechnologyCard from "@/src/components/TechnologyCard/TechnologyCard";
import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, ArrowUpFromLine, Play } from "lucide-react";

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
  const [sessionStep, setSessionStep] = useState(1);
  const [selectedTechnology, setSelectedTechnology] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [soundsOn, setSoundsOn] = useState(true);
  const { data: technologies } = api.technology.getAll.useQuery();
  const { data: questions } = api.questions.getRandomQuestions.useQuery({
    technologyId: 1,
    limit: 20,
  });

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
        {sessionStep != 3 && (
          <div className="absolute right-20 top-20">
            <Button
              className="transition duration-500 hover:scale-125"
              variant={"outline"}
            >
              <Link
                className="flex flex-row items-center justify-center text-base"
                href={"/add-question"}
              >
                <ArrowUpFromLine className="mr-2 h-4 w-4" />
                Soru Ekle
              </Link>
            </Button>
          </div>
        )}
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Yazılım <span className="text-[hsl(212,100%,70%)]">Soruları</span>
          </h1>
          <p className="text-center text-2xl font-extrabold text-white">
            Hazırlanıyor...
          </p>

          {sessionStep == 1 &&
            technologies
              ?.filter((item) => item.name === "javascript")
              .map((item) => (
                <TechnologyCard
                  onClick={() => setSessionStep(2)}
                  key={item.id}
                  technology={item}
                />
              ))}

          {sessionStep == 2 && (
            <div className="flex flex-col space-y-6 rounded-lg bg-white p-12">
              <RadioGroup
                className="rounded-xl border-2 border-solid p-4"
                defaultValue="informDuringSession"
              >
                <div className="flex flex-col space-y-2">
                  <Label className="text-sm text-muted-foreground">
                    Test çözüm esnasında sorular işaretlendiği anda veya sonunda
                    öğrenmek istiyorsanız.
                  </Label>
                  <div className="flex flex-row items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="informDuringSession" id="r1" />
                      <Label className="text-xl" htmlFor="r1">
                        Soru cevaplarını anında öğren
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="informSessionEnd" id="r2" />
                      <Label className="text-xl" htmlFor="r2">
                        Soru cevaplarını sonunda öğren
                      </Label>
                    </div>
                  </div>
                </div>
              </RadioGroup>

              <div className="flex flex-row items-center space-x-6 px-4">
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
                    defaultChecked={soundsOn}
                    id="airplane-mode"
                  />
                  <Label htmlFor="airplane-mode">
                    {soundsOn ? "Sesi Açık" : "Ses kapalı"}
                  </Label>
                </div>
              </div>
              <div className="flex w-full flex-row justify-between px-1">
                <Button
                  onClick={() => setSessionStep(1)}
                  className="text-xl"
                  size={"xl"}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
                </Button>
                <Button
                  onClick={() => setSessionStep(3)}
                  className="text-xl"
                  size={"xl"}
                >
                  <Play className="mr-2 h-4 w-4" /> Başla
                </Button>
              </div>
            </div>
          )}
          {sessionStep == 3 && (
            <div className="flex w-[900px] flex-col items-center">
              {questions?.map((question, index) => (
                <QuestionCard
                  key={index}
                  technology={question.technologyId}
                  questionText={question.questionText}
                  questionCode={question.questionCode}
                  anwerExplanation={question.answerExp}
                  answerA={question.answerA}
                  answerB={question.answerB}
                  answerC={question.answerC}
                  answerD={question.answerD}
                  correctAnswer={question.correctAnswer}
                  previewMode={false}
                />
              ))}

              <div className="mt-2 flex items-center justify-evenly space-x-28">
                <Button variant={"outline"} onClick={prevQuestion}>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <MdSkipPrevious size={25} /> Önceki
                  </div>
                </Button>

                <Button variant={"outline"} onClick={nextQuestion}>
                  <div className="flex flex-row items-center justify-center gap-2">
                    Sonra
                    <MdSkipNext size={25} />
                  </div>
                </Button>
              </div>
            </div>
          )}
        </div>
        <Toaster />
      </main>
    </>
  );
}
