<template>
  <div class="home">
    <section class="f-left hero w-100pct bg-cl-white">
      <div class="f-left bg-cl-light is-fullwidth h-1px"></div>
      <div class="dp-flex jtf-ct-center al-it-center f-drt-column h-100vh w-100pct">
        <div class="w-300px pd-10px t-al-center bd-cl-light bd-w-2px bd-st-solid h-1000px">
          <div id="myQr" class="pd-vtc-20px"></div>
          <div class="h-50px w-100pct pd-vtc-10px pd-hrzt-10px bd-cl-light bd-w-1px bd-st-solid bd-rd-3px shadow dp-flex jtf-ct-space-between al-it-center t-w-500 ovf-y-hidden">
              <img src="@/assets/somc.png" width="30px" height="30px" />
              Current Balance: {{currentBalance}} SOMC
          </div>
          <div class="h-50px w-100pct pd-vtc-10px pd-hrzt-10px bd-cl-light bd-w-1px bd-st-solid bd-rd-3px shadow dp-flex jtf-ct-space-between al-it-center t-w-500 ovf-y-hidden mg-vtc-30px">
              <img src="@/assets/logo.png" width="30px" height="30px" />
              Current Balance: {{currentBalance}} ETH
          </div>
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
      currentBalance: ''
    }
  },
  async mounted () {
    this.accountAddress = await this.$web3.eth.getAccounts()
    this.accountAddress = this.accountAddress[0]
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
  height: 450px;
}
</style>
