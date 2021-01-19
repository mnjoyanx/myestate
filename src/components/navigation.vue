<template>
<!--  <nav class="navbar navbar-expand-md">-->
  <nav class="navbar">
    <div id="nav_logo" class="nav_section">
      <router-link to="/" class="nav_section">
        <img src="@/assets/images/logo.svg" alt="">
      </router-link>
    </div>

    <div id="nav_search" class="nav_section">
      <input type="text" class="input_search" :placeholder="$t('nav_search_placeholder')">
      <button class="search"><img src="@/assets/images/loupe.svg" alt="" width="20"></button>
    </div>

    <div id="nav_menu">
      <div class="nav_menu_icons_mobile">
        <img src="@/assets/images/menu.svg" :class="mobileIconRotate ? 'rotated' : ''" alt="" @click="toggleMenu" ref="menuIcon">
      </div>
      <div class="nav_menu_icons">
        <user-actions :isMobile="false"></user-actions>
      </div>
<!--      <div class="nav_mob">-->
<!--        <div class="icon"><img src="@/assets/images/icons/Profile.png" alt="">-->
<!--          <p>My Profile</p>-->
<!--        </div>-->
<!--        <div class="icon"><img src="@/assets/images/icons/menu.svg" alt="">-->
<!--          <p>List</p>-->
<!--        </div>-->
<!--        <div class="icon"><img src="@/assets/images/icons/time.svg" alt="">-->
<!--          <p>History</p>-->
<!--        </div>-->
<!--        <div class="icon"><img src="@/assets/images/icons/pin.svg" alt="">-->
<!--          <p>Pins</p>-->
<!--        </div>-->
<!--        <div class="icon"><img src="@/assets/images/icons/map.svg" alt="">-->
<!--          <p>Map</p>-->
<!--        </div>-->
<!--        <div class="icon"><img src="@/assets/images/icons/question.svg" alt="">-->
<!--          <p>Support</p>-->
<!--        </div>-->
<!--        <div class="icon"><img src="@/assets/images/icons/logout.svg" alt="">-->
<!--          <p>Log out</p>-->
<!--        </div>-->

<!--        <locale_dropdown/>-->
<!--      </div>-->
    </div>


  </nav>

</template>

<script>

import userActions from '@/components/user-actions'

export default {
  name: "navigation",
  data: function () {
    return {
      mobileMenuVisibility: false,
      mobileIconRotate: false,
    }
  },
  computed: {

  },
  beforeCreate() {
    console.log('%c component: components/navigation.vue BEFORE CREATE ', 'background: green; color: white');
  },
  mounted() {
    console.log('%c component: components/navigation.vue MOUNTED ', 'background: green; color: white');
  },
  components: {
    userActions
  },
  methods: {
    toggleMenu: function() {
      this.mobileMenuVisibility = !this.mobileMenuVisibility;
      this.mobileIconRotate =  !this.mobileIconRotate
      this.$emit('toggleMenu', this.mobileMenuVisibility)
    }
  }
}
</script>

<style scoped>
nav {
  background-color: white;
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px rgba(112, 112, 112, 0.5);
  position: fixed;
  top:0;
  left:0;
  z-index: 10;

}

.nav_section input{
  width: 100%;
  height: 36px;
  border-radius: 4px 0 0 4px;
  border: solid 1px rgba(112, 112, 112, 0.5);
  background-color: var(--white);
  padding-left: 16px;
}

#nav_logo {
  width: 20%;
  justify-content: center;
}

.web .icon, .nav_mob .icon {
  cursor: pointer;
}
.nav_section {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#nav_search {
  width: 45%;
}

#nav_menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.nav_menu_icons {
  display: flex;
}

.nav_menu_icons_mobile {
  display: none;

}

.nav_menu_icons_mobile img {
  width: 27px;
  height: 24px;
  margin-right: 24px;
}

.rotated {
  transform: rotate(90deg);
  transition: 0.1s;
}

</style>
