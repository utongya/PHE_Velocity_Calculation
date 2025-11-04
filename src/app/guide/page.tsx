import Navigation from '@/components/Navigation'
import { BookOpen, Calculator as CalcIcon, Layers, TrendingUp } from 'lucide-react'

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-800">
              Engineering Guide: PHE Velocity Calculation
            </h1>
          </div>

          <div className="prose max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Overview
              </h2>
              <p className="text-gray-700 leading-relaxed">
                The calculation of fluid velocity within a Plate Heat Exchanger
                (PHE) is essential for determining the heat transfer coefficient,
                pressure drop, and overall performance of the unit. The velocity
                must be maintained within an optimal range—high enough to induce
                turbulence for efficient heat transfer, but low enough to prevent
                excessive pressure drop and erosion.
              </p>
            </section>

            {/* New: PHE configuration diagram and explanation */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                PHE configuration
              </h2>

              <div className="flex flex-col md:flex-row items-start gap-6 bg-white p-4 rounded-lg shadow-sm">
                <img
                  src="/images/phe-diagram.png"
                  alt="Plate Heat Exchanger schematic and parameter table"
                  className="w-full md:w-1/2 rounded-lg border border-gray-200 shadow-sm"
                />

                <div className="prose text-sm text-gray-700 md:flex-1">
                  <p>
                    The schematic shows a typical plate pack with chevron corrugation
                    and the key geometric parameters used in velocity calculations.
                    Use the plate pitch (p), plate thickness (t), effective plate
                    width (W<sub>p</sub>), and the number of plates to compute the
                    flow gap and total flow area. The right-hand area lists example
                    parameter values for reference.
                  </p>

                  
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <CalcIcon className="w-6 h-6 mr-2 text-green-600" />
                Core Formula
              </h2>
              <div className="bg-blue-50 p-6 rounded-lg mb-4">
                <p className="text-center text-xl font-mono text-gray-800 mb-2">
                  v = Q / A<sub>flow</sub>
                </p>
                <p className="text-sm text-gray-600 text-center">
                  Average fluid velocity = Flow rate / Total flow area
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Where <strong>v</strong> is velocity (m/s), <strong>Q</strong> is
                volumetric flow rate (m³/h, converted to m³/s for calculation), and <strong>A<sub>flow</sub></strong>{' '}
                is total effective cross-sectional flow area (m²).
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Layers className="w-6 h-6 mr-2 text-purple-600" />
                Calculation Steps
              </h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Step 1: Calculate Flow Gap (b)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    The actual gap between two plates where fluid flows:
                  </p>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                    b = p - t
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Where <strong>p</strong> = plate pitch (m), <strong>t</strong>{' '}
                    = plate thickness (m)
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Step 2: Calculate Number of Channels (N<sub>ch</sub>)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Total channels available for fluid flow per side:
                  </p>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                    N<sub>ch</sub> = (N<sub>pl</sub> - 1) / N<sub>pass</sub>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Where <strong>N<sub>pl</sub></strong> = total plates,{' '}
                    <strong>N<sub>pass</sub></strong> = number of passes
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Step 3: Calculate Total Flow Area (A<sub>flow</sub>)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Sum of cross-sectional areas of all channels:
                  </p>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                    A<sub>flow</sub> = N<sub>ch</sub> × W<sub>p</sub> × b × φ
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Where <strong>W<sub>p</sub></strong> = plate width (m),{' '}
                    <strong>φ</strong> = corrugation factor (1.04-1.25)
                  </p>
                </div>

                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Step 4: Calculate Velocity (v)
                  </h3>
                  <p className="text-gray-700 mb-2">
                    Average fluid velocity in channels:
                  </p>
                  <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                    v = (Q / 3600) / A<sub>flow</sub>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Where <strong>Q</strong> = volumetric flow rate (m³/h), converted to m³/s by dividing by 3600
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 mr-2 text-orange-600" />
                Performance Guidelines
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-red-800 mb-2">
                    Low Velocity (&lt; 0.3 m/s)
                  </h3>
                  <ul className="text-sm text-red-700 space-y-1">
                    <li>• Risk of fouling</li>
                    <li>• Reduced heat transfer</li>
                    <li>• Poor turbulence</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-green-800 mb-2">
                    Optimal (0.6 - 2 m/s)
                  </h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Good heat transfer</li>
                    <li>• Acceptable pressure drop</li>
                    <li>• Minimal fouling</li>
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg">
                  <h3 className="font-semibold text-orange-800 mb-2">
                    High Velocity (&gt; 3 m/s)
                  </h3>
                  <ul className="text-sm text-orange-700 space-y-1">
                    <li>• Excessive pressure drop</li>
                    <li>• Risk of erosion</li>
                    <li>• High pumping costs</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Port Velocity
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Port velocity is critical for minimizing erosion at inlet/outlet
                connections:
              </p>
              <div className="bg-indigo-50 p-6 rounded-lg mb-4">
                <p className="text-center text-xl font-mono text-gray-800 mb-2">
                  v<sub>port</sub> = Q / A<sub>port</sub>
                </p>
                <p className="text-center text-sm font-mono text-gray-600 mb-2">
                  A<sub>port</sub> = π × D<sub>port</sub>² / 4
                </p>
                <p className="text-sm text-gray-600 text-center">
                  Recommended: 2 - 5 m/s for water
                </p>
              </div>
            </section>

            <section className="mb-8 bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-yellow-900 mb-3">
                ⚠️ Important Considerations
              </h3>
              <ul className="space-y-2 text-sm text-yellow-800">
                <li>
                  • The number of channels (N<sub>ch</sub>) must be an integer. If
                  not, the configuration is invalid.
                </li>
                <li>
                  • Corrugation factor (φ) typically ranges from 1.04 to 1.25; use
                  1.15 if manufacturer data is unavailable.
                </li>
                <li>
                  • Chevron angle affects local velocity distribution and pressure
                  drop but not average velocity calculation.
                </li>
                <li>
                  • For compressible fluids, use mass velocity (G = v × ρ) instead
                  of linear velocity.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Example Calculation
              </h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-3">Given:</h3>
                <ul className="text-sm text-gray-700 space-y-1 mb-4">
                  <li>• Q = 36 m³/h (= 0.01 m³/s)</li>
                  <li>• N<sub>pl</sub> = 51 plates</li>
                  <li>• N<sub>pass</sub> = 2 passes</li>
                  <li>• p = 0.004 m</li>
                  <li>• t = 0.0006 m</li>
                  <li>• W<sub>p</sub> = 0.5 m</li>
                  <li>• φ = 1.15</li>
                </ul>
                <h3 className="font-semibold text-gray-800 mb-3">Solution:</h3>
                <div className="space-y-2 text-sm text-gray-700 font-mono">
                  <p>Q = 36 / 3600 = 0.01 m³/s</p>
                  <p>b = 0.004 - 0.0006 = 0.0034 m</p>
                  <p>N<sub>ch</sub> = (51 - 1) / 2 = 25 channels</p>
                  <p>A<sub>flow</sub> = 25 × 0.5 × 0.0034 × 1.15 = 0.048875 m²</p>
                  <p className="text-lg font-bold text-blue-600">
                    v = 0.01 / 0.048875 ≈ 0.2046 m/s
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
        
        <footer className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Developed by <span className="font-semibold text-gray-800">Unnop Tongya</span>, Nalco Water
          </p>
        </footer>
      </div>
    </main>
  )
}
