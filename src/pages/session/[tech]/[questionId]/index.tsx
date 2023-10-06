import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import { useExamStore } from "@/src/store";
import React from "react";
import { api } from "@/src/lib/api";

export const Session = () => {
  const { examType, questionCount, soundEnabled } = useExamStore();

  const { data: questions } = api.questions.getRandomQuestions.useQuery({
    technologyId: 1,
    limit: questionCount,
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#021e6d] to-[#15162c]">
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
          {/* <Button variant={"outline"} onClick={prevQuestion}>
                  <div className="flex flex-row items-center justify-center gap-2">
                    <MdSkipPrevious size={25} /> Önceki
                  </div>
                </Button>

                <Button variant={"outline"} onClick={nextQuestion}>
                  <div className="flex flex-row items-center justify-center gap-2">
                    Sonra
                    <MdSkipNext size={25} />
                  </div>
                </Button> */}
        </div>
      </div>
    </main>
  );
};
