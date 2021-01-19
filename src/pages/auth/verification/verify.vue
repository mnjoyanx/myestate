<template>
  <div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

export default {
  name: "verify",
  data: function() {
    return {
      token: this.$route.query.token
    }
  },
  computed: mapGetters({
    locale: 'lang/locale',
  }),
  methods: {
    verifyEmail: function() {
      this.$apollo.mutate({
        mutation: gql`mutation ($data: VerifyEmailInput!) {
        verifyEmailUser(input: $data) {
          user {
            email
          }
        }
      }`,
        variables: {
          data: {
            token: this.token,
            language: this.locale
          }
        },
      }).then((data) => {
        let email = data.data.verifyEmailUser.user.email;
        this.$router.push({name:'login',params:{email:email}})
      }).catch((error) => {
        alert('error',error)
        error = error.graphQLErrors[0].extensions;
      })
    }
  },
  mounted() {
    this.verifyEmail()
  }
}
</script>

<style scoped>

</style>