<template>
  <div id="app">
    <navigation @toggleMenu="menuMobileVisibility = $event" />
    <router-view></router-view>
    <menu-mobile :visibility="menuMobileVisibility"></menu-mobile>
  </div>
</template>
<script>
import navigation from "@/components/navigation";
import menuMobile from "@/components/menu-mobile"

export default {
  name: 'App',
  data: function() {
    return {
      menuMobileVisibility: false
    }
  },
  components: {
    navigation,
    menuMobile
  },
  beforeCreate() {
    console.log('%c component: App.vue BEFORE CREATE ', 'background: green; color: white');
  },
  mounted() {
    console.log('%c component: App.vue MOUNTED ', 'background: green; color: white');
    console.log('i18n: ',this.$i18n)
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  a {
    text-decoration: none;
    /*width: 100%;*/
  }

  hr {
    opacity: 0.12;
    border: solid 1px #100f0f;
  }

  li {
    list-style-type: none;
  }

  body {
    background: #fafafa;
    font-family: system-ui;
    position: relative;
  }

  :focus {
    outline: none;
  }

  button, .btn {
    cursor: pointer;
    border:none;
  }

  .btn_social {
    cursor: pointer;
    border-radius: 5px;
    padding: 12px 0 12px 0;
    /*padding: 12px auto;*/
    border: solid 1px rgba(1, 3, 2, 0.36);
    font-weight: bold;
    display: flex;
    justify-content: center;
    text-align: center;
    max-width: 253px;
    min-width: 144px;
    width: 100%;
  }

  .search{
    width: 78px;
    height: 36px;
    background-color: #04a777;
    border:none;
    color: white;
    border-radius: 0 4px 4px 0;
  }

  .btn_md{
    width: 196px;
    height: 48px;
    border-radius: 10px;
    background-color: #04a777 !important;
    color: white!important;
  }

  .btn_social img {
    margin-right: 16px;
  }

  .btn_facebook {
    background-color: #3b5998;
    color: white;
  }

  .btn_google {
    background-color: white;
    color: black;
  }

  .input{
    border-radius: 5px;
    height: 48px;
    width: 100%;
    max-width: 528px;
    background-color: white;
    padding-left: 3%;
    border: solid 1px #a7a7a7;
    color: rgba(112, 112, 112, 0.5);

  }

  input[type='checkbox']:checked {
    background-color: #04a777 !important;
    color: #04a777;
  }

  input::placeholder {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: #010302;
    opacity: 0.36;
  }

  .input_password {
    background: url(assets/images/icons/eye.svg) no-repeat right;
    -webkit-appearance: none;
    background-position-x: 98%;
  }

  .input_active {
    border-radius: 5px;
    height: 48px;
    width: 100%;
    max-width: 528px;
    background-color: white;
    padding-left: 16px;
    border: solid 1px #04a777;
    color: black;
  }

  .input_password {
    position: relative;
  }

  .invalid_input_message {
    color: #e91d46;
  }

  .input_password_icon {
    position: absolute;
    top: 49%;
    right: 2%;
    cursor: pointer;
  }

  select {
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.36;
    letter-spacing: normal;
    text-align: left;
    color: rgba(112, 112, 112, 0.5);
    background: url(assets/images/icons/arrow-down.svg) no-repeat right;
    -webkit-appearance: none;
    background-position-x: 98%;
  }

  .invalid_input {
    border: solid 1px #e91d46 !important;
    color: #e91d46 !important;
  }

  .ymap-container {
    height: 100%;
    position: absolute;
    top: 84px;
  }

  .btn_disabled {
    opacity: 0.4;
    cursor: default;
  }


  @media(max-width:1500px) {



  }

   @media(max-width:1024px){

     .nav_menu_icons_mobile {
       display: flex !important;
       justify-content: flex-end;

     }

     .nav_menu_icons {
       display: none !important;
     }

     #nav_logo {
       width: 10% !important;
       min-width: 100px;
     }

     #nav_search {
       width: 75% !important;
     }

     #nav_menu {
       width: 15% !important;
     }

   }

  @media(max-width: 767px) {
    #nav_menu {
      width: 25% !important;
    }
  }


  @media(max-width:520px) {
    .btn_social span {
      display: none;
    }

    #nav_menu {
      width: 35% !important;
    }
  }

</style>


