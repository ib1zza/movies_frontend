
  
  export interface Screening {
    movie_id: number
    screenings_types: string[]
    halls_types: string[]
  }
  
  export interface MovieDescriptionShort {
    id: string
    short_description: string
    title_ru: string
    title_en: string
    duration: number
    preview_poster_url: string
    countries: string[]
    genres: string[]
    release_year: number
    age_rating: string
  } 
  