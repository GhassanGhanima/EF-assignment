// universities  reducers usage in thunk actions

import { SET_ERROR, GET_ITEM, SET_ITEMS, SET_LOADING, SET_PAGE, SET_SEARCH, universityActionTypes, DELETE_ITEM, SET_SORT } from '../store/universitiesStore/actions';
import { initialUniversityState } from '../models/universities';
import { University, UniversityState } from '../shared/interface/universitiesInterFace';


export const universityReducer = (
  state = initialUniversityState,
  action: universityActionTypes
): UniversityState => {
  switch (action.type) {
    case SET_ITEMS:
      return { ...state, mainItems: action.payload, items: action.payload };

    case GET_ITEM:
      return { ...state, items: state.mainItems.filter((item: University) => { return item.name === action.payload }) };

    case DELETE_ITEM:
      return { ...state, items: state.items.filter((item: University) => { return item.name !== action.payload.name }) };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_SEARCH:
      return {
        ...state, search: action.payload, items: state.mainItems.filter((item: any) => {
          if(item.country !== action.payload.country &&  action.payload.country !== ""){
            return false
          }
          if (action.payload.search) {
            let filterItems=item.name.toLowerCase().includes(action.payload.search.toLowerCase().trim())   
            return filterItems
          } else {
            return item
          }
        }
        )
      };

    case SET_PAGE:
      return { ...state, currentPage: action.payload };

    case SET_SORT:
      const { sortColumn, sortDirection } = action.payload;
      const sortedItems = [...state.items].sort((a: any, b: any) => {
        if (sortDirection === 'asc') {
          return a[sortColumn] > b[sortColumn] ? 1 : -1;
        } else {
          return a[sortColumn] < b[sortColumn] ? 1 : -1;
        }
      });
      return { ...state, sortColumn: action.payload, items: sortedItems };


    default:
      return state;
  }
};


