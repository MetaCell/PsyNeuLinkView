import platform
import subprocess
import logging
import platform
import sys
from psyneulinkviewer import configuration
from setuptools.command.install import install

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def install_rosetta():
    if platform.system() == 'Darwin':
        logging.info("Installing rosetta")
        subprocess.run(configuration.rosetta_installation, shell=True)

def check_rosetta_installation():
    rosetta_version = None
    try:
        if platform.system() == 'Darwin':
            rosetta_version = subprocess.run(
                ["rosseta", "--version"],
                capture_output = True,
                text = True 
            ).stdout
            if rosetta_version:
                rosetta_version = rosetta_version.split(" ")[1]
                logging.info("Rosseta version detected : %s", rosetta_version)
    except Exception as error:
        if not isinstance(error, FileNotFoundError):
            logging.error("Error with rosetta installation, exiting setup: %s ", error)
            sys.exit()

    if rosetta_version is None and platform.system() == 'Darwin':
        logging.info("Rosetta ist not installed")
        user_input = "no"
        try:
            user_input = input("Do you want to continue with rosetta installation? (yes/no): ")
        except Exception as error:
            logging.info("No input entered, continue with installation of rosetta")
            user_input = "yes"
            
        if user_input.lower() in ["yes", "y"]:
            logging.info("Continuing with rosetta installation...")
            install_rosetta()
        else:
            logging.error("Exiting, rosetta must be installed to continue...")
            sys.exit()
    
