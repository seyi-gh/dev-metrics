import React, { useState, useEffect } from 'react'
import { Cpu, Database, Activity, Clock, Terminal, Cloud } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts' // Importaciones para el gráfico

// Componente Card para mantener la estructura
const Card = ({ title, children, icon: Icon, className = '' }) => (
  <div className={`bg-slate-800/50 border border-slate-700 p-6 rounded-3xl backdrop-blur-sm hover:border-blue-500/50 transition-all ${className}`}>
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-slate-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
      {Icon && <Icon className="text-blue-400 w-5 h-5" />}
    </div>
    {children}
  </div>
)

function App() {
  // Estados para simular datos dinámicos
  const [cpuUsage, setCpuUsage] = useState(42)
  const [ramUsage, setRamUsage] = useState(6.2)
  const [networkSpeed, setNetworkSpeed] = useState(980)
  const [currentTime, setCurrentTime] = useState(new Date())

  // Efecto para actualizar el reloj cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Efecto para simular cambios en CPU, RAM y Red
  useEffect(() => {
    const dataSimulator = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * (75 - 20 + 1)) + 20) // CPU entre 20 y 75%
      setRamUsage(Math.round((Math.random() * (10 - 4) + 4) * 10) / 10) // RAM entre 4 y 10 GB
      setNetworkSpeed(Math.floor(Math.random() * (1200 - 500 + 1)) + 500) // Red entre 500 y 1200 Mbps
    }, 5000) // Actualizar cada 5 segundos
    return () => clearInterval(dataSimulator)
  }, [])

  // Datos para el gráfico de CPU
  const cpuData = [{ name: 'Used', value: cpuUsage }, { name: 'Free', value: 100 - cpuUsage }]
  const COLORS = ['#3B82F6', '#1E293B'] // Azul y gris oscuro de Tailwind

  return (
    <main className="min-h-screen bg-[#0f172a] p-6 lg:p-12 text-slate-100 font-sans">
      {/* Header */}
      <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            DevMetrics OS
          </h1>
          <p className="text-slate-400 text-lg mt-1 font-light">Arch Linux Performance Dashboard for WSL 2</p>
        </div>
        <div className="flex items-center gap-3 bg-slate-800/80 p-3 rounded-2xl border border-blue-600/30 shadow-lg shadow-blue-500/20">
          <div className="w-4 h-4 bg-emerald-500 rounded-full animate-ping absolute" />
          <div className="w-4 h-4 bg-emerald-500 rounded-full relative" />
          <span className="text-sm font-mono tracking-tighter text-emerald-300">WSL_INSTANCE_01: ONLINE</span>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-6 h-full max-w-7xl mx-auto">
        
        {/* CPU Card con Gráfico */}
        <Card title="CPU Usage" icon={Cpu} className="md:col-span-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-transparent pointer-events-none z-0" />
          <div className="flex items-center justify-between z-10 relative">
            <div className="text-5xl font-bold text-blue-300">
              {cpuUsage}%
            </div>
            <div className="w-32 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={cpuData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="value"
                    isAnimationActive={true}
                    animationDuration={800}
                  >
                    {cpuData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-slate-500 text-sm mt-2 z-10 relative">
            Current load on available cores.
          </p>
        </Card>

        {/* RAM Card */}
        <Card title="Memory" icon={Database}>
          <div className="text-4xl font-bold text-purple-300">
            {ramUsage.toFixed(1)} <span className="text-xl text-slate-500">GB</span>
          </div>
          <p className="text-slate-400 text-sm mt-2">Used of 16GB total</p>
          <div className="w-full bg-slate-700 h-3 mt-4 rounded-full overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-1000 ease-out"
              style={{ width: `${(ramUsage / 16) * 100}%` }}
            />
          </div>
        </Card>

        {/* Clock Card - Realtime */}
        <Card title="System Time" icon={Clock}>
          <div className="text-4xl font-mono font-bold tracking-widest text-emerald-300 animate-pulse-fast">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <p className="text-slate-500 text-sm mt-2">
            {currentTime.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </Card>

        {/* Processes Table - Más llamativo */}
        <Card title="Active Processes" icon={Terminal} className="md:col-span-2 md:row-span-2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/10 to-transparent pointer-events-none z-0" />
          <div className="space-y-4 mt-2 z-10 relative max-h-64 overflow-y-auto custom-scrollbar">
            {[
              { name: 'VS Code', cpu: '12%', mem: '1.2GB', id: 1 },
              { name: 'Vite Dev Server', cpu: '5%', mem: '256MB', id: 2 },
              { name: 'Docker Desktop', cpu: '8%', mem: '2.4GB', id: 3 },
              { name: 'Discord', cpu: '2%', mem: '440MB', id: 4 },
              { name: 'Firefox', cpu: '15%', mem: '1.8GB', id: 5 },
              { name: 'Terminal (WSL)', cpu: '1%', mem: '80MB', id: 6 },
              { name: 'Spotify', cpu: '3%', mem: '300MB', id: 7 },
            ].map((p) => (
              <div key={p.id} className="flex justify-between items-center border-b border-slate-700/50 pb-2 last:border-0 hover:bg-slate-700/30 rounded-md px-2 -mx-2 transition-colors">
                <span className="font-mono text-sm text-slate-300">{p.name}</span>
                <div className="flex gap-4">
                  <span className="text-blue-400 text-xs font-mono">{p.cpu}</span>
                  <span className="text-slate-500 text-xs font-mono">{p.mem}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Network Status Card - Datos simulados y más grande */}
        <Card title="Network Status" icon={Cloud}>
          <div className="text-4xl font-bold text-emerald-400 animate-pulse">
            {networkSpeed} <span className="text-xl text-slate-500">Mbps</span>
          </div>
          <p className="text-slate-500 text-sm mt-1">
            Fiber Connection - Stable ({Math.floor(Math.random() * 50)}ms latency)
          </p>
          <div className="w-full bg-slate-700 h-2 mt-4 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[95%] transition-all duration-1000" />
          </div>
        </Card>

        {/* Quick Actions - Con efecto hover */}
        <Card title="Quick Actions">
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-blue-600/20 hover:bg-blue-600/40 text-blue-300 py-3 rounded-xl text-sm font-bold transition-colors duration-200 shadow-md shadow-blue-500/10">
              RESTART
            </button>
            <button className="bg-red-600/20 hover:bg-red-600/40 text-red-300 py-3 rounded-xl text-sm font-bold transition-colors duration-200 shadow-md shadow-red-500/10">
              SHUTDOWN
            </button>
            <button className="bg-green-600/20 hover:bg-green-600/40 text-green-300 py-3 rounded-xl text-sm font-bold transition-colors duration-200 shadow-md shadow-green-500/10 md:col-span-2">
              UPDATE PACKAGES
            </button>
          </div>
        </Card>

      </div>
       {/* Footer con enlace de portafolio */}
      <footer className="mt-12 text-center text-slate-600 text-sm">
        Desarrollado con React, Tailwind CSS, y Recharts. ¡Visita mi <a href="https://github.com/darlene" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">GitHub</a>!
      </footer>
    </main>
  )
}

export default App