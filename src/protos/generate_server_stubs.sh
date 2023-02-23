#!/bin/bash

# python -m pip install google-pasta
# python -m pip install grpcio
# python -m pip install grpcio-tools

python -m grpc_tools.protoc -I. --python_out=../server/ --grpc_python_out=../server/ ./psyneulink.proto
