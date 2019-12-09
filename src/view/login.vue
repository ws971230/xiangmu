<template>
  <div class="login" v-if="f==false">
    <div class="img">
      <van-image round width="10rem" height="10rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <h2>渠道管理平台</h2>
    <form class="form">
      <!-- 账户身份 -->
      <select class="sele">
        <option value>管理员</option>
        <option value>企业</option>
        <option value>平台</option>
      </select>
      <!-- 账号密码 -->
      <van-cell-group>
        <van-field label="用户名" v-model="name" placeholder="请输入用户名" />
        <van-field type="password" label="密码" v-model="pass" placeholder="请输入密码" />
      </van-cell-group>

      <van-button type="primary" @click="loginto()">登录</van-button>
    </form>
  </div>

  <!-- 登录成功 -->
  <div v-else class="ok">
    <i class="el-icon-success size animated shake"></i>
    <p class="msg animated bounceIn">登陆成功</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      f: false,
      name: "",
      pass: ""
    };
  },
  methods: {
    loginto() {
      //收集表单数据---ajax--接口---
      let { name, pass } = this;
      //node---
      this.axios
        .post("/login", {
          name: name,
          pass: pass
        })
        .then(res => {
          if (res.data.err_code == 200) {
            //正确跳转base 保存token
            //保存
            localStorage.setItem(
              "ht_token",
              JSON.stringify({ id: res.data.id, token: res.data.token })
            );
            //跳转
            this.f = true; //判断
            setTimeout(() => {
              this.$router.push({ name: "base" });
            }, 3000);
          } else {
            if (this.name && this.pass) {
              alert("密码或用户名错误");
              this.pass = "";
              this.name=''
            } else if ((this.name == "" || this.pass == "")) {
              this.name == "" ? alert("请输入账号"):alert("请输入密码");
            }
          }
        });
      ///数据库是否存在用户
      //返回---正确与错误
      //错误不跳转
    }
  }
};
</script>
<style>
.ok {
  width: 100px;
  height: 100vh;
  display: flex;
  margin: 0 auto;

  justify-content: center;
  flex-direction: column;
}
.sele {
  padding: 5px 10px;
  /* font-size: 16px; */
}
.msg {
  text-align: center;
}

.login {
  width: 70%;
  margin: 0 auto;
}
.size {
  font-size: 100px;
}
h2 {
  text-align: center;
}
.form {
  width: 50%;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
}
.img {
  text-align: center;
}
</style>