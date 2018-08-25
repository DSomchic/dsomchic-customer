<template>
  <div class="f-left w-100pct pd-20px">
    <div class="f-left w-100pct title">
      Redeem
    </div>
    <div class="f-left w-100pct pd-10px">
      <div class="f-left w-100pct">
        <div class="f-left w-100pct shadow pd-10px bd-rd-4px">
          <div class="f-left mg-r-10px">
            <img v-if="fromToken.code === 'ETH'" src="../assets/eth.png" width="50px">
            <img v-if="fromToken.code === 'SOMC'" src="../assets/somc.png" width="50px">
          </div>
          <div class="f-left">
            <div class="f-w-bold">{{ fromToken.name }}</div>
            <div class="f-w-bold">{{ fromToken.balance }} {{ fromToken.code }}</div>
          </div>
        </div>
      </div>
      <div class="f-left w-100pct mg-t-10px">
        <b-input placeholder="Amount" v-model="inputFrom"></b-input>
      </div>
      <div class="f-left w-100pct pd-20px t-al-center">
        <img src="../assets/swap.png" width="50px">
      </div>
      <div class="f-left w-100pct mg-t-10px">
        <b-field label="To Store Address">
          <b-input placeholder="0x1234...56789"  v-model="inputToAddr"></b-input>
        </b-field>
        <div class="f-left w-100pct" v-if="detectCipherQRScaner()">
          <div class="button f-left w-100pct" @click="scanQr()">
            <b-icon icon="qrcode-scan" class="mg-r-10px"></b-icon> Scan QR Code
          </div>
        </div>
      </div>
    </div>
    <div class="f-left w-100pct pd-10px mg-t-50px">
      <div class="button is-primary f-left w-100pct h-50px f-s-21px" @click="redeem()">Redeem</div>
    </div>
    <b-modal :active.sync="isModalActive">
      <div class="f-left w-100pct t-al-center bg-cl-white pd-30px bd-rd-4px" v-if="stateOfModal === 'hash'">
        <div class="f-left w-100pct">
          <a @click="openEtherScan" class="text-overflow">
            Transaction hash : {{ txHash }} <b-icon icon="open-in-new" type="is-primary"></b-icon>
          </a>
        </div>
        <div class="f-left w-100pct mg-t-20px">
          <VueElementLoading :active="true" spinner="line-scale" color="#7957d5"/>
        </div>
      </div>
      <div class="f-left w-100pct t-al-center bg-cl-white pd-30px bd-rd-4px" v-if="stateOfModal === 'confirmed'">
        <div class="f-left w-100pct title t-al-center cl-success">
          Success !
        </div>
        <div class="f-left w-100pct">
          <a @click="openEtherScan" class="text-overflow">
            Transaction hash : {{ txHash }} <b-icon icon="open-in-new" type="is-primary"></b-icon>
          </a>
        </div>
      </div>
      <div class="f-left w-100pct t-al-center bg-cl-white pd-30px bd-rd-4px" v-if="stateOfModal === 'error'">
        <div class="f-left w-100pct title t-al-center cl-danger">
          Error !
        </div>
        <div class="f-left w-100pct">
          <a @click="openEtherScan" class="text-overflow">
            Transaction hash : {{ txHash }} <b-icon icon="open-in-new" type="is-primary"></b-icon>
          </a>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import bn from '@/utils/bn'

export default {
  name: 'Transfer',
  data () {
    return {
      fromToken: {
        name: 'SOMC',
        code: 'SOMC',
        balance: 0
      },
      inputFrom: 0,
      inputToAddr: '',
      userAddr: '',
      isModalActive: false,
      stateOfModal: '',
      txHash: ''
    }
  },
  async created () {
    await this.getUserAddr()
    await this.getTokenBalance()
  },
  methods: {
    detectCipherQRScaner () {
      const isCipher = !!window.__CIPHER__
      const canScanQRCode = !!(
        window.web3 &&
        window.web3.currentProvider &&
        window.web3.currentProvider.scanQRCode
      )
      return isCipher && canScanQRCode
    },
    async scanQr () {
      const data = await window.web3.currentProvider.scanQRCode()
      this.inputToAddr = data
    },
    async getUserAddr () {
      const address = await this.$web3.eth.getAccounts()
      this.userAddr = address[0]
    },
    async getTokenBalance () {
      const balance = await this.$contract.methods.balanceOf(this.userAddr).call()
      this.fromToken.balance = bn.toHumanNumber(balance)
    },
    async redeem () {
      if (this.inputToAddr && this.inputFrom) {
        if (parseFloat(this.inputFrom) <= this.fromToken.balance) {
          const amount = bn.toWie(this.inputFrom, 18)
          await this.$contract.methods.transfer(this.inputToAddr, amount).send({
            from: this.userAddr,
            gasPrice: 5000000000,
            gas: 200000
          }).on('transactionHash', (hash) => {
            this.isModalActive = true
            this.txHash = hash
            this.stateOfModal = 'hash'
          }).on('confirmation', async (confirmationNumber, receipt) => {
            if (confirmationNumber === 1) {
              this.stateOfModal = 'confirmed'
              await this.getTokenBalance()
            }
          }).on('error', (error) => {
            this.stateOfModal = 'error'
            console.log(error)
          })
        } else {
          this.$toast.open({
            message: `นั้นแแน่ ๆๆๆๆๆ ! ใส่จำนวนให้ถูกสิ !`,
            type: 'is-danger'
          })
        }
      }
    },
    openEtherScan () {
      const url = `https://kovan.etherscan.io/tx/${this.txHash}`
      const win = window.open(url, '_blank')
      win.focus()
    }
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
.text-overflow {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden !important;
  text-overflow: ellipsis;
}
</style>
