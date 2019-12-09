<template>
  <el-form ref="form" label-width="80px">
    <el-form-item label="管理员名">
      <el-input v-model="title"></el-input>
    </el-form-item>
    <el-form-item label="管理员密码">
      <el-input v-model="pass"></el-input>
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item._id"
          :label="item.title"
          :value="item._id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="add">确认修改</el-button>
    </el-form-item>
    {{value}}
  </el-form>
</template>
<script>
import treelist from "@/myjs/treelist.js";
export default {
  data() {
    return {
      title: "",
      pass: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        }
      ],
      value: ""
    };
  },
  mounted() {
    this.axios.get("/jslist").then(res => {
      if (res.data.err_code == 200) {
        console.log(res.data.info);
        this.options = res.data.info;
      }
    });
  },
  methods: {
    add() {
      this.axios
        .post("/glyadd", {
          title: this.title,
          pass: this.pass,
          jsid: this.value
        })
        .then(res => {
          if (res.data.err_code == 200) {
            this.$router.push({ name: "glylist" });
          }
        });
    }
  }
};
</script>