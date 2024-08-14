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
            logging.info("found env %s", env_name)
        logging.info("env_name %s", env_name)
        if env_name == configuration.env_name:
            logging.info("Conda environment found %s", env_name)
    except Exception as error:
        logging.info("Conda environment not found")

    if env_name is None:
        logging.info("Creating conda environment ")
        subprocess.run(configuration.create_env, shell=True)

    
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
    if os.name == 'posix':
        bash_file = wget.download(configuration.linux_conda_bash, out="psyneulinkviewer")
    elif platform.system() == 'Darwin':
        bash_file = wget.download(configuration.mac_conda_bashf)

    logging.info("Installing conda %s", bash_file)
    logging.info(bash_file)
    subprocess.run("chmod +x " + bash_file, shell=True)
    subprocess.run(bash_file + " -b -u -p ~/miniconda3", shell=True)
    subprocess.run("~/miniconda3/bin/conda init bash", shell=True)
    subprocess.run("~/miniconda3/bin/conda init zsh", shell=True)
    subprocess.run("exec bash bash_scripts/conda.sh", shell=True)
    #subprocess.run(configuration.chmod_conda, shell=True)

    logging.info("Clean up ")
    subprocess.run("rm -rf " + bash_file, shell=True)

    # logging.info("To continue, run command below on terminal and then re-run pip install")
    # logging.info("sudo ~/.bashrc")
    # sys.exit()

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
            print(type(env_name))
            if env_name == "None":
                logging.info("Conda version not detected : %s", env_name)
                env_name = None
            else:
                logging.info("Conda version detected : %s", env_name)
    except Exception as error:
        logging.info("Environment not found active: %s ", error)

    if env_name is not None:
        logging.info("Conda environment found and activated %s", env_name)
    else:
        create_env()