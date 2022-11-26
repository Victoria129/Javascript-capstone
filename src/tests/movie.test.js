/**
 * @jest-environment jsdom
 */

import Movies from '../modules/movies.js';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve(
    [
      {
        show: {
          id: 6490,
          url: 'https://www.tvmaze.com/shows/6490/comedy-shuffle',
          name: 'Comedy Shuffle',
          type: 'Variety',
          language: 'English',
        },
      },
      {
        show: {
          id: 10428,
          url: 'https://www.tvmaze.com/shows/10428/comedy-playhouse',
          name: 'Comedy Playhouse',
          type: 'Scripted',
          language: 'English',
        },
      },
    ],
  ),
}));

describe('test get movies count method', () => {
  const movies = new Movies();

  test('test getMoviesCount I', async () => {
    await movies.getMovieList('girls');
    await movies.getMovieList('boys');

    expect(movies.getMoviesCount()).toBe(4);
  });
  test('test getMoviesCount II', async () => {
    await movies.getMovieList('cats');
    expect(movies.getMoviesCount()).toBe(6);
  });
});