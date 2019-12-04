import request from "@/utils/request";

/**
 * 获取广告列表数据
 * @param {查询参数} query
 */
export function getArticleList(query) {
  return request.post("/confArticle/listArticle", query || {});
}
export function updateArticleState(query) {
  return request.post("/confArticle/updateConfArticleState", query || {});
}
export function deleteArticle(query) {
  return request.post("/confArticle/delConfArticle", query || {});
}
export function addArticle(query) {
  return request.post("/confArticle/addConfArticle", query || {});
}
export function modifyArticle(query) {
  return request.post("/confArticle/saveConfArticle", query || {});
}
export function getArticleById(query) {
  return request.post("/confArticle/getConfArticle", query || {});
}
export function submitAudit(query) {
  return request.post(`/confArticle/submitAudit/${query.id}`);
}
