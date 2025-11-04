'use client'

import { PHEInputs, PHEResults } from '@/types'
import { generateCalculationSteps, validateVelocity } from '@/utils/calculations'
import {
  TrendingUp,
  Droplet,
  Gauge,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  Activity,
} from 'lucide-react'

interface ResultsDisplayProps {
  inputs: PHEInputs
  results: PHEResults
}

export default function ResultsDisplay({ inputs, results }: ResultsDisplayProps) {
  const steps = generateCalculationSteps(inputs, results)
  const validation = validateVelocity(results.velocity)

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800'
      default:
        return 'bg-green-50 border-green-200 text-green-800'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'error':
        return <AlertCircle className="w-5 h-5" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5" />
      default:
        return <CheckCircle className="w-5 h-5" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
          <TrendingUp className="w-6 h-6 mr-2 text-blue-600" />
          Calculation Results
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-600 mb-2">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">Flow Gap</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {(results.flowGap * 1000).toFixed(2)} mm
            </p>
            <p className="text-xs text-blue-700 mt-1">
              {results.flowGap.toFixed(6)} m
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-purple-600 mb-2">
              <Gauge className="w-5 h-5" />
              <span className="text-sm font-medium">Channels</span>
            </div>
            <p className="text-2xl font-bold text-purple-900">
              {results.numberOfChannels}
            </p>
            <p className="text-xs text-purple-700 mt-1">per fluid side</p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-green-600 mb-2">
              <Droplet className="w-5 h-5" />
              <span className="text-sm font-medium">Flow Area</span>
            </div>
            <p className="text-2xl font-bold text-green-900">
              {results.totalFlowArea.toFixed(6)} m²
            </p>
            <p className="text-xs text-green-700 mt-1">
              {(results.totalFlowArea * 10000).toFixed(2)} cm²
            </p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-orange-600 mb-2">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm font-medium">Velocity</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">
              {results.velocity.toFixed(4)} m/s
            </p>
            <p className="text-xs text-orange-700 mt-1">channel velocity</p>
          </div>
        </div>

        {/* Port Velocity (if calculated) */}
        {results.portVelocity && results.portArea && (
          <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg mb-6">
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <Activity className="w-5 h-5" />
              <span className="text-sm font-medium">Port Velocity</span>
            </div>
            <p className="text-2xl font-bold text-indigo-900">
              {results.portVelocity.toFixed(4)} m/s
            </p>
            <p className="text-xs text-indigo-700 mt-1">
              Port Area: {results.portArea.toFixed(6)} m² (
              {(results.portArea * 10000).toFixed(2)} cm²)
            </p>
          </div>
        )}

        {/* Validation Message */}
        <div
          className={`p-4 rounded-lg border flex items-start space-x-3 ${getSeverityColor(
            validation.severity
          )}`}
        >
          {getSeverityIcon(validation.severity)}
          <div>
            <h3 className="font-semibold">Performance Assessment</h3>
            <p className="text-sm mt-1">{validation.message}</p>
            {validation.severity === 'info' &&
              results.velocity >= 0.6 &&
              results.velocity <= 2 && (
                <p className="text-sm mt-2">
                  ✓ Optimal for heat transfer and minimal fouling
                </p>
              )}
          </div>
        </div>
      </div>

      {/* Calculation Steps */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Calculation Steps
        </h3>
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Step 1: Flow Gap
            </p>
            <p className="text-sm font-mono text-gray-800">{steps.flowGap}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Step 2: Number of Channels
            </p>
            <p className="text-sm font-mono text-gray-800">
              {steps.numberOfChannels}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Step 3: Total Flow Area
            </p>
            <p className="text-sm font-mono text-gray-800">
              {steps.totalFlowArea}
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600 font-medium mb-1">
              Step 4: Fluid Velocity
            </p>
            <p className="text-sm font-mono text-gray-800">{steps.velocity}</p>
          </div>

          {steps.portVelocity && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-600 font-medium mb-1">
                Port Velocity
              </p>
              <p className="text-sm font-mono text-gray-800">
                {steps.portVelocity}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Engineering Notes */}
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Engineering Considerations
        </h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              <strong>Recommended Range:</strong> 0.3 - 3 m/s (optimal: 0.6 - 2
              m/s for water)
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              <strong>Low Velocity (&lt;0.3 m/s):</strong> Risk of fouling and
              reduced heat transfer
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              <strong>High Velocity (&gt;3 m/s):</strong> Excessive pressure
              drop and potential erosion
            </span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">•</span>
            <span>
              <strong>Port Velocity:</strong> Typically 2 - 5 m/s for water
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
