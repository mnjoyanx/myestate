<template>
  <div>
    <VueRecaptcha :sitekey="sitekey" :loadRecaptchaScript="loadRecaptchaScript" @verify="verify" :language="this.locale.code">
    </VueRecaptcha>
  </div>

</template>

<script>
import VueRecaptcha from 'vue-recaptcha';
import { mapGetters } from 'vuex'

export default {
  name: "recaptcha",
  data: function() {
    return {
      sitekey: "6LfUG88ZAAAAAMCfFakj0GJqz-3dpi-a8h4rCfpe",
      secretKey: "6LfUG88ZAAAAANZroksBgRyufM49HHJ2T_h5ZlmA"
    }
  },
  props: {
    loadRecaptchaScript: Boolean
  },
  computed: mapGetters ({
    locale: 'lang/locale'
  }),
  components: {
    VueRecaptcha
  },
  methods: {
    verify: function(token) {
      this.$emit('childToParent',token)
    }
  },
  watch: {

  },
}
</script>

<style scoped>

</style>