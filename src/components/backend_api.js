import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const AXIOS = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL !== "" ? process.env.VUE_APP_BACKEND_URL : `http://localhost:8098/api`,
  timeout: 30000.
  
});


// AXIOS.interceptors.response.use(
//   function(response) {
//     if (response.headers["authorization"] != null) {
//       localStorage.setItem("access_token", response.headers["authorization"]);
//     }

//     if (response.data !== null && response.data.errorType != null) {
//       // store.state.errorDialog = true; TODO in state
//       // store.state.errorModel = response.data;
//     }

//     return response;
//   },
//   function(error) {
//     if (error.response.status === 403) {
//       //store.state.errorDialog = true; TODO in state
//       //store.state.errorModel = {errorType: "Access denied", message: "You have no permission on this action"};
//     }
//     return Promise.reject(error);
//   }
// );

// AXIOS.interceptors.request.use(
//   function(request) {
//     if (!request.url.includes("login")) {
//       request.headers["authorization"] = localStorage.getItem("access_token");
//     } else delete request.headers["authorization"];

//     return request;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

export default {
  login(email, password) {
    return AXIOS.post("/login", {
      email: email,
      password: password
    });
  },
  getMenu() {
    return AXIOS.get("/menu");
  },
  getMenuElementsFromCafeteria(name) {
    return AXIOS.get("/cafeteria/getMenuFromCafeteria/" + name);
  },
  getMenuElementsFromMenuDay(day, cafeteria) {
    return AXIOS.get(
      "/cafeteria/menuElementsFromMenuDay/" + day + "/" + cafeteria
    );
  },
  getUserWithoutId() {
    return AXIOS.get("/user/getCurrentUser");
  },
  getCafeteriasAdmin() {
    return AXIOS.get("/cafeteria/cafeteriaAdmin");
  },
  getUsers() {
    return AXIOS.get("/user");
  },
  getOrders() {
    return AXIOS.get("/order/getAll");
  },
  getPosts(date1, date2) {
    return AXIOS.post("/posts", {"startDate": new Date(date1).getTime(), "endDate": new Date(date2).getTime()});
  },
  getCountries(){
    return AXIOS.get("/country/getCountries");
  },
  getCounties(iso2){
    return AXIOS.get("/county/getCounties/" + iso2);
  },
  getCity(countryIso, countyIso){
    return AXIOS.get("/city/getCities/" + countryIso + "/" + countyIso);
  },
  getBunkers(cityId){
    return AXIOS.get("/bunker/admin/get-bunkers-by-city-id/" + cityId);
  },
  getGoods(cityId){
    return AXIOS.get("/necessity/admin/get-necessity-goods-by-city-id/" + cityId);
  },
  getNews(){
    return AXIOS.get("/news/get-news");
  },
  getArticles(){
   return AXIOS.get("/news/get-articles"); 
  },
  getReviews(newsId){
    return AXIOS.get("/review/getReviewsByNews/" + newsId);
  },
  addNewNews(news){
    console.log(news);
    return AXIOS.post("/news/admin/add-news", news);
  }
};