<template>
  <div class="user-page">
    <el-card>
      <ul>
        <li>
          <h3 class="name">Flow Account</h3>
          <div class="content">
            <span>{{ address }}</span>
          </div>
        </li>
        <li>
          <h3>Flow Balance</h3>
          <div class="content">
            <span>{{ balance }}</span>
          </div>
        </li>

        <li>
          <h3>Flow合约地址（测试）</h3>
          <div class="content">
            <span>https://flow-view-source.com/testnet/account/0x5e1e16ea71ac90c2</span>
          </div>
        </li>

      </ul>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      address:"0x**",
      balance: 0,
    };
  },
}
</script>

<style scoped>
</style>

