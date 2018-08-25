<template>
  <div class="f-left w-100pct pd-15px nav-container">
    <div class="f-left w-20pct">
      <img class="f-left" src="@/assets/logo.png" width="30px" height="30px">
    </div>
    <div class="f-left w-60pct t-al-center pd-t-5px">
      <a v-clipboard:copy="userAddr" v-clipboard:success="onCopy">{{ userAddr }}</a>
    </div>
    <div class="f-left w-20pct t-al-right cs-pointer" @click="openEtherScan">
      <b-icon icon="open-in-new" type="is-primary"></b-icon>
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
    },
    onCopy () {
      this.$toast.open({
        message: 'Copied !',
        type: 'is-success'
      })
    },
    openEtherScan () {
      const url = `https://kovan.etherscan.io/address/${this.userAddr}`
      const win = window.open(url, '_blank')
      win.focus()
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
.nav-container {
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>
