<template>
  <div style="height: 800px">
    <el-container style="height: 100%">
      <el-header>{{title}}</el-header>

      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>
          <template>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                prop="tableName"
                label="表名">
              </el-table-column>
            </el-table>
            <div>
              <el-button @click="generatorSource()">生成</el-button>
              <el-button @click="toggleSelection()">重置</el-button>
            </div>
          </template>
        </el-main>
      </el-container>
    </el-container>

    <el-footer>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        :page-count="pages"
        :current-page="current"
        @current-change="handleIndexChange"
      >
      </el-pagination>
    </el-footer>
  </div>
</template>

<script>
export default {
  name: 'generator',
  data () {
    return {
      title: 'MyBatisPlus_Generator',
      multipleSelection: '',
      tableData: [],
      total: 0,
      size: 10,
      current: 1,
      pages: 0
    }
  },
  created () {
    this.getDatas()
  },
  methods: {
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    generatorSource () {

    },
    handleIndexChange (pagination) {
      this.current = pagination
      this.getDatas()
    },
    getDatas () {
      this.$http({
        method: 'get',
        url: 'api/getAll',
        params: {'current': this.current, 'size': this.size}
      }).then(data => {
        // this.tableData=data.tables;
        let list = data.data.page.records
        this.current = data.data.page.current
        this.pages = data.data.page.pages
        this.size = data.data.page.size
        this.total = data.data.page.total
        this.tableData = []
        for (let i = 0; i < list.length; i++) {
          this.tableData.push({'tableName': list[i]})
        }
      })
    }
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
