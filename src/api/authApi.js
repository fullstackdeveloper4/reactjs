import axios from "axios";
import { API_URL, authAxiosPost, methodAxiosGet, methodAxiosPost } from "./constant";

export const registerCustomerAPI = (data) => {
  return methodAxiosPost(`${API_URL}/register`, data)
}

export const loginCustomerAPI = (data) => {
  
  return methodAxiosPost(`${API_URL}/login`, data)
  
  
}

export const getStorePaymentApi = (data) => {
  return authAxiosPost(`${API_URL}/storepayment`, data , 'POST')
}

export const logoutCustomer = () => {
  sessionStorage.setItem('token', '');
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("customer_ids")
  sessionStorage.removeItem("card_det")
}

export const searchAutoCompleteAddressAPI = (searchTerm = '') => {
var config = {
  method: 'get',
  url: `http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws?Key=XM62-WR75-UG23-GU69&Country=CAN&SearchTerm=${searchTerm}&LanguagePreference=en&LastId=&SearchFor=Everything&OrderBy=UserLocation&$block=true&$cache=true`,
  headers: { }
};
return axios(config)
}

export const getAutoCompleteAddressAPI = (id = '', source= '') => {
  var config = {
    method: 'get',
    url: `http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/RetrieveFormatted/v2.10/json3ex.ws?Key=XM62-WR75-UG23-GU69&Id=${id}&Source=${source}&$cache=true`,
    headers: {}
  };
  return axios(config)
}
