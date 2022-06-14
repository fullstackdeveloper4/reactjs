// user oder listing details
export const Tracking_Order = (values,setLoading)=>{
    setLoading(true)
    axios.get(api_url+"api/updatedetails" , values , {headers :{'Authorization': 'Bearer '+sessionStorage.getItem("token")}} )
    .then(response=>{
        if(response.data.success.success){
              setLoading(false)
        }
    })
    .catch(err=>{
        toast.error("Something went wrong ! please check input field details", {
            theme: "colored",position: 'top-center',
          });
          setLoading(false)
    })
} 

 
