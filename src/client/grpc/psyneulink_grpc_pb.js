// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var psyneulink_pb = require('./psyneulink_pb.js');

function serialize_psyneulinkviewer_GraphJson(arg) {
  if (!(arg instanceof psyneulink_pb.GraphJson)) {
    throw new Error('Expected argument of type psyneulinkviewer.GraphJson');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_GraphJson(buffer_arg) {
  return psyneulink_pb.GraphJson.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_psyneulinkviewer_ModelPath(arg) {
  if (!(arg instanceof psyneulink_pb.ModelPath)) {
    throw new Error('Expected argument of type psyneulinkviewer.ModelPath');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_ModelPath(buffer_arg) {
  return psyneulink_pb.ModelPath.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_psyneulinkviewer_PNLPath(arg) {
  if (!(arg instanceof psyneulink_pb.PNLPath)) {
    throw new Error('Expected argument of type psyneulinkviewer.PNLPath');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_PNLPath(buffer_arg) {
  return psyneulink_pb.PNLPath.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_psyneulinkviewer_Response(arg) {
  if (!(arg instanceof psyneulink_pb.Response)) {
    throw new Error('Expected argument of type psyneulinkviewer.Response');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_Response(buffer_arg) {
  return psyneulink_pb.Response.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServeGraphService = exports.ServeGraphService = {
  linkPnl: {
    path: '/psyneulinkviewer.ServeGraph/LinkPnl',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.PNLPath,
    responseType: psyneulink_pb.Response,
    requestSerialize: serialize_psyneulinkviewer_PNLPath,
    requestDeserialize: deserialize_psyneulinkviewer_PNLPath,
    responseSerialize: serialize_psyneulinkviewer_Response,
    responseDeserialize: deserialize_psyneulinkviewer_Response,
  },
  loadModel: {
    path: '/psyneulinkviewer.ServeGraph/LoadModel',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.ModelPath,
    responseType: psyneulink_pb.GraphJson,
    requestSerialize: serialize_psyneulinkviewer_ModelPath,
    requestDeserialize: deserialize_psyneulinkviewer_ModelPath,
    responseSerialize: serialize_psyneulinkviewer_GraphJson,
    responseDeserialize: deserialize_psyneulinkviewer_GraphJson,
  },
};

exports.ServeGraphClient = grpc.makeGenericClientConstructor(ServeGraphService);
