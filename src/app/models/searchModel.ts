export interface Movie {
    id: number;
    title: string;
    poster_path?: string;
    type: 'movie'; // Add type property
    
    // Add other relevant fields
  }
  
  export interface TvSeries {
    id: number;
    name: string;
    poster_path?: string;
    type: 'tvSeries'; // Add type property
    title:string;
    // Add other relevant fields
  }
  