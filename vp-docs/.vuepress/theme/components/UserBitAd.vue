<template>
<div>
  <div class="box">
    <div class="ad-box">
      Do you have a UX team? I Would really appreciate their feedback on my new product - <a target="_blank" rel="noopener noreferrer" href="https://userbitapp.com">UserBit</a>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'UserBitAd',
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
.box{
  position: relative;
  height: 55px;
  border: 1px solid blue;
  .ad-box{
    padding: 1rem;
    background: #f3f4f7;
    position: absolute;
    top: 100%;
    color: #545557;
    width: 100%;
    text-align: center;
    a{
      font-weight: bold;
    }
  }
}
</style>
