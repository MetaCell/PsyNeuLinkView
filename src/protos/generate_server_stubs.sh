#!/bin/bash

python -m grpc_tools.protoc -I. --python_out=../server/ --grpc_python_out=../server/ ./psyneulink.proto
