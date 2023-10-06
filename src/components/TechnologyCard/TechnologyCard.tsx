import React from "react";
import Image from "next/image";
import JavascriptLogo from "@/src/images/javascript.png";
import GoLogo from "@/src/images/golang.png";
import PythonLogo from "@/src/images/python.png";
import JavaLogo from "@/src/images/java.png";
import CSharpLogo from "@/src/images/c-sharp.png";
import CPlusPlusLogo from "@/src/images/s.png";
import PhpLogo from "@/src/images/php.png";
import SqlLogo from "@/src/images/sql.png";

interface Technology {
  technologyId: number;
  technologyAlias: string;
  technologyName: string;
}

interface TechnologyCardProps {
  technology: Technology;
  onClick: () => void;
}

const TechnologyCard: React.FC<TechnologyCardProps> = ({
  technology: item,
  onClick,
}) => {
  const getLogo = (technologyAlias: string) => {
    switch (technologyAlias) {
      case "js":
        return JavascriptLogo;
      case "go":
        return GoLogo;
      case "py":
        return PythonLogo;
      case "java":
        return JavaLogo;
      case "cs":
        return CSharpLogo;
      case "c":
        return CPlusPlusLogo;
      case "php":
        return PhpLogo;
      case "sql":
        return SqlLogo;
      default:
        return JavascriptLogo;
    }
  };

  return (
    <div
      className="flex min-w-full cursor-pointer flex-row items-center justify-around space-x-8 rounded-lg bg-white px-16 py-10 transition duration-500  hover:scale-125 md:mx-auto md:max-w-2xl"
      key={item.technologyId}
      onClick={onClick}
    >
      <Image
        src={getLogo(item.technologyAlias)}
        alt={item.technologyName}
        width={89}
        height={89}
      />

      <div className="flex flex-col justify-center">
        <h1 className=" text-center text-3xl font-bold text-slate-700">
          {item.technologyName.toUpperCase()}
        </h1>
      </div>
    </div>
  );
};

export default TechnologyCard;
