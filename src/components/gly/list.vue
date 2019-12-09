<template>
  <div>
    <h1>我是管理列表</h1>
    <el-button @click="$router.push({name:'glyadd'})">添加管理</el-button>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="name" label="管理员民"></el-table-column>
      <el-table-column fixed prop="pass" label="密码"></el-table-column>
      <el-table-column fixed prop="jsid" label="角色id"></el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData,scope.row._id)"
            type="text"
            size="small"
          >移除</el-button>
          <el-button @click.native.prevent="jsxiugai(scope.row._id)" type="text" size="small">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [{ _id: 1, title: "wada", jsid: 2 }]
    };
  },
  mounted() {
    this.axios.get("/glylist").then(res => {
      if (res.data.err_code == 200) {
          console.log(res.data)
        this.tableData = res.data.info;
      }
    });
  },
  methods: {
    deleteRow(index, rows, id) {},
    jsxiugai(id) {
      this.$router.push({ name: "glyedit", params: { id: id } });
    }
  }
};
</script>
<style scoped>
</style>