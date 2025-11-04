import { PHEInputs, PHEResults, CalculationSteps } from '@/types'

/**
 * Calculate the flow gap between plates
 * b = p - t
 */
export function calculateFlowGap(platePitch: number, plateThickness: number): number {
  return platePitch - plateThickness
}

/**
 * Calculate the number of channels per fluid side
 * N_ch = (N_pl - 1) / N_pass
 */
export function calculateNumberOfChannels(
  numberOfPlates: number,
  numberOfPasses: number
): number {
  const channels = (numberOfPlates - 1) / numberOfPasses
  if (!Number.isInteger(channels)) {
    throw new Error(
      'Invalid configuration: Number of channels must be an integer. Check plate count and pass configuration.'
    )
  }
  return channels
}

/**
 * Calculate the total effective cross-sectional flow area
 * A_flow = N_ch × W_p × b × φ
 */
export function calculateFlowArea(
  numberOfChannels: number,
  effectivePlateWidth: number,
  flowGap: number,
  corrugationFactor: number
): number {
  return numberOfChannels * effectivePlateWidth * flowGap * corrugationFactor
}

/**
 * Calculate the fluid velocity
 * v = Q / A_flow
 */
export function calculateVelocity(
  volumetricFlowRate: number,
  flowArea: number
): number {
  if (flowArea === 0) {
    throw new Error('Flow area cannot be zero')
  }
  return volumetricFlowRate / flowArea
}

/**
 * Calculate port area
 * A_port = π × D_port² / 4
 */
export function calculatePortArea(portDiameter: number): number {
  return (Math.PI * Math.pow(portDiameter, 2)) / 4
}

/**
 * Calculate port velocity
 * v_port = Q / A_port
 */
export function calculatePortVelocity(
  volumetricFlowRate: number,
  portArea: number
): number {
  if (portArea === 0) {
    throw new Error('Port area cannot be zero')
  }
  return volumetricFlowRate / portArea
}

/**
 * Main calculation function that performs all PHE velocity calculations
 */
export function calculatePHEVelocity(inputs: PHEInputs): PHEResults {
  // Convert flow rate from m³/h to m³/s
  const flowRateInM3PerS = inputs.volumetricFlowRate / 3600

  // Step 1: Calculate flow gap
  const flowGap = calculateFlowGap(inputs.platePitch, inputs.plateThickness)

  // Step 2: Calculate number of channels
  const numberOfChannels = calculateNumberOfChannels(
    inputs.numberOfPlates,
    inputs.numberOfPasses
  )

  // Step 3: Calculate total flow area
  const totalFlowArea = calculateFlowArea(
    numberOfChannels,
    inputs.effectivePlateWidth,
    flowGap,
    inputs.corrugationFactor
  )

  // Step 4: Calculate velocity
  const velocity = calculateVelocity(flowRateInM3PerS, totalFlowArea)

  // Optional: Calculate port velocity if port diameter is provided
  let portArea: number | undefined
  let portVelocity: number | undefined

  if (inputs.portDiameter && inputs.portDiameter > 0) {
    portArea = calculatePortArea(inputs.portDiameter)
    portVelocity = calculatePortVelocity(flowRateInM3PerS, portArea)
  }

  return {
    flowGap,
    numberOfChannels,
    totalFlowArea,
    velocity,
    portArea,
    portVelocity,
  }
}

/**
 * Generate calculation steps with formatted values
 */
export function generateCalculationSteps(
  inputs: PHEInputs,
  results: PHEResults
): CalculationSteps {
  const flowRateInM3PerS = inputs.volumetricFlowRate / 3600
  
  const steps: CalculationSteps = {
    flowGap: `b = p - t = ${inputs.platePitch} - ${inputs.plateThickness} = ${results.flowGap.toFixed(4)} m`,
    numberOfChannels: `N_ch = (N_pl - 1) / N_pass = (${inputs.numberOfPlates} - 1) / ${inputs.numberOfPasses} = ${results.numberOfChannels} channels`,
    totalFlowArea: `A_flow = N_ch × W_p × b × φ = ${results.numberOfChannels} × ${inputs.effectivePlateWidth} × ${results.flowGap.toFixed(4)} × ${inputs.corrugationFactor} = ${results.totalFlowArea.toFixed(6)} m²`,
    velocity: `v = Q / A_flow = ${inputs.volumetricFlowRate} m³/h (${flowRateInM3PerS.toFixed(6)} m³/s) / ${results.totalFlowArea.toFixed(6)} = ${results.velocity.toFixed(4)} m/s`,
  }

  if (inputs.portDiameter && results.portArea && results.portVelocity) {
    steps.portVelocity = `v_port = Q / A_port = ${flowRateInM3PerS.toFixed(6)} m³/s / ${results.portArea.toFixed(6)} = ${results.portVelocity.toFixed(4)} m/s`
  }

  return steps
}

/**
 * Validate velocity is within recommended range
 */
export function validateVelocity(velocity: number): {
  isValid: boolean
  message: string
  severity: 'info' | 'warning' | 'error'
} {
  if (velocity < 0.3) {
    return {
      isValid: false,
      message: 'Velocity is below recommended range (0.3-3 m/s). Risk of fouling.',
      severity: 'warning',
    }
  } else if (velocity > 3) {
    return {
      isValid: false,
      message: 'Velocity is above recommended range (0.3-3 m/s). Risk of erosion and high pressure drop.',
      severity: 'error',
    }
  } else if (velocity >= 0.6 && velocity <= 2) {
    return {
      isValid: true,
      message: 'Velocity is in the optimal range (0.6-2 m/s).',
      severity: 'info',
    }
  } else {
    return {
      isValid: true,
      message: 'Velocity is within acceptable range.',
      severity: 'info',
    }
  }
}
