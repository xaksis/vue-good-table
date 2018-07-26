<template>
  <Layout>
    <carbon-ads slot="sidebar-top"/>
  </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'
import CarbonAds from './CarbonAds.vue'
export default {
  components: {
    Layout,
    'carbon-ads': CarbonAds,
  }
}
</script>