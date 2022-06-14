import { API_URL, methodAxiosPost } from "./constant";

export const getWeightCategoryApi = () => {
    return methodAxiosPost(`${API_URL}/weightcategories`)
}

export const getDementionApi = (data) => {
    return methodAxiosPost(`${API_URL}/dementionweightprice`, data)
}
// paramater{ "weight_category_id": 1 }
/****
 
var raw = JSON.stringify({
  "weight_category_id": 1
});
var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};
****/

export const getQuoteApi = (data) => {
    return methodAxiosPost(`${API_URL}/quote`, data)
}


export const getStoreQuotesApi = (data) => {
    return methodAxiosPost(`${API_URL}/storequotes`, data)
}

/****
  parameters
{     
    "from_address": "testing",
    "from_province": "ontorio",
    "from_postal_code": "ods 452",
    "from_country": "canada",
    "from_city": "canada",
    "to_address": "testing",
    "to_province": "ontorio",
    "to_postal_code": "ods 452",
    "to_country": "canada",
    "to_city": "canada",
    "dimension_weight_types_id": 1,
    "total_amount_with_tax": 100,
    "total_amount_without_tax": 100,
    "tax_amount": 0,
    "tax_rate": 0,
    "shipment_date": "2021-09-29",
    "tracking_number": "4585645",
    "order_id": "4585645",
    "customer_card_id":"458755655585",(optional)
    "customer_id":1(optional)
}
****/

/**
 
export const getStorePaymentApi = (data) => {
    return methodAxiosPost(`${API_URL}/storepayment`, data)
}
 **/

/****
  parameters
{     
    "card_number": "455859565455265",
    "name_on_card": "Rajan Dhand",
    "card_type": "Debit",
    "expiry_month": 12,
    "expiry_year": 2021,
    "card_cvv_number": 123,
    "quotes_id": 7
}
****/

export const getStoreQuotesUpdateCustomerId = (dataArray) => {
  const modifyData = {
    data: dataArray
  }
  return methodAxiosPost(`${API_URL}/storequotesupdatecustomerid`, modifyData , {headers :{'Authorization': 'Bearer '+sessionStorage.getItem("token")}})
}

/**
  
parameters

{
    "data" : [
        {
          "id": 21
        },
        {
          "id":22
        }
    ]
}

response

 **/


export const logoutCustomer = () => {
    sessionStorage.setItem('token', '');
}

