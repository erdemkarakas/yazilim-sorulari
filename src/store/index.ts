import { create } from "zustand";

export type ExamType = "informDuringSession" | "informSessionEnd";

export interface Technology {
  technologyId: number;
  technologyAlias: string;
  technologyName: string;
}
interface ExamStore {
  examType: ExamType;
  questionCount: number;
  soundEnabled: boolean;
  randomQuestionIds: number[];
  technology: Technology;
}

export const useExamStore = create<ExamStore>(() => ({
  technology: {
    technologyId: 1,
    technologyAlias: "js",
    technologyName: "JavaScript",
  },
  questionCount: 20,
  examType: "informDuringSession",
  randomQuestionIds: [],
  soundEnabled: true,
  // setNumQuestions: (numQuestions) => set({ questionCount: numQuestions }),
  // setExamType: (examType) => set({ examType }),
  // setRandomQuestionIds: (randomQuestionIds) => set({ randomQuestionIds }),
}));
