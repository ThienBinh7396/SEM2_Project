var io = require('socket.io')(6001)
console.log('Connected to port 6001')
io.on('error',function(socket){
	console.log('error')
})
io.on('connection',function(socket){
	console.log('Co nguoi vua ket noi'+socket.id)
})
var Redis = require('ioredis')
var redis = new Redis(6379)
redis.psubscribe("*",function(error,count){
	//
})
redis.on('pmessage',function(partner,channel,message){
	console.log('chanel :' + channel)
	console.log('message: ' + message)
	console.log('partner: ' + partner)

	message = JSON.parse(message)
	if (channel == 'chat') {
		io.emit(channel+":"+message.event,message.data.message)
	}
	if (channel == 'notify') {
		io.emit(channel+":"+message.event,message.data.notify)
	}
	console.log('Sent')
})