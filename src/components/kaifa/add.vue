<template>
  <div>
    我是添加权限
    <el-form ref="form" label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="title"></el-input>
      </el-form-item>
      <el-form-item label="路由name">
        <el-input v-model="name"></el-input>
      </el-form-item>
      <el-form-item label="父级">
        <el-cascader
          v-model="value"
          :props="{ checkStrictly: true }"
          :show-all-levels="false"
          :options="options"
        ></el-cascader>
      </el-form-item>

      <el-form-item>
        <el-button @click="add">添加</el-button>
      </el-form-item>
    </el-form>
    {{value}}
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      name: "",
      value: [],
      options: [
        {
          value: "0",
          label: "一级权限"
        }
      ]
    };
  },

  // 组件挂载后请求所有权限
  mounted() {
    this.axios.get("/listquanxian").then(res => {
      if (res.data.err_code == 200) {
        let info = res.data.info;
        let wxinfo = this.tree(info, 0);
        this.options = [...this.options, ...wxinfo];
      }
    });
  },

  methods: {
    tree(info, pid) {
      let data = [];
      for (let i in info) {
        if (info[i].pid == pid) {
          var x = {
            value: info[i]._id,
            label: info[i].title,
            children: this.tree(info, info[i]._id)
          };
          // 没有子权限 删除 children
          if (x.children.length == 0) {
            delete x.children;
          }
          data.push(x);
        }
      }
      return data;
    },

    add() {
      let pid = this.value.pop();
      let obj = {
        title: this.title,
        name: this.name,
        pid: pid
      };

      // 请求调用添加权限接口
      this.axios.post("/addquanxain", obj).then(res => {
        if (res.data.err_code == 200) {
          console.log("权限添加陈宫");
          this.$router.push({ name: "kfqx" });
        } else {
          this.name = "";
          this.title = "";
        }
      });
    }
  }
};
</script>
<style scoped>
</style>