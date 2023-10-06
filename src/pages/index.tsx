import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/src/lib/api";
import TechnologyCard from "@/src/components/TechnologyCard/TechnologyCard";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { useExamStore } from "../store";
import { type ExamType } from "@/src/store/index";
import { type Technology } from "@/src/store/index";
import { Badge } from "@/components/ui/badge";
import Tilt from "react-parallax-tilt";

export default function Home() {
  const [sessionStep, setSessionStep] = useState(1);

  const { examType, soundEnabled, technology } = useExamStore();

  const { data: technologies } = api.technology.getAll.useQuery();

  const handleQuestionCountChange = (count: string) => {
    useExamStore.setState({ questionCount: Number(count) });
  };

  const handleExamTypeChange = (value: ExamType) => {
    useExamStore.setState({ examType: value });
  };

  const handleSound = (e: boolean) => {
    useExamStore.setState({ soundEnabled: e });
  };

  const handleTechnologySelect = (selectedTechnology: Technology) => {
    setSessionStep(2);
    useExamStore.setState({
      technology: {
        technologyId: selectedTechnology.technologyId,
        technologyAlias: selectedTechnology.technologyAlias,
        technologyName: selectedTechnology.technologyName,
      },
    });
  };

  return (
    <>
      <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-b from-[#021e6d] to-[#15162c]">
        <div className="flex min-h-screen flex-col items-center justify-center gap-12 px-10 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href={"/"}>
              Yazılım <span className="text-[hsl(212,100%,70%)]">Soruları</span>
            </Link>
          </h1>
          {sessionStep != 3 && (
            <div className="flex lg:absolute lg:right-20 lg:top-20">
              <Button
                className="transition duration-500 hover:scale-125"
                variant={"outline"}
                size={"xl"}
              >
                <Link
                  className="flex flex-row items-center justify-center text-base"
                  href={"/add-question"}
                >
                  <ArrowUpFromLine className="mr-2 h-4 w-4" />
                  Soru Yükle
                </Link>
              </Button>
            </div>
          )}
          <div className="flex h-full justify-center">
            <div className="grid-col-1 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
              {sessionStep == 1 &&
                technologies?.map(
                  (item: { id: number; name: string; alias: string }) => (
                    <Tilt key={item.id}>
                      <TechnologyCard
                        key={item.id}
                        onClick={() =>
                          handleTechnologySelect({
                            technologyId: item.id,
                            technologyAlias: item.alias,
                            technologyName: item.name,
                          })
                        }
                        technology={{
                          technologyId: item.id,
                          technologyAlias: item.alias,
                          technologyName: item.name,
                        }}
                      />
                    </Tilt>
                  ),
                )}
            </div>
          </div>
          {sessionStep == 2 && (
            <div className="flex flex-col space-y-6 rounded-lg bg-white p-12">
              <Badge className="w-48 text-xl">Test Çözüm Modu</Badge>

              <RadioGroup
                className="rounded-xl border-2 border-solid p-4"
                defaultValue="informDuringSession"
                value={examType}
                onValueChange={(e) => {
                  handleExamTypeChange(e as ExamType);
                }}
              >
                <Badge
                  className={`w-fit ${
                    technology.technologyAlias == "js"
                      ? "bg-yellow-200"
                      : technology.technologyAlias == "go"
                      ? "bg-blue-400 "
                      : technology.technologyAlias == "py"
                      ? "bg-sky-400 "
                      : technology.technologyAlias == "java"
                      ? "bg-red-400 text-white"
                      : technology.technologyAlias == "sql"
                      ? "bg-blue-400 text-white"
                      : technology.technologyAlias == "php"
                      ? "bg-blue-400 text-white"
                      : technology.technologyAlias == "cs"
                      ? "bg-violet-400 text-white"
                      : technology.technologyAlias == "c"
                      ? "bg-blue-400 text-white"
                      : ""
                  }`}
                  variant="outline"
                >
                  {technology.technologyName}
                </Badge>
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
                  <Select
                    onValueChange={handleQuestionCountChange}
                    defaultValue={"20"}
                  >
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
                    checked={soundEnabled}
                    onCheckedChange={handleSound}
                    id="airplane-mode"
                  />
                  <Label htmlFor="airplane-mode">
                    {soundEnabled ? "Sesi Açık" : "Ses kapalı"}
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
                  onClick={() => {
                    setSessionStep(3);
                  }}
                  className="text-xl"
                  size={"xl"}
                >
                  <Play className="mr-2 h-4 w-4" /> Başla
                </Button>
              </div>
            </div>
          )}
          {/* {sessionStep == 3 && (
            <div className="flex w-[900px] flex-col items-center">
              {questionsData1?.map((question, index) => (
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
          )} */}
        </div>
        <Toaster />
      </main>
    </>
  );
}
