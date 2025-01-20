from concurrent import futures
from queue import Queue
from xml.etree.cElementTree import fromstring
import os
import sys
import grpc
import json
import threading
import traceback
import utils as utils
import api.psnl_api as psnl_api
import stubs.psyneulink_pb2 as pnlv_pb2
import stubs.psyneulink_pb2_grpc as pnlv_pb2_grpc
import socket, errno


my_env = os.environ
sys.path.append(os.getenv('PATH'))
pnls_utils = utils.PNLUtils()


def errorHandler(func):
    def innerFunc(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except Exception as e:
            tb = traceback.format_exc()
            pnls_utils.logError(str(e))
            pnls_utils.logError(tb)
            context = next((arg for arg in args if isinstance(arg, grpc.ServicerContext)), None)
            if context is not None:
                context.set_code(grpc.StatusCode.INTERNAL)
                context.set_details(str(e))
            else:
                context = grpc.ServicerContext()
                context.set_code(grpc.StatusCode.INTERNAL)
                context.set_details(str(e))
            return pnlv_pb2.Response()
    return innerFunc


class PNLVServer(pnlv_pb2_grpc.ServeGraphServicer):
    def __init__(self):
        super().__init__()
        self.token = None
        self._graph = None
        self._graph_json = None
        self._graph_queue = Queue()
        self.pnls_utils = utils.PNLUtils()
        self._graph_lock = threading.Lock()
        self.modelHandler = psnl_api.APIHandler()

    @errorHandler
    def LoadModel(self, request=None, context=None):
        self.modelHandler = psnl_api.APIHandler()
        model = self.modelHandler.loadScript(request.path)
        graphModel = pnlv_pb2.GraphJson(modelJson=json.dumps(model, indent = 4))
        return graphModel

    @errorHandler
    def PNLApi(self, request=None, context=None):
        response = self.modelHandler.pnlAPIcall(request.genericJson)
        return pnlv_pb2.PNLJson(genericJson=json.dumps(response, indent = 4))

    @errorHandler
    def UpdateModel(self, request=None, context=None):
        model = json.loads(request.modelJson)
        if self.modelHandler.updateModel(model):
            return pnlv_pb2.Response(response=1, message="Model updated successfully")
        else:
            return pnlv_pb2.Response(response=2, message="Model update failed")

    @errorHandler
    def RunModel(self, request=None, context=None):
        results = self.modelHandler.runModel(request.inputData)
        if results:
            return pnlv_pb2.Response(response=1, message=json.dumps(results, indent = 4))
        else:
            return pnlv_pb2.Response(response=2, message="Model run failed")

    @errorHandler
    def SaveModel(self, request=None, context=None):
        model = json.loads(json.loads(request.modelJson))
        path = request.path
        if self.modelHandler.saveModel(path, model):
            return pnlv_pb2.Response(response=1, message="Model saved successfully")
        else:
            return pnlv_pb2.Response(response=2, message="Model run failed")

    @errorHandler
    def StopServer(self, request=None, context=None):
        server.stop(0)
        return pnlv_pb2.Response(response=1, message="Server stopped successfully")


def startServer():
    global server
    server= grpc.server(futures.ThreadPoolExecutor(
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
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        s.bind(("127.0.0.1", 50051))
    except socket.error as e:
        if e.errno == errno.EADDRINUSE:
            print("Port is already in use")
        else:
            print(e)
        exit()
    s.close()
    server.add_insecure_port('[::]:50051')
    server.start()
    os.system('echo "### PsyNeuLinkViewer Server UP ###"')
    server.wait_for_termination()


if __name__ == '__main__':
    startServer()
