<template>
    <div>
        <v-app id="inspire" v-if="!auth">
            <v-main>
                <v-container class="fill-height" fluid>
                    <v-row align="center" justify="center">
                        <v-col cols="12" sm="8" md="4">
                            <v-card class="elevation-12">
                                <v-toolbar color="#143891" dark flat>
                                    <v-toolbar-title>Авторизация</v-toolbar-title>
                                    <v-spacer />
                                </v-toolbar>
                                <v-card-text>
                                    <v-form ref="form">
                                        <v-text-field :rules="[rules.required]" label="Введите логин" name="login"
                                            prepend-icon="mdi-account" type="text" v-model="name" />
                                        <v-text-field :rules="[rules.required]" id="password" label="Введите пароль"
                                            name="password" prepend-icon="mdi-lock" type="password" v-model="password"
                                            @keydown.enter="login" />
                                    </v-form>
                                    <p class="error_text">{{ error }}</p>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn @click="login" color="#143891">Войти</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </v-app>
        <v-app id="inspire" v-else>
            <v-navigation-drawer class="menu" v-model="drawer" app clipped>
                <v-list dense>
                    <v-list-item link :to="{ name: 'main' }">
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Домашняя</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link :to="{ name: 'instances' }">
                        <v-list-item-action>
                            <v-icon>mdi-access-point-network</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Список устройств</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link :to="{ name: 'groups' }">
                        <v-list-item-action>
                            <v-icon>mdi-select-group</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Список групп устройств</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item link :to="{ name: 'cronjob' }">
                        <v-list-item-action>
                            <v-icon>mdi-autorenew</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>CronJob</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-group prepend-icon="mdi-cog">
                        <template v-slot:activator>
                            <v-list-item-title>Настройки</v-list-item-title>
                        </template>
                        <v-list-item class="settings" link :to="{ name: 'users' }">
                            <v-list-item-icon>
                                <v-icon>mdi-account-multiple</v-icon>
                            </v-list-item-icon>
                            <v-list-item-title>Аккаунты</v-list-item-title>
                        </v-list-item>
                    </v-list-group>
                </v-list>
            </v-navigation-drawer>
            <v-app-bar app clipped-left class="menu top" color="accent-4">
                <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
                <v-spacer />
                <v-toolbar-title class="mr-2">Система резервного копирования MikroTik</v-toolbar-title>
                <v-spacer />
                <span>{{ username }}</span>
                <v-icon @click="exit">mdi-exit-to-app</v-icon>
            </v-app-bar>

            <v-main>
                <v-container class="main fill-height">
                    <v-row>
                        <router-view />
                    </v-row>
                </v-container>
            </v-main>

            <v-footer app class="footer">
                <span>&copy; {{ new Date().getFullYear() }}</span>

            </v-footer>
        </v-app>
    </div>
</template>

<script>
export default {
    name: "layout",
    data() {
        return {
            wait: false,
            drawer: null,
            name: '',
            password: '',
            success: false,
            has_error: false,
            error: '',
            rules: {
                required: value => !!value || 'Обязательно к заполнению!',
            },
        }
    },

    methods: {
        exit() {
            this.$http.post('/deleteToken', {
                token: localStorage.getItem('jwt')
            })
            this.$store.commit('UPDATE_AUTH', false)
            localStorage.removeItem('user')
            localStorage.removeItem('auth')
            localStorage.removeItem('jwt')
            this.error = this.password = ''
        },
        login() {
            if (this.$refs.form.validate()) {
                this.$http.post('/login', {
                    name: this.name,
                    password: this.password
                }).then(response => {
                    localStorage.setItem('user', JSON.stringify(response.data.user))
                    localStorage.setItem('jwt', response.data.token)
                    this.$store.commit('UPDATE_AUTH', true)
                }).catch((error) => {
                    this.error = error.response.data.message
                });
            }
        },
    },
    mounted() {
    },
    computed: {
        auth() {
            return this.$store.getters.auth
        },
        username() {
            return localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).name : ''
        },
        // update() {
        //     return this.$store.getters.update
        // }
    }
}
</script>

<style scoped>
.container {
    width: 95% !important;
    max-width: none !important;
}

.menu {
    background-color: #1f2326 !important;
}

.top {
    border-bottom: #143891 4px solid !important;
}

.footer {
    z-index: 999;
    border-top: #143891 4px solid !important;
}

.main {
    background-color: #454949 !important;
    padding: 25px 25px 25px 25px;
    align-items: baseline !important;
}

.settings {
    padding-left: 10% !important;
}

.font-size-2em {
    font-size: 0.7em !important;
}

.error_text {
    display: flex;
    color: darkred;
    width: 100%;
}

.footerSpace {
    margin-right: 1em;
}

.green {
    background-color: green;
}
</style>
