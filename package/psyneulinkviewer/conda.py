import platform
import os
import sys
import subprocess
import logging
import platform
import re
from setuptools import setup, find_packages
from setuptools.command.install import install
from psyneulinkviewer import configuration

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

conda_installed = False

def create_env():
    env_name = None
    try:
        envs = subprocess.run(
            ["conda", "env","list"],
            capture_output = True,
            text = True 
        ).stdout
        if envs is not None:
            envs = envs.splitlines()
            env_name = list(filter(lambda s: configuration.env_name in str(s), envs))[0]
            env_name = str(env_name).split()[0]
            logging.info("Environment found %s", env_name)
        if env_name == configuration.env_name:
            logging.info("Conda environment found %s", env_name)
    except Exception as error:
        logging.info("Conda environment not found")
        env_name = None

    if env_name is None:
        command = get_conda_installed_path() + configuration.create_env
        logging.info("Creating conda environment %s", command)
        subprocess.run(command, shell=True)

    
def shell_source(script):
    """Sometime you want to emulate the action of "source" in bash,
    settings some environment variables. Here is a way to do it."""
    import subprocess, os
    pipe = subprocess.Popen(". %s; env" % script, stdout=subprocess.PIPE, shell=True)
    output = pipe.communicate()[0]
    logging.info("Output %s", output)
    env = dict((line.split("=", 1) for line in output.splitlines()))
    os.environ.update(env)

def install_conda():
    import wget
    if platform.system() == 'Linux':
        bash_file = wget.download(configuration.linux_conda_bash)
    elif platform.system() == 'Darwin':
        bash_file = wget.download(configuration.mac_conda_bash)

    logging.info("Installing conda %s", bash_file)
    logging.info(bash_file)
    subprocess.run("chmod +x " + bash_file, shell=True)
    subprocess.run("bash " + bash_file + " -b -u -p " + configuration.conda_installation_path, shell=True)
    subprocess.run(configuration.conda_binary + " init bash", shell=True)
    subprocess.run(configuration.conda_binary + " init zsh", shell=True)

    logging.info("Clean up ")
    subprocess.run("rm -rf " + bash_file, shell=True)

    conda_installed = True

def get_conda_installed_path():
    installation_path = detect_activated_conda_location()
    logging.info("installation_path %s ", installation_path)
    if installation_path is None:
        if platform.system() == "Darwin":
            installation_path = configuration.conda_installation_path_mac_default
        logging.info("installation_path %s ", conda_installed)
        installation_path = configuration.conda_installation_path
    
    return installation_path.strip()

def conda_binary_path():
    installation_path = detect_activated_conda_location()
    if conda_installed:
        installation_path = configuration.conda_installation_path
    else:
        if installation_path is None:
            if platform.system() == "Darwin":
                installation_path = configuration.conda_installation_path_mac_default
    
    return installation_path

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
        if not isinstance(error, FileNotFoundError):
            logging.error("Error with conda installation, exiting setup: %s ", error)
            sys.exit()

    if conda_version is None:
        logging.info("Conda is not installed")
        install_conda()
    else:
        from packaging.version import Version
        if Version(conda_version) > Version(configuration.conda_required_version):
            logging.info("Conda version exists and valid, %s", conda_version)
        else:
            logging.info("Conda version not up to date, updating version")
            install_conda()
        
    env_name = detect_activated_conda()

    if env_name is not None:
        logging.info("Conda environment found and activated %s", env_name)
    else:
        create_env()

def detect_activated_conda() :
    env_name = None
    try:
        env_name = subprocess.run(
            ["conda", "info"],
            capture_output = True,
            text = True 
        ).stdout
        if env_name:
            env_name = re.search('(?<=active environment : )(\w+)', env_name)
            env_name = env_name.group(1)
            if env_name == "None":
                logging.info("Conda environment not detected active : %s", env_name)
                env_name = None
            else:
                logging.info("Conda environment detected active : %s", env_name)
    except Exception as error:
        logging.info("Environment not found active: %s ", error)
        
    return env_name

def detect_activated_conda_location() :
    env_location = None
    try:
        env_location = subprocess.run(
            ["conda", "info"],
            capture_output = True,
            text = True 
        ).stdout
        if env_location:
            env_location = re.search('(?<=base environment : )(/[a-zA-Z0-9\./]*[\s]?)', env_location)
            env_location = env_location.group(0)
            env_location = env_location.strip()
    except Exception as error:
        logging.info("Environment not found active: %s ", error)

    return env_location