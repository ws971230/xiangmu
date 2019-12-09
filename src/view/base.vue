<template>
  <div class="base">
    <el-container>
      <el-header>
        <h1>渠道管理系统</h1>
        <el-button @click="logout()">退出</el-button>
      </el-header>
      <el-container class="content">
        <!-- 左侧导航 -->
        <el-aside width="200px">
          <el-menu>
            <!-- 统计 -->
            <el-submenu  v-for="(v,i) in leftlist" :index="(i+1).toString()" :key="i">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{v.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item 
                v-for="(v1,i1) in v.children" 
                :index="`${i+1}-${i1+1}`" 
                :key="`${i}-${i1}`"
                 @click="$router.push({name:`${v1.name}`})">{{v1.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <!-- 管理 -->
            <!-- <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="$router.push({name:'gluser'})">用户管理</el-menu-item>
                <el-menu-item index="2-2" @click="$router.push({name:'glkaqu'})">卡券管理</el-menu-item>
                <el-menu-item index="2-3" @click="$router.push({name:'glshpi'})">商品管理</el-menu-item>
                <el-menu-item index="2-4" @click="$router.push({name:'gldida'})">订单管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <!-- 开发 -->
            <!-- <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1"  @click="$router.push({name:'kfpz'})">基本配置</el-menu-item>
                <el-menu-item index="3-2"  @click="$router.push({name:'kfqx'})">介入权限</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <!-- 设置 -->
            <!-- <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="$router.push({name:'szpt'})">平台信息</el-menu-item>
                <el-menu-item index="4-2" @click="$router.push({name:'szqx'})">账户权限</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->


          </el-menu>
        </el-aside>

        <!-- 右侧导航 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  data () {
    return {
      left:[]
    }
  },
  methods: {
    logout() {
      //清除本地缓存
      localStorage.removeItem("ht_token");
      this.$router.push({ name: "login" });
    },
    treelist(info,pid){
       let data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
           ...info[i],
            children: this.treelist(info, info[i]._id)
          };

          /* 
            info={
              id:1,
              name:2,
                {id:1,name:3}
                {id:1,name:4}
              children:[
              ]
            }
            

          */
          // 没有子权限 删除 children
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
        }
      }
      return data;
    }
  },
  mounted () {
    this.axios.get('/listquanxian').then(res=>{
      // console.log(res.data)
      this.left=res.data.info
    })
  },
  computed: {
    leftlist(){
      return this.treelist(this.left,0)
    }
  }
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.content {
  margin-top: 20px;
  overflow:auto;
}
.base {
  background: #ebebec;
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f7f7f7;
}

.el-aside {
  margin-left: 10px;
  height: 100vh;
  background: #f7f7f7;
}
.el-main {
  box-sizing: border-box;
  height: 100vh;
  padding: 10px;
  margin-left: 20px;
  background: #f7f7f7;
  overflow: auto;

  /* background: violet; */
}
</style>