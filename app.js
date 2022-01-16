Vue.createApp({
    data () {
        return {
            title: '<strong>hello world</strong>',
            logoSource: 'https://cdn.svgporn.com/logos/vue.svg',
            taskname: '',
            isTaskInProgress: false,
            startTime: null,
        }
    },
    methods: {
        startTask () {
            this.isTaskInProgress = true
            this.startTime = Date.now()
        },
        stopTask () {
            this.isTaskInProgress = false
        }
    }
}).mount('#app')
