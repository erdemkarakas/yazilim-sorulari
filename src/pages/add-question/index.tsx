/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import "@uiw/react-textarea-code-editor/dist.css";
import dynamic from "next/dynamic";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import QuestionCard from "@/src/components/QuestionCard/QuestionCard";
import { Skeleton } from "@/components/ui/skeleton";
import { MdOutlinePreview } from "react-icons/md";
import { api } from "@/src/lib/api";
import { AiOutlineRollback, AiOutlineUpload } from "react-icons/ai";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
);

export default function AddQuestion() {
  const [questionHaveCode, setQuestionHaveCode] = useState(false);
  const [answerHaveExplanation, setAnswerHaveExplanation] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const { toast } = useToast();
  const addQuestionMutation = api.questions.addQuestion.useMutation({
    onSuccess: () => {
      setPreviewMode(false);
      toast({
        title: "✅ Soru başarıyla gönderildi.",
        description: "Sorunuz onaylandıktan sonra yayınlanacaktır.",
      });
      form.reset();
    },
    onError: () => {
      setPreviewMode(false);
      toast({
        variant: "destructive",
        title: "Soru gönderilirken bir hata oluştu.",
        description: "Lütfen daha sonra tekrar deneyiniz.",
      });
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const formSchema = z.object({
    technology: z.string().min(1, {
      message: "Teknoloji seçilmelidir.",
    }),
    questionText: z
      .string()
      .min(10, {
        message: "Soru en az 10 karakterden oluşmalıdır.",
      })
      .max(160, {
        message: "Soru en fazla 160 karakterden oluşmalıdır.",
      }),
    questionCode: z.string().optional(),
    answerExplanation: z.string().optional(),
    answerA: z.string().min(2, {
      message: "Şık içermelidir.",
    }),
    answerB: z.string().min(1, {
      message: "Şık içermelidir.",
    }),
    answerC: z.string().min(1, {
      message: "Şık içermelidir.",
    }),
    answerD: z.string().min(1, {
      message: "Şık içermelidir.",
    }),
    correctAnswer: z.string().min(1, {
      message: "Doğru cevap seçilmelidir.",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      technology: "",
      questionText: "",
      questionCode: "",
      answerExplanation: "",
      answerA: "",
      answerB: "",
      answerC: "",
      answerD: "",
      correctAnswer: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    setPreviewMode(true);
  }
  const isFormValid = form.formState.isValid;

  function handleAddQuestion() {
    addQuestionMutation.mutate({
      technologyId: Number(form.watch("technology")),
      questionText: form.watch("questionText"),
      questionCode: form.watch("questionCode"),
      answerA: form.watch("answerA"),
      answerB: form.watch("answerB"),
      answerC: form.watch("answerC"),
      answerD: form.watch("answerD"),
      correctAnswer: form.watch("correctAnswer"),
      answerExp: form.watch("answerExplanation"),
    });
  }

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center  bg-gradient-to-b from-[#021e6d] to-[#15162c] px-44 pt-10">
        <h1 className="mb-8 text-6xl font-bold text-white">
          Yazılım Sorusu Gönder
        </h1>
        {previewMode ? (
          <div className="flex h-screen w-full flex-col items-center justify-start space-x-4 rounded-xl bg-white">
            <QuestionCard
              technology={Number(form.watch("technology"))}
              questionText={form.watch("questionText")}
              questionCode={form.watch("questionCode")}
              anwerExplanation={form.watch("answerExplanation")}
              answerA={form.watch("answerA")}
              answerB={form.watch("answerB")}
              answerC={form.watch("answerC")}
              answerD={form.watch("answerD")}
              correctAnswer={form.watch("correctAnswer")}
              previewMode={true}
            />
            <div className="mt-4 flex w-full flex-row justify-evenly px-6">
              <Button
                className="gap-4 text-xl"
                size={"xl"}
                onClick={() => setPreviewMode(false)}
              >
                <AiOutlineRollback size={30} /> Geri Dön
              </Button>
              <Button
                onClick={handleAddQuestion}
                className="gap-4 text-xl"
                size={"xl"}
              >
                <AiOutlineUpload size={30} />
                Gönder
              </Button>
            </div>
          </div>
        ) : (
          <div className="w-full rounded-lg bg-white px-16 py-12">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="technology"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Teknoloji</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Teknoloji" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Javascript</SelectItem>
                            <SelectItem value="2">Python</SelectItem>
                            <SelectItem value="3">Java</SelectItem>
                            <SelectItem value="4">SQL</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="questionText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Soru</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Soru"
                            className="mb-4 mt-6 max-h-[650px] resize-none overflow-x-auto rounded-lg border py-4 font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Satır başlarına dikkat ediniz.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={questionHaveCode}
                    onCheckedChange={(e: boolean) =>
                      setQuestionHaveCode(Boolean(e))
                    }
                    id="haveQuestionCode"
                  />
                  <label
                    htmlFor="haveQuestionCode"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Soru ile ilgili bir kod parçası var.
                  </label>
                </div>
                {questionHaveCode && (
                  <div className="space-y-2">
                    <div data-color-mode="dark">
                      <FormField
                        control={form.control}
                        name="questionCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Soru Kodu (Opsiyonel)</FormLabel>
                            <FormControl>
                              <CodeEditor
                                {...field}
                                language="js"
                                id="questionCode"
                                placeholder="Kodu buraya giriniz."
                                onChange={(newValue) => {
                                  field.onChange(newValue);
                                }}
                                padding={15}
                                data-color-mode="dark"
                                style={{
                                  fontSize: 12,
                                  backgroundColor: "#f5f5f5",
                                  fontFamily:
                                    "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              Satır başlarına ve boşluklara dikkat ediniz.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={answerHaveExplanation}
                    onCheckedChange={(e: boolean) =>
                      setAnswerHaveExplanation(Boolean(e))
                    }
                    id="answerExplanation"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Cevap ile ilgili bir açıklama var.
                  </label>
                </div>
                {answerHaveExplanation && (
                  <FormField
                    control={form.control}
                    name="answerExplanation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel> Cevap açıklaması (Opsiyonel)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cevap açıklaması"
                            className="mb-4 mt-6 max-h-[650px] resize-none overflow-x-auto rounded-lg border py-4 font-mono text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Satır başlarına dikkat ediniz.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                <FormField
                  control={form.control}
                  name="answerA"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>A şıkkı:</FormLabel>
                        <FormControl>
                          <Input placeholder="A şıkkı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answerB"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>B şıkkı:</FormLabel>
                        <FormControl>
                          <Input placeholder="B şıkkı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answerC"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>C Şıkkı:</FormLabel>
                        <FormControl>
                          <Input placeholder="C şıkkı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="answerD"
                  render={({ field }) => (
                    <FormItem>
                      <div className="space-y-2">
                        <FormLabel>D Şıkkı:</FormLabel>
                        <FormControl>
                          <Input placeholder="D şıkkı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="correctAnswer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Doğru cevap</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Doğru cevap" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="a">A</SelectItem>
                            <SelectItem value="b">B</SelectItem>
                            <SelectItem value="c">C</SelectItem>
                            <SelectItem value="d">D</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex w-full flex-row justify-between ">
                  <Button className="gap-2 text-xl" size={"xl"}>
                    <AiOutlineRollback size={25} />
                    <Link href="/">Ana sayfaya dön</Link>
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => {
                      isFormValid && setPreviewMode(true);
                    }}
                    className="gap-2 text-xl"
                    size={"xl"}
                  >
                    <MdOutlinePreview size={25} /> Önizle
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
        <Toaster />
      </main>
    </>
  );
}