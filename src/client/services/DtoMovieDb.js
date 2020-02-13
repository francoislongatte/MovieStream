/***
 * DTO For MovieDB <TheMovieDb>
 */

export function apiToMovie(data) {
    return {
        page: data.data.page_number,
     total_results: data.data.movie_count,
     total_pages: Math.floor(data.data.movie_count / data.data.limit),
     results: data.data.movies.map(movie => {
         return {
             id: movie.id,
             title: movie.title,
             year: movie.year,
             language: movie.language,
             imdb_code: movie.imdb_code,
             genres:    movie.genres,
             summary: movie.summary,
             background_image: movie.background_image,
             cover_image: movie.large_cover_image,
             torrents: movie.torrents,
             date_upload: movie.date_upload,
             state: movie.state
         }
     }),

        




        page: "",
        total_results: "",
        total_pages: "",
        results: (...).map(movie => {
            return {
                id: "",
                title: "",
                year: "",
                language: "",
                imdb_code: "",
                genres:    "",
                summary: "",
                background_image: "",
                cover_image: "",
                torrents: "",
                date_upload: "",
                state: ""
            }
        })
    }
   }
   
   export function apiToSerie(data) {
   
   }
   