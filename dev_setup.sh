#!/bin/bash

npm -g install yalc
PSYVIEW=`pwd`

if [ -d '../meta-diagram' ]; then
	cd ../meta-diagram;
	yarn && yarn run build:dev && yalc push --changed
	cd $PSYVIEW
else
	cd ../
	git clone https://github.com/metacell/meta-diagram
	cd meta-diagram
	yarn && yarn run build:dev && yalc push --changed
	cd $PSYVIEW
fi

yalc add @metacell/meta-diagram
yarn
yarn run start
