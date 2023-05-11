import { PNLMechanisms } from "../../../constants";

export interface ExtraObject {
    position?: {
        x: number;
        y: number;
    },
    boundingBox?: {
        llx: number;
        lly: number;
        urx: number;
        ury: number;
    },
    isExpanded?: Boolean,
    icon?: string
}

export const MechanismToVariant: any = {
    [PNLMechanisms.PROCESSING_MECH]: 'node-blue',
    [PNLMechanisms.LEARNING_MECH]: 'node-red',
}

export const MechanismToOptions: any = {
    [PNLMechanisms.PROCESSING_MECH]: {
        function: 'linear',
    },
    [PNLMechanisms.LEARNING_MECH]: {
        error_sources: '',
        function: 'linear',
        learning_rate: '0.5',
        modulation: 'None',
        input_source: '',
        output_source: '',
        error_matrices: '',
        primary_learned_projection: '',
        learned_projections: '',
        learning_enabled: false,
    },
}
