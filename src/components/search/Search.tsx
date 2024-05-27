import { Search as SearchIcon } from "lucide-react";

function Search() {
  return (
    <form className="block md:hidden">
      <label className="bg-emerald-950 py-3 px-4 flex items-center gap-1 md:gap-4 rounded">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search"
          className=" bg-transparent border-none outline-none text-white text-sm"
        />
      </label>
    </form>
  );
}

export default Search;
