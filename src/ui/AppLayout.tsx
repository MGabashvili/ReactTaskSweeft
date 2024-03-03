import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function AppLayout() {
	return (
		<div
			className="grid h-dvh grid-cols-1 grid-rows-[64px_1fr] 
		font-sans text-slate-700 lg:grid-rows-[96px_1fr]">
			<Header />
			<main className="px-4 sm:px-5 2xl:px-16">
				<Outlet />
			</main>
		</div>
	);
}
