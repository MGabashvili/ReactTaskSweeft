import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Main from "./pages/Main";
import History from "./pages/History";
import { SearchQueryProvider } from "./contexts/SearchQueryContext";
import { ImageCacheProvider } from "./contexts/ImageCacheContext";
import { QueryHistoryProvider } from "./contexts/QueryHistoryContext";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<AppLayout />}>
			<Route
				path="/"
				element={<Main />}
			/>
			<Route
				path="/history"
				element={<History />}
			/>
		</Route>
	)
);

function App() {
	return (
		<SearchQueryProvider>
			<ImageCacheProvider>
				<QueryHistoryProvider>
					<RouterProvider router={router} />
				</QueryHistoryProvider>
			</ImageCacheProvider>
		</SearchQueryProvider>
	);
}

export default App;
