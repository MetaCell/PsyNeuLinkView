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