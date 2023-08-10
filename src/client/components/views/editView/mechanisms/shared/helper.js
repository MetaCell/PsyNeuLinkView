import * as React from 'react';
import { PNLMechanisms } from '../../../../../../constants';
import {
  ComparatorMechIcon,
  CompositionIcon,
  ControlMechIcon,
  DDMIcon,
  EpisodicMechIcon,
  GatingMechIcon,
  IntegratorMechIcon,
  KWTAMechIcon,
  KohonenMechIcon,
  LCAMechIcon,
  MechIcon,
  ObjMechIcon,
  RecurrentTransferMechIcon,
  TransferMechIcon,
} from './Icons';

export function getIconFromType(type, props) {
  if (type !== undefined) {
    switch (type) {
      case PNLMechanisms.MECHANISM:
      case PNLMechanisms.LEARNING_MECH:
      case PNLMechanisms.MODULATORY_MECH:
      case PNLMechanisms.PROCESSING_MECH:
      case PNLMechanisms.CONTRASTIVE_MECH:
      case PNLMechanisms.AUTO_LEARNING_MECH:
      case PNLMechanisms.PREDICTION_ERROR_MECH:
      case PNLMechanisms.DEFAULT_PROCESSING_MECH:
        return <MechIcon {...props} />;
      case PNLMechanisms.GATING_MECH:
        return <GatingMechIcon {...props} />;
      case PNLMechanisms.CTRL_MECH:
      case PNLMechanisms.LC_CTRL_MECH:
      case PNLMechanisms.AGT_CTRL_MECH:
      case PNLMechanisms.OPT_CTRL_MECH:
        return <ControlMechIcon {...props} />;
      case PNLMechanisms.COMPOSITION_MECH:
        return <CompositionIcon {...props} />;
      case PNLMechanisms.INTEGRATOR_MECH:
        return <IntegratorMechIcon {...props} />;
      case PNLMechanisms.OBJ_MECH:
        return <ObjMechIcon {...props} />;
      case PNLMechanisms.TRANSFER_MECH:
        return <TransferMechIcon {...props} />;
      case PNLMechanisms.RECURRENT_TRANSFER_MECH:
        return <RecurrentTransferMechIcon {...props} />;
      case PNLMechanisms.DDM:
        return <DDMIcon {...props} />;
      case PNLMechanisms.EPISODIC_MECH:
        return <EpisodicMechIcon {...props} />;
      case PNLMechanisms.COMPARATOR_MECH:
        return <ComparatorMechIcon {...props} />;
      case PNLMechanisms.KOHONEN_MECH:
      case PNLMechanisms.KOHONEN_LEARNING_MECH:
        return <KohonenMechIcon {...props} />;
      case PNLMechanisms.KWTA_MECH:
        return <KWTAMechIcon {...props} />;
      case PNLMechanisms.LCA_MECH:
        return <LCAMechIcon {...props} />;
      default:
        return <MechIcon {...props} />;
    }
  }
  return null;
}
