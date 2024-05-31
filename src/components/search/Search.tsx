"use client";
import { Search as SearchIcon } from "lucide-react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import clsx from "clsx";
import { useDebouncedCallback } from "use-debounce";

interface Props {
  type: "nav" | "feed";
}

function Search({ type }: Props) {
  const params = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleChange = useDebouncedCallback((term: string) => {
    const newParams = new URLSearchParams(params);
    if (term) {
      newParams.set("query", term);
    } else {
      newParams.delete("query");
    }

    replace(`/?${newParams.toString()}`);
  }, 350);

  return (
    <form
      className={clsx("", {
        "block md:hidden": type === "feed",
        "hidden md:block": type === "nav",
      })}
    >
      <label className="bg-emerald-950 py-3 px-4 flex items-center gap-1 md:gap-4 rounded">
        <SearchIcon />
        <input
          name="q"
          type="text"
          placeholder="Search for rooms..."
          className=" bg-transparent border-none outline-none text-white text-sm"
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={params.get("query")?.toString()}
        />
      </label>
    </form>
  );
}

export default Search;
