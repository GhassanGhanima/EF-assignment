import { UnknownAction } from "@reduxjs/toolkit";
import { University } from "../../shared/interface/universitiesInterFace";

// Action Types
export const SET_ITEMS = 'SET_ITEMS';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_SEARCH = 'SET_SEARCH';
export const SET_PAGE = 'SET_PAGE';
export const GET_ITEM = 'GET_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const SET_SORT = 'SET_SORT';




interface SetItemsAction {
  type: typeof SET_ITEMS;
  payload: University[];
}
interface GetItemAction {
  type: typeof GET_ITEM;
  payload: string;
}

interface DeleteItemAction {
  type: typeof DELETE_ITEM;
  payload: University;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: boolean;
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string | null;
}

interface SetSearchAction {
  type: typeof SET_SEARCH;
  payload:  { search:string | null, country:string | null };
}

interface SetPageAction {
  type: typeof SET_PAGE;
  payload: number;
}
interface SetSortAction {
  type: typeof SET_SORT;
  payload: { sortColumn:string, sortDirection:string };
}

export type universityActionTypes =
  | SetItemsAction
  | SetLoadingAction
  | SetErrorAction
  | GetItemAction
  | DeleteItemAction
  | SetSearchAction
  | SetPageAction
  | SetSortAction;


// Action Creators
export const setItems = (mainItems: University[]): universityActionTypes => ({
  type: SET_ITEMS,
  payload: mainItems,
});

export const setItem = (name: string): universityActionTypes => ({
  type: GET_ITEM,
  payload: name,
});

export const setLoading = (loading: boolean): universityActionTypes => ({
  type: SET_LOADING,
  payload: loading,
});

export const setError = (error: string | null): universityActionTypes => ({
  type: SET_ERROR,
  payload: error,
});

export const SetSearch = (search: string | null,country: string | null): universityActionTypes => ({
  type: SET_SEARCH,
  payload: {search,country},
});
export const deleteItems = (item: University): universityActionTypes => ({
  type: DELETE_ITEM,
  payload: item,
});

export const setPage = (page: number): universityActionTypes => ({
  type: SET_PAGE,
  payload: page,
});

export const setSort = (sortColumn: string, sortDirection: string):  UnknownAction => ({
  type: SET_SORT,
  payload: {
    sortColumn,
    sortDirection, 
  },
});
