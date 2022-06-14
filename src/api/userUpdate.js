import axios from 'axios'
import { card_detail, getAllUserDetail } from '../redux/Actions/authAction';
let api_url = "http://devapi.trans8.ca/";
// get user detail
export const user_detail = (dispatch, setLoading) => {
    axios.get(api_url + "api/details", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            if (response.data) {
                dispatch(getAllUserDetail(response.data.success))
            }
        })
        .catch(err => {

        })
}

//change password
export const changePassword = (values, setLoading, history,setType, setMessage) => {
    setLoading(true);
    axios.post(api_url + "api/change-password", values, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        // history.push("/")
        .then(response => {
            if (response.data.status === 400) {
                setType("error")
                window.scrollTo(0,500)
                setMessage(response.data.message)
                window.scrollTo(0,500)
                setLoading(false)
            }
            else {
                setType("success")
                window.scrollTo(0,500)
                setMessage("Password changed Successfully")
                window.scrollTo(0,500)
                sessionStorage.removeItem("token")
                setLoading(false)
                history.push("/login")
            }
        })
        .catch(err => {

            setLoading(false)
            setType("error")
            window.scrollTo(0,500)
            setMessage("Something went wrong! please check input field details")
            window.scrollTo(0,500)
        })
}

// update user detail
export const update_Info = (values, setLoading, dispatch, setType, setMessage) => {
    setLoading(true);
    axios.post(api_url + "api/updatedetails", values, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            if (response.data.success.success) {
                setType("success")
                window.scrollTo(0,500)
                setMessage("Profile Updated Successfully")
                window.scrollTo(0,500)
                setLoading(false)
                user_detail(dispatch, setLoading)
            }
        })
        .catch(err => {
            setType("error")
            window.scrollTo(0,500)
            setMessage("Something went wrong! please check input field details")
            window.scrollTo(0,500)
            setLoading(false)
        })
}

// fetch card
export const get_card_list = (dispatch, setLoading, cardDetail,setType, setMessage) => {
    setLoading(true)
    axios.get(api_url + "api/fetechcards", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            if (response.data.cards) {
                dispatch(card_detail(response.data.cards[0]))
                sessionStorage.setItem("card_det", response.data?.cards[0]?.card_number)
                setLoading(false)
                window.scrollTo(0,500)
            }
        })
        .catch(err => {
            setLoading(false)
            window.scrollTo(0,500)
        })
}

// order number count
export const Order_number_count = (dispatch, setLoading) => {
    setLoading(true)
    axios.get(api_url + "api/ordersnumbercount", { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            if (response.data.cards) {
                dispatch(card_detail(response.data.cards[0]))
                setLoading(false)
            }
        })
        .catch(err => {
            setLoading(false)
        })
}