<template>
  <div id="login_page" class="containter header">
    <div id="auth_page_socials" class="auth_page_section">
      <div class="btn_social btn_google">
        <!--        <button class="btn border-secondary p-2 col-12 font-weight-bold">-->
        <img src="@/assets/images/icons/google.svg" class="px-2" alt="">
        <span>GOOGLE</span>
        <!--        </button>-->
      </div>
      <div class="btn_social btn_facebook">
        <!--        <button class="btn p-2 col-12 btn_facebook font-weight-bold text-white">-->
        <img src="@/assets/images/icons/facebook.svg" alt="" class="px-2">
        <span>FACEBOOK</span>
        <!--        </button>-->
      </div>
    </div>
    <div id="auth_page_or">
      <hr><span>{{ $t('or_text') }}</span><hr>
    </div>
    <div id="login_form">
      <form method="post" action="" @submit.prevent="submitForm">
        <div class="login_form_fields">
          <input :class="[ form.email === '' ? 'input' : 'input_active', ($v.form.email.$dirty && !$v.form.email.email) ? 'invalid_input' : '' ]" v-model.trim="$v.form.email.$model" type="text" name="email" :placeholder="$t('email_text')">
          <small class="invalid_input_message" v-if="$v.form.email.$dirty && !$v.form.email.email">{{ $t('error_invalid_email_text') }}</small>
          <div class="input_password">
            <input :class="[  form.password === '' ? 'input' : 'input_active', ($v.form.password.$dirty && !$v.form.password.minLength) ? 'invalid_input' : '' ]" v-model.trim="$v.form.password.$model" :type="[passwordVisibility ? 'text' : 'password']" name="password" :placeholder="$t('password_text')">
            <div v-if="form.password !== ''" class="input_password_icon">
              <img @click="changePasswordVisibility" v-if="passwordVisibility" src="@/assets/images/icons/eye.svg" alt="">
              <img @click="changePasswordVisibility" v-else src="@/assets/images/icons/noeye.svg" alt="">
            </div>
          </div>
          <small class="invalid_input_message" v-if="$v.form.password.$dirty && !$v.form.password.minLength">{{ $t('error_minlength_password_text') }}</small>
          <div style="margin-bottom: 16px"><input type="checkbox" v-model="form.remember"><span style="margin-left: 16px">{{ $t('remember_me') }}</span></div>
        </div>
        <div class="auth_page_hr"><hr></div>
        <div id="auth_page_submit">
          <button :class="[{ btn_disabled : (!isFilled || $v.$anyError) },'btn btn_md']" :disabled="(!isFilled || $v.$anyError)" type="submit"><span>{{ $t('login_text') }}</span></button>
        </div>
      </form>
    </div>
    
    <div class="auth_page_section">
      <div class="forgot_password"><span>{{ $t('forgot_password') }}</span></div>
    </div>
  </div>
</template>

<script>

import { email , minLength } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import gql from "graphql-tag";


export default {
  name: "login",
  data: function() {
    return {

      form: {
        email: (this.$route.params.email) ? this.$route.params.email : '',
        password: '',
        remember: false
      },

      isFilled: false,
      passwordVisibility: false
    }
  },
  computed: mapGetters({
    locale: 'lang/locale',
  }),
  validations: {
    form : {
      email: { email },
      password: { minLength: minLength(8) }
    }
  },
  methods: {
    ifFilled: function() {
      this.isFilled = (this.form.password !== "" && this.form.email !== "");
    },
    changePasswordVisibility: function() {
      this.passwordVisibility = !this.passwordVisibility;
    },
     loginUser:  function(form) {
      this.$apollo.mutate({
        mutation: gql`mutation ($form:  LoginInput!) {
        loginUser(input: $form) {
          access_token
          refresh_token
          expires_in
          token_type
          is_first_time
          user{
            id
            full_name
            picture
            email
            phones {
              id
              number
              user_id
            }
            user_type {
              id
              name
            }
            first_time
          }
        }
      }`,
        variables: {
          form: {
            username: form.email,
            password: form.password,
            language: this.locale
          },
        },
      }).then(async (data) => {
        alert('success')
      this.$store.dispatch('auth/saveToken', {
        token: data.data.loginUser.access_token,
        expires_in: data.data.loginUser.expires_in
      })

      // Fetch the user.
      await this.$store.dispatch('auth/fetchUser', {
          user: data.data.loginUser.user
      })

        this.$router.push('/');
      }).catch((error) => {
        alert('error',error)
        error = error.graphQLErrors[0].extensions;
      })
    },
    submitForm: function() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return;
      }
      alert('submit Form')
      this.loginUser(this.form)
    }
  },
  watch: {
    'form.email' : function() { this.ifFilled() },
    'form.password' : function() { this.ifFilled() }
  },
  mounted() {
  
  }
}
</script>

<style>

  #login_form input, #login_form select{
    margin-top: 16px;
  }

  #login_form form{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .login_form_fields {
    width: 77%;
    min-width: 300px;
    /*margin: 0 auto;*/
    margin: 0 11%;
  }

  .forgot_password{
    text-align: center;
    cursor: pointer;
    margin-bottom: 24px;
  }

  .forgot_password span {
    font-weight: 600;
  }
</style>