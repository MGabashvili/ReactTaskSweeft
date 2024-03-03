import { Link } from "react-router-dom";
import { useQueryHistoryProvider } from "../contexts/QueryHistoryContext";
import { useEffect, useRef, useState } from "react";
import GetImages from "../utils/fetchImagesFromAPI";
import { useImageCacheProvider } from "../contexts/ImageCacheContext";
import { type ImageData } from "../types";
import Modal from "../ui/Modal";

export default function History() {
	const { history, setHistory } = useQueryHistoryProvider();
	const [selectedHistoryQuery, setSelectedHistoryQuery] = useState("");
	const [historyImages, setHistoryImages] = useState(null);
	const { cache, setCache } = useImageCacheProvider();
	const [isLoading, setIsLoading] = useState(false);
	const [imgIdForModal, setImgIdForModal] = useState("");
	const modalRef = useRef();

	const reversedHistory = history && [...history].reverse();

	function handleHistoryClick(query: string) {
		setSelectedHistoryQuery(query);
		GetImages(query, undefined, cache, setCache)
			.then(imgs => setHistoryImages(imgs))
			.catch(err => console.log(err));
	}

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
			const currentPage = cache.get(selectedHistoryQuery)?.page || 0;
			GetImages(selectedHistoryQuery, currentPage + 1, cache, setCache)
				.then(res => setHistoryImages(res))
				.catch(err => console.log(err))
				.finally(() => setIsLoading(false));
		}
	}

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [isLoading]);

	return (
		<div className="grid grid-cols-[minmax(250px,25%)_1fr] pt-16">
			<ul className="flex flex-col gap-4 overflow-auto">
				<h2 className="font-extrabold text-xl">History of Searches</h2>
				{history &&
					reversedHistory.map((h, i) => {
						return (
							<li
								key={i}
								className="hover:font-bold hover:text-sky-400">
								<button onClick={() => handleHistoryClick(h.query)}>
									{h.timeStamp.toLocaleString()} - {h.query}
								</button>
							</li>
						);
					})}
			</ul>
			<div
				className="grid grid-cols-[repeat(auto-fill,minmax(500px,1fr))] items-stretch
									 justify-center gap-8 auto-rows-fr">
				{selectedHistoryQuery &&
					historyImages &&
					historyImages.map((imgData: ImageData) => (
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
				ref={modalRef}
				imgId={imgIdForModal}
			/>
		</div>
	);
}
