<template>
  <Layout>
    <carbon-ads slot="sidebar-top"/>
    <userbit-ad slot="page-top"/>
  </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'
import CarbonAds from './CarbonAds.vue'
import UserbitAd from './UserBitAd.vue';
export default {
  components: {
    Layout,
    'carbon-ads': CarbonAds,
    UserbitAd,
  }
}
</script>