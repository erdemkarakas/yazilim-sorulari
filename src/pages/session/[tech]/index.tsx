/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { api } from "@/src/lib/api";
import { type ExamType, useExamStore } from "@/src/store";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpFromLine,
  Play,
  Volume2,
  VolumeX,
  TimerOff,
  Timer,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "@/src/images/yazilimSorularoLogo.svg";
import backSvg from "@/src/images/background_wawe.svg";
import { Checkbox } from "@/components/ui/checkbox";

export default function TechSessionPage() {
  const router = useRouter();
  const {
    examType,
    soundEnabled,
    timerEnabled,
    selectedTechnology,
    selectedQuestionCount,
  } = useExamStore();
  const { data: totalQuestionsCount } = api.questions.getQuestionCount.useQuery(
    {
      technologyId: selectedTechnology.technologyId,
    },
  );

  const handleExamTypeChange = (value: ExamType) => {
    useExamStore.setState({ examType: value });
  };

  const handleSound = (e: boolean) => {
    useExamStore.setState({ soundEnabled: e });
  };
  const handleTimer = (e: boolean) => {
    useExamStore.setState({ timerEnabled: e });
  };
  const handleQuestionCountChange = (count: string) => {
    useExamStore.setState({ selectedQuestionCount: Number(count) });
  };
  const handleSessionStart = () => {
    const randomNumbers = [];
    if (totalQuestionsCount) {
      for (let i = 0; i < selectedQuestionCount; i++) {
        const randomNumber =
          Math.floor(Math.random() * totalQuestionsCount) + 1;
        randomNumbers.push(randomNumber);
      }
    }

    const firstQuestionId = randomNumbers[0];
    useExamStore.setState({ randomQuestionIds: randomNumbers });
    void router.push(
      `/session/${selectedTechnology.technologyAlias}/${firstQuestionId}`,
    );
  };

  return (
    <>
      <motion.main className="absolute flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr from-gray-900  via-gray-900  to-blue-900 ">
        <div className="z-auto">
          <Image src={backSvg} layout="fill" objectFit="cover" alt={""} />
        </div>
        <div className="flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bottom-56 left-0 z-10 md:bottom-72 md:left-0"
          >
            <div className="h-36 w-64 md:h-full md:w-full">
              <Image src={logo} alt={"logo"} width={400} height={180} />
            </div>
          </motion.div>

          <div className="absolute right-2 top-6 lg:absolute lg:right-16 lg:top-14">
            <Button
              className="h-10 rounded-3xl transition duration-500 hover:scale-125 md:h-14"
              variant={"outline"}
              size={"xl"}
            >
              <Link
                className="flex flex-row items-center justify-center text-base"
                href={"/add-question"}
              >
                <ArrowUpFromLine className="mr-2 h-6 w-6" />
                Soru Yükle
              </Link>
            </Button>
          </div>
        </div>
        {
          <div className="absolute mx-4 flex flex-col space-y-6 rounded-lg bg-white p-6 md:p-12">
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
                className={`mb-2 w-fit md:mb-4 ${
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
              <div className="spa flex  flex-col space-y-2">
                <Label className="text-sm text-muted-foreground">
                  Test çözüm esnasında sorular işaretlendiği anda veya sonunda
                  öğrenmek istiyorsanız.
                </Label>
                <div className="flex flex-row items-center space-x-4 md:space-x-6">
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="informDuringSession" id="r1" />
                    <Label className="md:text-xl" htmlFor="r1">
                      Cevabı göster
                    </Label>
                  </div>
                  <div className="flex items-center space-x-1 md:space-x-2">
                    <RadioGroupItem value="informSessionEnd" id="r2" />
                    <Label className="md:text-xl" htmlFor="r2">
                      Cevabı sonunda öğren
                    </Label>
                  </div>
                </div>
              </div>
            </RadioGroup>

            <div className="flex flex-row items-center space-x-6 px-4">
              <div className="flex items-center justify-center space-x-2 ">
                <Label className="md:text-xl" htmlFor="r1">
                  {" "}
                  Soru sayısı
                </Label>
                <Select
                  onValueChange={handleQuestionCountChange}
                  defaultValue={"20"}
                >
                  <SelectTrigger className="w-[80px] md:w-[180px]">
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
                {timerEnabled ? <Timer /> : <TimerOff />}
                <Switch
                  checked={timerEnabled}
                  onCheckedChange={handleTimer}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode">
                  <div className="flex flex-row">
                    {timerEnabled ? "Zamanlama var " : "Süresiz"}
                  </div>
                </Label>
              </div>
              {/* <div className="flex items-center space-x-2">
                {soundEnabled ? <Volume2 /> : <VolumeX />}
                <Switch
                  checked={soundEnabled}
                  onCheckedChange={handleSound}
                  id="airplane-mode"
                />
                <Label htmlFor="airplane-mode">
                  <div className="flex flex-row">
                    {soundEnabled ? "Sesi Açık " : "Ses kapalı"}
                  </div>
                </Label>
              </div> */}
            </div>
            <div className="flex w-full flex-row justify-between px-1">
              <Button
                onClick={() => router.back()}
                className="h-10 md:h-14 md:text-xl"
                size={"xl"}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
              </Button>
              <Button
                onClick={handleSessionStart}
                className="h-10 md:h-14 md:text-xl"
                size={"xl"}
              >
                <Play className="mr-2 h-4 w-4" /> Başla
              </Button>
            </div>
          </div>
        }
        <footer className="absolute bottom-0 w-full">
          <div className="container mx-auto bg-transparent px-4">
            <div className="flex flex-col items-center justify-center">
              <span className="font-sans text-sm font-medium text-white">
                Erdem Karakaş @2023 {/* link to erdemkarkas.dev */}
                <Link
                  href="https://erdemkarakas.dev"
                  className="text-blue-200 hover:underline"
                  target="_blank"
                >
                  erdemkarakas.dev
                </Link>
              </span>
              <span className="font-sans text-xs text-white">
                Built with t3-stack, Next.js, TailwindCSS, and PlanetScale.
              </span>
            </div>
          </div>
        </footer>
      </motion.main>
    </>
  );
}
