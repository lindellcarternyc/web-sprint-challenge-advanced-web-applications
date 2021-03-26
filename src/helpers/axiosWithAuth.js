import axios from "axios";

//Task List:
//Build and export a function used to send in our authorization token
export const axiosWithAuth = () => {
  const token = window.localStorage.getItem('bubbles-token')

  return axios.create({
    headers: {
      authorization: token
    }
  })
}