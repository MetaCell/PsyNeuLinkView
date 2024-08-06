import platform
import os
import sys
import subprocess
import logging
import configuration
import wget
import platform
from setuptools import setup, find_packages
from setuptools.command.install import install
from packaging.version import Version

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def activate_env():
    logging.info("Creating conda environment ")
    subprocess.run(configuration.create_env, shell=True)

    logging.info("Activating conda ")
    subprocess.run(configuration.activate_env, shell=True)

def install_conda():
    if os.name == 'posix':
        bash_file = wget.download(configuration.linux_conda_bash, out="psyneulinkviewer")
    elif platform.system() == 'Darwin':
        bash_file = wget.download(configuration.mac_conda_bashf)

    logging.info("Installing conda %s", bash_file)
    logging.info(bash_file)
    subprocess.run("chmod +x " + bash_file, shell=True)
    subprocess.run(bash_file + " -b -u -p ~/miniconda3", shell=True)

    activate_env()
    logging.info("Clean up ")
    subprocess.run("rm -rf " + bash_file, shell=True)


def check_conda_installation():
    conda_version = None
    try:
        conda_version = subprocess.run(
            ["conda", "--version"],
            capture_output = True,
            text = True 
        ).stdout
        if conda_version:
            conda_version = conda_version.split(" ")[1]
        logging.info("Conda version detected : %s", conda_version)
    except Exception as error:
        logging.error("Error with conda installation: %s ", error)

    if conda_version is None:
        logging.info("Conda is not installed")
        user_input = input("Do you want to continue with conda installation? (yes/no): ")
        if user_input.lower() in ["yes", "y"]:
            logging.info("Continuing with conda installation...")
            install_conda()
        else:
            logging.error("Exiting, conda must be installed to continue...")
            sys.exit()
        
    if Version(conda_version) > Version(configuration.conda_required_version):
        logging.info("Conda version exists and valid, %s", conda_version)
    else:
        logging.error("Conda version not up to date, update required")
        install_conda()
        
    env_name = None
    try:
        envs = subprocess.run(
            ["conda", "env","list"],
            capture_output = True,
            text = True 
        ).stdout
        if envs is not None:
            envs = envs.splitlines()
        active_env = list(filter(lambda s: '*' in str(s), envs))[0]
        env_name = str(active_env).split()[0]
    except Exception as error:
        logging.error("Environment not found active: %s ", error)

    if env_name is not None:
        logging.info("Conda environment found and activated %s", env_name)
    else:
        activate_env()