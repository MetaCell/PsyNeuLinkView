#!/bin/bash

PSNL_HOME=`pwd`
cd ../
git clone https://github.com/PrincetonUniversity/PsyNeuLink
cd PsyNeuLink
git checkout 12bc1298fe
cd $PSNL_HOME