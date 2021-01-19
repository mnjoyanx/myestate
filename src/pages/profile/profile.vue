<template>
    <div id="profile_page">
        <router-view :user="user" />
        <div>
            {{ user }}
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: "profile",
  computed: mapGetters({
    user: 'auth/user'
  }),
}



</script>

<style>
    #profile_page{
        width: 100%;
        max-width: 1222px;
        margin: 50px auto;
        border: 1px solid rgba(112, 112, 112, 0.5);
        border-radius: 5px;
        box-shadow: 0 1px 6px 0 rgba(1, 3, 2, 0.16);
        background-color: white;
        /* max-height: 600px; */
    }

    /* .profile_page_section {
        margin: 20px
    } */

</style>

