// Global types for the StableHub application

export interface GeneratedResult {
  id: number;
  prompt: string;
  imageUrls: string[];
  controlnetParams?: ControlNetParams;
  parameters?: any;
  timestamp: Date;
}

export interface ControlNetParams {
  strength: number;
  startPercent: number;
  endPercent: number;
}

export interface TooltipData {
  [key: string]: string;
}
