# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
import grpc

import graph_pb2 as graph__pb2


class ServeGraphStub(object):
  # missing associated documentation comment in .proto file
  pass

  def __init__(self, channel):
    """Constructor.

    Args:
      channel: A grpc.Channel.
    """
    self.LoadScript = channel.unary_unary(
        '/graph.ServeGraph/LoadScript',
        request_serializer=graph__pb2.ScriptPath.SerializeToString,
        response_deserializer=graph__pb2.ScriptCompositions.FromString,
        )
    self.GetCompositions = channel.unary_unary(
        '/graph.ServeGraph/GetCompositions',
        request_serializer=graph__pb2.NullArgument.SerializeToString,
        response_deserializer=graph__pb2.ScriptCompositions.FromString,
        )
    self.GetJSON = channel.unary_unary(
        '/graph.ServeGraph/GetJSON',
        request_serializer=graph__pb2.GraphName.SerializeToString,
        response_deserializer=graph__pb2.GraphJSON.FromString,
        )


class ServeGraphServicer(object):
  # missing associated documentation comment in .proto file
  pass

  def LoadScript(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def GetCompositions(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')

  def GetJSON(self, request, context):
    # missing associated documentation comment in .proto file
    pass
    context.set_code(grpc.StatusCode.UNIMPLEMENTED)
    context.set_details('Method not implemented!')
    raise NotImplementedError('Method not implemented!')


def add_ServeGraphServicer_to_server(servicer, server):
  rpc_method_handlers = {
      'LoadScript': grpc.unary_unary_rpc_method_handler(
          servicer.LoadScript,
          request_deserializer=graph__pb2.ScriptPath.FromString,
          response_serializer=graph__pb2.ScriptCompositions.SerializeToString,
      ),
      'GetCompositions': grpc.unary_unary_rpc_method_handler(
          servicer.GetCompositions,
          request_deserializer=graph__pb2.NullArgument.FromString,
          response_serializer=graph__pb2.ScriptCompositions.SerializeToString,
      ),
      'GetJSON': grpc.unary_unary_rpc_method_handler(
          servicer.GetJSON,
          request_deserializer=graph__pb2.GraphName.FromString,
          response_serializer=graph__pb2.GraphJSON.SerializeToString,
      ),
  }
  generic_handler = grpc.method_handlers_generic_handler(
      'graph.ServeGraph', rpc_method_handlers)
  server.add_generic_rpc_handlers((generic_handler,))