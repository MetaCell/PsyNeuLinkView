import os
import sys
import copy
import grpc
import json
import redbaron
import warnings
import ast_parse
import threading
import numpy as np
from queue import Queue
from concurrent import futures
from collections import defaultdict
from xml.etree.cElementTree import fromstring
import psyneulink_pb2 as pnlv_pb2
import psyneulink_pb2_grpc as pnlv_pb2_grpc

f = None
my_env = os.environ
sys.path.append(os.getenv('PATH'))

class PNLVServer(pnlv_pb2_grpc.ServeGraphServicer):
    def __init__(self):
        self._graph = None
        self._graph_json = None
        self._graph_lock = threading.Lock()
        self._graph_queue = Queue()
        self._graph_q

    def LinkPnl(self, request, context):
        print('LinkPnl called')
        return pnlv_pb2.Response(status=0)

    def LoadModel(self, request, context):
        print('LoadModel called')
        return pnlv_pb2.GraphJson(graph_json='')


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