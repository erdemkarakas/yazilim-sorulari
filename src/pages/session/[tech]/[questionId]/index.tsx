/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/router";
import { api } from "@/src/lib/api";
import { useExamStore } from "@/src/store";
import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/src/images/yazilimSorularoLogo.svg";
import backSvg from "@/src/images/background_wawe.svg";
import Head from "next/head";

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
      <motion.main className="absolute flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr from-gray-900  via-gray-900  to-blue-900 ">
        <div className="flex">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="z-auto"
          >
            <div className="">
              <Image src={logo} alt={"logo"} width={400} height={180} />
            </div>
          </motion.div>
        </div>
        <div className="flex flex-col items-center px-4 py-6 md:w-[900px]">
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
