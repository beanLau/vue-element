<template>
  <div class="top-content flex">
    <div class="top-left">
      <img class="logo" src="../assets/images/logo.png" alt />
    </div>
    <div class="top-right flex">
      <img
        class="user-pic"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562317532727&di=d42029012caae5f947c1b515f3b6eedc&imgtype=0&src=http%3A%2F%2Fwww.5694.com%2Fu%2Fe%2F1489756958485.jpg"
        alt
      />
      <div class="user-name">欢迎您，齐天大爷！</div>
      <div class="login-out">退出</div>
    </div>
  </div>
</template>
<style lang="less">
.top-content {
  position: relative;
  height: 50px;
  box-sizing: border-box;
  align-items: center;
  box-shadow: 2px 1px 4px 0px rgba(0, 0, 0, 0.1);
  .top-left {
    width: 150px;
    box-sizing: border-box;
    padding-left: 46px;
    color: #666;
    .logo {
      height: 28px;
      width: 104px;
      display: block;
    }
  }
  .top-middle {
    position: absolute;
    display: flex;
    width: calc(100% - 470px);
    left: 200px;
  }
  .order-item-wrap {
    display: inline-block;
  }
  .order-item {
    height: 50px;
    display: flex;
    align-items: center;
    margin-right: 30px;
  }
  .top-right {
    position: absolute;
    right: 0;
    top: 0;
    height: 50px;
    width: 270px;
    box-sizing: border-box;
    padding: 10px 20px;
    -webkit-box-align: center;
    align-items: center;
    text-align: right;
    display: flex;
    justify-content: center;
  }
  .user-msg {
    position: relative;
    margin-right: 14px;
    cursor: pointer;
    .badge {
      position: absolute;
      right: -50%;
      top: -4px;
      padding: 0 4px;
      border-radius: 50%;
      background: #f56c6c;
      color: #fff;
    }
    .msg-icon {
      font-size: 22px;
      color: #666;
    }
  }
  .user-pic {
    width: 32px;
    height: 32px;
    border-radius: 16px;
    margin-right: 10px;
  }
  .user-name {
    color: #666;
    font-size: 12px;
    margin-right: 10px;
  }
  .login-out {
    cursor: pointer;
    color: #999;
    font-size: 12px;
  }
}
</style>
