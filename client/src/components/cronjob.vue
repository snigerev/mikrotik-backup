<template>
    <v-card width="100%">
        <v-card-title>
            <span>Список CronJob</span><br/>
        </v-card-title>
        <v-card-subtitle>
            <span>Внимание!!! включена должна быть только одна джоба!!!</span>
        </v-card-subtitle>
        <v-card-text>
            <v-data-table loading v-show="loading" loading-text="Пожалуйста подождите... Загрузка"/>

            <v-data-table v-show="!loading" :sort-desc.sync="sortDesc" :sort-by.sync="sortBy"
                          @update:options="changeSort"
                          :headers="headers" :items="filteredItems"
                          v-model="selected">
                
                          <template v-slot:top>
                    <v-row class="align-center">
                        <v-col cols="12">
                           
                            <v-btn small class="text-none" depressed @click="addInstance">
                                <v-icon left>mdi-cloud-upload</v-icon>
                                Добавить
                            </v-btn>
                        </v-col>
                    </v-row>
                </template>          


                <template v-slot:item.active="{ item }">
                    <v-switch v-model="item.active" @click="changeState(item)"/>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn  small class="text-none" depressed
                                   @click="deleteCronJob(item)">
                                <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn small class="text-none" depressed
                                   @click="editCronJob(item)">
                                <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
            <edit-cronjob ref="editCronjob" @getCronjobs="getCronjobs"/>
        </v-card-text>
    </v-card>
</template>

<script>
import editCronjob from './editcronjob.vue';
export default {
    name: "cronjobs",
    components: {editCronjob},
    data() {
        return {
            loading: true,
            sortBy: 'id',
            sortDesc: false,
            cronjobs: [],
            selected: [],
            wait: false,
            state: 50,
            headers: [
                {text: 'id', value: 'id', align: 'center'},
                {text: 'Включен', value: 'active'},
                {text: 'Имя', value: 'name', align: 'center'},
                {text: 'cronjob', value: 'job', align: 'center', sortable: false,},
                {text: 'Действия', value: 'action', align: 'center'}
            ],
        }
    },
    methods: {
        addInstance() {
            this.$refs.editCronjob.openAdd()
        },
        async changeState(job) {
            await this.$http({
                method: 'post',
                url: '/updateCron',
                data: job
            }).then(() => {
                this.getCronjobs()
            })
        },
        async deleteCronJob(job) {
            confirm('Подтвердите удаление conjob. Внимание!!! Восстановление не возможно!!!')
            && await this.$http({
                method: 'post',
                url: '/deleteCron',
                data: job
            }).then(() => {
                this.getCronjobs()
            })
        },
        editCronJob(job) {
            this.$refs.editCronjob.openEdit(job)
        },
        changeSort({sortBy}) {
            this.sortBy = sortBy[0]
        },
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        getCronjobs() {
            if (!this.wait) {
                let url = ''
                url = '/getAllCron'
                this.wait = true
                this.$http.get(url).then((resp) => {
                    this.cronjobs = resp.data
                    this.wait = false
                }).catch((err) => {
                    console.log(err)
                    this.wait = false
                })
            }
            this.loading = false
        }
    },
    mounted() {
        this.getCronjobs()
        this.$store.dispatch('updateToken')
    },
    computed: {
        filteredItems() {
            if (this.state === 50 || this.state === undefined) {
                return this.cronjobs
            }
            return this.cronjobs.filter((i) => {
                return (i.status === this.state);
            })
        }
    },
}
</script>

<style scoped>

</style>