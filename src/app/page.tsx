import Calculator from '@/components/Calculator'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <Calculator />
        
        <footer className="mt-12 text-center">
          <p className="text-sm text-gray-600">
            Developed by <span className="font-semibold text-gray-800">Unnop Tongya</span>, Nalco Water
          </p>
        </footer>
      </div>
    </main>
  )
}
