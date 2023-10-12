import { create } from "zustand";

export type ExamType = "informDuringSession" | "informSessionEnd";

export interface Technology {
  technologyId: number;
  technologyAlias: string;
  technologyName: string;
}
interface ExamStore {
  examType: ExamType;
  selectedQuestionCount: number;
  soundEnabled: boolean;
  timerEnabled: boolean;
  randomQuestionIds: number[];
  selectedTechnology: Technology;
}

export const useExamStore = create<ExamStore>(() => ({
  selectedTechnology: {
    technologyId: 1,
    technologyAlias: "js",
    technologyName: "JavaScript",
  },
  selectedQuestionCount: 20,
  examType: "informDuringSession",
  randomQuestionIds: [],
  soundEnabled: true,
  timerEnabled: false,
}));
