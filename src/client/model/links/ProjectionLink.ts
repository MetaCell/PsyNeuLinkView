// import MetaLink from 'meta-diagram';
import IMetaLinkConverter from './IMetaLinkConverter';
import { MetaLink } from '@metacell/meta-diagram';
import { PNLClasses } from '../../../constants';

export default class ProjectionLink implements IMetaLinkConverter {
    name: string;
    sender: string;
    senderPort: string;
    receiver: string;
    receiverPort: string;
    extra: Object;
    isExpanded: Boolean;
    innerClass: string;

    constructor(name: string, sender: string, senderPort: string, receiver: string, receiverPort: string, isExpanded?: Boolean, extra?: Object) {
        this.name = name;
        this.sender = sender;
        this.senderPort = senderPort;
        this.receiver = receiver;
        this.receiverPort = receiverPort;
        this.extra = extra !== undefined ? extra : {};
        this.isExpanded = isExpanded !== undefined ? isExpanded : false;
        this.innerClass = PNLClasses.PROJECTION;

        if (this.name === '') {
            this.name = 'link_' + this.sender + '-to-' + this.receiver;
        }
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
