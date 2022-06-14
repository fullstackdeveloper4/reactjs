import axios from "axios";
import { get_card_list } from "./userUpdate";
let api_url = "http://devapi.trans8.ca/";

// get address auto complete
export const getAddressAutoComplete = (searchTerm, setCountry) => {
  axios
    .get(
      `http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/Find/v2.10/json3ex.ws?Key=XM62-WR75-UG23-GU69&Country=CAN&SearchTerm=${searchTerm}&LanguagePreference=en&LastId=&SearchFor=Everything&OrderBy=UserLocation&$block=true&$cache=true`
    )
    .then((response) => {
      setCountry(response.data.Items);
    })
    .catch((err) => {});
};
// auto adress pick
export const autoCityPick = (countryId, setCity) => {
  axios
    .get(
      `http://ws1.postescanada-canadapost.ca/AddressComplete/Interactive/RetrieveFormatted/v2.10/json3ex.ws?Key=XM62-WR75-UG23-GU69&Id=${countryId}&Source=${""}&$cache=true`
    )
    .then((response) => {
      setCity(response.data?.Items[0]);
    })
    .catch((err) => {});
};

// update store quote id
export const updateQuote = () => {
  let cust_id = JSON.parse(sessionStorage.getItem("customer_ids"));
  let obj = { data: [] };
  if (sessionStorage.getItem("customer_ids")) {
    for (var i = 0; i < cust_id.length; i++) {
      obj.data.push({ id: cust_id[i] });
    }
  }
  axios
    .post(api_url + "api/storequotesupdatecustomerid", obj, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    })
    .then((response) => {})
    .catch((err) => {});
};

// updated card
export const update_card = (
  values,
  setLoading,
  dispatch,
  history,
  selector,
  quoteDetail,
  setType,
  setMessage
) => {
  setLoading(true);
  axios
    .post(api_url + "api/storepayment", values, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    })
    .then((response) => {
      setType("success");
      window.scrollTo(0, 500);
      setMessage("Card detail saved successfully");
      window.scrollTo(0, 500);
      if (sessionStorage.getItem("last_route") === "/quotes") {
        history.push("/current-order");
      }
      get_card_list(dispatch, setLoading);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};

//Store quotes api
export const storeQuotes = (values) => {
  axios
    .post(api_url + "api/storequotes", values, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    })
    .then((res) => {
      sessionStorage.setItem(
        "customer_ids",
        `[${res?.data?.success?.last_insert_id}]`
      );
    })
    .catch((err) => {});
};

//tracking status
export const track_status = (
  values,
  setData,
  setLoading,
  setType,
  setMessage
) => {
  setLoading(true);
  axios
    .post(
      api_url + "api/gettrackingstatus",
      { tracking_id: values },
      {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      }
    )
    .then((res) => {
      if (res?.data?.data[0]) {
        setData(res.data?.data[0]);
        window.scrollTo(0, 400);
        setLoading(false);
      } else {
        setData(null);
        setLoading(false);
      }
    })
    .catch((err) => {
      setLoading(false);
      setType("error");
      setData(null);
      window.scrollTo(0, 400);
      setMessage("Something went wrong");
      window.scrollTo(0, 400);
    });
};

//get all postal codes
export const get_all_postal_codes = (setPostal_code) => {
  // setLoading(true)
  axios
    .get(api_url + "api/postalcode")
    .then((res) => {
      setPostal_code(res.data.data);
      window.scrollTo(0, 500);
      // setLoading(false)
    })
    .catch((err) => {
      // setLoading(false)
      window.scrollTo(0, 500);
    });
};

export const dimension_weight_price = (setPrice_tax) => {
  // setLoading(true)
  axios
    .get(api_url + "api/dementionweightprice")
    .then((res) => {
      setPrice_tax(res?.data?.success?.data[0]);
      // setLoading(false)
    })
    .catch((err) => {
      window.scrollTo(0, 500);
    });
};

// update debit credit card
export const update_card_debit_credit = (
  values,
  setLoading,
  dispatch,
  history,
  selector,
  setType,
  setMessage
) => {
  setLoading(true);
  axios
    .post(api_url + "api/updatecreaditcard", values, {
      headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
    })
    .then((response) => {
      setType("success");
      window.scrollTo(0, 500);
      setMessage("Card detail updated successfully");
      window.scrollTo(0, 500);
      get_card_list(dispatch, setLoading);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
      setType("error");
      window.scrollTo(0, 500);
      setMessage("Something went wrong");
      window.scrollTo(0, 500);
    });
};

export const time_limit_for_quote = (setLoading, setTime) => {
  setLoading(true);
  axios
    .post(
      api_url + "api/gettime",
      {},
      {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      }
    )
    .then((res) => {
      setTime(res.data);
      setLoading(false);
    })
    .catch((err) => {
      setLoading(false);
    });
};
