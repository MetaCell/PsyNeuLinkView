// import MetaLink from 'meta-diagram';
import { PNLClasses } from '../../../constants';
import IMetaLinkConverter from './IMetaLinkConverter';
import MechanismNode from '../nodes/mechanism/MechanismNode';
import { MetaLink, PortTypes } from '@metacell/meta-diagram';


export default class ProjectionLink implements IMetaLinkConverter {
    name: string;
    sender: string;
    senderNode: MechanismNode;
    senderPort: string
    receiver: string;
    receiverNode: MechanismNode;
    receiverPort: string;
    extra: Object;
    isExpanded: Boolean;
    innerClass: string;

    constructor(name: string, sender: MechanismNode, senderPort: string, receiver: MechanismNode, receiverPort: string, isExpanded?: Boolean, extra?: Object) {
        this.name = name;
        this.senderNode = sender;
        this.sender = this.senderNode.getName();
        this.senderPort = this.extractPort(senderPort, this.senderNode, PortTypes.OUTPUT_PORT);
        this.receiverNode = receiver;
        this.receiver = this.receiverNode.getName();
        this.receiverPort = this.extractPort(receiverPort, this.receiverNode, PortTypes.INPUT_PORT);
        this.extra = extra !== undefined ? extra : {};
        this.isExpanded = isExpanded !== undefined ? isExpanded : false;
        this.innerClass = PNLClasses.PROJECTION;

        if (this.name === '') {
            this.name = 'link_' + this.sender + '_to_' + this.receiver;
        }
    }

    extractPort(port: string, node: MechanismNode, portType: string) {
        let result: string = '';
        const portToSearch = port?.replaceAll('-', '_')?.replace(portType, node.getName())
        node?.getPorts()?.[portType].forEach((outputPort: any) => {
            if (portToSearch === outputPort) {
                if (result === '') {
                    result = portToSearch;
                } else {
                    throw Error('There are more than one ports with the same name.');
                }
            }
        });
        if (result === '') {
            //throw Error('There is no port with that name.');
        }
        return result;
    }

    getName() : string {
        return this.name;
    }

    setExpanded(expandedState: Boolean) {
        this.isExpanded = expandedState !== undefined ? expandedState : !this.isExpanded;
    }

    getExpanded() : Boolean {
        return this.isExpanded;
    }

    onMaximise() : any {
        console.log('onMaximise do something.');
    }

    getSender(): string {
        return this.sender;
    }

    getSenderPort(): string {
        return this.senderPort;
    }

    getReceiver(): string {
        return this.receiver;
    }

    getReceiverPort(): string {
        return this.receiverPort;
    }

    getMetaLink() : MetaLink {
        return new MetaLink(
            this.name,
            this.name,
            PNLClasses.PROJECTION,
            this.sender,
            this.senderPort,
            this.receiver,
            this.receiverPort,
            'undefined',
            new Map(
                Object.entries({
                    pnlClass: PNLClasses.PROJECTION,
                })
            )
        );
    }

    getType(): string {
        return this.innerClass;
    }
}
