#!/bin/bash

#npm install -g protoc-gen-grpc
#protoc-gen-grpc --js_out=import_style=commonjs,binary:../client/grpc --grpc_out=../client/grpc --proto_path ./ ./psyneulink.proto 

#npm i -g grpc-tools
grpc_tools_node_protoc --js_out=import_style=commonjs,binary:../client/grpc --grpc_out=grpc_js:../client/grpc --proto_path ./ ./psyneulink.proto
