import React, { useState, useMemo, useEffect } from 'react';
import { Search, TrendingUp, TrendingDown, Minus, X, Moon, Sun, Filter } from 'lucide-react';

const LANES_DATA = [
  {"id":"AUR-BLK","origin":"Aurora, CO","destination":"Blakeville, TX","cost_per_ton":78,"volume_tons":3400,"lead_days":3.2,"reliability":0.91,"mode":"Truck"},
  {"id":"HWD-RIV","origin":"Howard, IA","destination":"Riverside, CA","cost_per_ton":103,"volume_tons":1500,"lead_days":4.8,"reliability":0.88,"mode":"Rail"},
  {"id":"LEN-GLN","origin":"Lennox, NV","destination":"Glenmont, NY","cost_per_ton":97,"volume_tons":1700,"lead_days":4.3,"reliability":0.89,"mode":"Rail"},
  {"id":"DOV-SUN","origin":"Dover, OH","destination":"Sunset, AZ","cost_per_ton":83,"volume_tons":2900,"lead_days":3.0,"reliability":0.87,"mode":"Truck"},
  {"id":"RCH-HNT","origin":"Richfield, UT","destination":"Huntington, WV","cost_per_ton":91,"volume_tons":2450,"lead_days":3.6,"reliability":0.85,"mode":"Rail"},
  {"id":"MIR-LAK","origin":"Miranda, FL","destination":"Lakeview, IL","cost_per_ton":66,"volume_tons":4200,"lead_days":2.1,"reliability":0.84,"mode":"Truck"},
  {"id":"GLD-BRK","origin":"Goldford, KS","destination":"Brooklyn, NY","cost_per_ton":115,"volume_tons":1300,"lead_days":5.2,"reliability":0.90,"mode":"Rail"},
  {"id":"PNT-MPL","origin":"Pinetown, NC","destination":"Mapleton, MA","cost_per_ton":72,"volume_tons":3100,"lead_days":2.8,"reliability":0.83,"mode":"Truck"},
  {"id":"FRS-LYN","origin":"Fresbury, WA","destination":"Lynnbrook, NJ","cost_per_ton":88,"volume_tons":2700,"lead_days":3.4,"reliability":0.89,"mode":"Truck"},
  {"id":"RND-CYN","origin":"Rindle, TN","destination":"Canyon, CO","cost_per_ton":95,"volume_tons":1850,"lead_days":4.0,"reliability":0.86,"mode":"Rail"}
];

