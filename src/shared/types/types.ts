

  export interface Screening {
    movie_id: number
    screenings_types: string[]
    halls_types: string[]
  }

  export interface MovieDescriptionShort {
    shortDescription: string
    titleRu: string
    titleEn: string
    duration: number
    previewPosterUrl: string
    countries: string[]
    genres: string[]
    releaseYear: number
    ageRating: string
    id: string
  }


  export interface City {
    city_id: number
    name: string
  }

  export interface Cinema {
    cinema_id: number
    name: string
    address: string
    coordinates: Coordinates
  }

  export interface Coordinates {
    latityde: number
    longitude: number
  }
