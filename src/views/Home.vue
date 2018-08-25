<template>
  <div class="home">
    <section class="f-left hero w-100pct bg-cl-white">
      <div class="f-left bg-cl-light is-fullwidth h-1px"></div>
      <div class="dp-flex jtf-ct-center al-it-center f-drt-column h-100vh w-100pct">
        <div class="w-300px pd-10px t-al-center bd-cl-light bd-w-2px bd-st-solid h-1000px">
          <div id="myQr" class="pd-vtc-20px"></div>
          <div class="h-60px w-100pct pd-vtc-10px pd-hrzt-10px bd-cl-light bd-w-1px bd-st-solid bd-rd-3px shadow dp-flex jtf-ct-start al-it-center f-w-bold ovf-y-hidden">
              <img src="@/assets/somc.png" width="30px" height="30px" />
              <div class=" t-al-left pd-hrzt-15px">
                <div class="f-left w-100pct">
                  SOMC
                </div>
                <div class="f-left w-100pct">
                  {{currentBalance}} SOMC
                </div>
              </div>
          </div>
          <div class="h-60px w-100pct pd-vtc-10px pd-hrzt-10px bd-cl-light bd-w-1px bd-st-solid bd-rd-3px shadow dp-flex jtf-ct-start al-it-center f-w-bold ovf-y-hidden mg-vtc-15px">
              <img src="@/assets/eth.png" width="30px" height="30px" />
              <div class=" t-al-left pd-hrzt-15px">
                <div class="f-left w-100pct">
                  Ethereum
                </div>
                <div class="f-left w-100pct">
                  {{ethBalance}} ETH
                </div>
              </div>
          </div>
          <button class="h-50px w-100pct pd-vtc-10px pd-hrzt-10px bd-cl-success bd-w-1px bd-st-solid bd-rd-3px shadow dp-flex jtf-ct-center al-it-center f-w-bold ovf-y-hidden mg-bt-30px cl-white bg-cl-success  f-s-18px" @click="gotoTranferPage">
              Redeem
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import bigNumber from '@/utils/bn'
import qrcode from 'qrcode-generator'

export default {
  name: 'home',
  data () {
    return {
      accountAddress: '',
      currentBalance: '',
      ethBalance: ''
    }
  },
  async mounted () {
    this.accountAddress = await this.$web3.eth.getAccounts()
    this.accountAddress = this.accountAddress[0]
    this.ethBalance = bigNumber.toHumanNumber(await this.$web3.eth.getBalance(this.accountAddress))
    this.getTokenBalance()
  },
  methods: {
    async getTokenBalance () {
      this.currentBalance = bigNumber.toHumanNumber(await this.$contract.methods.balanceOf(this.accountAddress).call())
      console.log('call', this.currentBalance)
      let typeNumber = 4
      let errorCorrectionLevel = 'L'
      let qr = qrcode(typeNumber, errorCorrectionLevel)
      qr.addData(this.accountAddress)
      qr.make()
      document.getElementById('myQr').innerHTML = qr.createSvgTag(7, 0)
    },
    gotoTranferPage () {
      this.$router.push({name: 'Transfer'})
    }
  }
}
</script>

<style scoped>
.container {
  height: 80vh;
}
.shadow {
  box-shadow: 1px 2px 2px 1px rgba(0, 0, 0, 0.25);
}
.boxsizeing {
  box-sizing: border-box;
}
.h-1000px {
  height: 500px;
}
</style>
