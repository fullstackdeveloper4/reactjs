import axios from "axios";
const PROD_URL = 'http://new.trans8.ca/api';

export const API_URL = PROD_URL;

export const methodAxiosPost = async (url, data = {}) => {
  return await axios.post(url, data, {
    withCredentials: true,
    headers: {
      'access-control-allow-origin': '*',
      'Content-Type': 'application/json',
    },
  });
};

export const authAxiosPost = async (url, data = {}, app_version) => {
  var token = sessionStorage.getItem('token');
	if(token && token!== 'undefined') {
    return await axios.post(url, data, {
      withCredentials: true,
      headers: {
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
				'Authorization': 'Bearer '+ token,
				'app-version': app_version,
			}
    });
  }
};

export const methodFetchPost = async (url, data = {}, method = 'POST') => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const modifyData = JSON.stringify(data)
  return fetch(url, {
    method: method,
    body: modifyData,
    headers: myHeaders,
    redirect: 'follow'
  })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
};

export const methodAxiosGet = async (url ,body ,method = 'GET', app_version) => {
	var token = sessionStorage.getItem('token');
	if(token && token!== 'undefined') {
		return await axios({
			method: method, 
			url: url,
      body: body,
			headers: {
				'Authorization': 'Bearer '+ token,
				'Content-Type' : 'application/x-www-form-urlencoded',
				'app-version': app_version,
			}
		});
	}
};

export const methodAxiosWithoutTokenGet = async (url,) => {
  return await axios.get(url, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// export const sessionLogout = async () => {
// 	sessionStorage.removeItem('session_id');
// 	sessionStorage.removeItem('stat');
// 	sessionStorage.removeItem('stat_last_cert');

// 	var redirectURl = "https://" + window.location.host + "/authentication/basic/login";

// 	setTimeout(
// 		() => window.location.href=redirectURl,
// 		500
// 	);
// };