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

function serialize_psyneulinkviewer_Input(arg) {
  if (!(arg instanceof psyneulink_pb.Input)) {
    throw new Error('Expected argument of type psyneulinkviewer.Input');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_psyneulinkviewer_Input(buffer_arg) {
  return psyneulink_pb.Input.deserializeBinary(new Uint8Array(buffer_arg));
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
  getModel: {
    path: '/psyneulinkviewer.ServeGraph/GetModel',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.NullArgument,
    responseType: psyneulink_pb.GraphJson,
    requestSerialize: serialize_psyneulinkviewer_NullArgument,
    requestDeserialize: deserialize_psyneulinkviewer_NullArgument,
    responseSerialize: serialize_psyneulinkviewer_GraphJson,
    responseDeserialize: deserialize_psyneulinkviewer_GraphJson,
  },
  getLoggableItems: {
    path: '/psyneulinkviewer.ServeGraph/GetLoggableItems',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.Input,
    responseType: psyneulink_pb.PNLJson,
    requestSerialize: serialize_psyneulinkviewer_Input,
    requestDeserialize: deserialize_psyneulinkviewer_Input,
    responseSerialize: serialize_psyneulinkviewer_PNLJson,
    responseDeserialize: deserialize_psyneulinkviewer_PNLJson,
  },
  setLoggableItems: {
    path: '/psyneulinkviewer.ServeGraph/SetLoggableItems',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.PNLJson,
    responseType: psyneulink_pb.Response,
    requestSerialize: serialize_psyneulinkviewer_PNLJson,
    requestDeserialize: deserialize_psyneulinkviewer_PNLJson,
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
  getResults: {
    path: '/psyneulinkviewer.ServeGraph/GetResults',
    requestStream: false,
    responseStream: false,
    requestType: psyneulink_pb.Input,
    responseType: psyneulink_pb.PNLJson,
    requestSerialize: serialize_psyneulinkviewer_Input,
    requestDeserialize: deserialize_psyneulinkviewer_Input,
    responseSerialize: serialize_psyneulinkviewer_PNLJson,
    responseDeserialize: deserialize_psyneulinkviewer_PNLJson,
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
};

exports.ServeGraphClient = grpc.makeGenericClientConstructor(ServeGraphService);
