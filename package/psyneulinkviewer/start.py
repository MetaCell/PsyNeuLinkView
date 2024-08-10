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
from psyneulinkviewer import configuration
from setuptools import setup, find_packages
from setuptools.command.install import install
from psyneulinkviewer.conda import check_conda_installation
from psyneulinkviewer.rosetta import check_rosetta_installation
from psyneulinkviewer.node import check_node_installation

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

def check_os():
    if os.name == 'nt':
        sys.exit('Windows is not supported')
    else:
        logging.info("OS version supported")

def check_python():
    if not sys.version_info.major == 3 and not sys.version_info.minor == 7  :
        logging.error('Python version not supported, 3.11 is required. %f' , sys.version_info)
        sys.exit('Python version not supported, 3.11 is required.')
    else:
        logging.info("Python version is supported")

def check_graphviz():
    logging.info(configuration.graphviz +" is not installed, installing")
    try:
        result = subprocess.run(
            ["conda", "install", "graphviz"],
            capture_output = True,
            text = True 
        ).stdout
        logger.info("Success installing graphviz %s ", result)
    except Exception as error:
        logger.info("Error installing graphviz")

def check_psyneulink():
    logging.info(configuration.psyneulink +" installing")
    try:
        result = subprocess.run(
            ["pip", "install", "psyneulink"],
            capture_output = True,
            text = True 
        ).stdout
        logger.info("Success installing psyneulink %s ", result)
    except Exception as error:
        logger.info("Error installing psyneulink")

def get_filename_from_cd(cd):
    """
    Get filename from content-disposition
    """
    if not cd:
        return None
    fname = re.findall('filename=(.+)', cd)
    if len(fname) == 0:
        return None
    return fname[0]

def get_latest_release(installation_path):
    import requests

    headers = {'Accept': 'application/vnd.github+json','Authorization': 'Bearer JWT', 'X-GitHub-Api-Version' : '2022-11-28'}
    r = requests.get(configuration.releases_url, allow_redirects=True)
    releases = json.loads(r.text)
    assets = releases[1]["assets"]

    target_release = None
    for asset in assets :
        if platform.system().lower() in asset['name'] :
            target_release = asset["browser_download_url"]

    logging.info("System detected %s :", platform.system())
    logging.info("Target release url found %s :", target_release)
    logging.info("Downloading release to %s...", installation_path)
    release_download = requests.get(target_release, allow_redirects=True)

    filename = get_filename_from_cd(release_download.headers.get('content-disposition'))
    tar_location = os.path.join(installation_path, filename)
    logging.info("Writing release to %s...", tar_location)
    open(tar_location, 'wb').write(release_download.content)

    logging.info("Opening compressed file %s", filename)
    tar = tarfile.open(tar_location)
    extract_location = configuration.extract_location
    tar.extractall(path=extract_location)
    tar.close()
    logging.info("Release file uncompressed at : %s", extract_location)

    application = os.path.join(extract_location, configuration.application_url)
    symlink = configuration.symlink
    logging.info("Creating symlink at : %s", symlink)
    logging.info("Application at : %s", application)
    try:
       if os.path.islink(symlink):
           os.remove(symlink)
       os.symlink(application, symlink)
    except OSError as e:
       logging.error("Error applying symlin %f ", e)

    logging.info("Symlink created")

    logging.info("*** To launch the application run : **** ")
    logging.info(" %s " ,symlink)

def continue_on_conda():
    check_rosetta_installation()
    check_node_installation()
    check_graphviz()
    check_psyneulink()
    get_latest_release(os.path.dirname(os.path.realpath(__file__)))

def prerequisites():
    check_os()
    check_python()
    check_conda_installation()
    #Install package requirements on conda
    subprocess.run(configuration.continue_on_conda, shell=True)


def main():
    prerequisites()

if __name__ == "__main__":
    main()