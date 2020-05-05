<template>
  <div id="login">
    <div>
      <div class="main">
        <div class="pic">
          <div class="centerPic"></div>
          <div class="centerAnimation"></div>
          <div class="icon_1"></div>
          <div class="icon_2"></div>
          <div class="icon_3"></div>
          <div class="icon_4"></div>
          <div class="icon_5"></div>
          <div class="aircraft">
            <i></i>
          </div>
        </div>
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" inline>
          <h3>欢迎登录中汇优品管理后台</h3>
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              prefix-icon="el-icon-user"
              type="text"
              maxlength="16"
              placeholder="管理账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              prefix-icon="el-icon-lock"
              type="password"
              maxlength="16"
              placeholder="管理密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="code">
            <el-row>
              <el-col :span="12">
                <el-input
                  v-model.trim="loginForm.code"
                  type="text"
                  placeholder="验证码"
                  maxlength="4"
                  @keydown.enter.native="login"
                ></el-input>
              </el-col>
              <el-col :span="11" :offset="1">
                <img :src="url" @click="getCode" height="30px" style="cursor: pointer;" alt="验证码"/>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click.native.prevent="handleLogin" class="btn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Login',
    data() {
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('管理员密码长度应大于6'))
        } else {
          callback()
        }
      }
      return {
        loginForm: {
          // username: 'admin123',
          // password: 'admin123',
          username: '',
          password: '',
          code: ''
        },
        loginRules: {
          username: [{ required: true, message: '管理员账户不允许为空', trigger: 'blur' }],
          password: [
            { required: true, message: '管理员密码不允许为空', trigger: 'blur' },
            { validator: validatePassword, trigger: 'blur' }
          ],
          code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
        },
        passwordType: 'password',
        loading: false,
        url: ''
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }

    },
    mounted() {
      this.getCode()
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid && !this.loading) {
            this.loading = true
            this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: this.redirect || '/' })
            }).catch(response => {
              this.$notify.error({
                title: '失败',
                message: response.data.errmsg
              })
              this.loading = false
            })
          } else {
            return false
          }
        })
      },

      // 获取验证码操作
      getCode() {
        this.url = this.$api + '/validate/code?' + Math.random()
      }
    }
  }
</script>
