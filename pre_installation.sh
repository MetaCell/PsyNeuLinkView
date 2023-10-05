#!/bin/bash

PSNL_HOME=`pwd`
cd ../
git clone https://github.com/PrincetonUniversity/PsyNeuLink
cd PsyNeuLink
git checkout devel
pip install -e .
cd $PSNL_HOME
