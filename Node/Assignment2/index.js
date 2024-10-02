const logEvents = require('./LogEvents')
const EventEmitter = require('events')

class MyEmitter extends EventEmitter{}
const newEmitter = new MyEmitter()

newEmitter.on('log', (message)=> {
  logEvents(message)
})

setTimeout(() => {
  newEmitter.emit('log', "new log event emitted")
},2000)