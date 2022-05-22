import axios from "axios";

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

const AXIOS = axios.create({
  baseURL: process.env.VUE_APP_BACKEND_URL !== "" ? process.env.VUE_APP_BACKEND_URL : `http://localhost:8098/api`,
  timeout: 30000.
  
});



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