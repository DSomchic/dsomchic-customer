<template>
  <div class="f-left w-100pct pd-20px">
    <div class="f-left w-100pct title">
      Transfer
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
        <b-input placeholder="Amount"></b-input>
      </div>
      <div class="f-left w-100pct pd-20px t-al-center">
        <img src="../assets/swap.png" width="50px" class="cs-pointer" @click="switchToken()">
      </div>
      <div class="f-left w-100pct">
        <div class="f-left w-100pct shadow pd-10px bd-rd-4px">
          <div class="f-left mg-r-10px">
            <img v-if="toToken.code === 'ETH'" src="../assets/eth.png" width="50px">
            <img v-if="toToken.code === 'SOMC'" src="../assets/somc.png" width="50px">
          </div>
          <div class="f-left">
            <div class="f-w-bold">{{ toToken.name }}</div>
            <div class="f-w-bold">{{ toToken.balance }} {{ toToken.code }}</div>
          </div>
        </div>
      </div>
      <div class="f-left w-100pct mg-t-10px">
        <b-input placeholder="Amount" disabled></b-input>
      </div>
    </div>
    <div class="f-left w-100pct pd-10px mg-t-10px">
      <div class="button is-primary f-left w-100pct h-50px f-s-21px">Transfer</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transfer',
  data () {
    return {
      fromToken: {
        name: 'Ethereum',
        code: 'ETH',
        balance: 0
      },
      toToken: {
        name: 'SOMC',
        code: 'SOMC',
        balance: 0
      }
    }
  },
  methods: {
    switchToken () {
      const oldFromToken = this.fromToken
      this.fromToken = this.toToken
      this.toToken = oldFromToken
    }
  }
}
</script>

<style scoped>
.shadow {
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.5);
}
</style>
