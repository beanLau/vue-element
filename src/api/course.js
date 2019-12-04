import request from "@/utils/request";

/**
 * 获取广告列表数据
 * @param {查询参数} query
 */
export function getCourseList(query) {
  return request.post("/products/listProducts", query || {});
}
export function updateCourseState(query) {
  return request.post("/confCourse/updateConfCourseState", query || {});
}
export function deleteCourse(query) {
  return request.post("/confCourse/delConfCourse", query || {});
}
export function addCourse(query) {
  return request.post("/products/addProducts", query || {});
}
export function modifyCourse(query) {
  return request.post("/products/saveUpdateProduct", query || {});
}
export function getCourseById(query) {
  return request.post("/products/getProduct", query || {});
}
export function submitAudit(query) {
  return request.post(`/products/submitAudit/${query.id}`);
}
