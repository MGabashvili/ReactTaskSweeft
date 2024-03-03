import { useEffect, useRef, useState } from "react";
import { type ImageData } from "../types";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { useSearchQueryProvider } from "../contexts/SearchQueryContext";
import { useImageCacheProvider } from "../contexts/ImageCacheContext";
import GetImages from "../utils/fetchImagesFromAPI";
import Modal from "../ui/Modal";

export default function Main() {
	const [images, setImages] = useState<ImageData[] | null>(null);
	const { query } = useSearchQueryProvider();
	const { cache, setCache } = useImageCacheProvider();
	const [isLoading, setIsLoading] = useState(false);
	const [imgIdForModal, setImgIdForModal] = useState("");
	const modalRef = useRef();

	function handleImageClick(imgId: string) {
		setImgIdForModal(imgId);
		modalRef?.current.showModal();
	}

	function handleScroll() {
		if (
			window.innerHeight + document.documentElement.scrollTop <= document.documentElement.scrollHeight - 50 ||
			isLoading
		) {
			console.log("not scrolled");
			return;
		} else {
			console.log("scrolled and dfetching");
			setIsLoading(true);
			const currentPage = cache.get(query)?.page || 0;
			GetImages(query, currentPage + 1, cache, setCache)
				.then(res => setImages(res))
				.catch(err => console.log(err))
				.finally(() => setIsLoading(false));
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isLoading]);

	useEffect(() => {
		setIsLoading(true);
		GetImages(query, undefined, cache, setCache)
			.then(res => setImages(res))
			.catch(err => console.log(err))
			.finally(() => setIsLoading(false));
	}, [query]);

	return (
		<div className="pt-16 flex flex-col justify-center gap-16">
			<SearchBar />
			<div
				className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] items-stretch
									 justify-center gap-16 auto-rows-fr">
				{images &&
					images.map((imgData: ImageData) => (
						<button
							onClick={() => handleImageClick(imgData.id)}
							className="group"
							key={imgData.id + imgData.url}>
							<img
								src={imgData.url}
								alt={imgData.alt}
								className="h-full w-full object-cover group-hover:scale-105 transition-transform
													 duration-200 group-hover:ring-offset-4 group-hover:ring-8 group-hover:ring-sky-500"
							/>
						</button>
					))}
			</div>
			<Modal
				imgId={imgIdForModal}
				ref={modalRef}
			/>
		</div>
	);
}
