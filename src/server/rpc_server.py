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
import psyneulink as pnl
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


def expand_path(filepath):
    if '~' in filepath:
        homedir = os.path.expanduser('~')
        filepath = homedir + filepath[1:]
        # print_to_file("filepath expanded to: " + filepath)
    return filepath


class ModelHandler():
    def __init__(self):
        self.pnl_objects = {
            'mechanisms': {},
            'projections': {},
            'compositions': {},
        }
        self.AST = None
        self._filepath = None
        self._modelParser = None
        self.localvars = locals()
        self.shared_queue = Queue()
        self.shared_queue_lock = threading.RLock()

    @property
    def modelParser(self):
        return self._modelParser
    
    @modelParser.setter
    def modelParser(self, modelParser):
        self._modelParser = modelParser

    @modelParser.deleter
    def modelParser(self):
        self._modelParser = None

    @property
    def filepath(self):
        return self._filepath
    
    @filepath.setter
    def filepath(self, filepath):
        self._filepath = filepath

    @filepath.deleter
    def filepath(self):
        self._filepath = None
    
    @property
    def ast(self):
        return self.AST
    
    @ast.setter
    def ast(self, ast):
        self.AST = ast

    @ast.deleter
    def ast(self):
        self.AST = None
    
    def get_localvars(self):
        return self.localvars

    @property
    def hashable_pnl_objects(self):
        return {
            'mechanisms': [i for i in self.pnl_objects['mechanisms']],
            'projections': [i for i in self.pnl_objects['projections']],
            'compositions': [i for i in self.pnl_objects['compositions']],
        }
    
    @hashable_pnl_objects.setter
    def hashable_pnl_objects(self, pnl_objects):
        self.pnl_objects = pnl_objects

    @hashable_pnl_objects.deleter
    def hashable_pnl_objects(self):
        self.pnl_objects = {
            'mechanisms': {},
            'projections': {},
            'compositions': {},
        }

    def loadScript(self, filepath):
        filepath = expand_path(filepath)
        self.filepath = filepath
        try:
            with open(filepath, 'r') as f:
                # reset cursor to start of file for multiple reads
                f.seek(0)
                self.AST = f.read()
        except:
            e = sys.exc_info()[0]
            logger.error("error reading ast from file: " + str(e))
        self._modelParser = ps.ModelParser(self.AST, pnl, self.localvars)
        self._modelParser.execute_ast()
        # return self._modelParser.get_graphviz_representation()
        # TODO: maybe remove the hashable_pnl_objects property and move these inside the model parser
        return self.hashable_pnl_objects['compositions']


class PNLVServer(pnlv_pb2_grpc.ServeGraphServicer):
    def __init__(self):
        super().__init__()
        self._graph = None
        self._graph_json = None
        self._graph_queue = Queue()
        self._graph_lock = threading.Lock()
        self.modelHandler = ModelHandler()

    def LinkPnl(self, request, context):
        print('LinkPnl called')
        print(request)
        return pnlv_pb2.Response(response=2, message='this is just a test')

    def LoadModel(self, request, context):
        model = self.modelHandler.loadScript(request.path)
        return pnlv_pb2.GraphJson(graph_json=model)
        # return pnlv_pb2.GraphJson(graph_json=json.dumps(self._graph_json))


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
