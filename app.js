Vue.createApp({
    data () {
        return {
            title: '<strong>hello world</strong>',
            logoSource: 'https://cdn.svgporn.com/logos/vue.svg',
            tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit'}),
            taskname: '',
            taskID: 0,
            tasks: [],
            isTaskInProgress: false,
            startTime: null,
            nowTime: null,
            intervalEverySecond: null,
            errorMsg: null
        }
    },
    computed: {
        currentDuration () {
            if (this.startTime && this.nowTime ) {
                return this.durationBetweenTimestamps(this.startTime, this.nowTime)
            } else {
                return '00:00:00'
            }
        },
    },
    watch: {
    isTaskInProgress (isInProgress) {
        if (isInProgress) {
            this.intervalEverySecond = setInterval( () => {
                this.nowTime = Date.now()
            }, 1000)
        } else {
            clearInterval(this.intervalEverySecond);
        }
    }
    },
    methods: {
        startTask () {
            // check
            if (this.taskname.length === 0) {
                this.errorMsg = "Le nom d'une tache ne peut pas etre vide"
                return
            } else if (this.isTaskInProgress) {
                this.errorMsg = "Une tache est deja en cours"
                return
            } else {
                this.errorMsg = null
            }
            // start task
            this.isTaskInProgress = true
            this.startTime = Date.now()
            this.nowTime = Date.now()
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
            this.nowTime = null
            this.taskname = ''
        },
        getAnId () {
            this.taskID++
            return this.taskID
        },
        formatTimeStamp (ts) {
            return this.tsFormatter.format(ts)
        },
        durationBetweenTimestamps (start, end) {
            let seconds = Math.floor((end / 1000) - (start / 1000))
            let minutes = Math.floor(seconds / 60)
            const hours = Math.floor(minutes / 60)
            seconds = seconds % 60
            minutes = minutes % 60
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        }
    }
}).mount('#app')
