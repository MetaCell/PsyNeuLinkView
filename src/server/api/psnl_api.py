from time import time
from queue import Queue
from os.path import expanduser
from xml.etree.cElementTree import fromstring
import ast
import json
import threading
import numpy as np
import utils as utils
import psyneulink as pnl
import model.parser as ps

pnls_utils = utils.PNLUtils()


class APIHandler():
    def __init__(self):
        self.pnl_objects = {
            'mechanisms': {},
            'projections': {},
            'compositions': {},
        }
        self._AST = None
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
        return self._AST
    
    @ast.setter
    def ast(self, ast):
        self._AST = ast

    @ast.deleter
    def ast(self):
        self._AST = None

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
            self.ast = f.read()
        self.modelParser.parse_model(self.ast)
        model = self.modelParser.get_graphviz()
        return model

    def pnlAPIcall(self, data):
        callData = json.loads(data)
        method = callData["method"] if 'method' in callData else None
        params = callData["params"] if 'params' in callData else None
        if method == "getType":
            return self.modelParser.get_type(params)
        elif method == "getInitialValues":
            response = {}
            response[utils.PNLConstants.DEFAULTS.value] = self.modelParser.get_defaults()
            response[utils.PNLConstants.LOGGABLES.value] = self.modelParser.get_loggables()
            return response
        return ""

    def updateModel(self, model):
        if self.filepath is None:
            self.filepath = expanduser("~") + "/.untitled-" + str(time()) + ".py"
        with open(self.filepath, 'w') as f:
            f.seek(0)
            self.modelParser.update_model(f, model)
            f.close()
        return True

    def runModel(self, input_data):
        results = False
        data = json.loads(input_data)
        if self.updateModel(data['model']):
            input_type = data['input_type']
            if input_type == utils.InputTypes.RAW.value:
                inputs = ast.literal_eval(data['input_data'])
                results = self.modelParser.run_model(data['executable'], inputs, data['model'])
            elif input_type == utils.InputTypes.FILE.value:
                filepath = pnls_utils.expand_path(data['input_data'])
                # TODO: extract variable input from file
                results = self.modelParser.run_model(data['executable'], filepath, data['model'])
            elif input_type == utils.InputTypes.OBJECT.value:
                results = self.modelParser.run_model(data['executable'], self.modelParser.get_input_object(data['input_data']))
        return results

    def saveModel(self, path, model):
        if self.filepath is None:
            self.filepath = path
        with open(self.filepath, 'w') as f:
            f.seek(0)
            self.modelParser.save_model(f, model)
            f.close()
        return True
