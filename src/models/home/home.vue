<template>
    <div style="height: 900px">
      <el-container style="height: 100%">
        <el-header>Header</el-header>
        <el-container>
          <el-aside width="200px">
            <el-row class="tac">
              <el-col>
                <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  :router=menRouter
                  :unique-opened= opened
                  @open="handleOpen"
                  @close="handleClose">

                  <el-submenu  v-for="(menuTree,index) in listTree"  v-bind:key="menuTree.menu.id" :index="index+''">

                    <template slot="title">
                      <i class="el-icon-location"></i>
                      <span>{{menuTree.menu.name}}</span>
                    </template>

                      <el-menu-item :index="menuTreeC.menu.url" v-if="menuTree.listMenu.length>0"
                                    v-for="(menuTreeC,index1) in menuTree.listMenu"
                                    v-bind:key="menuTreeC.menu.id">
                        {{menuTreeC.menu.name}}
                      </el-menu-item>
                      <!--<el-menu-item index="1-2">选项2</el-menu-item>
                      <el-menu-item index="1-3">选项3</el-menu-item>


                    <el-submenu index="1-4">
                      <template slot="title">选项4</template>
                      <el-menu-item index="1-4-1">选项1</el-menu-item>
                    </el-submenu>-->
                  </el-submenu>


                </el-menu>
              </el-col>
            </el-row>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  export default {
    name: 'home',
    data(){
      return{
        listTree:[],
        opened:true,
        menRouter:true,
        auth:[]
      }
    },
    created: function () {
        this.getMenus();
    },
    methods: {
      handleOpen(key, keyPath) {

      },
      handleClose(key, keyPath) {

      },
      getMenus(){
        this.$http({
          method:'get',
          url:this.HOST+'/manage/sys/menu/getAllMenuByRole',
          params:{pid:0,roleId:this.GLOBAL.User_.user.rid}
        }).then(data=>{
          this.listTree=data.data.roleMenu;
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
