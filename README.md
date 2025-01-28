# Installing on MacOS

## Use the installer file

Download the [installer](https://github.com/MetaCell/PsyNeuLinkView/releases/download/0.0.8/psyneu-installer-macos-latest.tar.gz) file, uncompress the archive, enter in the folder extracted and click on installer.app to execute the PsyNeuLinkViewer installation.

Note: The app is not signed through an Apple developer ID, so depending on the security settings of your machine you might need to instruct the Gatekeeper that the app you are trying to run is secure.

To do so:

- On your Mac, choose Apple menu  > System Settings, then click Privacy & Security  in the sidebar. (You may need to scroll down.)
- Go to Security, then click Open.
- Click Open Anyway.
- This button is available for about an hour after you try to open the app.
- Enter your login password, then click OK.

## Manual installation in a custom conda environment

PsyNeuLinkViewer is an application built on top of Electron (and NodeJS) and python for what concern the simulation part, since is levering [PsyNeuLink](https://github.com/PrincetonUniversity/PsyNeuLink) at the backend level.
We might want to run this installation for a specific conda environment, in that case the steps to follow are:

- Download the script from <a href="https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/mac_installer.sh" download>here</a>

- Open your Terminal application

- Move to the same folder where the file has been downloaded
```
cd ~/Downloads
```

- Create and/or activate the conda environment you want to use
```
conda create --name psyneulinkview python=3.10
conda activate psyneulinkview
```

- Run the installation script
```
bash mac_installer.sh
```
- Once finished, the script will create the terminal command psyneulinkviewer which can be used to launch the application, otherwise this will be present also in your desktop.

# Installing on Linux

## Use the installer file

Download the [installer](https://github.com/MetaCell/PsyNeuLinkView/releases/download/0.0.8/psyneu-installer-ubuntu-latest.tar.gz) file, uncompress the archive, enter in the folder extracted and click on installer.app to execute the PsyNeuLinkViewer installation.

## Manual installation in a custom conda environment

PsyNeuLinkViewer is an application built on top of Electron (and NodeJS) and python for what concern the simulation part, since is levering [PsyNeuLink](https://github.com/PrincetonUniversity/PsyNeuLink) at the backend level.
We might want to run this installation for a specific conda environment, in that case the steps to follow are:

- Download the script from <a href="https://raw.githubusercontent.com/MetaCell/PsyNeuLinkView/develop/package/scripts/linux_installer.sh" download>here</a>

- Open your Terminal application

- Move to the same folder where the file has been downloaded
```
cd ~/Downloads
```

- Create and/or activate the conda environment you want to use
```
conda create --name psyneulinkview python=3.10
conda activate psyneulinkview
```

- Run the installation script
```
bash linux_installer.sh
```
- Once finished, the script will create the terminal command psyneulinkviewer which can be used to launch the application, otherwise this will be present also in your desktop.

# Installation process inside script

The scripts above run the following commands in order:

Firs installs the python module 'psyneulinkviewer' from PyPi

```
sudo pip install psyneulinkviewer
```

This commands installs required libraries and packages. Also creates a conda enviroment where the needed packages are installed.

After successfully installing the python package above, it reset the user's bash profile to apply the settings changes

- Linux

```
source ~/.profile
```

- Mac

```
source ~/.bash_profile
```

Then, a desktop file is created on the Desktop which allows users to open the application this way

# Psyneulinkviewer Requirements

Psyneulinkviewer requires:

- Python 3.11 and pip
- Pip packages : psyneulink, graphviz, wget, packaging and requests
- Conda 4.9.1 or above
- Node 4.19.0 or above
- Rosetta ( on Mac)

All of these are downloaded and installed as part of psyneulinkviewer installation process.

# Testing Models

If all went well with installation, you should see the application running as in screenshot below :
![image](https://github.com/user-attachments/assets/ec84044c-287a-4e39-bdf7-aa27cdc486f9)

To test models, download [these models](https://github.com/MetaCell/PsyNeuLinkView/tree/main/test_models/working_tests) and import one at a time to test. Each time a Model is open, the previous one will disappear. I recommend you start with the models inside 'working_tests', as those are the ones we know for sure should we working.

To import go to File -> Open Models

# PsyNeuLinkView Package Building

To build pip package

```
cd package
python3 -m pip install build
python3 -m build --sdist
```

To test local build

```
pip install dist/psyneulinkviewer-VERSIOn.tar.gz
```

To upload to distribution server. You will need token shared privately to be able to upload.

```
python3 -m twine upload dist/*
```

To upload to test Pypi server

```
python3 -m twine upload --repository testpypi dist/*
```

# Development Installation

## Requirements

- it requires node version ^14.21.0
  I would suggest to install nvm if you have a different node version so you can manage multiple node versions, installation steps [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- it requires [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) (follow the installation instructions)
- it requires [yalc](https://www.npmjs.com/package/yalc) (follow the installation instructions)

## Installation

- Close this repository

```
git clone -b metacell https://github.com/MetaCell/PsyNeuLinkView
```

- At the same level of the above repository clone meta-diagram

```
git clone -b develop https://github.com/MetaCell/meta-diagram/
```

- Ensure yarn and yalc are installed in your machine, otherwise the installation script will fail.
- Cd inside the PsyNeuLinkView repository folder

```
cd PsyNeuLinkView
```

- run the installation script

```
chmod +x installation.sh
./installation.sh -i
```

## Usage

- If you need to work on the entire flow of the application you must start it with:

```
yarn run dev
```
