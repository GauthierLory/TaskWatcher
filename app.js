const app = Vue.createApp({
    data () {
        return {
            title: '<strong>hello world</strong>',
            logoSource: 'https://cdn.svgporn.com/logos/vue.svg',
            tsFormatter: Intl.DateTimeFormat('fr', { hour: '2-digit', minute: '2-digit'}),
            taskname: '',
            numberCSS: 2,
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
        toggleTask () {
            if (this.isTaskInProgress) {
                this.stopTask()
            } else {
                this.startTask()
            }
        },
        deleteTask (taskId) {
            let taskIndex = null
            this.tasks.forEach((task, index) => {
                    if ( task.id === taskId) {
                        taskIndex = index
                    }
            })
            this.tasks.splice(taskIndex, 1)
            console.log('delete task', taskId, taskIndex)
        },
        restartTask (oldTaskId) {
            // stop current task
            if (this.isTaskInProgress) {
                this.stopTask()
            }
            // get old name task
            let newTaskname = null
            this.tasks.forEach(task => {
                if ( task.id === oldTaskId) {
                    newTaskname = task.name
                }
            })
            // start new task
            this.$nextTick(function() {
                this.taskname = newTaskname
                this.startTask()
            })
            console.log('reload task', taskId)
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
    },
    mounted () {
        console.log('mounted')
    },
    created () {
        console.log('created')
    },

})

app.component('task-actions', {
    template: `
        <button @click="sendDelete" class="btn btn-danger" type="button" style="line-height: 1">
            <svg height="15" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
        </button>
        <button @click="sendRestart" class="btn btn-secondary" type="button" style="line-height: 1">
        <svg height="15" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        </button>
        `,
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    emits: ['restart', 'delete'],
    methods: {
        sendDelete () {
            this.$emit('delete', this.id)
        },
        sendRestart () {
            this.$emit('restart', this.id)
        }
    }
})

app.mount('#app')
