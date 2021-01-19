function page(path) {
    return () => import(/* webpackChunkName: '' */ `@/pages/${path}`).then(m => m.default || m)
}

export default [
    {path: '/', name: 'home', component: page('home.vue')},
    {path: '/addProperty', name: 'addProperty', component: page('addProperty.vue')},
    // { path: '/edit', name: 'userPage', component: page('profile/edit.vue') },
    {path: '/unregisteredUser', name: 'unregisteredUser', component: page('supportPage/unregisteredUser.vue')},
    {path: '/email/verify', name: 'verify', component: page('auth/verification/verify.vue')},
    {
        path: '/auth', name: 'auth', component: page('auth/auth.vue'),
        children: [
            {path: '', redirect: {name: 'login'}},
            {path: '/login', name: 'login', component: page('auth/login.vue')},
            {path: '/register', name: 'register', component: page('auth/register.vue')},
        ]
    },
    {
        path: '/profile', name: 'profile', component: page('profile/profile.vue'),
        children: [
            {path: '', redirect: {name: 'profile.edit'}},
            {path: '/profile/edit', name: 'profile.edit', component: page('profile/edit.vue')},
        ]
    },
]
