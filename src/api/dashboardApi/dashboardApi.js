import axios from 'axios';
let api_url = "http://devapi.trans8.ca/";
// dashboard stats
export const dashboardStats=(setStats , setLoader)=>{
    setLoader(true)
    axios.post(api_url+"api/ordersnumbercount" , {} , { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
    .then(res=>{
        setStats(res.data.data)
        setLoader(false)
        window.scrollTo(0,0)
    })
    .catch(err=>{
        setLoader(false)
        window.scrollTo(0,0)
    })
}

// all order history 
export const OrderHistoryStats=(setHistory , setLoader , getRange , chk_status)=>{
    setLoader(true)
    let val={}
    if(chk_status==="delivered" ||chk_status==="outofdelivery" || chk_status==="inprocess" ){
        if(getRange.from!==""){
            val={oder_delivered:chk_status , from:getRange?.from , to:getRange?.to}
        }else{
            val={oder_delivered:chk_status}
        }
    }
    if((chk_status==="incomplete" || chk_status==="cancel") ){
        if(getRange.from!==""){
        val={status:chk_status , from:getRange?.from , to:getRange?.to}
        }else{
            val={status:chk_status }
        }
    }
    if(!chk_status && !getRange.from){
        val={}
    }
    if(getRange.from!=="" && chk_status===""){
        val=getRange
    }
    axios.post(api_url+"api/getallhistory" , val , { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
    .then(res=>{
        setHistory(res.data.data)
        setLoader(false)
    })
    .catch(err=>{
        setLoader(false)
    })
}

// graph data
export const Graph_data=(setGraphData , setLoading  , data )=>{
    setLoading(true)
    axios.post(api_url+"api/getgrapdata" , data , { headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem("token") } })
    .then(res=>{
        setGraphData(res.data)

        setLoading(false)
    })
    .catch(err=>{
        setLoading(false)
    })
}