import { useState } from "react";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Lupa from "@/public/lupa.svg";

const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="relative w-full">
      <Input
        isClearable
        placeholder="Buscar"
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full"
      />
      <Image
        src={Lupa}
        alt="buscar"
        className="absolute top-[23%] xl:right-[5%] flex items-center right-[10%]"
      />
    </div>
  );
};

export default InputSearch;
