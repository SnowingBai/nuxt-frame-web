<template>
  <div class="login-wrap">
    <div class="name">
      Nuxt Frame Web
    </div>
    <div class="abs">
      注册好帮手
    </div>

    <div class="login-panel">
      <div class="accout-mode">
        <el-tabs v-model="activeName">
          <el-tab-pane label="账户密码登录" name="account">
            <el-form ref="account-form" :model="accoutForm">
              <el-form-item></el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="手机号登录" name="mobile">
            手机号登录
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
      activeName: 'account'
    }
  }
}
</script>

<style></style>
