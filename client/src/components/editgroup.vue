<template>
    <v-dialog v-model="show" max-width="800px" >
        <v-card max-width="800" >
            <v-btn class="btnClose" icon absolute right dark @click="show = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-form ref="form">
            <v-card-title>Редактирование Группы</v-card-title>
            <v-card-text>
               <v-text-field v-model="group.name" label="Имя группы" :rules="[rules.required]"/>
            </v-card-text>
           
        </v-form>
        
        </v-card>
        <v-btn color="primary" @click="updateGroup(group)">Save</v-btn>
    
    </v-dialog>
</template>

<script>
export default {
    name: "editGroup",
    data () {
        return {
            overlay: true,
            show: false,
            group:'',
            show_pass: false,
            edit: true,
            rules: {
                required: value => !!value || 'Поле необходимо заполнить',
            },
        }
    },
    methods: {
        /**
         * 
         */
        openEdit(group) {
            this.group = group
            this.edit = true
            this.show = true
        },
        openAdd() {
            this.group = {}
            this.edit = false
            this.show = true
        },
        async updateGroup(inst) {       
            if(this.$refs.form.validate()){ 
                if(this.edit === true) {
                    await this.$http({
                        method: 'post',
                        url: '/updateGroup',
                        data: inst
                    }).then(() => {
                        this.$emit('getGroups')
                        this.show = false
                    })
                } else {
                    await this.$http({
                    method: 'post',
                    url: '/createGroup',
                    data: inst
                    }).then(() => {
                        this.$emit('getGroups')
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