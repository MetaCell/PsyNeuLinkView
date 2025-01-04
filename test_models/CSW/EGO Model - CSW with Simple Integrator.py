# Princeton University licenses this file to You under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.  You may obtain a copy of the License at:
#     http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software distributed under the License is distributed
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.

import numpy as np
import graph_scheduler as gs
from importlib import import_module
from enum import IntEnum
import matplotlib.pyplot as plt
import torch
import TestParams
import test_models.CSW.DeclanParams as DeclanParams
import timeit
import psyneulink as pnl
torch.manual_seed(0)
from psyneulink import *
from psyneulink._typing import Union
from psyneulink._typing import Literal
from ScriptControl import (MODEL_PARAMS, CONSTRUCT_MODEL, DISPLAY_MODEL, RUN_MODEL,
                           REPORT_OUTPUT, REPORT_PROGRESS, PRINT_RESULTS, SAVE_RESULTS, PLOT_RESULTS)
import Environment
import_module(MODEL_PARAMS)
model_params = import_module(MODEL_PARAMS).model_params
dataset = Environment.generate_dataset(condition=model_params['curriculum_type'])

# TASK ENVIRONMENT
if model_params['num_stims'] is ALL:
    INPUTS = dataset.xs.numpy()
    TARGETS = dataset.ys.numpy()
else:
    INPUTS = dataset.xs.numpy()[:model_params['num_stims']]
    TARGETS = dataset.ys.numpy()[:model_params['num_stims']]
TOTAL_NUM_STIMS = len(INPUTS)

# MODEL
EMFieldsIndex = IntEnum('EMFields', ['STATE', 'CONTEXT', 'PREVIOUS_STATE'], start=0)
state_retrieval_weight = 0
RANDOM_WEIGHTS_INITIALIZATION = RandomMatrix(center=0.0, range=0.1)

retrieval_softmax_gain = model_params['softmax_temperature']
if is_numeric_scalar(model_params['softmax_temperature']):
    retrieval_softmax_gain = 1 / model_params['softmax_temperature']

memory_capacity = TOTAL_NUM_STIMS
if model_params['memory_capacity'] is ALL:
    memory_capacity = TOTAL_NUM_STIMS
elif not isinstance(model_params['memory_capacity'], int):
    raise ValueError(f"memory_capacity must be an integer or ALL; got {model_params['memory_capacity']}")

# Construct the model directly
state_input_layer = ProcessingMechanism(name=model_params['state_input_layer_name'], input_shapes=model_params['state_d'])

context_layer = TransferMechanism(name=model_params['context_layer_name'], input_shapes=model_params['context_d'], function=Tanh, integrator_mode=True, integration_rate=model_params['integration_rate'])

previous_state_layer = ProcessingMechanism(name=model_params['previous_state_layer_name'], input_shapes=model_params['previous_state_d'])

em = EMComposition(name=model_params['em_name'], memory_template=[[0] * model_params['state_d']] * 3, memory_fill=model_params['memory_init'], memory_capacity=TOTAL_NUM_STIMS, memory_decay_rate=0, softmax_gain=model_params['softmax_temperature'], softmax_threshold=model_params['softmax_threshold'], field_names=[model_params['state_input_layer_name'], model_params['previous_state_layer_name'], model_params['context_layer_name']], field_weights=(state_retrieval_weight, model_params['state_weight'], model_params['context_weight']), normalize_field_weights=model_params['normalize_field_weights'], concatenate_queries=model_params['concatenate_queries'], learn_field_weights=model_params['learn_field_weights'], learning_rate=model_params['learning_rate'], enable_learning=model_params['enable_learning'], device=model_params['device'])

prediction_layer = ProcessingMechanism(name=model_params['prediction_layer_name'], input_shapes=model_params['state_d'])

state_to_previous_state_pathway = [state_input_layer, MappingProjection(matrix=IDENTITY_MATRIX, learnable=False), previous_state_layer]
state_to_context_pathway = [state_input_layer, MappingProjection(matrix=IDENTITY_MATRIX, learnable=False), context_layer]
state_to_em_pathway = [state_input_layer, MappingProjection(sender=state_input_layer, receiver=em.nodes[model_params['state_input_layer_name'] + ' [VALUE]'], matrix=IDENTITY_MATRIX, learnable=False), em]
previous_state_to_em_pathway = [previous_state_layer, MappingProjection(sender=previous_state_layer, receiver=em.nodes[model_params['previous_state_layer_name'] + ' [QUERY]'], matrix=IDENTITY_MATRIX, learnable=False), em]
context_learning_pathway = [context_layer, MappingProjection(sender=context_layer, matrix=IDENTITY_MATRIX, receiver=em.nodes[model_params['context_layer_name'] + ' [QUERY]'], learnable=True), em, MappingProjection(sender=em.nodes[model_params['state_input_layer_name'] + ' [RETRIEVED]'], receiver=prediction_layer, matrix=IDENTITY_MATRIX, learnable=False), prediction_layer]

EGO_comp = AutodiffComposition([state_to_previous_state_pathway, state_to_context_pathway, state_to_em_pathway, previous_state_to_em_pathway, context_learning_pathway], learning_rate=model_params['learning_rate'], loss_spec=model_params['loss_spec'], name=model_params['name'], device=model_params['device'])

learning_components = EGO_comp.infer_backpropagation_learning_pathways(ExecutionMode.PyTorch)
EGO_comp.add_projection(MappingProjection(sender=state_input_layer, receiver=learning_components[0], learnable=False))
EGO_comp.scheduler.add_condition(em, BeforeNodes(previous_state_layer, context_layer))

model = EGO_comp



if INPUTS[0][9]:
            sequence_context = 'context 1'
else:
    sequence_context = 'context 2'
if INPUTS[1][1]:
    sequence_state = 'state 1'
else:
    sequence_state = 'state 2'

print(f"Running '{model_params['name']}' with {MODEL_PARAMS} for {model_params['num_stims']} stims "
    f"using {model_params['curriculum_type']} training starting with {sequence_context}, {sequence_state}...")
context = model_params['name']
start_time = timeit.default_timer()

stop_time = timeit.default_timer()
print(f"Elapsed time: {stop_time - start_time}")
model.show_graph(DISPLAY_MODEL)

fig, axes = plt.subplots(3, 1, figsize=(5, 12))
# Weight matrix
axes[0].imshow(model.projections[7].parameters.matrix.get(model.name), interpolation=None)
# L1 of loss
axes[1].plot((1 - np.abs(model.results[1:TOTAL_NUM_STIMS,2]-TARGETS[:TOTAL_NUM_STIMS-1])).sum(-1))
axes[1].set_xlabel('Stimuli')
axes[1].set_ylabel(model_params['loss_spec'])
# Logit of loss
axes[2].plot( (model.results[1:TOTAL_NUM_STIMS,2]*TARGETS[:TOTAL_NUM_STIMS-1]).sum(-1) )
axes[2].set_xlabel('Stimuli')
axes[2].set_ylabel('Correct Logit')
plt.suptitle(f"{model_params['curriculum_type']} Training")
plt.show()
