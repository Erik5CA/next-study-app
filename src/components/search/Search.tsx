"use client";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export const config = "force-dynamic";

function Search() {
  const [querry, setQuerry] = useState("");
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = (term: string) => {
    const newParams = new URLSearchParams(params);
    if (term) {
      newParams.set("query", term);
    } else {
      newParams.delete("query");
    }

    replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <form className="block md:hidden">
      <label className="bg-emerald-950 py-3 px-4 flex items-center gap-1 md:gap-4 rounded">
        <SearchIcon />
        <input
          name="q"
          type="text"
          placeholder="Search"
          className=" bg-transparent border-none outline-none text-white text-sm"
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={params.get("query")?.toString()}
        />
      </label>
    </form>
  );
}

export default Search;
