import logging
import os
from setuptools import setup, find_packages
from setuptools.command.install import install
from psyneulinkviewer.start import prerequisites

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class InstallCommand(install):
    user_options = install.user_options + [
        ('path=', None, 'an option that takes a value')
    ]

    def initialize_options(self):
        install.initialize_options(self)
        self.path = None

    def finalize_options(self):
        # Validate options
        if self.path is None:
            self.path = os.path.dirname(os.path.realpath(__file__))
        super().finalize_options()


    def run(self):
        global path
        path = self.path # will be 1 or None
        install.run(self)
        prerequisites()

setup(
    name="psyneulinkview",
    version="0.0.1",
    setup_requires=['requests'],
    cmdclass={
        'install': InstallCommand,
    }
)