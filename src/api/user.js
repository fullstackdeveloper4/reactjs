import { API_URL, methodAxiosGet, methodAxiosPost } from "./constant";

export const getUserDetails = (data) => {
    return methodAxiosGet(`${API_URL}/details`, data)
}

export const updateUserdetailApi = (data) => {
    return methodAxiosPost(`${API_URL}/updatedetails`, data)
}
