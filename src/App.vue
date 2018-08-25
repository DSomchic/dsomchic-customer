<template>
  <div id="app">
    <base-navbar class="f-left w-100pct mg-bt-4px"></base-navbar>
    <router-view class="f-left w-100pct"/>
  </div>
</template>

<script>
import BaseNavbar from '@/components/BaseNavbar.vue'
export default {
  components: { BaseNavbar }
}
</script>
