#!/bin/bash

PSNL_HOME=`pwd`
cd ../
git clone https://github.com/PrincetonUniversity/PsyNeuLink
cd PsyNeuLink
<<<<<<< release/0.0.5-fixes -- Incoming Change
git checkout master
=======
git checkout devel
>>>>>>> develop -- Current Change
pip install -e .
cd $PSNL_HOME
