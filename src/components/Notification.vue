<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Notification',
  computed: {
    ...mapGetters([ 'getMessagePool' ]),
  },
  watch: {
    getMessagePool: 'showNotification',
  },
  methods: {
    showNotification({
      variant,
      msg,
      title,
    }) {
      this.$bvToast.toast(msg, {
        title,
        variant,
        solid: true,
      });
    },
  },
};
</script>

<style scoped>

</style>