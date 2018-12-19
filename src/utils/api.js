import fly from "./request";

const baseUrlApi = "https://api.ithome.com";
const baseUrlDyn = "https://dyn.ithome.com";
const baseUrlQuan = "https://apiquan.ithome.com";

const api = {
  getNewsList: (r) => fly.get("/json/newslist/news", null, {
    baseURL: baseUrlApi
  }),
  getNews: (id) => fly.get(`/xml/newscontent/${id}.xml`, null, {
    baseURL: baseUrlApi
  }),
  getRelatedNews: (id) => fly.get(`/json/tags/0${id.slice(0, 3)}/${id}.json`, null, {
    baseURL: baseUrlApi,
    parseJson: false
  }),
  getNewsComments: (id) => fly.get(`/json/commentlist/350/87a8e5b144d81938.json`, null, {
    baseURL: baseUrlDyn
  }),
  getSlides: () => fly.get("/xml/slide/slide.xml", null, {
    baseURL: baseUrlApi
  }),
  getTopics: (r) => fly.get("/api/post", {
    categoryid: 0,
    type: 0,
    orderTime: r,
    visistCount: "",
    pageLength: ""
  }, {
    baseURL: baseUrlQuan
  }),
  getTopic: (id) => fly.get(`/api/post/${id}`, null, {
    baseURL: baseUrlQuan
  }),
  getTopicComments: (id, last) => fly.get("/api/reply", {
    postid: id,
    replyidlessthan: last
  }, {
    baseURL: baseUrlQuan
  })
};

export default api;
