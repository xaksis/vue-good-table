<template>
  <ParentLayout>
    <carbon-ads slot="sidebar-top"/>
    <userbit-ad slot="page-top"/>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import CarbonAds from '@theme/components/CarbonAds.vue'
import Banner from '@theme/components/Banner.vue'
import UserBitAd from '@theme/components/UserBitAd.vue'
export default {
  components: {
    ParentLayout,
    CarbonAds,
    Banner,
    UserBitAd,
  }
}
</script>