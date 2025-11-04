'use client'

import { PHEInputs } from '@/types'
import { Calculator, Settings, Layers } from 'lucide-react'

interface InputFormProps {
  inputs: PHEInputs
  onInputChange: (field: keyof PHEInputs, value: number) => void
  onCalculate: () => void
}

export default function InputForm({
  inputs,
  onInputChange,
  onCalculate,
}: InputFormProps) {
  const handleChange = (field: keyof PHEInputs, value: string) => {
    const numValue = parseFloat(value) || 0
    onInputChange(field, numValue)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
        <Settings className="w-6 h-6 mr-2 text-blue-600" />
        Input Parameters
      </h2>

      <div className="space-y-6">
        {/* Operational Parameters */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            Operational
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Volumetric Flow Rate (m³/h)
              </label>
              <input
                type="number"
                step="0.1"
                value={inputs.volumetricFlowRate}
                onChange={(e) =>
                  handleChange('volumetricFlowRate', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Design Parameters */}
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-3 flex items-center">
            <Layers className="w-5 h-5 mr-2 text-purple-600" />
            Design Parameters
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Plates
                </label>
                <input
                  type="number"
                  step="1"
                  value={inputs.numberOfPlates}
                  onChange={(e) => handleChange('numberOfPlates', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Passes
                </label>
                <input
                  type="number"
                  step="1"
                  value={inputs.numberOfPasses}
                  onChange={(e) => handleChange('numberOfPasses', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plate Pitch (m)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={inputs.platePitch}
                  onChange={(e) => handleChange('platePitch', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plate Thickness (m)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={inputs.plateThickness}
                  onChange={(e) => handleChange('plateThickness', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Effective Plate Width (m)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.effectivePlateWidth}
                onChange={(e) =>
                  handleChange('effectivePlateWidth', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Corrugation Factor (φ)
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.corrugationFactor}
                onChange={(e) =>
                  handleChange('corrugationFactor', e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 mt-1">
                Typical range: 1.04 - 1.25
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Port Diameter (m) - Optional
              </label>
              <input
                type="number"
                step="0.01"
                value={inputs.portDiameter || ''}
                onChange={(e) => handleChange('portDiameter', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Leave empty to skip port velocity"
              />
            </div>
          </div>
        </div>

        <button
          onClick={onCalculate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center space-x-2"
        >
          <Calculator className="w-5 h-5" />
          <span>Calculate Velocity</span>
        </button>
      </div>
    </div>
  )
}
