<template>
  <transition name="ma">
<!--    <div id="user_actions_mobile" v-if="visibility">-->
      <user-actions :isMobile="true" v-if="visibility"></user-actions>
<!--    </div>-->
  </transition>
</template>

<script>

import userActions from "@/components/user-actions"

export default {
  name: "menu-mobile",
  props: {
    visibility: Boolean
  },
  components: {
    userActions
  }
}
</script>

<style scoped>
  .ma-enter-active {
    animation: 0.5s ma-show forwards;
  }

  .ma-leave-active {
    animation: 0.5s ma-hide forwards;
  }
  
  @keyframes ma-show {
    from {right: -40%;}
    to {right: 0%;}
  }

  @keyframes ma-hide {
    from {right: 0%;}
    to {right: -40%;}
  }



</style>