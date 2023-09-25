import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import TechnologyCard from "../components/TechnologyCard/TechnologyCard";

export default function Home() {
  const { data: technologies } = api.technology.getAll.useQuery();
  const { data: questions } = api.questions.getRandom20Questions.useQuery({
    technologyId: 1,
    limit: 20,
  });
  return (
    <>
      <Head>
        <title>Yazılım Soruları</title>
        <meta name="description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Yazılım <span className="text-[hsl(212,100%,70%)]">Soruları</span>
          </h1>
          <p className="text-center text-2xl font-extrabold text-white">
            Hazırlanıyor...
          </p>

          {technologies
            ?.filter((item) => item.name === "javascript")
            .map((item) => <TechnologyCard key={item.id} technology={item} />)}
        </div>
      </main>
    </>
  );
}
