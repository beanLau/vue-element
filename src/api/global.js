import request from "@/utils/request";

/**
 * 获取考试科目tree下拉框数据
 * @param {查询参数} query
 */
export function getSubjectsOptions(query) {
  return request.post(
    "/sysClass/getSysClassTree",
    Object.assign({ classType: 4 }, query || {})
  );
}
/**
 * 获取地区联动下拉数据
 */
export function getAreaOptions() {
  return request.post("/sysArea/listSysAreaTree");
}
/**
 * 获取部门联动下拉数据
 */
export function getDeptOptions() {
  return request.post("/adminRole/listAdminRoleTree");
}
/**
 * 获取学员沟通阶段下拉数据
 */
export function getCommunicationPhaseOptions() {
  return request.get("/baseConf/listCommunicationPhase");
}
/**
 * upload
 */
export function uploadImg(data) {
  return request({
    url: "/base/upload",
    contentType: "multipart/form-data",
    data: data
  });
}

/**
 * 拉取用户信息及权限
 */
export function getUserInfo() {
  return request.post("/index/index");
}

/**
 * 文章类别树
 */
export function getSysClassesTree() {
  return request.post("/sysClasses/listSysClassesTree");
}

export function getAgentDetail() {
  return request.get("/agent/detail");
}
export function saveDetail(query) {
  return request.post("/agent/updateAgent", query);
}
export function getTeacherOptions() {
  return request.post("/teacher/listTeacherDropDown");
}
