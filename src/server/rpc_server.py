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


# def _wait_forever(server):
#     try:
#         while True:
#             time.sleep(_ONE_DAY.total_seconds())
#     except KeyboardInterrupt:
#         server.stop(None)


# def _run_server(bind_address):
#     _LOGGER.info('Starting new server.')
#     server = grpc.server(futures.ThreadPoolExecutor(max_workers=_THREAD_CONCURRENCY),
#         options=(
#             ('grpc.so_reuseport', 1),
#             ('grpc.keepalive_time_ms', 60000),
#             ('grpc.keepalive_timeout_ms', 60000),
#             ('grpc.keepalive_permit_without_calls', True),
#             ('grpc.http2.max_pings_without_data', 0),
#             ('grpc.http2.min_time_between_pings_ms', 60000),
#             ('grpc.http2.min_ping_interval_without_data_ms', 60000),
#         )
#     )

#     pnlv_pb2_grpc.add_ServeGraphServicer_to_server(PNLVServer(), server)
#     server.add_insecure_port(bind_address)
#     # server.add_insecure_port('[::]:50051')
#     server.start()
#     print('PYTHON SERVER READY')
#     # server.wait_for_termination()
#     _wait_forever(server)


# @contextlib.contextmanager
# def _reserve_port():
#     """Find and reserve a port for all subprocesses to use."""
#     sock = socket.socket(socket.AF_INET6, socket.SOCK_STREAM)
#     sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT, 1)
#     if sock.getsockopt(socket.SOL_SOCKET, socket.SO_REUSEPORT) == 0:
#         raise RuntimeError("Failed to set SO_REUSEPORT.")
#     sock.bind(('', 50051))
#     try:
#         yield sock.getsockname()[1]
#     finally:
#         sock.close()


# def main():
#     with _reserve_port() as port:
#         bind_address = 'localhost:{}'.format(port)
#         _LOGGER.info("Binding to '%s'", bind_address)
#         sys.stdout.flush()
#         workers = []
#         for _ in range(_PROCESS_COUNT):
#             # NOTE: It is imperative that the worker subprocesses be forked before
#             # any gRPC servers start up. See
#             # https://github.com/grpc/grpc/issues/16001 for more details.
#             worker = mp.Process(
#                 target=_run_server, args=(bind_address,))
#             worker.start()
#             workers.append(worker)
#         for worker in workers:
#             worker.join()


# if __name__ == '__main__':
#     handler = logging.StreamHandler(sys.stdout)
#     formatter = logging.Formatter('[PID %(process)d] %(message)s')
#     handler.setFormatter(formatter)
#     _LOGGER.addHandler(handler)
#     _LOGGER.setLevel(logging.INFO)
#     main()



def startServer():
    server = grpc.server(futures.ThreadPoolExecutor(
                            max_workers=5,
                        ),
        options=(
            ('grpc.keepalive_time_ms', 60000),
            ('grpc.keepalive_timeout_ms', 10000),
            ('grpc.keepalive_permit_without_calls', True),
            ('grpc.http2.max_pings_without_data', 0),
            ('grpc.http2.min_time_between_pings_ms', 60000),
            ('grpc.http2.min_ping_interval_without_data_ms', 10000),
        )
    )

    pnlv_pb2_grpc.add_ServeGraphServicer_to_server(PNLVServer(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('### PsyNeuLinkViewer Server UP ###')
    server.wait_for_termination()


if __name__ == '__main__':
    startServer()
