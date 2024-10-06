<template>
    <div>
        <v-row id="about" align-content="center" justify="center">
            <!-- <v-card class="xs12 md6 lg4 mt-3" max-width="344">
                <v-img src="./img/media.jpeg" height="200px"/>
                <v-card-subtitle>
                    Весь контент доступен в любое время и на любом Вашем устройстве.
                </v-card-subtitle>
            </v-card>
            <v-card class="xs12 md6 lg4 mt-3" max-width="344">
                <v-img src="./img/video.png" height="200px"/>
                <v-card-subtitle>
                    Подробная информация о фильме, актерах добавляется автоматически и всегда доступна.
                </v-card-subtitle>
            </v-card>
            <v-card class="xs12 md6 lg4 mt-3" max-width="344">
                <v-img src="./img/serials.jpg" height="200px"/>
                <v-card-subtitle>
                    Сериалы аккуратно собраны по сезонам. Краткие описания добавляются автоматически!
                </v-card-subtitle>
            </v-card> -->
        </v-row>
        <v-row id="info" align-content="center" justify="center">
            <!-- <v-card class="xs12 md6 lg4 mt-3" max-width="344">
                <v-img src="./img/download.jpeg" height="200px"/>
                <v-card-subtitle>
                    Всего загрузок : {{ all }}
                </v-card-subtitle>
            </v-card>
            <v-card class="xs12 md6 lg4 mt-3" max-width="344">
                <v-img src="./img/activeDownload.jpg" height="200px"/>
                <v-card-subtitle>
                    Активных загрузок : {{ active }}
                </v-card-subtitle>
            </v-card>
            <v-card class="xs12 md6 lg4 mt-3" max-width="344">
                <v-img src="./img/device.jpeg" height="200px"/>
                <v-card-subtitle>
                    Имя устройства : {{ name }}
                </v-card-subtitle>
            </v-card> -->
        </v-row>
    </div>
</template>

<script>
export default {
    name: "mainPage",
    data() {
        return {
            active: 0,
            all: 0,
            name: '',
        }
    },
    mounted() {
        this.$store.dispatch('updateToken')
    },
    methods: {
    },
    computed: {
        
    }
}
</script>

<style scoped>
.v-card {
    margin-right: 20px !important;
}

.v-image {
    background-color: black !important;
}
</style>
