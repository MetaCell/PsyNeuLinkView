// // const path = require('path');
// // const { time } = require('console');
// // const log = require('electron-log');
// const grpc = require('@grpc/grpc-js');
// const protoloader = require('@grpc/proto-loader');
// const messages = require('./psyneulink_pb');
// const services = require('./psyneulink_grpc_pb');
//     // ifs = require('./filesystem').fileSystemInterface,
//     // efs = require('./electron').electronInterface;

// const ResponseMessage = {
//     UP_AND_RUNNING: 0,
//     MESSAGE_OK: 1,
//     MESSAGE_ERROR: 2,
//     CLOSED_CONNECTION: 3,
// }


// function main() {
//     const client = new services.ServeGraphClient('localhost:50051', grpc.credentials.createInsecure());

//     const request = new messages.PNLPath();
//     request.setPath('/this/is/just/a/test');

//     client.linkPnl(request, (err, response) => {
//         if (err) {
//             console.error(err);
//         } else {
//             console.log(response);
//             console.log(response.getResponse());
//             console.log(response.getMessage());
//             console.log(messages.ResponseMessage['UP_AND_RUNNING']);
//         }
//     });
// }

// main();
