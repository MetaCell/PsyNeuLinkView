import sys
import subprocess
import logging
import configuration
from setuptools.command.install import install
from packaging.version import Version

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def install_node():
    logging.info("Installing node")
    subprocess.run(configuration.conda_forge, shell=True)
    subprocess.run(configuration.node_installation, shell=True)

def check_node_installation():
    node_version = None
    try:
        node_version = subprocess.run(
            ["node", "--version"],
            capture_output = True,
            text = True 
        ).stdout
    except Exception as error:
        if not isinstance(error, FileNotFoundError):
            logging.error("Error with node installation, exiting setup: %s ", error)
            sys.exit()

    if node_version is None:
        logging.info("Node is not installed")
        user_input = input("Do you want to continue with node installation? (yes/no): ")
        if user_input.lower() in ["yes", "y"]:
            logging.info("Continuing with node installation...")
            install_node()
        else:
            logging.error("Exiting, node must be installed to continue...")
            sys.exit()
        
    if Version(node_version) > Version(configuration.node_required_version):
        logging.info("Node version exists and valid, %s", node_version)
    else:
        logging.error("Node version not up to date, update required")
        install_node()