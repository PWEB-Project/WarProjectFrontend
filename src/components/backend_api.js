import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const AXIOS = axios.create({
  baseURL: `http://localhost:8098/api`,
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
    return AXIOS.post("/news/admin/add-news", news);
  },
  addNewSubscriber(subscriber){
    return AXIOS.post("/subscriber/admin/add-subscriber", subscriber);
  },
  addNewBunker(bunker){
    console.log(bunker);
    return AXIOS.post("/bunker/admin/add-bunker", bunker);
  },
  getGoodsType(){
    return AXIOS.get("/goods-type/admin/get-goods-type");
  },
  addNewGoods(goods){
    console.log(goods);
    return AXIOS.post("/necessity/admin/add-necessity-goods", goods);
  },
  addNewReview(review){
    console.log(review);
    return AXIOS.post("/review/admin/add-review", review);
  }
};