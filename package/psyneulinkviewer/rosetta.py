import platform
import subprocess
import logging
import configuration
import platform
import sys
from setuptools.command.install import install
from packaging.version import Version

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def install_rosetta():
    if platform.system() == 'Darwin':
        logging.info("Installing rosetta")
        subprocess.run(configuration.rosetta_installation, shell=True)

def check_conda_installation():
    if platform.system() == 'Darwin':
        rosetta_version = subprocess.run(
            ["rosseta", "--version"],
            capture_output = True,
            text = True 
        ).stdout
        if rosetta_version:
            rosetta_version = rosetta_version.split(" ")[1]
        logging.info("Rosseta version detected : %s", rosetta_version)

        if rosetta_version is None:
            logging.info("Rosetta ist not installed")
            user_input = input("Do you want to continue with rosetta installation? (yes/no): ")
            if user_input.lower() in ["yes", "y"]:
                logging.info("Continuing with rosetta installation...")
                install_rosetta()
            else:
                logging.error("Exiting, rosetta must be installed to continue...")
                sys.exit()
