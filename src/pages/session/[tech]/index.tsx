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
import { ArrowLeft, Play, TimerOff, Timer, UploadCloud } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import backSvg from "@/src/images/background_wawe.svg";
import Head from "next/head";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import logo from "@/src/images/yazilimSorulariLogo.png";

export default function TechSessionPage() {
  const router = useRouter();
  const { toast } = useToast();
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
    const randomNumbers: number[] = [];
    const sessionTime = 45 * selectedQuestionCount;

    if (!totalQuestionsCount || 10 > totalQuestionsCount) {
      toast({
        variant: "default",
        title: "⚠️Soru sayısı yetersiz",
        description: "Lütfen daha sonra tekrar deneyiniz.",
      });
      return;
    }

    if (totalQuestionsCount) {
      for (let i = 0; i < selectedQuestionCount; i++) {
        const randomNumber =
          Math.floor(Math.random() * totalQuestionsCount) + 1;
        if (randomNumbers.includes(randomNumber)) {
          i--;
          continue;
        }

        randomNumbers.push(randomNumber);
      }
    }
    useExamStore.setState({ sessionTime: sessionTime });
    const firstQuestionId = randomNumbers[0];
    useExamStore.setState({ randomQuestionIds: randomNumbers });
    void router.push(
      `/session/${selectedTechnology.technologyAlias}/${firstQuestionId}`,
    );
  };

  return (
    <>
      <Head>
        <title>Yazılım Soruları Çözüm Modu</title>
        <meta
          name="description"
          content="Yazılım dilleri ile ilgili süreli süresiz test sitesi."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <motion.main className="absolute flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr from-gray-900  via-gray-900  to-cyan-900 ">
        <div className="z-auto">
          <Image fill src={backSvg} className="object-cover" alt={""} />
        </div>
        <div className="flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bottom-56 left-0 z-10 md:bottom-72 md:left-0"
          >
            <div className="h-36 w-64 md:h-full md:w-full">
              <Image src={logo} width={400} height={180} alt={"logo"} />
            </div>
          </motion.div>

          <div className="absolute right-2 top-6 lg:absolute lg:right-16 lg:top-14">
            <Link
              className="flex flex-row items-center justify-center text-base"
              href={"/add-question"}
            >
              <Button
                className="rounded-3xl text-cyan-900 transition duration-500 hover:scale-125"
                variant={"outline"}
                size={"xl"}
              >
                <UploadCloud className="mr-2 h-6 w-6" />
                Soru Yükle
              </Button>
            </Link>
          </div>
        </div>
        {
          <div className="absolute mx-4 flex flex-col space-y-6 rounded-lg bg-white p-6 md:p-12">
            <Badge className="w-48 rounded-xl bg-sky-950 text-base hover:bg-sky-950">
              Test Çözüm Modu
            </Badge>

            <RadioGroup
              className="rounded-xl border-2 border-solid p-4"
              defaultValue="informDuringSession"
              value={examType}
              onValueChange={(e) => {
                handleExamTypeChange(e as ExamType);
              }}
            >
              <Badge
                className={`mb-2 w-fit  ${
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
                  Soru sayısı
                </Label>
                <Select
                  onValueChange={handleQuestionCountChange}
                  defaultValue={"10"}
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
                  id="time-mode"
                />
                <Label htmlFor="time-mode">
                  <div className="flex flex-row">
                    {timerEnabled ? "Zamanlama var " : "Süresiz"}
                  </div>
                </Label>
              </div>
            </div>
            <div className="flex w-full flex-row justify-between ">
              <div>
                <button
                  onClick={() => router.back()}
                  className="group relative mx-auto inline-flex items-center overflow-hidden rounded-2xl bg-sky-900 px-8 py-3 transition "
                >
                  <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                    <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
                  </div>

                  <div className="absolute inset-0.5 rounded-2xl bg-sky-950"></div>

                  <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

                  <span className="font-mona relative mt-px bg-gradient-to-b from-white/75 to-white bg-clip-text text-lg font-medium text-transparent transition-all duration-200 group-hover:text-white">
                    <div className="flex flex-row items-center">
                      <ArrowLeft color="white" className="mr-2 h-4 w-4" />
                      Ana sayfa
                    </div>
                  </span>
                </button>
              </div>
              <div>
                <button
                  onClick={handleSessionStart}
                  className="group  relative mx-auto inline-flex items-center overflow-hidden rounded-2xl bg-sky-900 px-8 py-3 transition "
                >
                  <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                    <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
                  </div>

                  <div className="absolute inset-0.5 rounded-2xl bg-sky-950"></div>

                  <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

                  <span className="font-mona relative mt-px bg-gradient-to-b from-white/75 to-white bg-clip-text text-lg font-medium text-transparent transition-all duration-200 group-hover:text-white">
                    <div className="flex flex-row items-center">
                      <Play color="white" className="mr-2 h-4 w-4" />
                      Başla
                    </div>
                  </span>
                </button>
              </div>
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
      <Toaster />
    </>
  );
}
