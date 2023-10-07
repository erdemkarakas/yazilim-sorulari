import Link from "next/link";
import React from "react";

import { Toaster } from "@/components/ui/toaster";
import { api } from "@/src/lib/api";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import TechnologyCard from "@/src/components/TechnologyCard/TechnologyCard";

import { ArrowUpFromLine } from "lucide-react";
import { useExamStore } from "../store";
import { type Technology } from "@/src/store/index";
import Tilt from "react-parallax-tilt";

export default function Home() {
  const router = useRouter();

  const { randomQuestionIds } = useExamStore();

  const { data: technologies } = api.technology.getAll.useQuery();

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
      <main className="flex min-h-screen min-w-full flex-col items-center justify-center bg-gradient-to-b from-[#021e6d] to-[#15162c]">
        <div className="flex min-h-screen flex-col items-center justify-center gap-12 px-10 py-16">
          <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            <Link href={"/"}>
              Yazılım <span className="text-[hsl(212,100%,70%)]">Soruları</span>
            </Link>
          </h1>

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
        </div>
        <Toaster />
      </main>
    </>
  );
}
