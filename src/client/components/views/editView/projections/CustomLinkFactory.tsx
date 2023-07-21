import { MetaLinkModel, MetaLinkFactory } from '@metacell/meta-diagram';
// import { DefaultLinkModel } from '@projectstorm/react-diagrams';
import React from 'react';
// import { CustomLinkWidget } from './CusLinkWidget';
import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import CustomLinkWidget  from './CustomLinkWidget';
import { ReactDiagramMetaTypes } from '@metacell/meta-diagram';

export class CustomLinkFactory extends DefaultLinkFactory {
  componentsMap: Map<string, React.ComponentType>;

  constructor(componentsMap: Map<string, React.ComponentType>) {
    // super('componentsMap');
    super(ReactDiagramMetaTypes.META_LINK);
    this.componentsMap = componentsMap;
  }
  generateModel(): MetaLinkModel {
    return new MetaLinkModel({});
  }

  getNewInstance(): MetaLinkModel {
    return new MetaLinkModel({});
  }
  generateReactWidget(event: { model: MetaLinkModel }): JSX.Element {
    // const link = this.engine.getModel().getLink(event.model.getID());
    return (
      <CustomLinkWidget model={event.model} engine={this.engine} />
    );
  }

  generateLinkSegment(
    model: MetaLinkModel,
    selected: boolean,
    path: string
  ): JSX.Element {
    // @ts-ignore
    if (this.componentsMap.has(model.getOptions()?.shape)) {
      const ReactComponentType = this.componentsMap.get(
        // @ts-ignore
        model.getOptions().shape
      );

      return (
        // @ts-ignore
        <ReactComponentType
          key={`link-factory-${model.getOptions().id}`}
          engine={this.engine}
          model={model}
          path={path}
          ref={(ref: any) => {
						path = ref;
					}}
          selected={selected}
        />
      );
    }
    // TODO: Generate default link instead
    return <div>Unknown Type</div>;
  }
}
