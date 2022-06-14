import axios from 'axios'

// import { card_detail, getAllUserDetail } from '../redux/Actions/authAction';
let api_url = "http://devapi.trans8.ca/";


// submit your form detail
export const send_form_details = (values, setLoading, dispatch, setType, setMessage) => {

    setLoading(true);
    axios.post(api_url + "api/updatedetails", values, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            if (response.data.success.success) {
                setType("success")
                setMessage("Send your messages successfully")
                setLoading(false)
                // user_detail(dispatch, setLoading)
            }
        })
        .catch(err => {
            setType("error")
            setMessage("Something went wrong! please check input field details")
            setLoading(false)
        })
}
