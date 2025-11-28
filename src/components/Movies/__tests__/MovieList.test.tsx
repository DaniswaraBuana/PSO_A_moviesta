import { MovieType } from '@/types/Movie/MovieType';
import { render, screen } from '@testing-library/react';
import MovieList from '../MovieList';

// Mock next/navigation
jest.mock('next/navigation', () => ({
	usePathname: () => '/',
}));

// Mock next/image
jest.mock('next/image', () => ({
	__esModule: true,
	default: ({ src, alt }: { src: string; alt: string }) => (
		<img src={src} alt={alt} />
	),
}));

// Mock WatchlistButton agar tidak error saat membuat Supabase client
jest.mock('@/components/Buttons/WatchlistButton/WatchlistButton', () => ({
	__esModule: true,
	default: ({ movieId }: { movieId: string }) => (
		<button data-testid={`watchlist-${movieId}`}>Watchlist</button>
	),
}));

// Mock WatchedButton
jest.mock('@/components/Buttons/WatchlistButton/WatchedButton/WatchedButton', () => ({
	__esModule: true,
	default: ({ movieId }: { movieId: string }) => (
		<button data-testid={`watched-${movieId}`}>Watched</button>
	),
}));

const mockMovies: MovieType[] = [
{
id: '1',
title: '21 Jump Street',
year: 2012,
poster_url: '/images/21-jump-street.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 7.0,
description: 'Two cops go undercover at a high school to bust a drug ring.',
director: 'Phil Lord & Christopher Miller',
actors_id: 1,
genre: ['Action'],
},
{
id: '2',
title: 'Die Hard',
year: 1988,
poster_url: '/images/die-hard.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 8.2,
description: 'John McClane faces terrorists in a Los Angeles skyscraper.',
director: 'John McTiernan',
actors_id: 1,
genre: ['Action'],
},
{
id: '3',
title: 'John Wick',
year: 2014,
poster_url: '/images/john-wick.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 7.8,
description: 'An ex-hitman seeks vengeance for the killing of his dog.',
director: 'Chad Stahelski',
actors_id: 1,
genre: ['Action'],
},
{
id: '4',
title: 'Jumanji: Welcome To The Jungle',
year: 2017,
poster_url: '/images/jumanji-2017.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 6.9,
description: 'Four teens are sucked into a magical video game.',
director: 'Jake Kasdan',
actors_id: 1,
genre: ['Adventure'],
},
{
id: '5',
title: 'Mad Max: Fury Road',
year: 2015,
poster_url: '/images/mad-max-fury-road.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 8.1,
description: 'In a post-apocalyptic wasteland, Max teams up with Furiosa to flee from a tyrant.',
director: 'George Miller',
actors_id: 1,
genre: ['Action'],
},
{
id: '6',
title: 'Mission Impossible',
year: 1996,
poster_url: '/images/mission-impossible.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 7.1,
description: 'Ethan Hunt must uncover a mole within IMF.',
director: 'Brian De Palma',
actors_id: 1,
genre: ['Action'],
},
{
id: '7',
title: 'Mr. Bean',
year: 1997,
poster_url: '/images/mr-bean.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 6.5,
description: 'Mr. Bean travels to America to oversee an art exhibition.',
director: 'Mel Smith',
actors_id: 1,
genre: ['Comedy'],
},
{
id: '8',
title: 'Superbad',
year: 2007,
poster_url: '/images/superbad.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 7.6,
description: 'Two teens try to enjoy their last days of high school.',
director: 'Greg Mottola',
actors_id: 1,
genre: ['Comedy'],
},
{
id: '9',
title: 'The Mask',
year: 1994,
poster_url: '/images/the-mask.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 6.9,
description: 'A man becomes a mischievous superhero when he wears a magical mask.',
director: 'Chuck Russell',
actors_id: 1,
genre: ['Comedy'],
},
{
id: '10',
title: 'The Raid',
year: 2011,
poster_url: '/images/the-raid.jpg',
created_at: '2025-05-24 12:59:36.723082+00',
genres_id: 1,
rating: 7.6,
description: 'An elite squad fights their way through a crime-ridden apartment block.',
director: 'Gareth Evans',
actors_id: 1,
genre: ['Action'],
},
];

export default mockMovies;

test('renders MovieList with mockMovies', () => {
	const { container } = render(<MovieList movies={mockMovies} />);
	// @ts-expect-error - Jest matcher conflict dengan Cypress types
	expect(mockMovies.length > 0).toBe(true);
	// Check apakah image dengan alt text muncul
	const images = container.querySelectorAll('img');
	// @ts-expect-error - Jest matcher conflict dengan Cypress types
	expect(images.length > 0).toBe(true);
});
