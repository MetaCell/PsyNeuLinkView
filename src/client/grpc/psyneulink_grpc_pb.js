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

function serialize_psyneulinkviewer_InputJson(arg) {
  if (!(arg instanceof psyneulink_pb.InputJson)) {
    throw new Error('Expected argument of type psyneulinkviewer.InputJson');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_InputJson(buffer_arg) {
  return psyneulink_pb.InputJson.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_psyneulinkviewer_ModelData(arg) {
  if (!(arg instanceof psyneulink_pb.ModelData)) {
    throw new Error('Expected argument of type psyneulinkviewer.ModelData');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_ModelData(buffer_arg) {
  return psyneulink_pb.ModelData.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_psyneulinkviewer_NullArgument(arg) {
  if (!(arg instanceof psyneulink_pb.NullArgument)) {
    throw new Error('Expected argument of type psyneulinkviewer.NullArgument');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_NullArgument(buffer_arg) {
  return psyneulink_pb.NullArgument.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_psyneulinkviewer_PNLJson(arg) {
  if (!(arg instanceof psyneulink_pb.PNLJson)) {
    throw new Error('Expected argument of type psyneulinkviewer.PNLJson');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_PNLJson(buffer_arg) {
  return psyneulink_pb.PNLJson.deserializeBinary(new Uint8Array(buffer_arg));
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
  updateModel: {
    path: '/psyneulinkviewer.ServeGraph/UpdateModel',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.GraphJson,
    responseType: psyneulink_pb.Response,
    requestSerialize: serialize_psyneulinkviewer_GraphJson,
    requestDeserialize: deserialize_psyneulinkviewer_GraphJson,
    responseSerialize: serialize_psyneulinkviewer_Response,
    responseDeserialize: deserialize_psyneulinkviewer_Response,
  },
  runModel: {
    path: '/psyneulinkviewer.ServeGraph/RunModel',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.InputJson,
    responseType: psyneulink_pb.Response,
    requestSerialize: serialize_psyneulinkviewer_InputJson,
    requestDeserialize: deserialize_psyneulinkviewer_InputJson,
    responseSerialize: serialize_psyneulinkviewer_Response,
    responseDeserialize: deserialize_psyneulinkviewer_Response,
  },
  pNLApi: {
    path: '/psyneulinkviewer.ServeGraph/PNLApi',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.PNLJson,
    responseType: psyneulink_pb.PNLJson,
    requestSerialize: serialize_psyneulinkviewer_PNLJson,
    requestDeserialize: deserialize_psyneulinkviewer_PNLJson,
    responseSerialize: serialize_psyneulinkviewer_PNLJson,
    responseDeserialize: deserialize_psyneulinkviewer_PNLJson,
  },
  saveModel: {
    path: '/psyneulinkviewer.ServeGraph/SaveModel',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.ModelData,
    responseType: psyneulink_pb.Response,
    requestSerialize: serialize_psyneulinkviewer_ModelData,
    requestDeserialize: deserialize_psyneulinkviewer_ModelData,
    responseSerialize: serialize_psyneulinkviewer_Response,
    responseDeserialize: deserialize_psyneulinkviewer_Response,
  },
  stopServer: {
    path: '/psyneulinkviewer.ServeGraph/StopServer',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.NullArgument,
    responseType: psyneulink_pb.Response,
    requestSerialize: serialize_psyneulinkviewer_NullArgument,
    requestDeserialize: deserialize_psyneulinkviewer_NullArgument,
    responseSerialize: serialize_psyneulinkviewer_Response,
    responseDeserialize: deserialize_psyneulinkviewer_Response,
  },
};

exports.ServeGraphClient = grpc.makeGenericClientConstructor(ServeGraphService);
