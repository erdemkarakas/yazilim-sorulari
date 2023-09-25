import React from "react";
import Image from "next/image";
import JavascriptGif from "../../images/gifs/javascript.gif";

interface Technology {
  id: number;
  name: string;
}

interface TechnologyCardProps {
  technology: Technology;
  onClick?: () => void;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  technology,
  onClick,
}) => {
  return (
    <div
      className="h-50 w-75 m-2 flex cursor-pointer flex-row items-center justify-center space-x-8 rounded-lg bg-white px-16 py-10  transition duration-500 hover:scale-125"
      key={technology.id}
      onClick={onClick}
    >
      <Image src={JavascriptGif} alt={technology.name} width={80} height={80} />
      <div className="flex flex-col justify-center">
        <h1 className=" text-center text-4xl font-bold text-slate-700">
          {technology.name.toUpperCase()}
        </h1>
        <span className="mr-1  text-right text-slate-700">20 Soru</span>
      </div>
    </div>
  );
};

export default TechnologyCard;
