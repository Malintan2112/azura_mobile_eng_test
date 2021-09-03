import {
  Alert,
} from 'react-native';

const baseURL = "https://malintan-projects.com/public/api";

export const createFetchWithRTO = (params) => {
  return new Promise(async (resolve, reject) => {
    let url = "";
    if (params.customUrl) {
      url = params.customUrl;
    } else {
      url = baseURL + params.url;
    }
    let data = new FormData();
    for (const key in params.body) {
      if (Array.isArray(params.body.key)) {
        for (let index = 0; index < params.body.key.length; index++) {
          data.append(key, params.body.key[index]);
        }
      } else {
        data.append(key, params.body.key);
      }
    }
    try {
      fetch(url, {
        method: params.method,
        headers: params.headers,
        body: data
      })
        .then((response) => response.json())
        .then((responseData) => {


        }).catch(() => {
        })
        .done();
    } catch (error) {

    }
  });
}