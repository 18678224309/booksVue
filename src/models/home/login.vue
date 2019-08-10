<template>
<div style="height: 300px;width: 300px;margin-left: auto;margin-right: auto;">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
</div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, trigger: 'blur' }
        ],
        password: [
          { required: true, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http({
            method: 'get',
            url: this.HOST + '/login',
            params: {username: this.ruleForm.username, password: this.ruleForm.password}
          }).then(data => {
            let val = data.data
            if(val.code==500){
              this.$message.error(val.msg);
            }else if(val.code==200){
                this.GLOBAL.User_=val.user
                this.$router.push({path:'/home'})
            }
          })
        } else {
          this.$message.error('error submit!!');
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  created: function () {

  }
}
</script>

<style>
</style>
