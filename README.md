# Requirements

- it requires node version ^14.21.0
I would suggest to install nvm if you have a different node version so you can manage multiple node versions, installation steps [here](https://www.freecodecamp.org/news/node-version-manager-nvm-install-guide/)
- it requires [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#debian-stable) (follow the installation instructions)
- it requires [yalc](https://www.npmjs.com/package/yalc) (follow the installation instructions)

# Installation

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

- If you need to work purely on the frontend you can run:
```
yarn run start:dev
```

- If you need to work on the entire flow of the application you must start it with:
```
yarn run dev
```

# Usage

install dependencies with "yarn"
run the dev server with "yarn run dev"
