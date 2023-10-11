import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/src/lib/api";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import TechnologyCard from "@/src/components/TechnologyCard/TechnologyCard";

import { ArrowUpFromLine } from "lucide-react";
import { useExamStore } from "../store";
import { type Technology } from "@/src/store/index";
import Tilt from "react-parallax-tilt";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import logo from "@/src/images/logo.png";

export default function Home() {
  const router = useRouter();

  const { randomQuestionIds } = useExamStore();

  const { data: technologies, isLoading: isLoadingTech } =
    api.technology.getAll.useQuery();

  const handleTechnologySelect = async (selectedTechnology: Technology) => {
    try {
      useExamStore.setState({
        selectedTechnology: {
          technologyId: selectedTechnology.technologyId,
          technologyAlias: selectedTechnology.technologyAlias,
          technologyName: selectedTechnology.technologyName,
        },
      });
      await router.push(`/session/${selectedTechnology.technologyAlias}`);
    } catch (error: unknown) {
      console.error(error);
    }
  };
  const title1 = "Yazılım ";
  const title2 = "Soruları";
  return (
    <>
      <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr from-gray-900  via-gray-900  to-blue-900 ">
        <div className="flex min-h-screen flex-col items-center justify-center space-y-4 px-10">
          <div className="md:pb-12">
            <Image src={logo} alt={"logo"} />
          </div>
          {/* {!isLoadingTech && (
            <motion.div className="text flex flex-row items-center justify-center gap-1">
              {title1.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                  className="text-center text-5xl font-extrabold tracking-tight text-white drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-[5rem]"
                >
                  {letter}
                </motion.span>
              ))}
              <div className="rounded-lg bg-white bg-opacity-75 px-4 py-1">
                {title2.split("").map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.1 + 0.8 }}
                    className="text-center text-5xl font-extrabold tracking-tight text-[#021e6d] drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] sm:text-[5rem]"
                  >
                    {letter}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          )} */}
          {/* <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href={"/"}>
              Yazılım <span className="text-[hsl(212,100%,70%)]">Soruları</span>
            </Link>
          </h1> */}

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

          {isLoadingTech ? (
            <div className="flex h-full justify-center">
              <Skeleton className="h-96 w-full" />
            </div>
          ) : (
            <div className="flex h-full justify-center">
              <div className="grid-col-1 grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                {technologies?.map(
                  (item: { id: number; name: string; alias: string }) => (
                    <Tilt key={item.id}>
                      <TechnologyCard
                        key={item.id}
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        onClick={async (): Promise<void> => {
                          await handleTechnologySelect({
                            technologyId: item.id,
                            technologyAlias: item.alias,
                            technologyName: item.name,
                          });
                        }}
                        technology={{
                          technologyId: item.id,
                          technologyAlias: item.alias,
                          technologyName: item.name,
                        }}
                      />
                    </Tilt>
                  ),
                )}
              </div>
            </div>
          )}
        </div>
        <Toaster />
        <div className="flex flex-col items-center justify-center gap-2">
          {" "}
          <span className="font-mono text-sm font-medium text-white">
            Erdem Karakaş @2023 {/* link to erdemkarkas.dev */}
            <Link
              href="https://erdemkarakas.dev"
              className="text-blue-200 hover:underline"
              target="_blank"
            >
              erdemkarakas.dev
            </Link>
          </span>
          <span className="font-mono text-xs text-white">
            Built with t3-stack, Next.js, TailwindCSS, and PlanetScale.
          </span>
        </div>
      </main>
    </>
  );
}