const SERIES_DATA = {
  "AUR-BLK": [
    {"date":"2025-10-07","shipments":25,"avg_cost_per_ton":78,"avg_lead_days":3.2,"on_time_rate":0.90},
    {"date":"2025-10-08","shipments":22,"avg_cost_per_ton":79,"avg_lead_days":3.3,"on_time_rate":0.91},
    {"date":"2025-10-09","shipments":24,"avg_cost_per_ton":78,"avg_lead_days":3.2,"on_time_rate":0.91},
    {"date":"2025-10-10","shipments":21,"avg_cost_per_ton":77,"avg_lead_days":3.1,"on_time_rate":0.92},
    {"date":"2025-10-11","shipments":23,"avg_cost_per_ton":78,"avg_lead_days":3.2,"on_time_rate":0.89},
    {"date":"2025-10-12","shipments":19,"avg_cost_per_ton":79,"avg_lead_days":3.3,"on_time_rate":0.88},
    {"date":"2025-10-13","shipments":26,"avg_cost_per_ton":78,"avg_lead_days":3.2,"on_time_rate":0.90}
  ],
  "HWD-RIV": [
    {"date":"2025-10-07","shipments":12,"avg_cost_per_ton":104,"avg_lead_days":4.9,"on_time_rate":0.87},
    {"date":"2025-10-08","shipments":11,"avg_cost_per_ton":103,"avg_lead_days":4.8,"on_time_rate":0.88},
    {"date":"2025-10-09","shipments":10,"avg_cost_per_ton":103,"avg_lead_days":4.7,"on_time_rate":0.88},
    {"date":"2025-10-10","shipments":9,"avg_cost_per_ton":102,"avg_lead_days":4.9,"on_time_rate":0.86},
    {"date":"2025-10-11","shipments":10,"avg_cost_per_ton":103,"avg_lead_days":4.8,"on_time_rate":0.87},
    {"date":"2025-10-12","shipments":8,"avg_cost_per_ton":104,"avg_lead_days":4.9,"on_time_rate":0.85},
    {"date":"2025-10-13","shipments":13,"avg_cost_per_ton":103,"avg_lead_days":4.8,"on_time_rate":0.89}
  ],
  "MIR-LAK": [
    {"date":"2025-10-07","shipments":31,"avg_cost_per_ton":66,"avg_lead_days":2.1,"on_time_rate":0.84},
    {"date":"2025-10-08","shipments":33,"avg_cost_per_ton":66,"avg_lead_days":2.0,"on_time_rate":0.85},
    {"date":"2025-10-09","shipments":35,"avg_cost_per_ton":65,"avg_lead_days":2.0,"on_time_rate":0.85},
    {"date":"2025-10-10","shipments":30,"avg_cost_per_ton":65,"avg_lead_days":2.2,"on_time_rate":0.84},
    {"date":"2025-10-11","shipments":28,"avg_cost_per_ton":66,"avg_lead_days":2.1,"on_time_rate":0.83},
    {"date":"2025-10-12","shipments":27,"avg_cost_per_ton":67,"avg_lead_days":2.2,"on_time_rate":0.82},
    {"date":"2025-10-13","shipments":34,"avg_cost_per_ton":66,"avg_lead_days":2.1,"on_time_rate":0.85}
  ],
  "LEN-GLN": [
    {"date":"2025-10-07","shipments":14,"avg_cost_per_ton":98,"avg_lead_days":4.2,"on_time_rate":0.88},
    {"date":"2025-10-08","shipments":13,"avg_cost_per_ton":97,"avg_lead_days":4.3,"on_time_rate":0.88},
    {"date":"2025-10-09","shipments":12,"avg_cost_per_ton":97,"avg_lead_days":4.3,"on_time_rate":0.87},
    {"date":"2025-10-10","shipments":13,"avg_cost_per_ton":96,"avg_lead_days":4.4,"on_time_rate":0.87},
    {"date":"2025-10-11","shipments":11,"avg_cost_per_ton":97,"avg_lead_days":4.3,"on_time_rate":0.86},
    {"date":"2025-10-12","shipments":10,"avg_cost_per_ton":98,"avg_lead_days":4.2,"on_time_rate":0.85},
    {"date":"2025-10-13","shipments":15,"avg_cost_per_ton":97,"avg_lead_days":4.3,"on_time_rate":0.88}
  ]
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLane, setSelectedLane] = useState(null);
  const [filters, setFilters] = useState({ origin: '', destination: '', mode: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const origins = useMemo(() => [...new Set(LANES_DATA.map(l => l.origin))].sort(), []);
  const destinations = useMemo(() => [...new Set(LANES_DATA.map(l => l.destination))].sort(), []);
  const modes = useMemo(() => [...new Set(LANES_DATA.map(l => l.mode))].sort(), []);

  const filteredLanes = useMemo(() => {
    return LANES_DATA.filter(lane => {
      const matchesOrigin = !filters.origin || lane.origin === filters.origin;
      const matchesDestination = !filters.destination || lane.destination === filters.destination;
      const matchesMode = !filters.mode || lane.mode === filters.mode;
      const matchesSearch = !searchTerm || 
        lane.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lane.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lane.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesOrigin && matchesDestination && matchesMode && matchesSearch;
    });
  }, [filters, searchTerm]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedLane(null);
        setShowFilters(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const MetricCard = ({ label, value, format, trend }) => {
    const TrendIcon = trend > 0 ? TrendingUp : trend < 0 ? TrendingDown : Minus;
    const trendColor = trend > 0 ? 'text-emerald-500' : trend < 0 ? 'text-rose-500' : 'text-gray-400';
    
    return (
      <div className={`${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white border-gray-200'} border rounded-lg p-4 transition-all duration-200 hover:shadow-md`}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'} uppercase tracking-wider mb-1`}>
              {label}
            </p>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {format(value)}
            </p>
          </div>
          {trend !== undefined && (
            <TrendIcon className={`w-5 h-5 ${trendColor}`} />
          )}
        </div>
      </div>
    );
  };

  const MiniSparkline = ({ data, dataKey }) => {
    const values = data.map(d => d[dataKey]);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    
    const points = values.map((v, i) => {
      const x = (i / (values.length - 1)) * 100;
      const y = 100 - ((v - min) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return (
      <svg className="w-full h-12" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          points={points}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={darkMode ? 'text-blue-400' : 'text-blue-500'}
        />
      </svg>
    );
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Header */}
      <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white/80 backdrop-blur-sm border-gray-200'} border-b sticky top-0 z-40 transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Network Flow Snapshot
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Supply Chain Lane Analytics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label="Toggle filters"
              >
                <Filter className="w-5 h-5" />
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-all duration-200 ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}
                aria-label="Toggle theme"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters Panel */}
      <div
        className={`fixed top-[73px] right-0 w-80 h-[calc(100vh-73px)] ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-l shadow-2xl z-30 transition-transform duration-200 ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(false)}
              className={`p-1 rounded ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Search
              </label>
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search lanes..."
                  className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                />
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Origin
              </label>
              <select
                value={filters.origin}
                onChange={(e) => setFilters({ ...filters, origin: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              >
                <option value="">All Origins</option>
                {origins.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Destination
              </label>
              <select
                value={filters.destination}
                onChange={(e) => setFilters({ ...filters, destination: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              >
                <option value="">All Destinations</option>
                {destinations.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Mode
              </label>
              <select
                value={filters.mode}
                onChange={(e) => setFilters({ ...filters, mode: e.target.value })}
                className={`w-full px-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              >
                <option value="">All Modes</option>
                {modes.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>

            <button
              onClick={() => {
                setFilters({ origin: '', destination: '', mode: '' });
                setSearchTerm('');
              }}
              className={`w-full py-2 px-4 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'} transition-all duration-200`}
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredLanes.length === 0 ? (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            <p className="text-lg">No lanes found matching your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLanes.map((lane) => (
              <div
                key={lane.id}
                onClick={() => setSelectedLane(lane)}
                onKeyDown={(e) => e.key === 'Enter' && setSelectedLane(lane)}
                tabIndex={0}
                className={`${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-750' : 'bg-white border-gray-200 hover:shadow-xl'} border rounded-xl p-6 cursor-pointer transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-1`}>
                      {lane.id}
                    </h3>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {lane.origin} → {lane.destination}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${lane.mode === 'Truck' ? (darkMode ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-700') : (darkMode ? 'bg-purple-900 text-purple-200' : 'bg-purple-100 text-purple-700')}`}>
                    {lane.mode}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Cost/Ton</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>${lane.cost_per_ton}</p>
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Volume</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lane.volume_tons.toLocaleString()}t</p>
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Lead Time</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{lane.lead_days}d</p>
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mb-1`}>Reliability</p>
                    <p className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{(lane.reliability * 100).toFixed(0)}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Detail Panel */}
      {selectedLane && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-opacity duration-200"
          onClick={() => setSelectedLane(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-transform duration-200 transform scale-100`}
          >
            <div className={`${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b p-6 flex items-start justify-between sticky top-0 ${darkMode ? 'bg-gray-800' : 'bg-white'} z-10`}>
              <div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>
                  {selectedLane.id}
                </h2>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {selectedLane.origin} → {selectedLane.destination}
                </p>
              </div>
              <button
                onClick={() => setSelectedLane(null)}
                className={`p-2 rounded-lg transition-colors duration-200 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <MetricCard
                  label="Cost per Ton"
                  value={selectedLane.cost_per_ton}
                  format={(v) => `$${v}`}
                />
                <MetricCard
                  label="Volume"
                  value={selectedLane.volume_tons}
                  format={(v) => `${v.toLocaleString()}t`}
                />
                <MetricCard
                  label="Lead Time"
                  value={selectedLane.lead_days}
                  format={(v) => `${v}d`}
                />
                <MetricCard
                  label="Reliability"
                  value={selectedLane.reliability}
                  format={(v) => `${(v * 100).toFixed(0)}%`}
                />
              </div>

              {SERIES_DATA[selectedLane.id] && (
                <div>
                  <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'} mb-4`}>
                    7-Day Trend
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        Shipments
                      </h4>
                      <MiniSparkline data={SERIES_DATA[selectedLane.id]} dataKey="shipments" />
                      <div className="flex justify-between mt-2 text-xs">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {SERIES_DATA[selectedLane.id][0].date}
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {SERIES_DATA[selectedLane.id][6].date}
                        </span>
                      </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        Avg Cost per Ton ($)
                      </h4>
                      <MiniSparkline data={SERIES_DATA[selectedLane.id]} dataKey="avg_cost_per_ton" />
                      <div className="flex justify-between mt-2 text-xs">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          ${SERIES_DATA[selectedLane.id][0].avg_cost_per_ton}
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          ${SERIES_DATA[selectedLane.id][6].avg_cost_per_ton}
                        </span>
                      </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        Avg Lead Days
                      </h4>
                      <MiniSparkline data={SERIES_DATA[selectedLane.id]} dataKey="avg_lead_days" />
                      <div className="flex justify-between mt-2 text-xs">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {SERIES_DATA[selectedLane.id][0].avg_lead_days}d
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {SERIES_DATA[selectedLane.id][6].avg_lead_days}d
                        </span>
                      </div>
                    </div>

                    <div className={`${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} rounded-lg p-4`}>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-3`}>
                        On-Time Rate (%)
                      </h4>
                      <MiniSparkline data={SERIES_DATA[selectedLane.id]} dataKey="on_time_rate" />
                      <div className="flex justify-between mt-2 text-xs">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {(SERIES_DATA[selectedLane.id][0].on_time_rate * 100).toFixed(0)}%
                        </span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {(SERIES_DATA[selectedLane.id][6].on_time_rate * 100).toFixed(0)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;