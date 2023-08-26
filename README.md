# Production installation

## Pre installation

Before running the software follow the steps below

- Create a conda environment

```
conda create --name psnl_viewer python=3.7
```

* Activate the conda environment just created

```
conda activate psnl_viewer
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

- If you need to work purely on the frontend you can run:

```
yarn run start:dev
```

- If you need to work on the entire flow of the application you must start it with:

```
yarn run dev
```
