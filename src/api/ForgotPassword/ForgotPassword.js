import axios from 'axios'
import { toast } from "react-toastify";
let api_url="http://devapi.trans8.ca/";

//forgot password
export const forgotPassword=(values ,setLoading,setType, setMessage)=>{
    setLoading(true);
    axios.post(api_url+"api/forgetpassword" , values , {headers :{'Authorization': 'Bearer '+sessionStorage.getItem("token")}} )
    .then(response=>{
        if(response.data.data){
            setType("success")
            setMessage('We have sent an email to your registered email')
              setLoading(false)
        }
        else{
            setLoading(false)
            setType("error")
            setMessage('Please check your email')
        }
    })
    .catch(err=>{
        setLoading(false)
        setType("error")
        window.scrollTo(0,450)
        setMessage('Please check your email')
        window.scrollTo(0,450)
    })
} 

// reset password
export const resetPassword=(values ,setLoading , history,setType, setMessage)=>{
    setLoading(true);
    axios.post(api_url+"api/submitResetPasswordForm" , values , {headers :{'Authorization': 'Bearer '+sessionStorage.getItem("token")}} )
    .then(response=>{
        if(response.data.data){
            setType("success")
            window.scrollTo(0,500)
            setMessage("Your password has been changed successfully .")
            window.scrollTo(0,500)
              setLoading(false)
              history.push("/login")
        }
        else{
            setLoading(false)
            setType("error")
            setMessage("Please check your email")
        }
    })
    .catch(err=>{
        setLoading(false)
        setType("error")
        window.scrollTo(0,500)
        setMessage("Please check your password")
        window.scrollTo(0,500)
    })
} 
// submitResetPasswordForm