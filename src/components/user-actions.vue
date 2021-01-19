<template>
    <div v-if="!isMobile" class="user_actions_web">
      <div class="icon"><img :src="userProfile.icon" alt=""></div>
      <div :key="index" class="icon" v-for="(action,index) in userActions"
      ><img :src="action.icon" alt=""></div>
      <locale-dropdown :isMobile="false"/>
    </div>
    <div v-else class="user_actions_mobile">
      <div class="user_actions_mobile_profile">
        <div class="user_actions_mobile_profile_picture">
          <img :src="userProfile.icon" alt="">
        </div>
        <div class="user_actions_mobile_profile_info">
          <div class="user_actions_mobile_profile_info_name">{{ user.name }}</div>
          <div class="user_actions_mobile_profile_info_role">{{ user.role }}</div>
        </div>
      </div>
      <div class="user_actions_mobile_menu">
        <div :key="index" class="action" v-for="(action,index) in userActions"
        >
          <div class="action_icon">
            <img :src="action.icon" alt="">
          </div>
          <div class="action_name">
            <span>{{ action.name }}</span>
          </div>
          <div></div>
        </div>
        <locale-dropdown :isMobile="true"/>
      </div>
  </div>
</template>

<script>

import localeDropdown from '@/components/locale-dropdown'

export default {
  name: "userActions",
  data() {
    return {
      user: {
        name: 'name + surname',
        role: 'admin',
        picture: null
      },
      userProfile: {
        name:'User Action 1',
        icon: require('@/assets/images/icons/Profile.png'),
      },
      userActions: [
        {name:'User Action 2',icon: require('@/assets/images/icons/menu.svg')},
        {name:'User Action 3',icon: require('@/assets/images/icons/time.svg')},
        {name:'User Action 4',icon: require('@/assets/images/icons/pin.svg')},
        {name:'User Action 5',icon: require('@/assets/images/icons/map.svg')},
        {name:'User Action 6',icon: require('@/assets/images/icons/question.svg')},
        {name:'User Action 7',icon: require('@/assets/images/icons/logout.svg')}
      ]
    }
  },
  props: {
    isMobile: Boolean
  },
  components: {
    localeDropdown
  }
}
</script>

<style scoped>
  .user_actions_web {
    width: 100%;
    display: flex;
    margin-right: 30px;
  }

  .user_actions_web div {
    margin-left: 24px;
  }

  .user_actions_mobile {
    width: 40%;
    height: 100%;
    background-color: white;
    box-shadow: 0 1px 6px 0 rgba(1, 3, 2, 0.16);
    border-left: 1px solid rgba(112, 112, 112, 0.5);
    position: fixed;
    top: 84px;
    right: 0%;
  }


  .user_actions_mobile_profile {
    width: 100%;
    height: 75px;
    display: flex;
      border-bottom: 1px solid rgba(112, 112, 112, 0.5);
  }

  .user_actions_mobile_menu {
    width: 100%;
    display: flex;
    height: 80%;
    flex-direction: column;
    padding: 10px 0 10px 0;
  }

  .user_actions_mobile_profile_picture {
    width: 40%;
    padding: 10px 0 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .user_actions_mobile_profile_picture img {
    height: 100%;
  }

  .user_actions_mobile_profile_info {
    width: 60%;
    padding: 10px 0 10px 0;
    display: flex;
    flex-direction: column;
  }

  .user_actions_mobile_profile_info div {
    width: 100%;
    height: 50%;
  }

  .action {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid rgba(112, 112, 112, 0.2);
    font-size: 10px;
  }


  .action_icon {
    width: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .action_name {
    width: 60%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }


</style>