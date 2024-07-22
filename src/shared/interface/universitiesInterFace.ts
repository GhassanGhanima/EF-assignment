export interface University {
  web_pages: string[];
  country: string;
  state_province: string | null;
  alpha_two_code: string;
  name: string;
}

export interface UniversityState {
  mainItems: University[];
  items: University[];
  loading: boolean;
  error: string | null;
  search:{
    search:string | null,
    country:string | null,
  }
  currentPage: number;
  sortColumn:{
    sortColumn:string | null,
    sortDirection:string | null,
  }
}