<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="角色名">
      <el-input v-model="title"></el-input>
    </el-form-item>
    <el-form-item label="权限">
      <el-cascader v-model="value" :options="options" :props="props" collapse-tags clearable></el-cascader>
    </el-form-item>

    <el-form-item>
      <el-button @click="add">确认修改</el-button>
    </el-form-item>
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
    // 请求角色数据  初始化值
    this.axios
      .get("/jsidinfo", {
        params: {
          id: this.$route.params.id
        }
      })
      .then(res => {
        if (res.data.err_code == 200) {
          console.log(res.data.info);
          this.title = res.data.info.title;
          this.value = res.data.info.qxid;
        }
      });
  },

  methods: {
    add() {
      let obj = {
        id: this.$route.params.id,
        title: this.title,
        qxid: this.value
      };
      this.axios.post("/jsedit",obj).then(res => {
          console.log(res)
          if(res.data.err_code==200){
              this.$router.push({name:'jslist'})
          }
      })
      //   jsedit
      // Array.from(new Set(this.value.flat(Infinity)))
      //   this.axios.post("/jsadd",obj).then(res => {
      //     if(res.data.err_code==200){
      //       // 跳转
      //       this.$router.push({name:'jslist'})
      //     }else{
      //       alert('失败')
      //       this.title=''
      //       this.value=''
      //       //
      //     }
      //   });
    }
  }
};
</script>