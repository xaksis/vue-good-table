<template>
  <Layout>
    <Banner slot="sidebar-top"/>
  </Layout>
</template>

<script>
import Layout from '@default-theme/Layout.vue'
import Banner from './Banner.vue'
export default {
  components: {
    Layout,
    Banner
  }
}
</script>