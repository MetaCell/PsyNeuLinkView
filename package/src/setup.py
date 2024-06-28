import requests
import re
import json
import platform
import os
import logging
import tarfile
from setuptools import setup, find_packages
from setuptools.command.install import install

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

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
    url = 'https://api.github.com/repos/MetaCell/PsyNeuLinkView/releases'
    headers = {'Accept': 'application/vnd.github+json','Authorization': 'Bearer JWT', 'X-GitHub-Api-Version' : '2022-11-28'}
    r = requests.get(url, allow_redirects=True)
    releases = json.loads(r.text)
    assets = releases[0]["assets"]

    target_release = None
    for asset in assets :
        if platform.system().lower() in asset['name'] :
            target_release = asset["browser_download_url"]

    logging.info("System detected %s :", platform.system())
    logging.info("Target release url found %s :", target_release)
    logging.info("Downloading release to %s...", installation_path)
    release_download = requests.get(target_release, allow_redirects=True)

    filename = get_filename_from_cd(release_download.headers.get('content-disposition'))
    location = os.path.join(installation_path, filename)
    logging.info("Writing release to %s...", location)
    open(location, 'wb').write(release_download.content)

    logging.info("Opening compressed file %s", filename)
    tar = tarfile.open(location)
    tar.extractall(path=installation_path)
    tar.close()
    logging.info("Release file uncompressed at : %s", location)

    application = os.path.join(installation_path, "psyneulinkviewer-linux-x64/psyneulinkviewer")
    symlink = "/usr/local/bin/psyneulinkviewer"
    logging.info("Creating symlink at : %s", symlink)
    os.symlink(application, symlink)
    logging.info("Symlink created")
    logging.info("***")
    logging.info("***")
    logging.info("***")
    logging.info("***")
    logging.info("*** To launch the application run : **** ")
    logging.info(" %s " , application)

class InstallCommand(install):
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
        install.run(self)
        get_latest_release(self.path)

setup(
    name="PsyNeuLinkView",
    version="0.0.5",
    cmdclass={
        'install': InstallCommand
    }
)