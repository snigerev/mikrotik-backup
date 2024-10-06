<template>
    <v-card>
        <v-card-title>
            <p class="text-center">Управление аккаунтами</p>
        </v-card-title>
        <v-card-subtitle>
            <span>Пользователь панели</span>
        </v-card-subtitle>
        <v-card-text>
            <v-row>
                <v-col cols="3">
                    <v-text-field disabled label="Логин пользователя" v-model="userPanel.name"/>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Новый пароль"
                                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="showPassword ? 'text' : 'password'"
                                  @click:append="showPassword = !showPassword"
                                  v-model="userPanel.password"/>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Повторите пароль"
                                  :append-icon="showNewPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="showNewPassword ? 'text' : 'password'"
                                  :error-messages="error"
                                  @click:append="showNewPassword = !showNewPassword"
                                  v-model="newPassword"/>
                </v-col>
                <v-col cols="3">
                    <v-btn color="#143891" small @click="saveUser">сохранить</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <span class="done">{{ doneSaveUser }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <span class="done">{{ doneSaveUser }}</span>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="3">
                    <v-text-field label="Git login" v-model="gitParameters.username"/>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Git password"
                                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                  :type="showPassword ? 'text' : 'password'"
                                  @click:append="showPassword = !showPassword"
                                  v-model="gitParameters.password"/>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Git URL"
                                  v-model="gitParameters.url"/>
                </v-col>
                </v-row>
                <v-row>
                <v-col cols="3">
                    <v-text-field label="Git email"
                                  v-model="gitParameters.email"/>
                </v-col>
                <v-col cols="3">
                    <v-text-field label="Git Full user name"
                                  v-model="gitParameters.fullname"/>
                </v-col>
                <v-col cols="3">
                    <v-btn color="#143891" small @click="saveGitParameters(gitParameters)">сохранить</v-btn>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class="text-center">
                    <span class="done">{{ doneSaveGit }}</span>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    name: "userAndAccount",
    data() {
        return {
            error: '',
            doneSaveUser: '',
            doneSaveGit: '',
            showPassword: false,
            showNewPassword: false,
            showAccPassword: false,
            showAccPasswordR: false,
            userPanel: {},
            gitParameters: {
            },
            newPassword: '',
        }
    },
    created() {
        this.getUser();
        this.getGitParameters();
        this.$store.dispatch('updateToken')
    },
    methods: {
        getUser() {
            this.$http.get('/getUser').then((resp) => {
                this.userPanel = resp.data
            })
        },
        saveUser() {
            if (this.userPanel.password !== this.newPassword) {
                this.error = 'Пароли не совпадают'
            } else {
                this.error = ''
                this.$http.post('/updateUser/' + this.userPanel.id, this.userPanel).then((resp) => {
                    this.doneSaveUser = resp.data
                })
            }
        },
        getGitParameters() {
            this.$http.get('/getGit').then((resp) => {
                if(resp.data != '') {
                    this.gitParameters = resp.data
                }
            })
        },
        saveGitParameters(gitParameters) {
            this.error = ''
            this.$http.post('/updateGit/', gitParameters).then((resp) => {
                    this.doneSaveGit = resp.data
                })
        }
    }
}
</script>

<style scoped>
.done {
    color: green;

}
</style>