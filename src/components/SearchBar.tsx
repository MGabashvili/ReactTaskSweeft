import { BsSearch } from "react-icons/bs";
import { FaXmark } from "react-icons/fa6";
import { useSearchQueryProvider } from "../contexts/SearchQueryContext";
import { useQueryHistoryProvider } from "../contexts/QueryHistoryContext";

type QueryHistoryType = {
	query: string;
	timeStamp: string;
};

export default function SearchBar() {
	const { query, setQuery } = useSearchQueryProvider();
	const { history, setHistory } = useQueryHistoryProvider();

	function handleInputChange(e) {
		const inputQuery = e.target.value;
		const timeStamp = new Date();
		const currentHistory = { query: inputQuery, timeStamp: timeStamp };
		setQuery(inputQuery);
		setHistory(prevH => {
			if (!prevH) return [currentHistory];
			return [...prevH, currentHistory];
		});
	}

	return (
		<div
			className="flex flex-col items-center justify-center 
                    gap-y-1 lg:flex-row lg:gap-x-4">
			{/* <h3 className="font-bold md:text-xl">Search for Gas Station</h3> */}
			<div
				className="group flex w-full items-center justify-start rounded-lg
                   border border-coolGrey-300 px-4 py-4 
                   shadow-md has-[:focus]:ring-4 has-[:focus]:ring-blueVivid-400
                   md:w-[550px] md:text-2xl">
				<BsSearch className="group-focus-within:text-blue-500" />
				<input
					className=" w-full rounded-md border-none border-coolGrey-100
          bg-transparent px-4 text-slate-900 focus:outline-none focus:ring-0
          md:text-2xl"
					type="text"
					inputMode="search"
					value={query}
					onChange={handleInputChange}
					placeholder="Search"
				/>

				<FaXmark
					className={`${query === "" && "hidden"} text-blueVivid-500 transition-all
          duration-300 hover:rotate-90 hover:cursor-pointer`}
					onClick={() => setQuery("")}></FaXmark>
			</div>
		</div>
	);
}
