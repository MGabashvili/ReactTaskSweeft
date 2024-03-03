const BASE_URL = "https://api.unsplash.com";

export default async function GetImages(query: string = "", currentPage: number = 1, cache, setCache) {
	if (!cache.has(query) || cache.get(query).page < currentPage) {
		const queryImages = await getImagesFroAPI(query, currentPage);
		const newCache = new Map(cache);
		const imagesInCache = cache.get(query)?.images || [];
		const newImagesForQuery = [...imagesInCache, ...queryImages];
		newCache.set(query, { page: currentPage, images: newImagesForQuery });
		setCache(newCache);
		console.log("first", queryImages);
		console.log("NEW", newImagesForQuery);
		return newImagesForQuery;
	} else {
		return cache.get(query).images;
	}
}

async function getImagesFroAPI(query: string = "", currentPage: number = 1) {
	const isQuery = query.trim() !== "";
	const url = isQuery
		? `${BASE_URL}/search/photos?query=${query}&per_page=20&page=${currentPage}`
		: `${BASE_URL}/photos?per_page=20&order_by=popular&page=${currentPage}`;
	try {
		const response = await fetch(url, {
			headers: {
				Authorization: "Client-ID zWtH9kK8wOcw0xIvnSvw0JmX7atZcUrsVWzr-4z9BXY",
				"Accept-Version": "v1",
			},
		});
		if (response.ok) {
			const fetchedImages = await response.json();
			let result;
			if (isQuery) {
				result = fetchedImages.results.map(item => {
					return { id: item.id, url: item.urls.regular, alt: item.alt_description };
				});
			} else {
				result = fetchedImages.map(item => {
					return { id: item.id, url: item.urls.regular, alt: item.alt_description };
				});
			}
			return result;
		} else {
			throw new Error("Bad Response!");
		}
	} catch (error) {
		console.log(error);
	}
}
