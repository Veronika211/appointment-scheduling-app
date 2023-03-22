import {IBackendData, IRequest, IRequestArgs} from '@helpers/types';
import {useCallback, useReducer} from 'react';
import axios from '../api/axios-appointment-api';

interface IHTTPState {
  status: string;
  error: string | null;
  data: IBackendData[];
  loading: boolean;
}

enum ActionTypes {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  FETCH_ERROR = 'FETCH_ERROR',
}

type PayloadType = string | IBackendData[] | IRequestArgs;
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
    default:
      return state;
  }
};

const useHttp = (request: IRequest) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const sendRequest = useCallback(
    (args?: IRequestArgs) => {
      const transformedRequest = transformRequest(request, args);
      dispatch({type: ActionTypes.FETCHING, payload: args});
      axios({
        ...transformedRequest,
        data: args?.body,
      })
        .then((response) => {
          //here we format data we got from a firebase
          if (transformedRequest.method === 'get') {
            const responseData = response.data;
            const loadedData: IBackendData[] = [];
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
        .catch((error) => {
          dispatch({
            type: ActionTypes.FETCH_ERROR,
            payload: error.response ?? {data: {message: 'Connection error'}},
          });
        });
    },
    [dispatch],
  );

  return {
    ...state,
    sendRequest,
  };
};

const transformRequest = (request: IRequest, args?: IRequestArgs) => {
  const transformedRequest = {...request};

  if (transformedRequest.url && args && args.params) {
    for (const param in args.params) {
      transformedRequest.url = transformedRequest.url.replace(`:${param}`, args.params[param]);
    }
  }

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
