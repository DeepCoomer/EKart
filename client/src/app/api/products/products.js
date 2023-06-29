import axios from "axios";
const BASEURL = "https://ekart-sever.onrender.com";
// const BASEURL = "http://localhost:8000";

export function getProducts(
  keyword,
  currentPage = 1,
  price = [0, 100000],
  category
) {
  let link = `${BASEURL}/api/v1/products?keyword=${
    keyword ? keyword : ""
  }&page=${currentPage}&price[gte]=${price[0] ? price[0] : 0}&price[lte]=${
    price[1] ? price[1] : 1
  }`;

  if (category) {
    link = `${BASEURL}/api/v1/products?keyword=${
      keyword ? keyword : ""
    }&page=${currentPage}&price[gte]=${price[0] ? price[0] : 0}&price[lte]=${
      price[1] ? price[1] : 1
    }&category=${category}`;
  }
  return new Promise((resolve, reject) => {
    axios({
      url: link,
      method: "GET",
      headers: {
        token: localStorage.getItem("ekarttoken"),
      },
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}

export function getProductDetails(id) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/product/${id}`,
      method: "GET",
      headers: {
        token: localStorage.getItem("ekarttoken"),
      },
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}

export function updateProductStock(id, newStock) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/product/${id}`,
      method: "PUT",
      data: {
        stock: newStock,
      },
      headers: {
        token: localStorage.getItem("ekarttoken"),
      },
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}

export function newReview(reviewData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/review`,
      method: "PUT",
      data: reviewData,
      headers: {
        token: localStorage.getItem("ekarttoken"),
      },
    })
      .then((res) => {
        resolve({ response: res });
      })
      .catch((err) => {
        reject({ error: err });
      });
  });
}

export function createProduct(formData) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${BASEURL}/api/v1/product/new`,
      method: "POST",
      data: formData,
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
