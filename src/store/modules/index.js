import {
  getSysClassesTree,
  getAreaOptions,
  getTeacherOptions,
  getCommunicationPhaseOptions
} from "@/api/global";
import { router } from "@/router";
const state = {
  messageBuffer: {},
  isCollapse: false,
  sideBarData: router.options.routes,
  userInfo: null,
  //地区联动下拉框数据
  isLoadArea: false,
  areaOptions: null,
  //考试科目下拉框数据
  isLoadArtical: false,
  articalTreeOptions: null,
  //部门联动下拉数据
  isLoadTeacher: false,
  teacherOptions: null,
  //沟通阶段下拉数据
  isLoadCommunication: false,
  communicationPhaseOptions: null,
  //消费状态下拉数据
  consumeStatusOptions: [
    {
      value: "0",
      label: "未下单"
    },
    {
      value: "5",
      label: "已下单"
    },
    {
      value: "3",
      label: "已成交"
    }
  ],
  //消费类型下拉数据
  consumeTypeOptions: [
    {
      value: "1",
      label: "低客单价成交"
    },
    {
      value: "2",
      label: "套餐成交"
    }
  ],
  //意向程度下拉数据
  intentionStatusOptions: [
    {
      value: "0",
      label: "未知"
    },
    {
      value: "1",
      label: "C"
    },
    {
      value: "2",
      label: "D"
    },
    {
      value: "4",
      label: "B"
    },
    {
      value: "5",
      label: "E"
    },
    {
      value: "7",
      label: "A"
    },
    {
      value: "8",
      label: "F"
    },
    {
      value: "9",
      label: "G"
    }
  ],
  //学历下拉数据
  educationOptions: [
    {
      value: 1,
      label: "高中"
    },
    {
      value: 2,
      label: "中专"
    },
    {
      value: 3,
      label: "大专"
    },
    {
      value: 4,
      label: "本科"
    },
    {
      value: 5,
      label: "硕士"
    },
    {
      value: 6,
      label: "博士"
    },
    {
      value: 7,
      label: "其他"
    },
    {
      value: 11,
      label: "小学"
    },
    {
      value: 12,
      label: "初中"
    },
    {
      value: 13,
      label: "大专以下"
    },
    {
      value: 14,
      label: "博士以上"
    }
  ],
  //学员来源下拉框数据
  sourceOptions: [
    {
      value: 0,
      label: "录入"
    },
    {
      value: 1,
      label: "会员"
    },
    {
      value: 2,
      label: "资料"
    },
    {
      value: 3,
      label: "qq咨询"
    },
    {
      value: 4,
      label: "电话咨询"
    },
    {
      value: 5,
      label: "淘宝书店"
    },
    {
      value: 6,
      label: "安卓"
    },
    {
      value: 7,
      label: "IOS"
    },
    {
      value: 8,
      label: "专题收集"
    },
    {
      value: 9,
      label: "WAP网站"
    },
    {
      value: 10,
      label: "团报"
    },
    {
      value: 11,
      label: "订单环节"
    },
    {
      value: 12,
      label: "SEM专题"
    },
    {
      value: 13,
      label: "SEM录入"
    },
    {
      value: 14,
      label: "小能录入"
    },
    {
      value: 15,
      label: "营销呼叫中心线下录入"
    },
    {
      value: 16,
      label: "SEM今日头条"
    },
    {
      value: 17,
      label: "SEM西瓜视频"
    },
    {
      value: 18,
      label: "SEM火山小视频"
    },
    {
      value: 19,
      label: "SEM抖音"
    },
    {
      value: 20,
      label: "SEM穿山甲"
    },
    {
      value: 99,
      label: "其他"
    }
  ],
  //创建时间下拉框数据
  createTimeOptions: [
    {
      value: 0,
      label: "注册时间"
    },
    {
      value: 1,
      label: "分配时间"
    },
    {
      value: 2,
      label: "完成时间"
    },
    {
      value: 3,
      label: "过期时间"
    },
    {
      value: 4,
      label: "上次回访时间"
    },
    {
      value: 5,
      label: "下单时间"
    },
    {
      value: 6,
      label: "约访时间"
    },
    {
      value: 7,
      label: "上次活动时间"
    },
    {
      value: 8,
      label: "回访时间"
    },
    {
      value: 9,
      label: "上次观看直播时间"
    },
    {
      value: 10,
      label: "上次登录时间"
    }
  ],
  //重复状态下拉框数据
  repeatOptions: [
    {
      value: "0",
      label: "不重复"
    },
    {
      value: "1",
      label: "疑似重复"
    }
  ],
  //优惠下拉框数据
  yhOptions: [
    {
      value: "0",
      label: "无优惠券"
    },
    {
      value: "1",
      label: "有优惠券"
    }
  ],
  //用户需求
  demandOptions: [
    {
      value: 0,
      label: "不清楚"
    },
    {
      value: 1,
      label: "考务信息"
    },
    {
      value: 2,
      label: "课"
    },
    {
      value: 3,
      label: "书"
    },
    {
      value: 4,
      label: "课和书"
    },
    {
      value: 5,
      label: "免费资料"
    },
    {
      value: 11,
      label: "报考条件"
    },
    {
      value: 12,
      label: "套餐"
    },
    {
      value: 13,
      label: "低价课"
    },
    {
      value: 14,
      label: "免费资料"
    },
    {
      value: 9,
      label: "其他咨询"
    }
  ]
};
const mutations = {
  addMessageBuffer(state, opt) {
    state.messageBuffer = opt;
  },
  setSideBar(state, opt) {
    state.sideBarData = [...router.options.routes, ...opt];
  },
  setUserInfo(state, opt) {
    state.userInfo = opt || null;
  },
  switchCollapse(state) {
    state.isCollapse = !state.isCollapse;
  },
  setArticalTreeOptions(state, opt) {
    state.articalTreeOptions = opt || [];
  },
  //切换是否加载科目状态
  switchLoadSubjectState(state) {
    state.isLoadArtical = !state.isLoadArtical;
  },
  setAreaOptions(state, opt) {
    state.areaOptions = opt || [];
  },
  //切换是否加载地区状态
  switchLoadAreaState(state) {
    state.isLoadArea = !state.isLoadArea;
  },
  setTeacherOptions(state, opt) {
    state.teacherOptions = opt || [];
  },
  //切换是否加载老师
  switchLoadTeacherState(state) {
    state.isLoadTeacher = !state.isLoadTeacher;
  },
  setCommunicationOptions(state, opt) {
    state.communicationPhaseOptions = opt || [];
  },
  //切换是否加载沟通阶段
  switchLoadCommunicationOptions(state) {
    state.isLoadCommunication = !state.isLoadCommunication;
  }
};
const getters = {
  isLoadArtical: state => state.isLoadArtical, //是否正在加载考试科目下拉数据
  isLoadArea: state => state.isLoadArea, //是否正在加载地区下拉数据
  isLoadTeacher: state => state.isLoadTeacher //是否正在加载老师下拉数据
};
const actions = {
  addMessageBuffer({ commit }, data) {
    commit("addMessageBuffer", data);
  },
  //展开折叠sidebar
  switchCollapse({ commit }) {
    commit("switchCollapse");
  },
  //设置权限数据
  setUserInfo({ commit }, data) {
    commit("setUserInfo", data);
  },
  setSideBar({ commit }, data) {
    commit("setSideBar", data);
  },
  //获取考试科目联动下拉数据
  getArticalTreeOptions({ commit }, opt) {
    if (!this.getters.isLoadArtical) {
      commit("switchLoadSubjectState");
      getSysClassesTree(opt)
        .then(res => {
          commit("setArticalTreeOptions", res.data);
          commit("switchLoadSubjectState");
        })
        .catch(() => {
          commit("switchLoadSubjectState");
        });
    }
  },
  //获取地区联动下拉数据
  getAreaOptions({ commit }) {
    if (!this.getters.isLoadArea) {
      commit("switchLoadAreaState");
      getAreaOptions()
        .then(res => {
          commit("setAreaOptions", res.data);
          commit("switchLoadAreaState");
        })
        .catch(() => {
          commit("switchLoadAreaState");
        });
    }
  },
  //获取部门联动下拉数据
  getTeacherOptions({ commit }) {
    if (!this.getters.isLoadTeacher) {
      commit("switchLoadTeacherState");
      getTeacherOptions()
        .then(res => {
          commit("setTeacherOptions", res.data);
          commit("switchLoadTeacherState");
        })
        .catch(() => {
          commit("switchLoadTeacherState");
        });
    }
  },
  getCommunicationPhaseOptions({ commit }) {
    if (!this.getters.isLoadCommunication) {
      commit("switchLoadCommunicationOptions");
      getCommunicationPhaseOptions()
        .then(res => {
          commit("setCommunicationOptions", res.data);
          commit("switchLoadCommunicationOptions");
        })
        .catch(() => {
          commit("switchLoadCommunicationOptions");
        });
    }
  }
};

export default {
  name: "index",
  state,
  mutations,
  getters,
  actions
};
