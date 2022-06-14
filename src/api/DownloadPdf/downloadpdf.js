import axios from 'axios'
let api_url = "http://devapi.trans8.ca/";

export const downloadpdf=(order_id , setPdf)=>{
    axios.post(api_url + "api/downloadlebels",{}, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })   
    .then(res=>{
        setPdf(res.data)
    })
    .catch(err=>{
    })
}