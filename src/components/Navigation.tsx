'use client'

import Link from 'next/link'
import { Calculator, BookOpen, Github } from 'lucide-react'

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Calculator className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-800">
              PHE Velocity Calculator
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <Calculator className="w-5 h-5" />
              <span>Calculator</span>
            </Link>
            <Link
              href="/guide"
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              <BookOpen className="w-5 h-5" />
              <span>Guide</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
