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
import multiprocessing as mp

my_env = os.environ
sys.path.append(os.getenv('PATH'))



class PNLVServer(pnlv_pb2_grpc.ServeGraphServicer):
    def __init__(self):
        super().__init__()
        self._graph = None
        self._graph_json = None
        self._graph_queue = Queue()
        self.pnls_utils = utils.PNLUtils()
        self._graph_lock = threading.Lock()
        self.modelHandler = psnl_api.APIHandler()

    def LoadModel(self, request, context):
        try:
            self.modelHandler = psnl_api.APIHandler()
            model = self.modelHandler.loadScript(request.path)
            return pnlv_pb2.GraphJson(modelJson=json.dumps(model, indent = 4))
        except Exception as e:
            self.pnls_utils.logError(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return pnlv_pb2.Response()

    def PNLApi(self, request, context):
        try:
            response = self.modelHandler.pnlAPIcall(request.genericJson)
            return pnlv_pb2.PNLJson(genericJson=json.dumps(response, indent = 4))
        except Exception as e:
            self.pnls_utils.logError(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return pnlv_pb2.Response()

    def UpdateModel(self, request, context):
        try:
            self.modelHandler = psnl_api.APIHandler()
            model = json.loads(request.modelJson)
            if self.modelHandler.updateModel(model):
                return pnlv_pb2.Response(response=1, message="Model updated successfully")
            else:
                return pnlv_pb2.Response(response=2, message="Model update failed")
        except Exception as e:
            self.pnls_utils.logError(str(e))
            context.set_code(grpc.StatusCode.INTERNAL)
            context.set_details(str(e))
            return pnlv_pb2.Response()

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



def startServer():
    server = grpc.server(futures.ThreadPoolExecutor(
                            max_workers=5,
                        ),
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
    print('### PsyNeuLinkViewer Server UP ###')
    server.wait_for_termination()


if __name__ == '__main__':
    startServer()
