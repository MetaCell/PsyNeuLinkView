# Production installation

## Pre installation

Before running the software follow the steps below

- Check to see if you have conda installed by using command:

```
conda --version
```

If not, follow instructions on [Conda page](https://docs.conda.io/projects/conda/en/latest/user-guide/install/macos.html) to install it. 

- Create a conda environment

```
conda create --name metacell python=3.11
```

* Activate the conda environment just created

```
conda activate metacell
```

- Check if Node is installed with command below, if not [download installer](https://nodejs.org/en/download) and run the installation.

```
conda create --name metacell python=3.11
```

* Make the pre_installation.sh script executable

```
chmod +x pre_installation.sh
```

* Run the pre_installation script that will take care of installing PsyNeuLink

```
bash pre_installation.sh
```

* Download the packaged version of the software from the [releases page](https://github.com/MetaCell/PsyNeuLinkView/releases) and run the PsyNeuLinkViewer


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
