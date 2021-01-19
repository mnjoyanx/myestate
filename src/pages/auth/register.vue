<template>
  <div id="register_page" class="header">
    <div id="auth_page_socials" class="auth_page_section">
      <div class="btn_social btn_google">
          <img src="@/assets/images/icons/google.svg" class="px-2" alt="">
          <span>GOOGLE</span>
      </div>
      <div class="btn_social btn_facebook">
        <img src="@/assets/images/icons/facebook.svg" alt="" class="px-2">
        <span>FACEBOOK</span>
      </div>
    </div>
    <div id="auth_page_or">
      <hr><span>{{ $t('or_text') }}</span><hr>
    </div>
    <div id="auth_form">
      <form action="" method="post" @submit.prevent="submitForm">
        <div class="auth_form_scroll">
          <div class="auth_form_fields">
            <small class="invalid_input_message"></small>
            <input :class="[ form.fullName === '' ? 'input' : 'input_active']" v-model.trim="form.fullName" type="text" name="fullName" :placeholder="$t('full_name_text')">
            <select :class="[  form.userType === '' ? 'input' : 'input_active']" name="user_type" v-model.trim="form.userType">
              <option value="" disabled selected hidden>{{ $t('user_type_text') }}</option>
              <option v-for="type in userTypes" :key="type.id" :value="type.id">{{ type.name }}</option>
            </select>
            <input :class="[ form.email === '' ? 'input' : 'input_active', (($v.form.email.$dirty && !$v.form.email.email) || backendErrors.validation.email) ? 'invalid_input' : '' ]" v-model.trim="$v.form.email.$model" type="text" name="email" :placeholder="$t('email_text')">
            <small class="invalid_input_message" v-if="$v.form.email.$dirty && !$v.form.email.email">{{ $t('error_invalid_email_text') }}</small>
            <small class="invalid_input_message" v-else-if="backendErrors.validation.email">{{ backendErrors.validation.email[0] }}</small>
            <div class="input_password">
              <input :class="[  form.password === '' ? 'input' : 'input_active', ($v.form.password.$dirty && !$v.form.password.minLength) ? 'invalid_input' : ''  ]" v-model.trim="$v.form.password.$model" :type="[passwordVisibility ? 'text' : 'password']" name="password" :placeholder="$t('password_text')">
              <div v-if="form.password !== ''" class="input_password_icon">
                <img @click="changePasswordVisibility(1)" v-if="passwordVisibility" src="@/assets/images/icons/eye.svg" alt="">
                <img @click="changePasswordVisibility(1)" v-else src="@/assets/images/icons/noeye.svg" alt="">
              </div>
            </div>
            <small class="invalid_input_message" v-if="$v.form.password.$dirty && !$v.form.password.minLength">{{ $t('error_minlength_password_text') }}</small>
            <div class="input_password">
              <input :class="[  form.repeatPassword === '' ? 'input' : 'input_active', ($v.form.repeatPassword.$dirty && !$v.form.repeatPassword.sameAsPassword) ? 'invalid_input' : ''  ]" v-model.trim="$v.form.repeatPassword.$model" :type="[repeatPasswordVisibility ? 'text' : 'password']" name="repeat_password" :placeholder="$t('repeat_password_text')">
              <div v-if="form.repeatPassword !== ''" class="input_password_icon">
                <img @click="changePasswordVisibility(2)" v-if="repeatPasswordVisibility" src="@/assets/images/icons/eye.svg" alt="">
                <img @click="changePasswordVisibility(2)" v-else src="@/assets/images/icons/noeye.svg" alt="">
              </div>
            </div>
            <small class="invalid_input_message" v-if="$v.form.repeatPassword.$dirty && !$v.form.repeatPassword.sameAsPassword">{{ $t('error_diff_passwords_text') }}</small>
            <div style="margin-bottom: 16px">
              <input type="checkbox" name="agree_terms" v-model="form.agreeTerms">
              <span style="margin-left: 16px">{{ $t('agree_text') }}</span>
            </div>
            <div class="register_page_recaptcha">
              <VueRecaptcha v-model="recaptcha.noRobot" @childToParent="recaptchaVerify" :load-recaptcha-script="true" />
            </div>
          </div>
        </div>
        <div class="auth_page_hr"><hr></div>
        <div id="auth_page_submit" class="auth_page_section">
          <button :class="[{ btn_disabled : (!isFilled || $v.$anyError) },'btn btn_md']" :disabled="(!isFilled || $v.$anyError)" type="submit"><span>{{ $t('register_title') }}</span></button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import VueRecaptcha from '@/components/recaptcha'
