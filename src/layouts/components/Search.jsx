import Fuse from 'fuse.js';
import { useState } from 'react';
import config from '@/config/config.json';

const { base_url } = config.site;
const { blog_folder } = config.settings;

// Configs fuse.js
// https://fusejs.io/api/options.html
const options = {
	keys: ['data.title', 'data.description', 'data.category', 'data.tags', 'slug'],
	includeMatches: true,
	minMatchCharLength: 3,
	threshold: 0.5,
};

function Search({ searchList }) {
	// console.log(searchList);
	// User's input
	const [query, setQuery] = useState('');

	const fuse = new Fuse(searchList, options);

	// Set a limit to the posts: 5
	const posts = fuse
		.search(query)
		.map((result) => result.item)
		.slice(0, 15);

	function handleOnSearch({ target = {} }) {
		const { value } = target;
		setQuery(value);
	}

	return (
		<div className="search  flex flex-col gap-3 font-medium text-dark dark:text-white">
			<form className="search__form flex items-center gap-3">
				<input
					className="search__input grow text-dark placeholder:text-dark fluid:rounded-3xl fluid:px-8 fluid:py-4 dark:bg-box-dark dark:text-gray-light dark:placeholder:text-gray-light"
					type="text"
					value={query}
					onChange={handleOnSearch}
					placeholder="Поиск постов"
				/>
			</form>
			{query.length > 1 && (
				<p className="search__status">
					Показаны первые {posts.length} {posts.length === 1 ? 'результат' : 'результатов'} для '
					{query}'
				</p>
			)}
			<ul className="search__list">
				{posts &&
					posts.map((post, key) => {
						{
							/* console.log(post); */
						}
						return (
							<li key={`__${key}__`} className="search__item">
								<a
									className="search__link flex border-t border-dark py-3 hover:underline fluid:text-2xl dark:border-red"
									href={`${base_url}/${blog_folder}/${post.slug}`}
								>
									{post.data.title}
								</a>

								{/* {post.data.description} */}
							</li>
						);
					})}
			</ul>
		</div>
	);
}

export default Search;
