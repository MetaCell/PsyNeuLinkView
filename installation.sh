#!/bin/bash


#!/bin/bash
set -e

INSTALL=false
UPDATE=false

function parse() {
    for arg in "$@"; do # transform long options to short ones
        shift
        case "$arg" in
            "--install") set -- "$@" "-n" ;;
            "--update") set -- "$@" "-v" ;;
            *) set -- "$@" "$arg"
        esac
    done

    while getopts "iu" optname
    do
        case "$optname" in
            "i") INSTALL=true ;;
            "u") UPDATE=true ;;
        esac
    done
    shift "$((OPTIND-1))" # shift out all the already processed options
}


parse "$@"

echo "=== Install / Update script for PsyNeuLinkViewer and meta-diagram ==="
#echo "Install is"
#echo $INSTALL
#echo "Update is"
#echo $UPDATE



if [ "$INSTALL" = true ]; then
	echo " ### re-installing all the packages"
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
	rm -rf node_modules/
	yarn
	yarn run start
elif [ "$UPDATE" = true ]; then
	echo " ### Updating meta-diagram"
	yarn remove @metacell/meta-diagram
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
else
	echo " - The script can be run in update (-u / --update) or install (-i / --install) mode."
	echo " - please use the option desidered to run the script again."
fi