import { email , minLength, sameAs } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'
import gql from 'graphql-tag'

export default {
  name: "register",

  data: function() {
    return {

      form: {
        fullName: '',
        userType: '',
        email: '',
        password: '',
        repeatPassword: '',
        agreeTerms: false
      },

      userTypes: {
        
      },
      backendErrors: {
        validation: {},
        internal: {}
      },
      isFilled : false,

      recaptcha: {
        noRobot: false,
        token: ''
      },

      passwordVisibility: false,
      repeatPasswordVisibility: false,
      system_type: "web"
    }
  },
  computed: mapGetters({
    locale: 'lang/locale',
  }),


  validations: {
    form: {
      email: { email },
      password: { minLength:minLength(8) },
      repeatPassword: { sameAsPassword: sameAs('password') },
      agreeTerms: { checked: v => v }
    }
  },

  apollo: {
    userTypes: {
      variables() {
        return {
          language: this.locale
        }
      },
      query: gql`query ($language: String!) {
         userTypes(language: $language) {
              id
              name
         }
      }`,

      result (data) {
        this.userTypes = data.data.userTypes
      }
    }
  },

  methods: {
    ifFilled: function() {
      this.isFilled = (
          this.form.fullName !== "" &&
          this.form.userType !== "" &&
          this.form.password !== "" &&
          this.form.email !== "" &&
          this.form.repeatPassword !== "" &&
          this.form.agreeTerms === true &&
          this.recaptcha.noRobot === true
      );
    },
    recaptchaVerify: function(token) {
      this.recaptcha.token = token
      this.recaptcha.noRobot = true
      // alert(this.recaptcha.secretKey)
    },
    changePasswordVisibility: function(number) {
      switch(number) {
        case 1:
          this.passwordVisibility = !this.passwordVisibility;
        break;
        case 2:
          this.repeatPasswordVisibility = !this.repeatPasswordVisibility;
        break;
      }
    },
    registerUser: function(form) {
      this.$apollo.mutate({
        mutation: gql`mutation ($form: RegisterInput!) {
        registerUser(input: $form) {
          status
        }
      }`,
        variables: {
          form: {
            full_name: form.fullName,
            email: form.email,
            user_type_id: form.userType,
            password: form.password,
            password_confirmation: form.repeatPassword,
            email_verification_url: process.env.VUE_APP_URL+'/email/verify',
            system_type: this.system_type,
            recaptcha: this.recaptcha.token,
            language: this.locale
          },
        },
      }).then((data) => {
        alert('success')
        console.log(data)
      }).catch((error) => {
        alert('error')
        error = error.graphQLErrors[0].extensions;
        console.log(error)
        let errorCategory = error.category;
        switch(errorCategory) {
          case "validation":
            this.backendErrors.validation = error.validation;
          break;
          case "internal":
            this.backendErrors.internal = error;
        }
      })
    },

    submitForm: function() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return;
      }
      alert('submit Form')
      this.registerUser(this.form)
    }
  },

  components: {
    VueRecaptcha
  },

  watch: {
    'form.fullName' : function() { this.ifFilled() },
    'form.userType' : function() { this.ifFilled() },
    'form.email' : function() { this.ifFilled() },
    'form.password' : function() { this.ifFilled() },
    'form.repeatPassword' : function() { this.ifFilled() },
    'form.agreeTerms' : function() { this.ifFilled() },
    'recaptcha.noRobot' : function() { this.ifFilled() },
  },
  beforeCreate() {
    console.log('%c component: components/register.vue BEFORE CREATE ', 'background: green; color: white');
  },
  mounted() {
    console.log('%c component: components/register MOUNTED ', 'background: green; color: white');
    console.log('locale from vuex', this.locale)
  }
}
</script>

<style scoped>
  .auth_form_fields div {
    max-height: 300px;
  }

  ::-webkit-scrollbar {
    width: 20px;
    height: 0;
  }
  ::-webkit-scrollbar-thumb {
    height: 1em;
    border: 0.5em solid rgba(0, 0, 0, 0);
    background-clip: padding-box;
    background-color: #04a777;
  }
  ::-webkit-scrollbar-button {
    width: 0;
    height: 0;
    display: none;
  }

  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }

  .register_page_recaptcha {
    margin-bottom: 24px;
    display: flex;
    justify-content: flex-start;
  }
</style>