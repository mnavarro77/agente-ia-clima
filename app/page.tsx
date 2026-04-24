'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 overflow-hidden relative">
      {/* Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-600/5 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      {/* Navigation */}
      <nav className="relative z-20 h-20 flex items-center px-8 max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
            <span className="text-white font-black text-sm">AI</span>
          </div>
          <span className="font-bold text-lg tracking-tight">WeatherAgent</span>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-zinc-500 hover:text-blue-500 transition-colors">Características</a>
          <a href="#demo" className="text-sm font-medium text-zinc-500 hover:text-blue-500 transition-colors">Demo</a>
          <Link 
            href="/chat" 
            className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 rounded-full text-sm font-bold hover:scale-105 transition-transform shadow-xl shadow-zinc-900/10"
          >
            Comenzar chat
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className={`space-y-8 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400">Inteligencia Meteorológica 2.0</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-black leading-[1.1] tracking-tighter">
              El clima, analizado por <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-indigo-500">Inteligencia Artificial.</span>
            </h1>
            
            <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              Obtén pronósticos precisos, análisis detallados y respuestas instantáneas sobre cualquier ubicación en el mundo con nuestro agente de IA especializado.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link 
                href="/chat" 
                className="px-8 py-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-lg font-bold hover:scale-[1.02] transition-transform shadow-2xl shadow-blue-500/20 text-center"
              >
                Probar Agente IA
              </Link>
              <button className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white rounded-2xl text-lg font-bold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm text-center">
                Ver Capacidades
              </button>
            </div>

            <div className="flex items-center gap-6 pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-zinc-50 dark:border-zinc-950 bg-zinc-200 dark:bg-zinc-800" />
                ))}
              </div>
              <p className="text-sm font-medium text-zinc-400">
                <span className="text-zinc-900 dark:text-white font-bold">+1,200</span> usuarios ya están consultando
              </p>
            </div>
          </div>

          {/* Visual Showcase (Glassmorphism Card) */}
          <div className={`relative transition-all duration-1000 delay-300 transform ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
            <div className="absolute -inset-4 bg-linear-to-r from-blue-500 to-indigo-500 rounded-[3rem] blur-3xl opacity-20 animate-pulse" />
            <div className="relative bg-white/70 dark:bg-zinc-900/70 backdrop-blur-3xl border border-white/20 dark:border-zinc-800/50 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden group">
              {/* Fake UI Header */}
              <div className="flex items-center justify-between mb-8 border-b border-zinc-200 dark:border-zinc-800 pb-6">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                  AI Model: Weather-Turbo-v4
                </div>
              </div>

              {/* Weather Data Display */}
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <div>
                    <h3 className="text-4xl font-black">Madrid, ES</h3>
                    <p className="text-zinc-500 font-medium">Mayormente Soleado</p>
                  </div>
                  <div className="text-6xl">☀️</div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Temperatura', value: '24°C', color: 'bg-blue-500' },
                    { label: 'Humedad', value: '42%', color: 'bg-emerald-500' },
                    { label: 'Viento', value: '12km/h', color: 'bg-indigo-500' }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                      <div className={`w-1.5 h-1.5 ${stat.color} rounded-full mb-2`} />
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">{stat.label}</p>
                      <p className="text-lg font-black mt-1">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* AI Chat Bubble Preview */}
                <div className="mt-8 p-5 bg-linear-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-xl transform rotate-1 group-hover:rotate-0 transition-transform duration-500">
                  <p className="text-sm leading-relaxed">
                    "Según los patrones actuales, se espera un aumento de temperatura para el fin de semana. No olvides bloqueador solar si sales a caminar por El Retiro."
                  </p>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-[10px] font-bold">AI</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Recomendación Generada</span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-32 bg-white dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight">¿Por qué usar WeatherAgent?</h2>
            <p className="text-lg text-zinc-500">Combinamos datos satelitales en tiempo real con modelos de procesamiento de lenguaje natural.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Análisis Predictivo',
                desc: 'Modelos de IA que analizan tendencias históricas para darte el mejor pronóstico.',
                icon: '📊'
              },
              {
                title: 'Conversación Natural',
                desc: 'Habla con el clima como si fuera un amigo. Sin comandos complicados.',
                icon: '💬'
              },
              {
                title: 'Alertas Inteligentes',
                desc: 'Recibe notificaciones críticas basadas en tu ubicación y planes del día.',
                icon: '🔔'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] hover:shadow-2xl hover:shadow-blue-500/5 transition-all group">
                <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg flex items-center justify-center">
              <span className="text-[10px] font-black">AI</span>
            </div>
            <span className="font-bold text-sm">WeatherAgent</span>
          </div>
          <p className="text-xs text-zinc-400 font-medium tracking-wide">
            © 2026 Inteligencia Meteorológica. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs font-bold text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-widest">Términos</a>
            <a href="#" className="text-xs font-bold text-zinc-400 hover:text-blue-500 transition-colors uppercase tracking-widest">Privacidad</a>
          </div>
        </div>
      </footer>
    </div>
  )
}