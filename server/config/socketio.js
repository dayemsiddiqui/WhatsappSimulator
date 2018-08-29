/**
 * Socket.io configuration
 */

'use strict'

const logger = require('./../components/logger')
const TAG = 'config/socketio.js'

// When the user disconnects.. perform this
function onDisconnect (socket) {
}

// When the user connects.. perform this
function onConnect (socket) {
  logger.serverLog(TAG, 'On Connect Called Server Side')
  socket.on('logClient', function (data) {
    logger.clientLog(data.tag, data.data)
  })

  socket.on('message', (data) => {
    logger.serverLog(TAG, `Joining room for ${JSON.stringify(data)}`)
    if (data.action === 'join_room') {
      socket.join(data.room_id)
    }
  })

  // Insert sockets below
  // require('../api/broadcasts/broadcasts.socket').register(socket)
}

exports.setup = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    logger.serverLog(TAG, 'On Connect Called Server Side')
    socket.connectedAt = new Date()

    // Call onDisconnect.
    socket.on('disconnect', function () {
      logger.serverLog(TAG, 'On Disconnect Called Server Side')
      onDisconnect(socket)
      // logger.serverLog(TAG, `SOCKET ${socket.id} DISCONNECTED AT ${new Date()}`)
    })

    // Call onConnect.
    onConnect(socket)
    // logger.serverLog(TAG, `SOCKET ${socket.id} CONNECTED at ${socket.connectedAt}`)
  })
}
