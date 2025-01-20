import re
import json
import platform
import os
import shutil
import sys
import subprocess
import logging
import tarfile
import atexit
from psyneulinkviewer import configuration
from setuptools import setup, find_packages
from setuptools.command.install import install
from psyneulinkviewer.conda import check_conda_installation, detect_activated_conda, detect_activated_conda_location, get_conda_installed_path
from psyneulinkviewer.rosetta import check_rosetta_installation
from psyneulinkviewer.node import check_node_installation

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

in_conda = 'CONDA_PREFIX' in os.environ

def check_os():
    if os.name == 'nt':
        sys.exit('Windows is not supported')
    else:
        logging.info("OS version supported")

def check_python():
    if in_conda:
        if not (3, 7) <= sys.version_info < (3, 12):
            logging.error('Python version not supported, python 3.7 to 3.11 is required. %f' , sys.version_info)
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
        subprocess.check_call([sys.executable, "-m", "pip", "install", "psyneulink"])
        logger.info("Success installing psyneulink")
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
    release = json.loads(r.text)
    assets = release["assets"]

    target_release = None
    platform_name = platform.system().lower()
    if platform.system() == 'Darwin':
        platform_name = "osx"
    for asset in assets :
        if platform_name in asset['name'] :
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

    psyneulink_location = extract_location + configuration.installation_folder_name
    if platform.system() == "Darwin":
        extract_location = os.path.expanduser("~")
        psyneulink_location = extract_location + configuration.installation_folder_name_mac
    
    logging.info("Removing %s", psyneulink_location)
    # Remove the folder if it exists
    if os.path.exists(psyneulink_location):
        logging.info("Removing %s", psyneulink_location)
        shutil.rmtree(psyneulink_location)    
    
    permissions = os.access(extract_location, os.W_OK)
    logging.info("Extract location permissions : %s", permissions)

    tar.extractall(path=extract_location)
    tar.close()
    logging.info("Release file uncompressed at : %s", extract_location)

    application = os.path.join(extract_location, configuration.application_url)
    if platform.system() == "Darwin":
        application = os.path.join(extract_location, configuration.application_url_mac)
    
    symlink = configuration.symlink
    if platform.system() == "Darwin":
        symlink = os.path.join(extract_location, "psyneulinkviewer")

    permissions = os.access(symlink, os.W_OK)
    logging.info("Symlink path permission : %s", permissions)

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

def update_env_variable(var_name, var_value):
    # Determine the appropriate profile file based on the OS
    profile_file = os.path.expanduser('~/.profile')
    if platform.system() == 'Darwin':
        # For macOS and Linux
        profile_file = os.path.expanduser('~/.bashrc_profile')

    # Read the current content of the profile file
    try:
        with open(profile_file, 'r') as file:
            lines = file.readlines()
    except FileNotFoundError:
        lines = []

    # Update or add the environment variable
    var_found = False
    for i, line in enumerate(lines):
        if line.startswith(f'export {var_name}='):
            lines[i] = f'export {var_name}="{var_value}"\n'
            var_found = True
            break

    if not var_found:
        lines.append(f'export {var_name}="{var_value}"\n')

    # Write the updated content back to the profile file
    with open(profile_file, 'w') as file:
        file.writelines(lines)

    logging.info(f"Updated {var_name} in {profile_file}.")

def prerequisites():
    check_os()
    check_python()
    check_conda_installation()
    #Install package requirements on conda
    env_name = detect_activated_conda()
    env_location = detect_activated_conda_location()
    env_var_name = 'PSYNEULINK_ENV'
    env_var_value = configuration.env_name

    if env_name is None or env_location is None:
        conda_command_binary = configuration.conda_installation_path + configuration.continue_on_conda_new_env
        if platform.system() == 'Darwin':
            conda_command_binary = get_conda_installed_path() + configuration.continue_on_conda_new_env
        logging.info("Binary command %s ", conda_command_binary)
        subprocess.run(conda_command_binary, shell=True)
    else:
        env_var_value = env_name
        command = env_location + "/bin/conda run -n " + env_name + configuration.binary_commands
        logging.info("Binary command %s ", command)
        subprocess.run(command, shell=True)

    update_env_variable(env_var_name, env_var_value)

def main():
    prerequisites()

if __name__ == "__main__":
    main()