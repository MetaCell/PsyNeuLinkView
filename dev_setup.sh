#!/bin/bash

# TODO we will uncomment the below when we will have the deployment for this
#mv package.json old_package.json
#mv package.dev package.json
npm -g install yalc

if [ -d '../meta-diagram' ]; then
	cd ../meta-diagram;
	yarn && yarn run build:dev && yalc push --changed
	cd -
else
	cd ../
	git clone https://github.com/metacell/meta-diagram
	cd meta-diagram
	yarn && yarn run build:dev && yalc push --changed
	cd -
fi

yalc add @metacell/meta-diagram
yarn
yarn run start
#mv package.json package.dev
#mv old_package.json package.json

