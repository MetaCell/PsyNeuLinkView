#!/bin/bash

# python -m pip install google-pasta
# python -m pip install grpcio
# python -m pip install grpcio-tools

python -m grpc_tools.protoc -I. --python_out=../server/stubs/ --grpc_python_out=../server/stubs/ ./psyneulink.proto
