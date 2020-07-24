<template>
  <div class="login-wrap text-center">
    <div class="name">
      Nuxt Frame Web
    </div>
    <div class="abs">
      注册好帮手
    </div>

    <div class="login-panel">
      <div class="account-mode">
        <el-tabs v-model="activeName">
          <el-tab-pane label="账户密码登录" name="account">
            <el-form
              ref="accountForm"
              :model="accountForm"
              :rules="accountRules"
            >
              <el-form-item prop="account">
                <el-input
                  v-model="accountForm.account"
                  placeholder="请输入账号"
                >
                  <i slot="prefix" class="iconfont icon-wode" />
                </el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input v-model="accountForm.pwd" placeholder="请输入密码">
                  <i slot="prefix" class="iconfont icon-querenmima" />
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="long"
                  type="primary"
                  :loading="loading"
                  @click="submitForm('accountForm')"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="mobile">
            <el-form ref="mobileForm" :model="mobileForm" :rules="mobileRules">
              <el-form-item prop="mobile">
                <el-input
                  v-model="mobileForm.mobile"
                  placeholder="请输入手机号"
                >
                  <i slot="prefix" class="iconfont icon-shoujihao" />
                </el-input>
              </el-form-item>
              <el-form-item prop="pwd">
                <el-input v-model="mobileForm.pwd" placeholder="请输入验证码">
                  <i slot="prefix" class="iconfont icon-yanzhengma" />
                  <el-button
                    slot="append"
                    :disabled="capchaTimer > 0"
                    @click="getCapcha(60)"
                  >
                    {{ capchaTxt }}
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button
                  class="long"
                  type="primary"
                  :loading="loading"
                  @click="submitForm('mobileForm')"
                >
                  登录
                </el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 手机号、账号登录 E -->
      <div class="qr-mode"></div>
      <!-- 二维码登录 E -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'account',
      accountForm: {
        account: '',
        pwd: ''
      },
      mobileForm: {
        mobile: '',
        pwd: ''
      },
      loading: false,
      capchaTimer: 0 // 获取验证码计时器
    }
  },
  computed: {
    accountRules() {
      return {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    },
    mobileRules() {
      return {
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    },
    capchaTxt() {
      if (this.capchaTimer > 0) {
        return `已发送（${this.capchaTimer}s）`
      } else {
        return '获取验证码'
      }
    }
  },
  methods: {
    // 获取验证码
    getCapcha(time) {
      this.$refs.mobileForm.validateField('mobile', errorMessage => {
        if (errorMessage) {
          return false
        }

        this.capchaTimer = time
        const timer = setInterval(() => {
          if (this.capchaTimer < 1) {
            clearInterval(timer)
          }

          this.capchaTimer--
        }, 1000)
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (!valid) {
          return false
        }

        this.$api.user
          .login({
            ...this[formName]
          })
          .then(res => {
            console.log(res)
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-wrap {
  padding-top: 120px;
  .name {
    font-size: 30px;
  }
  .abs {
    margin: 20px 0;
    font-size: 16px;
    position: relative;
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 11px;
      width: 100px;
      height: 1px;
      border-top: 1px solid $main-color;
    }
    &::before {
      margin-left: -110px;
    }
    &::after {
      margin-left: 10px;
    }
  }
  .login-panel {
    width: 400px;
    margin: 0 auto;
    .iconfont {
      line-height: 40px;
      font-size: 18px;
    }
  }
}
</style>
