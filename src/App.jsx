import React, { useState, useRef } from 'react';
import './App.scss';
import SearchResult from './SearchResult';

const throttle = (fn, delay) => {
	let inThrottle;
	return function () {
		let context = this;
		let args = arguments;
		if (!inThrottle) {
			inThrottle = true;
			fn.apply(context, args);
			setTimeout(() => (inThrottle = false), delay);
		}
	};
};

const KEY = 'AIzaSyD65TNXHpGCH9EiGY6g9_yDahQXT9JfISQ';
const SEARCH_ENGINE_ID = '018264299595958242005:dvs2adlrsca';

function App() {
	const searchRef = useRef();

	const [searchData, setSearchData] = useState([]);
	const [disableSearchButton, setDisableSearchButton] = useState(true);

	const handleSearchClicked = async () => {
		const query = searchRef.current.value;
		const url = `https://www.googleapis.com/customsearch/v1?key=${KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;
		try {
			const response = await fetch(url);
			const { items } = await response.json();
			setSearchData(items);
			console.log(items);
		} catch (error) {
			console.error(error);
		}
	};

	const handleSearchButtonState = () => {
		if (searchRef.current.value) {
			setDisableSearchButton(false);
		} else {
			setDisableSearchButton(true);
		}
	};

	return (
		<>
			<header>
				<h1>oh.search</h1>
				<input type="text" ref={searchRef} onChange={handleSearchButtonState} />
				<button
					onClick={throttle(handleSearchClicked, 1000)}
					disabled={disableSearchButton}>
					Search
				</button>
			</header>
			{searchData.map(
				({ cacheId, pagemap, formattedUrl, link, snippet, title }) => (
					<div key={cacheId} className="search-results">
						<div className="image-container">
							<img src={pagemap?.cse_image?.[0]?.src} alt="Search Image" />
						</div>
						<SearchResult
							link={link}
							formattedUrl={formattedUrl}
							title={title}
							snippet={snippet}
						/>
					</div>
				)
			)}
		</>
	);
}

export default App;
