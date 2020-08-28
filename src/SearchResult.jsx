import React from 'react';

const SearchResult = ({ formattedUrl, link, snippet, title }) => (
	<a href={formattedUrl} className="search-result-info">
		<div className="link">{formattedUrl}</div>
		<h2 className="result-title">{title}</h2>
		<div className="desc">{snippet}</div>
	</a>
);

export default SearchResult;
