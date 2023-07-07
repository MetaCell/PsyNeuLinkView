import os
import logging
from enum import Enum


class PNLUtils(object):
    _instance = None
    logger = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(PNLUtils, cls).__new__(cls)
            try:
                cls.logger = logging.getLogger()
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


class PNLTypes(Enum):
    COMPOSITIONS = 'Composition'
    MECHANISMS = 'Mechanism'
    PROJECTIONS = 'Projection'
    SUMMARY = 'Summary'