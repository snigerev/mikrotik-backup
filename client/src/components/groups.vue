<template>
    <v-card width="100%">
        <v-card-title>
            <span>Список групп устройств</span>
        </v-card-title>
        <v-card-text>
            <v-data-table loading v-show="loading" loading-text="Пожалуйста подождите... Загрузка"/>
            <v-data-table v-show="!loading" :sort-desc.sync="sortDesc" :sort-by.sync="sortBy"
                          @update:options="changeSort"
                          :headers="headers" :items="groups"
                          v-model="selected">
                
                          <template v-slot:top>
                    <v-row class="align-center">
                        <v-col cols="12">
                           
                            <v-btn small class="text-none" depressed @click="addGroup">
                                <v-icon left>mdi-cloud-upload</v-icon>
                                Добавить
                            </v-btn>
                        </v-col>
                    </v-row>
                </template>          

                <template v-slot:item.action="{ item }">
                    <v-btn v-if="item.name != 'Main'" small class="text-none" depressed
                                   @click="deleteGroup(item)">
                                <v-icon>mdi-delete</v-icon>
                    </v-btn>
                    <v-btn v-if="item.name != 'Main'" small class="text-none" depressed
                                   @click="editGroup(item)">
                                <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                </template>
            </v-data-table>
            <edit-group ref="editGroup" @getGroups="getGroups"/>
        </v-card-text>
    </v-card>
</template>

<script>
import editGroup from './editgroup.vue';

export default {
    name: 'groupsComponent',
    components: {editGroup},
    data() {
        return {
            loading: true,
            sortBy: 'id',
            sortDesc: false,
            wait: false,
            groups: [],
            selected: [],
            headers: [
                {text: 'id', value: 'id', align: 'center'},
                {text: 'Имя', value: 'name', align: 'center'},
                {text: 'Действия', value: 'action', align: 'center'}
            ],
        }
    },
    mounted() {
        this.getGroups();
    },
    methods: {
        async deleteGroup(group) {
            confirm('Подтвердите удаление группы. Внимание!!! Восстановление не возможно!!!')
            && await this.$http({
                method: 'post',
                url: '/deleteGroup',
                data: group
            }).then(() => {
                this.getGroups()
            })
        },
        editGroup(item) {
            this.$refs.editGroup.openEdit(item)
        },
        addGroup() {
            this.$refs.editGroup.openAdd()
        },
        getGroups() {
            if (!this.wait) {
                let url = ''
                url = '/getAllGroups'
                this.wait = true
                this.$http.get(url).then((resp) => {
                    this.groups = resp.data
                    this.wait = false
                }).catch((err) => {
                    console.log(err)
                    this.wait = false
                })
            }
            this.loading = false
        },
        changeSort({sortBy}) {
            this.sortBy = sortBy[0]
        },
    }
}
</script>

<style scoped>

</style>