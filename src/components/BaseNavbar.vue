<template>
  <div class="f-left w-100pct">
    <div class="f-left">
      <a class="navbar-item" href="/">
        <img alt="Vue logo" src="@/assets/logo.png">
        <h1 class="title cl-white">Somchoic</h1>
      </a>
    </div>
    <div class="f-right">
      ss
    </div>
  </div>
</template>

<script>
import bn from '@/utils/bn'

export default {
  name: 'BaseNavbar',
  data () {
    return {
      userAddr: '',
      somcTokenBalance: 0
    }
  },
  methods: {
    async getTokenBalnce () {
      const tokenBalance = await this.$contract.methods.balanceOf(this.userAddr).call()
      this.somcTokenBalance = bn.toHumanNumber(tokenBalance)
    }
  },
  async mounted () {
    const accounts = await this.$web3.eth.getAccounts()
    this.userAddr = accounts[0]
    await this.getTokenBalnce()
  }
}
</script>

<style scoped>

</style>
