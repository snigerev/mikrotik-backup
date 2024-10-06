<template>
    <v-app id="inspire">
        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col cols="12" sm="8" md="4">
                        <v-card class="elevation-12">
                            <v-toolbar color="#cc7b19" dark flat>
                                <v-toolbar-title>Авторизация</v-toolbar-title>
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <v-form ref="form">
                                    <v-text-field :rules="[rules.required]" label="Введите логин" name="login" prepend-icon="mdi-account"
                                                  type="text" v-model="name"/>
                                    <v-text-field :rules="[rules.required]" id="password" label="Введите пароль"
                                                  name="password"
                                                  prepend-icon="mdi-lock" type="password" v-model="password"
                                                  @keydown.enter="login"/>
                                </v-form>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn @click="login" color="#cc7b19">Войти</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "login",
    data () {
        return {
            name: null,
            password: null,
            success: false,
            has_error: false,
            error: '',
            rules: {
                required: value => !!value || 'Обязательно к заполнению!',
            }
        }
    },
    methods: {
        login() {
            if  (this.$refs.form.validate()) {
                this.$http.post('/login', {
                    name: this.name,
                    password: this.password
                })
                    .then(response => {
                        localStorage.setItem('user',JSON.stringify(response.data.user))
                        localStorage.setItem('jwt',response.data.token)
                    })
                    .catch(function (error) {
                        console.error(error.response);
                    });
            }
        }
    }
}
</script>

<style scoped>

</style>