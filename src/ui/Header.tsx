import { Link, NavLink } from "react-router-dom";

export default function Header() {
	return (
		<nav
			className="flex items-center justify-between border-b bg-slate-100
  px-4 py-2 text-coolGrey-700 sm:px-5 sm:py-3 2xl:px-16">
			<Link
				to="/"
				className="hover:cursor-pointer">
				<h1 className="text-3xl text-sky-400 font-bold">
					Photo Gallery
				</h1>
			</Link>
			<ul
				className="flex items-center justify-between gap-x-2 text-xs 
    sm:text-sm md:gap-x-4 lg:gap-x-8 lg:text-lg">
				<NavLink
					className={({ isActive, isPending, isTransitioning }) =>
						[
							isPending ? "pendingPlaceholder" : "",
							isActive ? "underline" : "",
							isTransitioning ? "transitioningPlaceholder" : "",
							`font-bold decoration-4 underline-offset-8
              transition-all duration-200 hover:text-sky-400 `,
						].join(" ")
					}
					to="/">
					Main
				</NavLink>
				<NavLink
					className={({ isActive, isPending, isTransitioning }) =>
						[
							isPending ? "pendingPlaceholder" : "",
							isActive ? "underline" : "",
							isTransitioning ? "transitioningPlaceholder" : "",
							`font-bold decoration-4 underline-offset-8
                transition-all duration-200 hover:text-sky-400 `,
						].join(" ")
					}
					to="/history">
					History
				</NavLink>
			</ul>
		</nav>
	);
}
