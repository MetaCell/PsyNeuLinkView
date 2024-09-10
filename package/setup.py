import logging
import os
import subprocess
import sys
from setuptools import setup, find_packages
from setuptools.command.install import install

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

class Install(install):
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
        from psyneulinkviewer.start import prerequisites
        prerequisites()
        install.run(self)

setup(
    name="psyneulinkviewer",
    version="0.3.2",
    url='https://github.com/metacell/psyneulinkviewer',
    author='metacell',
    author_email='dev@metacell.us',
    setup_requires=['requests',
                      'wget',
                      'packaging'],
    packages=find_packages(),
    cmdclass={
        'install': Install
    },
    python_requires=">=3.7"
)