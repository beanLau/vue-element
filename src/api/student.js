import request from "@/utils/request";

/**
 * 获取广告列表数据
 * @param {查询参数} query
 */
//删除
export function deleteStudent(query) {
  return request.post("/student/deleteStudent", query || {});
}

//删除
export function getStudentById(query) {
  return request.post("/student/getStudent", query || {});
}

//新增
export function addStudent(query) {
  return request.post("/student/insertStudent", query || {});
}

//修改
export function updateStudent(query) {
  return request.post("/student/updateStudent", query || {});
}

//确认到店
export function updateSotreState(query) {
  return request.post("/student/updateStudentStoreState", query || {});
}

//获取列表
export function getStudentList(query) {
  return request.post("/student/listStudent", query || {});
}

//获取学员关注商品列表
export function getCollectList(query) {
  return request.post("/student/listStudentCollect", query || {});
}

//导出
export function exportStudent(query) {
  return request.post("/student/listStudentExport", query || {}, "blob");
}
