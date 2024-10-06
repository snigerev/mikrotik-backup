<template>
    <v-dialog v-model="show" max-width="800px" >
        <v-card max-width="800" >
            <v-btn class="btnClose" icon absolute right dark @click="show = false">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-form ref="form">
            <v-card-title>Редактирование параметров cronjob</v-card-title>
            <v-card-text>
               <v-text-field v-model="cronjob.name" label="Имя cronjob" :rules="[rules.required]"/>
               <v-text-field v-model="cronjob.job" label="cronjob(6 блоков, начиная с секунд)" :rules="[rules.required]" />
            </v-card-text>
           
        </v-form>
        
        </v-card>
        <v-btn color="primary" @click="updateCronjob(cronjob)">Save</v-btn>
    
    </v-dialog>
</template>

<script>
export default {
    name: "editCronjob",
    data () {
        return {
            overlay: true,
            show: false,
            cronjob:'',
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
        openEdit(cronjob) {
            this.cronjob = cronjob
            this.edit = true
            this.show = true
        },
        openAdd() {
            this.cronjob = {}
            this.edit = false
            this.show = true
        },
        async updateCronjob(inst) {       
            if(this.$refs.form.validate()){ 
                if(this.edit === true) {
                    await this.$http({
                        method: 'post',
                        url: '/updateCron',
                        data: inst
                    }).then(() => {
                        this.$emit('getCronjobs')
                        this.show = false
                    })
                } else {
                    await this.$http({
                    method: 'post',
                    url: '/createCron',
                    data: inst
                    }).then(() => {
                        this.$emit('getCronjobs')
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