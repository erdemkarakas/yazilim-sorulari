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
import {
  ArrowLeft,
  ArrowUpFromLine,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "@/src/images/logo.png";
export default function TechSessionPage() {
  const router = useRouter();
  const { examType, soundEnabled, selectedTechnology, selectedQuestionCount } =
    useExamStore();
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
    <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr from-gray-900  via-gray-900  to-blue-900">
      <div className="flex min-h-screen flex-col items-center justify-center gap-2 px-10 py-16">
        <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <Link href={"/"}>
            <div className="">
              <Image src={logo} alt={"logo"} />
            </div>
          </Link>
        </h1>

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
            </div>
          </div>
          <div className="flex w-full flex-row justify-between px-1">
            <Button
              onClick={() => router.back()}
              className="text-xl"
              size={"xl"}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Geri Dön
            </Button>
            <Button
              onClick={handleSessionStart}
              className="text-xl"
              size={"xl"}
            >
              <Play className="mr-2 h-4 w-4" /> Başla
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
