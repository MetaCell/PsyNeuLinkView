import re
import json
import platform
import os
import sys
import subprocess
import logging
import importlib.util
import tarfile
import atexit
import configuration
import wget
import platform
import requests
from setuptools import setup, find_packages
from setuptools.command.install import install
from packaging.version import Version

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def activate_env():
    logging.info("Creating conda ")
    subprocess.run(configuration.create_env, shell=True)

    logging.info("Activating conda ")
    subprocess.run(configuration.activate_env, shell=True)

def install_conda():
    if os.name == 'posix':
        bash_file = requests.get(configuration.linux_conda_bash)
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
    conda_version = subprocess.run(
        ["conda", "--version"],
        capture_output = True,
        text = True 
    ).stdout
    if conda_version:
        conda_version = conda_version.split(" ")[1]
    logging.info("conda version %s", conda_version)

    if conda_version is not None:
        logging.info("Conda not installed")
        install_conda()
    
    if Version(conda_version) > Version(configuration.conda_required_version):
        logging.info("Conda version exists and valid, %s", conda_version)
    else:
        logging.error("Conda version not up to date, update required");
    
    envs = subprocess.run(
        ["conda", "env","list"],
        capture_output = True,
        text = True 
    ).stdout.splitlines()
    active_env = list(filter(lambda s: '*' in str(s), envs))[0]
    env_name = str(active_env).split()[0]
    if env_name is not None:
        logging.info("Conda environment foudn and activated%s", env_name)