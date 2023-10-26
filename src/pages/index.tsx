/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { api } from "@/src/lib/api";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import TechnologyCard from "@/src/components/TechnologyCard/TechnologyCard";

import { UploadCloud } from "lucide-react";
import { useExamStore } from "../store";
import { type Technology } from "@/src/store/index";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import backSvg from "@/src/images/background_wawe.svg";
import Head from "next/head";
import logo from "@/src/images/yazilimSorulariLogo.png";

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

  return (
    <>
      <Head>
        <title>Yazılım Soruları</title>
        <meta
          name="description"
          content="Yazılım dilleri ile ilgili süreli süresiz test sitesi."
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
        />
      </Head>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-tr from-gray-900 via-gray-900  to-cyan-900 pb-14 md:pb-8"
      >
        <div style={{ width: "100%", height: "100%" }}>
          <Image fill src={backSvg} className="object-cover" alt={""} />
        </div>
        <div className="flex h-full flex-col items-center justify-center space-y-4 px-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="md:mb-14">
              <Image
                src={logo}
                priority={true}
                alt={"logo"}
                className="w-[400px] object-contain"
              />
              <h1 className="text-white">Yapım Aşamasında...</h1>
            </div>
          </motion.div>

          <div className="flex lg:absolute lg:right-16 lg:top-14">
            <Link
              className="flex flex-row items-center justify-center text-base"
              href={"/add-question"}
            >
              <Button
                className="rounded-3xl text-cyan-900 transition duration-500 hover:scale-125"
                variant={"outline"}
                size={"xl"}
              >
                <UploadCloud className="mr-2 h-6 w-6" />
                Soru Yükle
              </Button>
            </Link>
          </div>

          {isLoadingTech ? (
            <div className="flex h-full items-center justify-center">
              <div className="absolute bottom-1/3 right-1/2  translate-x-1/2 translate-y-1/2 transform ">
                <div className="border-white-400 h-40 w-40  animate-spin rounded-full border-8 border-solid border-t-transparent"></div>
              </div>
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

        <footer className="absolute bottom-0 w-full bg-transparent">
          <div className="container mx-auto bg-transparent px-4">
            <div className="flex flex-col items-center justify-center">
              <span className="font-sans text-sm font-medium text-white">
                Erdem Karakaş @2023 {/* link to erdemkarkas.dev */}
                <Link
                  href="https://erdemkarakas.dev"
                  className="text-cyan-200 hover:underline"
                  target="_blank"
                >
                  erdemkarakas.dev
                </Link>
              </span>
              <span className="font-sans text-xs text-white">
                Built with t3-stack, Next.js, TailwindCSS, and PlanetScale.
              </span>
            </div>
          </div>
        </footer>
      </motion.main>
      <Toaster />
    </>
  );
}
