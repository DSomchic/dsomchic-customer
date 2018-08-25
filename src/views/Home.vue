<template>
  <div class="home">
    <section class="hero is-fullheight bg-cl-black">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-4 is-offset-4">
            <div class="box">
              <form>
                <div class="field">
                    <div class="control">
                      <label class="label">Address of receiver</label>
                      <input class="input is-large" type="email" placeholder="Enter address" autofocus="">
                    </div>
                </div>
                <div class="field">
                    <div class="control">
                      <label class="label">Amount to transfer</label>
                      <input class="input is-large" type="password" placeholder="Enter amount to transfer">
                    </div>
                </div>
                <button class="button is-block is-info is-large is-fullwidth">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import bigNumber from '@/utils/bn'

export default {
  name: 'home',
  data () {
    return {
      accountAddress: ''
    }
  },
  async mounted () {
    this.getTokenBalance()
    this.accountAddress = await this.$web3.eth.getAccounts()
  },
  methods: {
    async getTokenBalance () {
      let address = await this.$web3.eth.getAccounts()
      console.log(address[0])
      console.log(this.$web3)
      let currentBalance = bigNumber.toHumanNumber(await this.$contract.methods.balanceOf(address[0]).call())
      console.log('call', currentBalance)
    }
  }
}
</script>

<style scoped>
.container {
  height: 80vh;
}
</style>
