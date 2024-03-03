import React, { createContext, useContext, useState } from "react";

type ImageCacheProviderProps = {
	children: React.ReactNode;
};
type ImageCacheValue = {
	page: number;
	images: [];
};
type ImageCache = {
	cache: Map<string, ImageCacheValue>;
	setCache: React.Dispatch<React.SetStateAction<Map<string, ImageCacheValue>>>;
};

const ImageCacheContext = createContext<ImageCache | null>(null);

export function ImageCacheProvider({ children }: ImageCacheProviderProps) {
	const [cache, setCache] = useState(new Map());
	return <ImageCacheContext.Provider value={{ cache, setCache }}>{children}</ImageCacheContext.Provider>;
}

export function useImageCacheProvider() {
	const context = useContext(ImageCacheContext);
	if (!context) {
		throw new Error("useImageCacheContext must be used within a SearchQueryProvider");
	}
	return context;
}
