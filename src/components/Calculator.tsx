'use client'

import { useState } from 'react'
import { PHEInputs, PHEResults } from '@/types'
import {
  calculatePHEVelocity,
  generateCalculationSteps,
  validateVelocity,
} from '@/utils/calculations'
import InputForm from './InputForm'
import ResultsDisplay from './ResultsDisplay'
import { AlertCircle } from 'lucide-react'

export default function Calculator() {
  const [inputs, setInputs] = useState<PHEInputs>({
    volumetricFlowRate: 36, // 36 m³/h = 0.01 m³/s
    numberOfPlates: 51,
    numberOfPasses: 2,
    platePitch: 0.004,
    plateThickness: 0.0006,
    effectivePlateWidth: 0.5,
    corrugationFactor: 1.15,
    portDiameter: 0.1,
  })

  const [results, setResults] = useState<PHEResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleCalculate = () => {
    try {
      setError(null)
      const calculatedResults = calculatePHEVelocity(inputs)
      setResults(calculatedResults)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Calculation error occurred')
      setResults(null)
    }
  }

  const handleInputChange = (field: keyof PHEInputs, value: number) => {
    setInputs((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Plate Heat Exchanger Velocity Calculator
        </h1>
        <p className="text-gray-600">
          Calculate fluid velocity and flow characteristics in PHE systems
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-red-800">Calculation Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InputForm
          inputs={inputs}
          onInputChange={handleInputChange}
          onCalculate={handleCalculate}
        />
        {results && <ResultsDisplay inputs={inputs} results={results} />}
      </div>
    </div>
  )
}
