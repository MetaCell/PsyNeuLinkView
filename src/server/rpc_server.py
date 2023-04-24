import os
import sys
import copy
import grpc
import json
import logging
import redbaron
import warnings
import threading
import numpy as np
import parser as ps
from queue import Queue
from concurrent import futures
from collections import defaultdict
from xml.etree.cElementTree import fromstring
import psyneulink_pb2 as pnlv_pb2
import psyneulink_pb2_grpc as pnlv_pb2_grpc

f = None
my_env = os.environ
sys.path.append(os.getenv('PATH'))

logger = logging.getLogger(__name__)

class Container():
    def __init__(self):
        self.localvars = locals()
        self.pnl_objects = {
            'compositions': {},
            'components': {}
        }
        self.graphics_spec = {

        }
        self.filepath = None
        self.AST = None
        self.shared_queue = Queue()
        self.shared_queue_lock = threading.RLock()

    @property
    def hashable_pnl_objects(self):
        return {
            'compositions': [i for i in self.pnl_objects['compositions']],
            'components': [i for i in self.pnl_objects['components']]
        }


class PNLVServer(pnlv_pb2_grpc.ServeGraphServicer):
    def __init__(self):
        self._graph = None
        self._graph_json = None
        self._graph_lock = threading.Lock()
        self._graph_queue = Queue()

    def LinkPnl(self, request, context):
        print('LinkPnl called')
        print(request)
        return pnlv_pb2.Response(response=2, message='this is just a test')

    def LoadModel(self, request, context):
        print('LoadModel called')
        return pnlv_pb2.GraphJson(graph_json='')


pnl_container = Container()


def loadScript(filepath):
    filepath = expand_path(filepath)
    pnl_container.filepath = filepath
    try:
        with open(filepath, 'r') as f:
            # reset cursor to start of file for multiple reads
            f.seek(0)
            pnl_container.AST = f.read()
            # if pnl_container.AST.isspace() or (pnl_container.AST == ""):
            #     print_to_file("Source file for AST is empty or has already been read")
            # if pnl_container.AST == None:
            #     print_to_file("pnl_container.AST is None")
    
    except:
        e = sys.exc_info()[0]
        # print_to_file("error reading ast from file: " + str(e))
        # print_to_file("filepath: " + filepath + '\n')

    dg = ps.DependencyGraph(pnl_container.AST, pnl)
    namespace = {}
    dg.execute_ast(namespace)

    # get_new_pnl_objects(namespace)
    # (composition, components) = get_new_pnl_objects(namespace)
    # print_to_file(str(composition) + "  " + str(components))

    # get_graphics_dict(namespace)
    return pnl_container.hashable_pnl_objects['compositions']


def expand_path(filepath):
    if '~' in filepath:
        homedir = os.path.expanduser('~')
        filepath = homedir + filepath[1:]
        # print_to_file("filepath expanded to: " + filepath)
    return filepath


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
