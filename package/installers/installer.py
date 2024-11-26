from os import path
import sys
import subprocess
import requests

def does_it_exists(command):
    rc = subprocess.call(['which', command])
    if rc == 0:
        return True
    else:
        return False


# create a function, download_installer, that takes in input the url and
# save the bash script in the home directory of the user
def download_installer(url):
    # download the installer
    response = requests.get(url)
    # save the installer in the home directory
    installer_path = path.join(path.expanduser('~'), 'installer.sh')
    with open(installer_path, 'wb') as f:
        f.write(response.content)
    return installer_path


# check if the platofrm is windows, linux or macos
if sys.platform == 'linux':
    # install the linux specific package
    linux_url = 'https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/linux_installer.sh'
    linux_installer = download_installer(linux_url)
    command1 = ["xterm", "-fa", "'Monospace'", "-fs", "14", "-hold", "-e", "/bin/bash", "-ilc", "cd $HOME && chmod +x " + linux_installer + " && bash " +  linux_installer + "; rm -f " + linux_installer]
    command2 = ["konsole", "--noclose", "-e", "$SHELL", "-ilc", "cd $HOME && chmod +x " + linux_installer + " && bash " +  linux_installer + "; rm -f " + linux_installer]
    command3 = ["gnome-terminal", "--", "$SHELL", "-ilc", "cd $HOME && chmod +x " + linux_installer + " && bash " +  linux_installer + "; rm -f " + linux_installer]
    # check if the user has the item 0 of each command array installed, once you find one installed run the command
    for command in [command1, command2, command3]:
        if does_it_exists(command[0]):
            subprocess.call(command)
            break
elif sys.platform == 'darwin':
    # install the macos specific package
    mac_url = 'https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/mac_installer.sh'
    mac_installer = download_installer(mac_url)
    command1 = ["osascript", "-e", "tell application \"Terminal\" to do script \"cd $HOME && chmod +x " + mac_installer + " && bash " +  mac_installer + "; rm -f " + mac_installer + "\" end tell"]
    subprocess.call(command1)
else:
    raise Exception('Unsupported platform')
