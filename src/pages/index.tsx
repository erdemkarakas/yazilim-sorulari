import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import TechnologyCard from "../components/TechnologyCard/TechnologyCard";
import QuestionCard from "~/components/QuestionCard/QuestionCard";
import React, { useState } from "react";

const exampleData = [
  {
    questionText: "Çıktısı Nedir?",
    options: [
      { key: "a", text: "0 1 2 ve 0 1 2" },
      { key: "b", text: "0 1 2 ve 3 3 3" },
      { key: "c", text: "3 3 3 ve 0 1 2" },
      { key: "d", text: "4 4 4 ve 4 1 6" },
    ],
    correctAnswer: "c",
  },
  // Daha fazla soru ekleyebilirsiniz ...
];

export default function Home() {
  const [isSesionStart, setIsSesionStart] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const { data: technologies } = api.technology.getAll.useQuery();
  const { data: questions } = api.questions.getRandom20Questions.useQuery({
    technologyId: 1,
    limit: 20,
  });
  const firstCode = questions
    ?.filter((item) => item.technologyId === 1)
    .map((item) => item.questionCode)[0];
  console.log(firstCode);

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
          {isSesionStart && (
            <div className="h-2/3 w-2/3">
              {exampleData.map((question, index) => (
                <QuestionCard
                  key={index}
                  questionText={question.questionText}
                  questionCode={firstCode}
                  options={question.options}
                  correctAnswer={question.correctAnswer}
                  nextQuestion={nextQuestion}
                  prevQuestion={prevQuestion}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
