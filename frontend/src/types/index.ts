export type NodeType = 'job' | 'project' | 'education' | 'insig' | 'root';

export interface NodeData {
    id: number;
    title: string;
    jobName?: string;
    startDate: Date;
    endDate?: Date;
    category: NodeType;
    description?: string;
    primaryRelatedNodes: number[];
    secondaryRelatedNotes: number[];
    x: number;
    y: number;
}

export interface SidebarData {
    isOpen: boolean;
    nodeInfo: NodeData | null;
}