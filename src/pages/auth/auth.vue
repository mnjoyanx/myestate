<template>
  <div id="auth_page">
    <div id="auth_page_tabs">
      <div :class="[{ auth_page_tab_active : is_login_tab },'btn auth_page_tab']" @click="changeTab(true)">
      <router-link :to="{ name: 'login' }">
        <div>
        <span>{{ $t('login_title') }}</span>
        </div>
        </router-link>
        </div>
        <div :class="[{ auth_page_tab_active : !is_login_tab },'btn auth_page_tab']" @click="changeTab(false)">
      <router-link :to="{ name: 'register' }">
        <div>
       <span>{{ $t('register_title') }}</span>
        </div>
       </router-link>
        </div>
    </div>
    <router-view />
  </div>
</template>
<script>

export default {
  name: "auth",
  data: function() {
    return {
      is_login_tab : true
    }
  },
  methods : {
    changeTab : function(to) {
      this.is_login_tab = !!(to)
    },
    getTab : function() {
      switch (this.$route.name) {
        case "register":
          this.is_login_tab = false
          break;
        case "login":
          this.is_login_tab = true
          break;
      }
    }
  },
  mounted() {
    this.getTab()
  }

}
</script>

<style>
  #auth_page {
    width: 100%;
    max-width: 670px;
    min-width: 300px;
    margin: 50px auto;
    border: 1px solid rgba(112, 112, 112, 0.5);
    border-radius: 5px;
    box-shadow: 0 1px 6px 0 rgba(1, 3, 2, 0.16);
    background-color: white;
    max-height: 600px;
    position: absolute;
    /*top: 100px;*/
    top: 100px;
    left: 50%;
    /* bring your own prefixes */
    transform: translate(-50%);
  }

  .auth_page_section {
    margin: 0 11%;
    width: 77%;
    min-width: 300px;
  }

  #auth_page_socials {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 25px;
  }

  #auth_page_socials div:first-child {
    margin-right: 16px;
  }

  #auth_page_tabs {
    display: flex;
    margin-bottom: 34px;
  }

  .auth_page_tab {
    text-align: center;
    height: 56px;
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth_page_tab span {
    opacity: 0.36;
    color: #010302;
  }

  .auth_page_tab_active {
    padding-top: 4px;
    border-bottom: 4px solid #04a777;;
  }

  .auth_page_tab div, .auth_page_tab_active div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .auth_page_tab a, .auth_page_tab_active a {
    width: 100%;
    height: 100%;
  }

  .auth_page_tab span, .auth_page_tab_active span {
    font-weight: 600;
  }

  .auth_page_tab_active span {
    opacity: 1;
    color: #04a777;
  }

  #auth_page_or {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #auth_page_or hr {
    width: 45%;
  }

  #auth_page_or span {
    opacity: 0.36;
    color: #010302;
    font-weight: 600;
  }

  #auth_form input, #auth_form select{
    margin-top: 16px;
  }

  #auth_form form{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  #auth_page_submit {
    display: flex;
    justify-content: center;
    margin-top: 25px;
    margin-bottom: 16px;
  }

  .auth_page_hr {

  }

  .auth_form_scroll {
    overflow-y: scroll;
    width: 100%;
    max-height: 300px;
  }

  .auth_form_fields {
    width: 80%;
    min-width: 300px;
    /*margin: 0 auto;*/
    margin: 0 11%;
  }

</style>