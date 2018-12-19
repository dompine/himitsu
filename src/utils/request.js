// import wx from "wx";
// import Fly from "flyio";
//
// const fly = new Fly();
//
// fly.interceptors.request.use((request) => {
//   wx.showNavigationBarLoading();
//   return request;
// });
//
// fly.interceptors.response.use(
//   (response, promise) => {
//     wx.hideNavigationBarLoading();
//     return promise.resolve(response.data);
//   },
//   (err, promise) => {
//     wx.hideNavigationBarLoading();
//     wx.showToast({
//       title: err.message,
//       icon: "none"
//     });
//     return promise.resolve();
//   }
// );
//
// export default fly;
