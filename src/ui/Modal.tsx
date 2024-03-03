import { forwardRef, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
const BASE_URL = "https://api.unsplash.com";

const Modal = forwardRef(function (props, ref) {
	const [imageUrl, setImageUrl] = useState("");
	const [imgData, setImgData] = useState(null);

	useEffect(() => {
		fetch(`${BASE_URL}/photos/${props.imgId}`, {
			headers: {
				Authorization: "Client-ID zWtH9kK8wOcw0xIvnSvw0JmX7atZcUrsVWzr-4z9BXY",
				"Accept-Version": "v1",
			},
		})
			.then(response => response.json())
			.then(data => setImageUrl(data.urls.regular));
	}, [props.imgId]);

	useEffect(() => {
		fetch(`${BASE_URL}/photos/${props.imgId}/statistics`, {
			headers: {
				Authorization: "Client-ID zWtH9kK8wOcw0xIvnSvw0JmX7atZcUrsVWzr-4z9BXY",
				"Accept-Version": "v1",
			},
		})
			.then(response => response.json())
			.then(data =>
				setImgData({ downloads: data.downloads.total, views: data.views.total, likes: data.likes.total })
			);
	}, [props.imgId]);

	return (
		<dialog
			id="modal"
			className="modal"
			ref={ref}>
			<button
				id="closeModal"
				className="modal-close-btn flex flex-row justify-end items-center"
				onClick={() => ref.current.close()}>
				Close <IoCloseSharp />
			</button>
			<div>
				<img
					src={imageUrl}
					className="h-[500px] w-auto"
				/>
				<p>Likes: {imgData?.likes}</p>
				<p>Downloads: {imgData?.downloads}</p>
				<p>Views: {imgData?.views}</p>
			</div>
		</dialog>
	);
});

export default Modal;
