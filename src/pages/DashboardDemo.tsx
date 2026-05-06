import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { ArrowLeft, Download, Filter, Search, TrendingUp, Users, DollarSign, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardDemo: React.FC = () => {
  const [timeRange, setTimeRange] = useState('Year');

  // Mock Data
  const revenueData = [
    { name: 'Jan', revenue: 4000, profit: 2400 },
    { name: 'Feb', revenue: 3000, profit: 1398 },
    { name: 'Mar', revenue: 2000, profit: 9800 },
    { name: 'Apr', revenue: 2780, profit: 3908 },
    { name: 'May', revenue: 1890, profit: 4800 },
    { name: 'Jun', revenue: 2390, profit: 3800 },
    { name: 'Jul', revenue: 3490, profit: 4300 },
    { name: 'Aug', revenue: 4000, profit: 2400 },
    { name: 'Sep', revenue: 5000, profit: 3400 },
    { name: 'Oct', revenue: 6000, profit: 4400 },
    { name: 'Nov', revenue: 7500, profit: 5400 },
    { name: 'Dec', revenue: 8500, profit: 6400 },
  ];

  const categoryData = [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Home', value: 300 },
    { name: 'Sports', value: 200 },
  ];

  const regionalData = [
    { name: 'North', sales: 4000 },
    { name: 'South', sales: 3000 },
    { name: 'East', sales: 2000 },
    { name: 'West', sales: 2780 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444'];

  const stats = [
    { title: 'Total Revenue', value: '$84,592', change: '+12.5%', icon: <DollarSign size={24} />, color: 'text-blue-600', bg: 'bg-blue-100' },
    { title: 'Active Customers', value: '1,245', change: '+5.2%', icon: <Users size={24} />, color: 'text-green-600', bg: 'bg-green-100' },
    { title: 'Total Orders', value: '3,842', change: '+18.4%', icon: <ShoppingBag size={24} />, color: 'text-purple-600', bg: 'bg-purple-100' },
    { title: 'Conversion Rate', value: '4.2%', change: '-0.8%', icon: <TrendingUp size={24} />, color: 'text-orange-600', bg: 'bg-orange-100' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-2 transition-colors">
              <ArrowLeft size={16} /> Back to Portfolio
            </Link>
            <h1 className="text-3xl font-bold text-slate-900">Telecommunication sale and calls analysis</h1>
            <p className="text-slate-500">A comprehensive Excel dashboard analyzing sales trends, customer demographics, and product performance for Telecommunication company.',
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 text-sm font-medium transition-colors">
              <Filter size={16} /> Filter
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm">
              <Download size={16} /> Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="flex justify-between items-start mb-4">
                <div className={`${stat.bg} ${stat.color} p-3 rounded-lg`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </span>
              </div>
              <h3 className="text-slate-500 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-900">Revenue vs Profit Overview</h3>
              <div className="flex bg-slate-100 rounded-lg p-1">
                {['Week', 'Month', 'Year'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                      timeRange === range ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                  <Area type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Sales by Category</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Regional Performance</h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9' }}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* AI Insights Card */}
          <div className="bg-gradient-to-br from-indigo-900 to-blue-900 p-6 rounded-xl shadow-sm text-white relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 blur-[60px] rounded-full"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-blue-500 p-2 rounded-lg">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                </div>
                <h3 className="text-lg font-bold">AI-Generated Insights</h3>
                <span className="ml-auto bg-white/20 text-xs px-2 py-1 rounded-full backdrop-blur-sm">Surgest AI</span>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <h4 className="font-semibold text-blue-200 text-sm mb-1">Anomaly Detected</h4>
                  <p className="text-sm text-slate-300">Unusually high traffic from 'East' region on Nov 15th correlated with a 42% spike in Electronics sales.</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <h4 className="font-semibold text-green-300 text-sm mb-1">Predictive Forecast</h4>
                  <p className="text-sm text-slate-300">Based on historical patterns, December revenue is projected to exceed $10,000, representing a 15% YoY growth.</p>
                </div>
                
                <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm border border-white/10">
                  <h4 className="font-semibold text-orange-300 text-sm mb-1">Recommendation</h4>
                  <p className="text-sm text-slate-300">Inventory levels for 'Home' category are critically low relative to predicted demand for the upcoming holiday season.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardDemo;
