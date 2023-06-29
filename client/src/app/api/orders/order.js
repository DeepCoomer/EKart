import axios from "axios";
const BASEURL = "https://ekart-sever.onrender.com";
// const BASEURL = "http://localhost:8000";

axios.defaults.withCredentials = true;

export function createOrder(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/order/new`,
      method: "POST",
      withCredentials: true,
      headers: {
        Accept: "application/json",
        'token': localStorage.getItem('ekarttoken')
      },
      data: formData,
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}

export function myOrders() {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/orders/me`,
      method: "GET",
      withCredentials: true,
      headers: {
        'token': localStorage.getItem('ekarttoken')
      }
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}

export function myOrderDetails(id) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/order/${id}`,
      method: "GET",
      withCredentials: true,
      headers: {
        'token': localStorage.getItem('ekarttoken')
      }
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}