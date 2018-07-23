<template>
<div>
  <h4>You might also like</h4>
  <div class="features">
    <div class="feature">
      <h2><a href="https://github.com/xaksis/vue-good-wizard">vue-good-wizard</a></h2>
      <p>An easy to use and clean VueJS step wizard plugin.</p>
    </div>
    <div class="feature">
      <h2><a href="https://github.com/xaksis/vue-good-links">vue-good-links</a></h2>
      <p>A light, expandable link and text hover effect library for VueJS.</p>
    </div>
    <div class="feature">
      <h2><a href="https://timerbit.com">TimerBit</a></h2>
      <p>Track time spent on projects &amp; tasks using reliable cloud-based timers.</p>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'other-projects',
  props: [],
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
  },
  mounted() {
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
.features{
  border-top: 0px;
  margin-top: 0px;
  background-color: #f3f6f8;
  padding: 0px 16px;
}
</style>
