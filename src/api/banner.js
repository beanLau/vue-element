import request from "@/utils/request";

/**
 * 获取广告列表数据
 * @param {查询参数} query
 */
export function getBannerList(query) {
  return request.post("/confBanner/listBanner", query || {});
}
export function updateBannerState(query) {
  return request.post("/confBanner/updateConfBannerState", query || {});
}
export function deleteBanner(query) {
  return request.post("/confBanner/delConfBanner", query || {});
}
export function addBanner(query) {
  return request.post("/confBanner/addConfBanner", query || {});
}
export function modifyBanner(query) {
  return request.post("/confBanner/saveConfBanner", query || {});
}
export function getBannerById(query) {
  return request.post("/confBanner/getConfBanner", query || {});
}
export function submitAudit(query) {
  return request.post(`/confBanner/submitAudit/${query.id}`);
}
