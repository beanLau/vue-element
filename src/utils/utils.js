export function setCookie(name, value, time) {
  var exp = new Date();
  exp.setTime(exp.getTime() + time);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

export function downLoadFile(res) {
  const blob = new Blob([res.data]);
  if ("download" in document.createElement("a")) {
    // 非IE下载
    const elink = document.createElement("a");
    elink.download = res.fileName;
    elink.style.display = "none";
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, res.fileName);
  }
}
