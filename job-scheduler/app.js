const cron = require('node-cron')

function getISOString (date = new Date()) {
    return date.toISOString()
}

const cronExpression = '*/3 * * * * *'
const taskFunction = () => {
    console.log(`task is being executed at ${getISOString()}`)
}
const scheduleOptions = {
    scheduled: false,
    timezone: 'Asia/Taipei'
}
const scheduledTask = cron.schedule(cronExpression, taskFunction, scheduleOptions)

if (!cron.validate(cronExpression)) {
    throw Error(`invalid cron expression ${cronExpression}`)
}

setTimeout(() => {
    scheduledTask.start()
    console.log(`job started at ${getISOString()}`)
}, 1000 * 5)

setTimeout(() => {
    scheduledTask.stop()
    console.log(`job stopped at ${getISOString()}`)
}, 1000 * 25)
