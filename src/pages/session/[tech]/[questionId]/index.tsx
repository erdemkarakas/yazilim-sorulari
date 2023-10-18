/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";
import { useRouter } from "next/router";
import { api } from "@/src/lib/api";
import { useExamStore } from "@/src/store";
import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/src/images/yazilimSorulariLogo.png";
import Head from "next/head";
import { Timer } from "lucide-react";

const QuestionPage = () => {
  const router = useRouter();
  const { questionId } = router.query;
  const { selectedTechnology, randomQuestionIds } = useExamStore();
  const { data: question } = api.questions.getQuestionById.useQuery({
    id: Number(questionId),
    technologyId: selectedTechnology.technologyId,
  });
  const nextQuestion = () => {
    const currentIndex = randomQuestionIds.findIndex(
      (qId) => qId == Number(questionId),
    );

    const nextId = randomQuestionIds[currentIndex + 1];

    if (nextId) {
      void router
        .push(`/session/${selectedTechnology.technologyAlias}/${nextId}`)
        .catch((err) => {
          console.error(err);
        });
    } else {
      void router
        .push(`/session/${selectedTechnology.technologyAlias}/results`)
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <Head>
        <title>Yazılım Soruları Sınav</title>
        <meta
          name="description"
          content="Yazılım dilleri ile ilgili süreli süresiz test sitesi."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <motion.main className="absolute flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr  from-gray-900  via-gray-900  to-cyan-900 ">
        <div className="flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="z-auto"
          >
            <div className="3xl:top-20 absolute left-1/2 top-2 w-auto -translate-x-1/2  ">
              <Image
                className="aspect-w-16 aspect-h-9 w-52 md:w-80"
                src={logo}
                alt={"logo"}
                width={200}
                height={150}
              />
            </div>
          </motion.div>
          <div className="absolute left-4 top-2 flex flex-col rounded-xl border-solid text-lg  font-bold text-white md:left-10 md:top-20 md:border-2 md:bg-white md:p-3 md:text-cyan-900">
            <div>
              <div className="flex flex-row border-solid border-cyan-900 md:border-b-2">
                <span className="mr-2 hidden  sm:block">Kalan Süre</span>
                <Timer className="hidden md:block" />
              </div>
            </div>
            <div className="flex">
              <span>10:00</span>
            </div>
          </div>

          <div className="absolute right-4 top-2 flex flex-col rounded-xl border-solid text-lg  font-bold text-white md:right-20  md:top-20 md:border-2 md:bg-white md:p-3 md:text-cyan-900">
            <div>
              <div className="hidden border-b-2 border-solid border-cyan-900 md:block">
                <span className="hidden  md:block">Soru:</span>
              </div>

              <span>
                {" "}
                <span className="text-3xl">1</span> /10
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full  flex-col  items-center px-2 py-2 sm:w-4/6 md:mt-20">
          {question && (
            <QuestionCard
              key={question.id}
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
          )}
        </div>
      </motion.main>
    </>
  );
};

export default QuestionPage;
