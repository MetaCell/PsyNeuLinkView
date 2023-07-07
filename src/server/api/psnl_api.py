from collections import defaultdict
from concurrent import futures
from os.path import expanduser
from queue import Queue
from xml.etree.cElementTree import fromstring
from time import time
import copy
import grpc
import json
import numpy as np
import psyneulink as pnl
import model.parser as ps
import redbaron
import sys
import threading
import utils as utils

pnls_utils = utils.PNLUtils()



class APIHandler():
    def __init__(self):
        self.pnl_objects = {
            'mechanisms': {},
            'projections': {},
            'compositions': {},
        }
        self.AST = None
        self._filepath = None
        self._modelParser = ps.ModelParser(pnl)
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
        filepath = pnls_utils.expand_path(filepath)
        self.filepath = filepath
        with open(filepath, 'r') as f:
            f.seek(0)
            self.AST = f.read()
        self._modelParser.parse_model(self.AST)
        model = self._modelParser.get_graphviz()
        return model

    def pnlAPIcall(self, data):
        try:
            return self._modelParser.apiCall(data)
        except Exception as e:
            pnls_utils.logError(str(e))

    def updateModel(self, model):
        try:
            if self._filepath is None:
                self._filepath = expanduser("~") + "/.untitled-" + str(time()) + ".py"
            with open(self._filepath, 'w') as f:
                f.seek(0)
                self._modelParser.update_model(f, model)
                f.close()
            return True
        except Exception as e:
            pnls_utils.logError(str(e))
            return False
