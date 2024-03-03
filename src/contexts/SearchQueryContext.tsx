import { createContext, useContext, useState } from "react";

type ContextValue = {
	query: string;
	setQuery: React.Dispatch<React.SetStateAction<string>>;
};

type SearchQueryProviderProps = {
	children: React.ReactNode;
};

const SearchQueryContext = createContext<ContextValue | null>(null);

export function SearchQueryProvider({ children }: SearchQueryProviderProps) {
	const [query, setQuery] = useState<string>("");
	return <SearchQueryContext.Provider value={{ query, setQuery }}>{children}</SearchQueryContext.Provider>;
}

export function useSearchQueryProvider() {
	const context = useContext(SearchQueryContext);
	if (!context) {
		throw new Error("useSearchQueryContext must be used within a SearchQueryProvider");
	}
	return context;
}
