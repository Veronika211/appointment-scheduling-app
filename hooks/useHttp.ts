// import {IRequestConfig} from '../helpers/types';

// const useHttp = (requestConfig: IRequestConfig) => {
//   const sendRequest = async () => {
//     try {
//       const response = await fetch(requestConfig.url, {
//         method: requestConfig.method,
//         headers: requestConfig.headers,
//         body: JSON.stringify(requestConfig.body),
//       });
//       if (!response.ok) {
//         throw new Error('Request failed!');
//       }

//       const data = await response.json();
//       const loadedArray = [];

//       for (const key in data) {
//         loadedArray.push({id: key, text: data[key].text});
//       }
//     } catch (err) {}
//   };
// };

// export default useHttp;
