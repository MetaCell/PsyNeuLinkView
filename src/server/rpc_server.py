from collections import defaultdict
from concurrent import futures
from queue import Queue
from xml.etree.cElementTree import fromstring
import copy
import grpc
import json
import numpy as np
import os
import stubs.psyneulink_pb2 as pnlv_pb2
import stubs.psyneulink_pb2_grpc as pnlv_pb2_grpc
import sys
import threading
import api.psnl_api as psnl_api
import utils as utils
from model.parser import PNLTypes

my_env = os.environ
pnls_utils = utils.PNLUtils()
sys.path.append(os.getenv('PATH'))


class PNLVServer(pnlv_pb2_grpc.ServeGraphServicer):
    def __init__(self):
        super().__init__()
        self._graph = None
        self._graph_json = None
        self._graph_queue = Queue()
        self._graph_lock = threading.Lock()
        self.modelHandler = psnl_api.APIHandler()

    def LoadModel(self, request, context):
        try:
            model = self.modelHandler.loadScript(request.path)
            return pnlv_pb2.GraphJson(modelJson=json.dumps(model, indent = 4))
        except Exception as e:
            pnls_utils.logError(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return pnlv_pb2.Response()

    def UpdateModel(self, request, context):
        # self.modelHandler.updateModel(request.modelJson)
        return pnlv_pb2.Response(1, "Model updated")
    
    def GetModel(self, request, context):
        # model = self.modelHandler.getModel()
        model = {}
        return pnlv_pb2.GraphJson(graph_json=json.dumps({}))
    
    def GetLoggableItems(self, request, context):
        # loggable_items = extract_loggable_items(request.inputData)
        return pnlv_pb2.PNLJson(pnl_json=json.dumps({}))
    
    def SetLoggableItems(self, request, context):
        # loggable_items = extract_loggable_items(request.inputData)
        # TODO: call the modelhandler to set the loggable items through the model parser
        return pnlv_pb2.Response(1, "Loggable items set")
    
    def RunModel(self, request, context):
        # TODO: call the modelhandler to run the model through the model parser
        # extract the input data from the request
        return pnlv_pb2.Response(1, "Model Ran successfully")


def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10),
        options=(
            ('grpc.keepalive_time_ms', 10000),
            ('grpc.keepalive_timeout_ms', 5000),
            ('grpc.keepalive_permit_without_calls', True),
            ('grpc.http2.max_pings_without_data', 0),
            ('grpc.http2.min_time_between_pings_ms', 10000),
            ('grpc.http2.min_ping_interval_without_data_ms', 5000),
        )
    )

    pnlv_pb2_grpc.add_ServeGraphServicer_to_server(PNLVServer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('PYTHON SERVER READY')
    server.wait_for_termination()


if __name__ == '__main__':
    serve()
