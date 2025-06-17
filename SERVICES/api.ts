export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,  //secure way to access the api
  },
};
   
export const fetchMovies = async ({  // async fn ho jasla chi promise garxa ki ma movie ko array retrun garxu 
  query, 
}: {
  query: string; // yesla chi query in string linxa as a params jsala chi movies fetch ra searhc garxa
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}` //based on search search optimization 
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;// based on popularity fethc garxa

  const response = await fetch(endpoint, {  //endpoint ra headers lai pathauxa req ma ani accept vo vana yesla response pathauxa 
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) { 
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json(); // response lai json format ma rakhinxa
  return data.results; //results ma chi array of movies xa
};

export const fetchMovieDetails = async ( // id pathauxa ra movie ko details chi promise garxa ma pathauxu vanara
  movieId: string
): Promise<MovieDetails> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`, //movieId user garara dynaic URL send garxa
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }

    const data = await response.json(); //response ok xa vana movies ko details aaua
    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

