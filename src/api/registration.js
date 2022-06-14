import axios from 'axios';
import { message } from 'antd';

export const user_registration = (values, setType, setMessage, history, setLoading, quoteDetail) => {
    setLoading(true)
    axios.post("http://devapi.trans8.ca/api/register", values)
        .then(response => {
            if (response.data.data) {
                sessionStorage.setItem("token", response.data.data.token);
                setType("success")
                setMessage("Customer registered successfully")
                if (quoteDetail.from_address) {
                    history.push("/quotes")
                }
                else {
                    history.push("/dashboard")
                }
                setLoading(false)
            }
        })
        .catch(err => {
            setType("error")
            setMessage(err.response.data.message)
            window.scrollTo(0, 300)
            setLoading(false)
        })
}

// login
export const user_login=(values , setLoading , setType , setMessage , quoteDetail , history)=>{
    setLoading(true)
    axios.post("http://devapi.trans8.ca/api/login" , values )
    .then(response=>{
        if(response.data){
            setType("success")
            setMessage(response.data.message)
            // message.success(response.data.message)
            sessionStorage.setItem("token", response.data.data.token)
            setLoading(false)
            if (quoteDetail.from_address) {
                history.push("/quotes");
              } else {
                history.push("/dashboard");
              }
        }
        else{
            setType("error")
            setMessage(response.data.message)
            setLoading(false)
            // message.error(response.data.message)
        }
    })
    .catch(err=>{
        setType("error")
            setMessage(err.response.data.message)
            window.scrollTo(0, 200)
            setLoading(false)
        // message.error(err.response.data.message)
    })
}