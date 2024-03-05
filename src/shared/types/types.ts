

  export interface ScreeningOverview {
    movie_id: number
    screenings_types: string[]
    halls_types: string[]
  }

  export interface Screening {
    screening_id: string
    movie_id: number
    screening_type: string
    start_time: StartTime
    hall_id: number
    ticket_price: TicketPrice
  }

  export interface StartTime {
    formatted_timestamp: string
  }

  export interface TicketPrice {
    value: number
  }


  export interface Root {
    screening_id: string
    movie_id: number
    screening_type: string
    start_time: StartTime
    hall_id: number
    ticket_price: TicketPrice
  }

  export interface StartTime {
    formatted_timestamp: string
  }

  export interface TicketPrice {
    value: number
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

  export interface ScreeningInfo {
    cinema_id: number
    movie_id: number
    screening_type: string
    start_time: StartTime
    hall_id: number
    ticket_price: TicketPrice
    hall_configuration: HallConfiguration
  }

  export interface HallConfiguration {
    place: PlaceWithCoords[]
  }

  export interface Place {
    row: number
    seat: number
  }

  export interface PlaceWithCoords extends Place {
    gridPosX: number
    gridPosY: number
  }
