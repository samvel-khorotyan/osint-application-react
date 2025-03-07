export enum ScanStatus {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"
}

export interface ScanResult {
    subdomains?: string[];
    ips?: string[];
    rawOutput?: string;
    error?: string;
}

export interface Scan {
    id: number;
    domain: string;
    tool: string;
    startTime: string;
    endTime?: string;
    status: ScanStatus;
    results?: ScanResult;
    displayOrder: number;
}

export interface ScanRequest {
    domain: string;
    timeout?: number;
    passive?: boolean;
}

export interface UpdateDisplayOrderRequest {
    scanId: number;
    newOrder: number;
}
