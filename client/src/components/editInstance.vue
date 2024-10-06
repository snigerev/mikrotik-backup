<template>
    <v-dialog v-model="show" max-width="800px" >
        <v-card max-width="800" >
            <v-btn class="btnClose" icon absolute right dark @click="show = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-form ref="form">
            <v-card-title>Редактирование параметров подключения</v-card-title>
            <v-card-text>
               <v-text-field v-model="instance.name" label="Имя устройства" :rules="[rules.required]"/>
               <v-select :items="groups" item-text="name" item-value="id"  label="Группа устройств" v-model="selectedItem"></v-select>
               <v-text-field v-model="instance.login" label="Логин" :rules="[rules.required]" />
               <v-text-field :type="show_pass ? 'text' : 'password'" :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
               v-model="instance.password" label="Пароль" @click:append="show_pass = !show_pass" :rules="[rules.required]"/>
               <v-text-field v-model="instance.address" label="IP Адрес" :rules="[rules.required]"/>
               <v-text-field v-model="instance.sshport" label="SSH port " :rules="[rules.required]"/>
            </v-card-text>
           
        </v-form>
        
        </v-card>
        <v-btn color="primary" @click="updateInstance(instance)">Save</v-btn>
    
    </v-dialog>
</template>

<script>
export default {
    name: "editInstance",
    props: ["groups"],
    data () {
        return {
            overlay: true,
            show: false,
            instance:'',
            show_pass: false,
            // groups: {},
            edit: true,
            selectedItem: '',
            rules: {
                required: value => !!value || 'Поле необходимо заполнить',
            },
        }
    },
    methods: {
        /**
         * 
         */
        openEdit(instance) {
            this.instance = instance
            this.selectedItem = instance.group
            this.edit = true
            this.show = true
        },
        openAdd() {
            this.instance = {}
            this.selectedItem = this.groups[0].id
            this.edit = false
            this.show = true
        },
        async updateInstance(inst) {       
            if(this.$refs.form.validate()){ 
                if(this.edit === true) {
                    inst.group = this.selectedItem
                    await this.$http({
                        method: 'post',
                        url: '/updateInstance',
                        data: inst
                    }).then(() => {
                        this.$emit('getInstances')
                        this.show = false
                    })
                } else {
                    inst.group = this.selectedItem
                    await this.$http({
                    method: 'post',
                    url: '/createInstance',
                    data: inst
                    }).then(() => {
                        this.$emit('getInstances')
                        this.show = false
                    })
                }
            }
            
        }
    },
}
</script>

<style scoped>

</style>