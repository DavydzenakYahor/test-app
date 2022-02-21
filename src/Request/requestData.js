import axios from "axios";

export const getRequestData = async(url) => await axios.get(url)
export const updateRequestData = async(url, method) => await axios.patch(url, method)