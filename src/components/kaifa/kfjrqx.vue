<template>
  <div>
    <el-button @click="$router.push({name:'kfadd'})">添加权限</el-button>
    <el-table :data="tableData" style="width: 100%" max-height="500">
      <el-table-column fixed prop="_id" label="id"></el-table-column>
      <el-table-column fixed prop="title" label="标题"></el-table-column>
      <el-table-column fixed prop="name" label="路由"></el-table-column>
      <el-table-column fixed prop="pid" label="父类id"></el-table-column>

      <!-- 操作 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, tableData)"
            type="text"
            size="small"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  methods: {
    deleteRow(index, rows) {
      // scope.row._id
      // delquanxian
      this.$confirm("此操作将永久删除该权限, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.axios
            .get("/delquanxian", { params: { id: rows[index]._id } })
            .then(res => {
              if (res.data.err_code == 200) {
                // rows.splice(index, 1);
                this.list();
              }
            }),
            this.$message({
              type: "success",
              message: "删除成功!"
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });

      // this.axios
      //   .get("/delquanxian", { params: { id: rows[index]._id } })
      //   .then(res => {
      //     if (res.data.err_code == 200) {
      //       // rows.splice(index, 1);
      //       this.list();
      //     }
      //   });
      // window.location.reload();
    },
    list() {
      this.axios.get("/listquanxian").then(res => {
        this.tableData = res.data.info;
      });
    }
  },
  mounted() {
    this.list();
  },
  data() {
    return {
      tableData: []
    };
  }
};
</script>
<style scoped>
</style>