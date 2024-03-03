import React, { createContext, useContext, useState } from "react";

type QueryHistoryProviderProps = {
	children: React.ReactNode;
};

type QueryHistoryType = {
	query: string;
	timeStamp: string;
};

type QueryHistoryContextType = {
	history: QueryHistoryType[] | null;
	setHistory: React.Dispatch<React.SetStateAction<QueryHistoryType[] | null>>;
};

const QueryHistoryContext = createContext<QueryHistoryContextType | null>(null);

export function QueryHistoryProvider({ children }: QueryHistoryProviderProps) {
	const [history, setHistory] = useState<QueryHistoryType[] | null>(null);
	return <QueryHistoryContext.Provider value={{ history, setHistory }}>{children}</QueryHistoryContext.Provider>;
}

export function useQueryHistoryProvider() {
	const context = useContext(QueryHistoryContext);
	if (!context) {
		throw new Error("useImageCacheContext must be used within a SearchQueryProvider");
	}
	return context;
}
