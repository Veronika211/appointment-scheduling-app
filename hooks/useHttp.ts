import {useCallback, useReducer} from 'react';
import axios from '../axios-appointment-api';

interface IHTTPState {
  status: string;
  error: string | null;
  data: Array<any>;
  loading: boolean;
}

enum ActionTypes {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  FETCH_ERROR = 'FETCH_ERROR',
  ADD = 'ADD',
  REMOVE = 'REMOVE',
}

interface IAction {
  type: ActionTypes;
  payload: any;
}

const initialState = {
  status: '',
  error: null,
  data: [],
  loading: false,
};

const reducer = (state: IHTTPState = initialState, action: IAction) => {
  switch (action.type) {
    case ActionTypes.FETCHING:
      return {...state, status: 'fetching', loading: true};
    case ActionTypes.FETCHED:
      return {...state, status: 'fetched', loading: false, data: action.payload};
    case ActionTypes.FETCH_ERROR:
      return {...state, status: 'error', loading: false, error: action.payload};
    case ActionTypes.ADD:
      return {...state, data: state.data.concat(action.payload)};
    case ActionTypes.REMOVE:
      return {...state, data: state.data.filter((el) => el.id !== action.payload)};
    default:
      return state;
  }
};

const useHttp = (request: any) => {
  //znaci mi pozovemo hook i prosledimo mu request koji ce biti poslat
  //recimo zelimo da getujemo podatke o tipovima pregleda
  // const {loading, data, error, sendRequest} = useHttp(requests.getExamTypes())
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendRequest = useCallback(
    //args su argumenti koje saljemo u requestu
    (args?: any) => {
      const transformedRequest = transformRequest(request, args);
      dispatch({type: ActionTypes.FETCHING, payload: args});
      axios({
        ...transformedRequest,
        // data: args?.body,
        // headers: {
        //   'content-type': 'text/json',
        // },
      })
        .then((response: any) => {
          //here we format data we got from a firebase
          if (transformedRequest.method === 'get') {
            const responseData = response.data;
            const loadedData: any = [];
            for (const key in responseData) {
              loadedData.push({
                id: responseData[key].id,
                value: responseData[key].name,
              });
            }
            dispatch({type: ActionTypes.FETCHED, payload: loadedData});
            return;
          }
          dispatch({type: ActionTypes.FETCHED, payload: response});
          return;
        })
        .catch((error: any) => {
          dispatch({
            type: ActionTypes.FETCH_ERROR,
            payload: error.response ?? {data: {message: 'Connection error'}},
          });
        });
    },
    [dispatch],
  );

  const addItem = useCallback(
    (item: any) => {
      dispatch({type: ActionTypes.ADD, payload: item});
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (id: number | string) => {
      dispatch({type: ActionTypes.REMOVE, payload: id});
    },
    [dispatch],
  );
  return {
    ...state,
    sendRequest,
    addItem,
    removeItem,
  };
};

//funkcija prima dva parametra, request i args i vraca transformirani request
//request
const transformRequest = (request: any, args: any) => {
  //prvo kopiramo objekat tj request u transformed request
  const transformedRequest = {...request};
  //zatim proveravamo da li je prosledjen url, argumenti i parametar
  if (transformedRequest.url && args && args.params) {
    // ako je prosledjeno sve to prolazimo kroz parametre i menjamo defaultni parametar sa prosledjenim
    //parametrom
    for (const param in args.params) {
      transformedRequest.url = transformedRequest.url.replace(`:${param}`, args.params[param]);
    }
  }
  //ako je prosledjen url, argumenti i kveri parametar pravimo novi niz koji predstavlja te parametre
  // i sve to nalepimo na url
  if (transformedRequest.url && args && args.query) {
    const queryArray = [];
    for (const param in args.query) {
      queryArray.push(`${param}=${args.query[param]}`);
    }
    transformedRequest.url = `${transformedRequest.url}?${queryArray.join('&')}`;
  }
  return transformedRequest;
};

export default useHttp;
