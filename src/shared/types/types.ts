

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


  export interface User {
    username: string
    email: string
    profile_picture_url: string
    registration_date: string
  }

  export interface ProcessOrderData {
      payment_url: string,
      reserve_id: string;
  }


  export interface OrderInfo {
    order_id: string
    order_date: OrderDate
    total_price: TotalPrice
    screening_id: string
  }

  export interface OrderDate {
    formatted_timestamp: string
  }

  export interface TotalPrice {
    value: number
  }
