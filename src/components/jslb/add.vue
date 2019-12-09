<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="角色名">
      <el-input v-model="title"></el-input>
    </el-form-item>
    <el-form-item label="权限">
      <el-cascader v-model="value" :options="options" :props="props" collapse-tags clearable></el-cascader>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">添加</el-button>
    </el-form-item>
    {{title}}
    {{Array.from(new Set(value.flat(Infinity)))}}
  </el-form>
</template>
<script>
import treelist from "@/myjs/treelist.js";
export default {
  data() {
    return {
      title: "",
      value: [],
      props: { multiple: true, checkStrictly: true },
      options: []
    };
  },
  mounted() {
    // 请求所有权限
    this.axios.get("/listquanxian").then(res => {
      this.options = treelist(res.data.info, 0);
    });
  },
  methods: {
    add() {
      let obj = {
        title: this.title,
        qxid: this.value
      };
      // Array.from(new Set(this.value.flat(Infinity)))
      this.axios.post("/jsadd",obj).then(res => {
        if(res.data.err_code==200){
          // 跳转
          this.$router.push({name:'jslist'})
        }else{
          alert('失败')
          this.title=''
          this.value=''
          // 
        }
      });
    }
  }
};
</script>