import axios from 'axios'
let api_url = "http://devapi.trans8.ca/";


// user oder listing details
export const All_Order_Listing = async(setData, setLoader, searchId, getRange, chk_status) => {
    setLoader(true);
    let val = {
        oder_delivered:(chk_status === "delivered" || chk_status === "outofdelivery" || chk_status === "inprocess")?chk_status:"",
         from:getRange?.from,
         to:getRange?.to,
         status:(chk_status === "incomplete" || chk_status === "cancel") ? chk_status:"",
         order_id:searchId &&[searchId]
        }
        let response= await axios.post(api_url + "api/getallorders", val, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
       try{
           setData(response.data.data)
           setLoader(false)
           window.scrollTo(0, 500)
       } catch(err){
           setLoader(false)
       }
        // .then(response => {
        // })
        // .catch(err => {
        //     setLoader(false)
        // })
}

//All active order
export const active_order_Listing = (setData, setLoader, searchId) => {
    setLoader(true);
    let val = {}
    if (searchId === "") {
        val = {}
    } else {
        val = {
            order_id: [searchId]
        }
    }
    axios.post(api_url + "api/getallactiveorders", val, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            setData(response.data.data)
            setLoader(false)
        })
        .catch(err => {
            setLoader(false)
        })
}

//  api/ordersummary
export const order_summary = (setData, setLoader, setType, setMessage) => {
    setLoader(true);
    let cust_id = sessionStorage.getItem("customer_ids")
    axios.post(api_url + "api/ordersummary", { id: `${cust_id}` }, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            setData(response.data)
            setLoader(false)
        })
        .catch(err => {
            setLoader(false)
        })
}


export const order_detail = (id, setData, setLoaders, setType, setMessage) => {
    setLoaders(true);
    axios.post(api_url + "api/getorderidstatus", { order_id: `${id}` }, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            setData(response.data.data)
            setLoaders(false)
        })
        .catch(err => {
            setLoaders(false)
        })
}



//  api/confirmationstatus
export const confirm_status = (data, setLoader, history, status) => {
    setLoader(true);
    axios.post(api_url + "api/confirmationstatus", data, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {
            if (status === "complete") {
                sessionStorage.setItem("last_route", window.location.pathname)
                history.push("/my-order")
            }
            else {
                history.push("/dashboard")
            }
            setLoader(false)
        })
        .catch(err => {
            setLoader(false)
        })
}

// cancel order
export const cancel_order = (id,setLoader, setType, setMessage ,setCancel_status) => {
    setLoader(true);
    axios.post(api_url + "api/cancelbuttonrequest", { order_id: `${id}` }, { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
        .then(response => {   
            sessionStorage.removeItem("last_route")  
            setCancel_status(true)
            setType("success")
            setMessage("Order ("+id+") cancelled successfully")
            setLoader(false)
        })
        .catch(err => {
            setType("error")
            setMessage("Order not cancelled ,something went wrong! Please try again")
            setLoader(false)
        })
}