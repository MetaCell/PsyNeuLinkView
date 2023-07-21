import { MetaPortModel, ReactDiagramMetaTypes } from "@metacell/meta-diagram";
import { DefaultPortModel, DiagramEngine } from '@projectstorm/react-diagrams';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';


export class CustomPortFactory extends AbstractModelFactory<DefaultPortModel, DiagramEngine>{
	constructor() {
    super(ReactDiagramMetaTypes.META_LINK);
	}

	generateModel(): MetaPortModel {
		return new MetaPortModel({
			name: 'unknown'
		});
	}
}