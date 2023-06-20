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

export function getIconFromType(model) {
  if (model !== undefined) {
    switch (model.getOption('shape')) {
      case PNLMechanisms.MECHANISM:
      case PNLMechanisms.LEARNING_MECH:
      case PNLMechanisms.MODULATORY_MECH:
      case PNLMechanisms.PROCESSING_MECH:
      case PNLMechanisms.CONTRASTIVE_MECH:
      case PNLMechanisms.AUTO_LEARNING_MECH:
      case PNLMechanisms.PREDICTION_ERROR_MECH:
      case PNLMechanisms.DEFAULT_PROCESSING_MECH:
        return <MechIcon />;
      case PNLMechanisms.GATING_MECH:
        return <GatingMechIcon />;
      case PNLMechanisms.CTRL_MECH:
      case PNLMechanisms.LC_CTRL_MECH:
      case PNLMechanisms.AGT_CTRL_MECH:
      case PNLMechanisms.OPT_CTRL_MECH:
        return <ControlMechIcon />;
      case PNLMechanisms.COMPOSITION_MECH:
        return <CompositionIcon />;
      case PNLMechanisms.INTEGRATOR_MECH:
        return <IntegratorMechIcon />;
      case PNLMechanisms.OBJ_MECH:
        return <ObjMechIcon />;
      case PNLMechanisms.TRANSFER_MECH:
        return <TransferMechIcon />;
      case PNLMechanisms.RECURRENT_TRANSFER_MECH:
        return <RecurrentTransferMechIcon />;
      case PNLMechanisms.DDM:
        return <DDMIcon />;
      case PNLMechanisms.EPISODIC_MECH:
        return <EpisodicMechIcon />;
      case PNLMechanisms.COMPARATOR_MECH:
        return <ComparatorMechIcon />;
      case PNLMechanisms.KOHONEN_MECH:
      case PNLMechanisms.KOHONEN_LEARNING_MECH:
        return <KohonenMechIcon />;
      case PNLMechanisms.KWTA_MECH:
        return <KWTAMechIcon />;
      case PNLMechanisms.LCA_MECH:
        return <LCAMechIcon />;
      default:
        return <MechIcon />;
    }
  }
  return null;
}
p;
