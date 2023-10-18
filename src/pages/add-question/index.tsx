/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from "react";
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
import { MdOutlinePreview } from "react-icons/md";
import { api } from "@/src/lib/api";
import { AiOutlineRollback, AiOutlineUpload } from "react-icons/ai";
import Link from "next/link";
import { Toaster } from "@/components/ui/toaster";
import { motion } from "framer-motion";
import Image from "next/image";
import logo from "@/src/images/yazilimSorulariLogo.png";
import { UploadCloud } from "lucide-react";
import Head from "next/head";

const CodeEditor = dynamic(
  () => import("@uiw/react-textarea-code-editor").then((mod) => mod.default),
  { ssr: false },
);

export default function AddQuestion() {
  const [questionHaveCode, setQuestionHaveCode] = useState(false);
  const [answerHaveExplanation, setAnswerHaveExplanation] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
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

  const formSchema = z.object({
    technology: z.string().min(1, {
      message: "Teknoloji seçilmelidir.",
    }),
    questionText: z
      .string()
      .min(4, {
        message: "Soru en az 5 karakterden oluşmalıdır.",
      })
      .max(500, {
        message: "Soru en fazla 500 karakterden oluşmalıdır.",
      }),
    questionCode: z
      .string()
      .max(500, {
        message: "Kod en fazla 500 karakterden oluşmalıdır.",
      })
      .optional(),
    answerExplanation: z
      .string()
      .max(1000, {
        message: "Açıklama en fazla 1000 karakterden oluşmalıdır.",
      })
      .optional(),
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

  function onSubmit(_values: z.infer<typeof formSchema>) {
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
      <Head>
        <title>Yazılım Soruları Soru Yükle</title>
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
        <div className="flex w-2/3 flex-col ">
          <div className="flex flex-row items-center justify-center space-x-6">
            {" "}
            <div className="flex ">
              <Link href="/" passHref>
                <Image src={logo} alt={"logo"} width={400} height={180} />
              </Link>
            </div>
            <div>
              {" "}
              <UploadCloud color="white" className="h-20 w-20" />
            </div>
            <h1 className="text-center text-6xl font-bold text-white">
              Soru Gönder
            </h1>
          </div>

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
                <div>
                  <button
                    onClick={() => setPreviewMode(false)}
                    className="group  relative mx-auto inline-flex items-center overflow-hidden rounded-2xl bg-sky-900 px-6 py-2 transition "
                  >
                    <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                      <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
                    </div>

                    <div className="absolute inset-0.5 rounded-2xl bg-sky-950"></div>

                    <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

                    <span className="font-mona relative mt-px bg-gradient-to-b from-white/75 to-white bg-clip-text text-base font-medium text-transparent transition-all duration-200 group-hover:text-white">
                      <div className="flex flex-row items-center">
                        <AiOutlineRollback color="white" size={30} /> Geri Dön
                      </div>
                    </span>
                  </button>
                </div>

                <div>
                  <button
                    onClick={handleAddQuestion}
                    disabled={addQuestionMutation.isLoading}
                    className="group  relative mx-auto inline-flex items-center overflow-hidden rounded-2xl bg-sky-900 px-6 py-2 transition "
                  >
                    <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                      <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
                    </div>

                    <div className="absolute inset-0.5 rounded-2xl bg-sky-950"></div>

                    <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

                    <span className="font-mona relative mt-px bg-gradient-to-b from-white/75 to-white bg-clip-text text-base font-medium text-transparent transition-all duration-200 group-hover:text-white">
                      <div className="flex flex-row items-center">
                        <AiOutlineUpload color="white" size={30} />
                        Gönder
                      </div>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full rounded-lg bg-white px-14 py-12">
              <div className="flex justify-end">
                {" "}
                <Link href="/" passHref>
                  <div>
                    <button className="group  relative mx-auto inline-flex items-center overflow-hidden rounded-2xl bg-sky-900 px-6 py-2 transition ">
                      <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                        <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
                      </div>

                      <div className="absolute inset-0.5 rounded-2xl bg-sky-950"></div>

                      <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

                      <span className="font-mona relative mt-px bg-gradient-to-b from-white/75 to-white bg-clip-text text-base font-medium text-transparent transition-all duration-200 group-hover:text-white">
                        <div className="flex flex-row items-center gap-2">
                          <AiOutlineRollback color="white" size={20} />
                          Ana sayfaya
                        </div>
                      </span>
                    </button>
                  </div>
                </Link>
              </div>
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
                              <SelectItem value="5">Go</SelectItem>
                              <SelectItem value="6">Php</SelectItem>
                              <SelectItem value="7">C#</SelectItem>
                              <SelectItem value="8">C++</SelectItem>
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
                          <FormLabel>C şıkkı:</FormLabel>
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
                          <FormLabel>D şıkkı:</FormLabel>
                          <FormControl>
                            <Input placeholder="D şıkkı" {...field} />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
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
                  <div className="flex w-full flex-row justify-center ">
                    <div>
                      <button
                        type="submit"
                        onClick={() => {
                          isFormValid && setPreviewMode(true);
                        }}
                        className="group  relative mx-auto inline-flex items-center overflow-hidden rounded-2xl bg-sky-900 px-8 py-3 transition "
                      >
                        <div className="absolute inset-0 flex items-center [container-type:inline-size]">
                          <div className="absolute h-[100cqw] w-[100cqw] animate-spin bg-[conic-gradient(from_0_at_50%_50%,rgba(255,255,255,0.5)_0deg,transparent_60deg,transparent_300deg,rgba(255,255,255,0.5)_360deg)] opacity-0 transition duration-300 [animation-duration:3s] group-hover:opacity-100"></div>
                        </div>

                        <div className="absolute inset-0.5 rounded-2xl bg-sky-950"></div>

                        <div className="absolute bottom-0 left-1/2 h-1/3 w-4/5 -translate-x-1/2 rounded-full bg-white/10 opacity-50 blur-md transition-all duration-500 group-hover:h-2/3 group-hover:opacity-100"></div>

                        <span className="font-mona relative mt-px bg-gradient-to-b from-white/75 to-white bg-clip-text text-lg font-medium text-transparent transition-all duration-200 group-hover:text-white">
                          <div className="flex flex-row items-center gap-2">
                            <MdOutlinePreview color="white" size={25} /> Önizle
                          </div>
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          )}
          <Toaster />
        </div>
      </motion.main>
    </>
  );
}
