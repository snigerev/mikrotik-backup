<template>
    <v-card width="100%">
        <v-card-title>
            <span>Список устройств</span>
        </v-card-title>
        <v-card-text>
            <v-data-table loading v-show="loading" loading-text="Пожалуйста подождите... Загрузка"/>

            <v-data-table v-show="!loading" :sort-desc.sync="sortDesc" :sort-by.sync="sortBy"
                          @update:options="changeSort"
                          :headers="headers" :items="filteredItems" group-by="group"
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

                <template v-slot:group.header="item">
                    <th colspan="2">
                    <v-icon @click="item.toggle"
                        >{{ item.isOpen ? 'mdi-minus' : 'mdi-plus' }}
                    </v-icon>
                    {{ returnGroupName(item) }}
                    <!-- {{ groups.find((x) => x.id === item.group).name }} -->
                    <!-- {{ item.group }} -->
                    </th>
                </template>
                <template v-slot:item.active="{ item }">
                    <v-switch v-model="item.active" @click="changeState(item)"/>
                </template>
                <template v-slot:item.password="{}">
                    ****
                </template>
                <template v-slot:item.laststatus="{item}">
                    <span v-if="item.laststatus === true"><v-icon color="green" small>mdi-cards-heart</v-icon></span>
                    <span v-else><v-icon color="red" small>mdi-heart-broken</v-icon></span>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn  small class="text-none" depressed
                                   @click="deleteInstance(item)">
                                <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn small class="text-none" depressed
                                   @click="editInstance(item)">
                                <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
            <edit-instance :groups="groups" ref="editInstance" @getInstances="getInstances"/>
        </v-card-text>
    </v-card>
</template>

<script>
import editInstance from './editInstance.vue';

export default {
    name: "instances",
    components: {editInstance},
    data () {
        return {
            sortBy: 'id',
            sortDesc: false,
            wait: false,
            fab: false,
            files: [],
            loading: true,
            groups: [
                {id: 1, name: 'Main'}
            ],
            instances: [],
            selected: [],
            state: 50,
            headers: [
                {text: 'id', value: 'id', align: 'center'},
                {text: 'Включен', value: 'active'},
                {text: 'Имя', value: 'name', align: 'center'},
                {text: 'Логин', value: 'login', align: 'center', sortable: false,},
                {text: 'Пароль', value: 'password', align: 'center', sortable: false,},
                {text: 'Статус бекапа', value: 'laststatus', align: 'center'},
                {text: 'Адрес', value: 'address', align: 'center',},
                {text: 'SSH порт', value: 'sshport', align: 'center',},
                {text: 'Действия', value: 'action', align: 'center'}
            ],
        }
    },
    methods: {
        returnGroupName(item) {
            let groupName = this.groups.filter( function(group) {
                return group.id === item.group
            });
            return groupName[0].name;
        },
        async changeState(inst) {
            await this.$http({
                method: 'post',
                url: '/updateInstance',
                data: inst
            }).then(() => {
                this.getInstances()
            })
        },
        isMobile() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        },
        changeSort({sortBy}) {
            this.sortBy = sortBy[0]
        },
        getInstances() {
                let url = ''
                url = '/getAll'
                this.wait = true
                this.$http.get(url).then((resp) => {
                    this.instances = resp.data
                    this.wait = false
                }).catch((err) => {
                    console.log(err)
                    this.wait = false
                })
            
            this.loading = false
        },
        addInstance() {
            this.$refs.editInstance.openAdd()
        },
        editInstance(inst) {
            this.$refs.editInstance.openEdit(inst)
        },
        async deleteInstance(inst) {
            confirm('Подтвердите удаление устройства. Внимание!!! Восстановление не возможно!!!')
            && await this.$http({
                method: 'post',
                url: '/deleteInstance',
                data: inst
            }).then(() => {
                this.getInstances()
            })
        },
        async getGroups() {
                let url = ''
                url = '/getAllGroups'
                await this.$http.get(url).then((resp) => {
                    this.groups = resp.data
                }).catch((err) => {
                    console.log(err)
                });
        },
    },
    mounted() {
        this.getGroups();
        this.getInstances()
        this.$store.dispatch('updateToken');
    },
    computed: {
        filteredItems() {
            if (this.state === 50 || this.state === undefined) {
                return this.instances
            }
            return this.instances.filter((i) => {
                return (i.status === this.state);
            })
        }
    },
}
</script>

<style scoped>

</style>