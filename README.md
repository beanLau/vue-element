## CRM脚手架对接指南

##### 一、项目相关文档地址

1. [原型地址](http://60.205.171.0:8082/crm_update/#g=1&p=crm%E5%9C%BA%E6%99%AF%E5%9B%BE)
2. [UI地址](https://lanhuapp.com/web/#/item/project/board?pid=aebd40bd-9eb8-45f2-9c58-06158ef30f33) 如果没有权限，请注册蓝湖帐号，联系宇轩添加蓝湖权限。
3. [测试网校后台地址](http://localadmin.wangxiao.cn/login.aspx?url=http%3a%2f%2flocaladmin.wangxiao.cn%2fdefault.aspx) （用来获取coolie）
4. [接口地址](http://crm.wangxiao.cn/swagger-ui.html)

##### 二、获取代码

1. 登录git仓库，查找wangxiao_crm项目，clone代码到本地。

   ```shell
   git clone ssh://liuweitao@git.wangxiao.cn:29418/html/wangxiao_crm.git
   ```

2. 安装依赖。

   ```shell
   npm i
   ```

3. 运行

   ```shell
   npm start
   ```

##### 三、配置host

1. host文件添加如下配置

   ```
   192.168.1.3   localadmin.wangxiao.cn
   192.168.1.9 crm.wangxiao.cn
   127.0.0.1 lwt.wangxiao.cn
   ```

2. 可修改本地服务host。

   ```javascript
   //vue.config.js文件
   module.exports = {
     devServer: {
       host: "lwt.wangxiao.cn", //在此修改host 注意：host文件也需要修改
       proxy: "http://crm.wangxiao.cn/"
     }
   };
   ```

##### 四、调用后台接口

1. 访问测试环境[网校后台](localadmin.wangxiao.cn)登录获取cookie。
2. 访问[swagger](http://crm.wangxiao.cn/swagger-ui.html#/%E7%B3%BB%E7%BB%9F%E9%80%9A%E7%94%A8%E6%8E%A5%E5%8F%A3/indexUsingPOST)查找。系统通用接口中的index/index（登录认证接口），点击Try it out，点击Execute。获取接口权限。
3. 查找swagger中接口，在项目中发送异步请求对接。



## 屏幕适配

##### 一、适配方案

1. 浏览器宽度小于等于1336px时，进行小分辨率适配。蓝湖UI宽度设置为1336px，进行开发。
2. 浏览器宽度大于1336时，不需要适配。蓝湖UI宽度设置为1920px，进行开发。
3. elementui组件样式进行全局适配

##### 二、组件中适配代码

1. 使用全局混入mixin，每个组件都有计算属性sizeType，标识当前适配规则。

   ```javascript
   if (innerWidth <= 1336) {
       state.sizeType = "size-mini";
   } else {
       state.sizeType = "size-medium";
   }
   ```

2. 组件中适配案例。

   通过计算属性生成自定义适配规则的class。

   ```javascript
   export default {
       computed: {
           paginationSize() {
               return `pagination-${this.sizeType}`;
           }
       }
   }
   ```

   对需要适配的dom元素绑定对应class

   ```html
   <div class="pagination-wrap" v-bind:class="paginationSize">
   </div>
   ```

   编写css进行适配

   ```css
   //适配小屏分页相关样式
   .pagination-size-mini {
     margin-top: 4px;
   }
   ```

##### 三、全局适配

1. 代码首次加载时会判断当前屏幕尺寸，如果是小于1336会给body添加class=“mini-content”

   ```javascript
   let pageContentName;
   if (window && window.innerWidth <= 1336) {
       pageContentName = "mini-content";
   } else {
       pageContentName = "medium-content";
   }
   document
       .getElementsByTagName("body")[0]
       .setAttribute("class", pageContentName);
   this.$store.dispatch("setInnerWidth", {
       innerWidth: window.innerWidth
   });
   ```

2. element组件样式会自动被覆盖。如果没有被覆盖，需要在src/assets/styles/min-elements.less中添加组件适配代码。