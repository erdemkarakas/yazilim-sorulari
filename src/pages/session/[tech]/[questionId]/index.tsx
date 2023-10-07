import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/router";
import { api } from "@/src/lib/api";
import { useExamStore } from "@/src/store";
import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import { MdSkipNext } from "react-icons/md";
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
    <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-b from-[#021e6d] to-[#15162c]">
      <div className="flex w-[900px] flex-col items-center">
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

        <div className="mt-2 flex items-center justify-evenly space-x-28">
          {/* <Button variant={"outline"} onClick={prevQuestion}>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <MdSkipPrevious size={25} /> Önceki
                  </div>
                </Button> */}

          <Button variant={"outline"} onClick={nextQuestion}>
            <div className="flex flex-row items-center justify-center gap-2">
              Sonra
              <MdSkipNext size={25} />
            </div>
          </Button>
        </div>
      </div>

      <Button>Sonraki</Button>
    </main>
  );
};

export default QuestionPage;
