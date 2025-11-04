export interface PHEInputs {
  volumetricFlowRate: number; // m³/h
  numberOfPlates: number;
  numberOfPasses: number;
  platePitch: number; // m
  plateThickness: number; // m
  effectivePlateWidth: number; // m
  corrugationFactor: number;
  portDiameter?: number; // m (optional for port velocity)
}

export interface PHEResults {
  flowGap: number; // m
  numberOfChannels: number;
  totalFlowArea: number; // m²
  velocity: number; // m/s
  portVelocity?: number; // m/s (if port diameter provided)
  portArea?: number; // m²
  massVelocity?: number; // kg/(m²·s) (if density provided)
}

export interface CalculationSteps {
  flowGap: string;
  numberOfChannels: string;
  totalFlowArea: string;
  velocity: string;
  portVelocity?: string;
}
