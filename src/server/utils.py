import os
import inspect
import logging
from enum import Enum


class PNLUtils(object):
    _instance = None
    logger = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(PNLUtils, cls).__new__(cls)
            try:
                cls.logger = logging.getLogger(__name__)
                fhandler = logging.FileHandler(filename=cls.expand_path(cls, '~/rpc_server.log'), mode='a')
                formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
                fhandler.setFormatter(formatter)
                cls.logger.addHandler(fhandler)
                cls.logger.setLevel(logging.DEBUG)
            except Exception:
                print ("Error: Unable to create PNLUtils instance")
                print (Exception)
        return cls._instance

    def logInfo(self, msg):
        self.logger.info(msg)

    def logError(self, msg):
        self.logger.error(msg)

    def logDebug(self, msg):
        self.logger.debug(msg)

    def expand_path(self, filepath):
        if '~' in filepath:
            homedir = os.path.expanduser('~')
            filepath = homedir + filepath[1:]
        return filepath

def fullname(o):
    klass = o.__class__
    module = klass.__module__
    if module == 'builtins':
        return klass.__qualname__ # avoid outputs like 'builtins.str'
    return module + '.' + klass.__qualname__

def extract_defaults(defaults):
    results = {}
    import json
    import numpy as np
    import psyneulink as pnl
    for key in defaults:
        if isinstance(defaults[key], np.ndarray):
            results[key] = defaults[key].tolist()
        elif isinstance(defaults[key], (float, int, str, list, dict, tuple, bool)):
            results[key] = defaults[key]
        elif inspect.isclass(defaults[key]) and pnl.core.components.functions.is_Function(defaults[key]):
            results[key] = fullname(defaults[key])
        else:
            results[key] = json.dumps(defaults[key], default=str)
    return results

class PNLTypes(Enum):
    COMPOSITIONS = 'Composition'
    MECHANISMS = 'Mechanism'
    PROJECTIONS = 'Projection'
    SUMMARY = 'Summary'


class PNLConstants(Enum):
    SUMMARY = 'Summary'
    LOGGABLES = 'Loggables'
    DEFAULTS = 'Defaults'


class PNLPortTypes(Enum):
    INPUT = 'InputPort'
    OUTPUT = 'OutputPort'
    PARAMETER = 'ParameterPort'


class InputTypes(Enum):
    RAW = 'raw'
    FILE = 'file'
    OBJECT = 'object'


class PNLCompositions(Enum):
    EMComposition = 'EMComposition'
