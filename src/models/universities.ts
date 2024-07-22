import { UniversityState } from "../shared/interface/universitiesInterFace";

export const initialUniversityState: UniversityState = {
  mainItems: [],
  items: [],
  loading: false,
  error: null,
  search:{
    search:"",
    country:""
  },
  currentPage: 1,
  sortColumn:{
    sortColumn:"",
    sortDirection:""
  }

};