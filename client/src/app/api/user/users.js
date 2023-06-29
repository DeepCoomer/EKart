import axios from "axios";
const BASEURL = "https://ekart-sever.onrender.com";

axios.defaults.withCredentials = true;

export function Login(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/login`,
      method: "POST",
      headers: {
        Accept: "application/json",
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

export function Register(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/register`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
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

export async function LogoutUser() {
  try {
    let { data } = await axios.post(`${BASEURL}/api/v1/logout`);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export function getUser() {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/me`,
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

export function updateUser(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/me/update`,
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
        'token': localStorage.getItem('ekarttoken')
      },
      withCredentials: true,
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

export function changePassword(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/password/update`,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        'token': localStorage.getItem('ekarttoken')
      },
      withCredentials: true,
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
