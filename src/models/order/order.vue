<template>
  <div style="height: 670px">
    <el-container style="height: 100%">
      <el-container>
        <el-main>
          <template>
            <el-table
              ref="multipleTable"
              :data="orderList"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange">


              <el-table-column
                prop="account"
                label="用户名">
              </el-table-column>

              <el-table-column
                prop="createdate"
                label="创建时间">
              </el-table-column>

            </el-table>

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
      <el-button type="primary"  v-for="auth in this.GLOBAL.User_.userAuthority" v-if="auth=='sys:adduser'">测试权限添加</el-button>
    </el-footer>
  </div>
</template>

<script>
  export default {
    name: 'order',
    data(){
      return{
        current:1,
        size:10,
        pages:0,
        total:0,
        orderList:[]
      }
    },
    methods:{
      getOrderByPage(){
        this.$http({
          method:'get',
          url:this.HOST+'/order/order/order/getAllOrderByPage',
          params:{current:this.current,size:this.size}
        }).then(data=>{
          if(data.data.code==200){
            this.orderList=data.data.page.records
            this.current=data.data.page.current
            this.size=data.data.page.size
            this.total=data.data.page.total
            this.pages=data.data.page.pages
          }else{
            this.$message.error(data.data.msg)
          }
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      generatorSource () {

      },
      handleIndexChange (pagination) {
        this.current = pagination
        this.getOrderByPage()
      },
    },
    created () {
      this.getOrderByPage()
    }
  }
</script>

<style scoped>

</style>
