Vue.createApp({
    data () {
        return {
            title: '<strong>hello world</strong>',
            logoSource: 'https://cdn.svgporn.com/logos/vue.svg',
            taskname: '',
            taskID: 0,
            tasks: [],
            isTaskInProgress: false,
            startTime: null,
            errorMsg: null
        }
    },
    methods: {
        startTask () {
            if (this.taskname.length === 0) {
                this.errorMsg = "Le nom d'une tache ne peut pas etre vide"
                return
            } else if (this.isTaskInProgress) {
                this.errorMsg = "Une tache est deja en cours"
                return
            } else {
                this.errorMsg = null
            }
            this.isTaskInProgress = true
            this.startTime = Date.now()
        },
        stopTask () {
            // check
            if (!this.isTaskInProgress) {
                this.errorMsg = "Aucune tache n'est en cours"
                return
            }
            // save task
            this.tasks.unshift({
                id: this.getAnId(),
                name: this.taskname,
                start: this.startTime,
                end: Date.now()
            })
            // end of taks
            this.isTaskInProgress = false
            this.errorMsg = null
            this.taskname = ''
        },
        getAnId () {
            this.taskID++
            return this.taskID
        }
    }
}).mount('#app')
