import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Save, LogOut, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { data, updateSection, resetToDefault } = usePortfolio();
  
  // Local state for forms to avoid saving on every keystroke
  const [hero, setHero] = useState(data.hero);
  const [contact, setContact] = useState(data.contact);
  const [settings, setSettings] = useState(data.settings);
  const [about, setAbout] = useState(data.about);
  const [projects, setProjects] = useState(data.projects);
  const [activeTab, setActiveTab] = useState('general');
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    const isAuth = sessionStorage.getItem('isAdminAuth');
    if (!isAuth) {
      navigate('/portfolio-abdul');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuth');
    navigate('/');
  };

  const handleSave = () => {
    updateSection('hero', hero);
    updateSection('contact', contact);
    updateSection('settings', settings);
    updateSection('about', about);
    updateSection('projects', projects);
    
    setSaveStatus('Changes saved successfully!');
    setTimeout(() => setSaveStatus(''), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSettings({ ...settings, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const addProject = () => {
    setProjects([...projects, {
      id: Date.now(),
      title: 'New Project',
      category: 'Category',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
      description: 'Project description here...',
      tags: ['Tag 1', 'Tag 2'],
      featured: false,
      link: '#'
    }]);
  };

  const updateProject = (id: number, field: string, value: any) => {
    setProjects(projects.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
            <p className="text-slate-400">Manage your portfolio content</p>
          </div>
          <div className="flex items-center gap-4">
            {saveStatus && <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm">{saveStatus}</span>}
            <button onClick={handleSave} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <Save size={18} /> Save Changes
            </button>
            <button onClick={handleLogout} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg transition-colors">
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0 space-y-2">
            {['general', 'about', 'projects', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-4 py-3 rounded-lg capitalize transition-colors ${
                  activeTab === tab ? 'bg-blue-600 text-white font-medium' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-grow bg-slate-800 rounded-2xl p-6 border border-slate-700">
            
            {/* GENERAL TAB */}
            {activeTab === 'general' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">Hero Section</h2>
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name</label>
                  <input type="text" value={hero.name} onChange={e => setHero({...hero, name: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input type="text" value={hero.title} onChange={e => setHero({...hero, title: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Hero Description</label>
                  <textarea rows={4} value={hero.description} onChange={e => setHero({...hero, description: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"></textarea>
                </div>

                <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4 mt-8">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input type="email" value={contact.email} onChange={e => setContact({...contact, email: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input type="text" value={contact.phone} onChange={e => setContact({...contact, phone: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input type="text" value={contact.location} onChange={e => setContact({...contact, location: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* ABOUT TAB */}
            {activeTab === 'about' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">About Me</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience</label>
                    <input type="text" value={about.experience} onChange={e => setAbout({...about, experience: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Education Title</label>
                    <input type="text" value={about.education} onChange={e => setAbout({...about, education: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Paragraph 1</label>
                  <textarea rows={3} value={about.description1} onChange={e => setAbout({...about, description1: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Paragraph 2</label>
                  <textarea rows={3} value={about.description2} onChange={e => setAbout({...about, description2: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Paragraph 3</label>
                  <textarea rows={3} value={about.description3} onChange={e => setAbout({...about, description3: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white"></textarea>
                </div>
              </div>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                  <h2 className="text-xl font-bold text-white">Manage Projects</h2>
                  <button onClick={addProject} className="flex items-center gap-2 bg-blue-600/20 text-blue-400 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg transition-colors text-sm">
                    <Plus size={16} /> Add Project
                  </button>
                </div>

                <div className="space-y-8">
                  {projects.map((project) => (
                    <div key={project.id} className="bg-slate-900 p-6 rounded-xl border border-slate-700 relative">
                      <button onClick={() => deleteProject(project.id)} className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors">
                        <Trash2 size={20} />
                      </button>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Project Title</label>
                          <input type="text" value={project.title} onChange={e => updateProject(project.id, 'title', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                          <input type="text" value={project.category} onChange={e => updateProject(project.id, 'category', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Image URL</label>
                          <input type="text" value={project.image} onChange={e => updateProject(project.id, 'image', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white" />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-slate-400 mb-1">Project Link (URL)</label>
                          <input type="text" value={project.link} onChange={e => updateProject(project.id, 'link', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white" />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-400 mb-1">Description</label>
                        <textarea rows={2} value={project.description} onChange={e => updateProject(project.id, 'description', e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded p-2 text-sm text-white"></textarea>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2">
                        <input type="checkbox" id={`featured-${project.id}`} checked={project.featured} onChange={e => updateProject(project.id, 'featured', e.target.checked)} className="rounded bg-slate-800 border-slate-700 text-blue-500" />
                        <label htmlFor={`featured-${project.id}`} className="text-sm text-slate-300">Featured Project</label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white border-b border-slate-700 pb-4">System Settings</h2>
                
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-lg font-medium text-white mb-4">Profile Image</h3>
                  <div className="flex items-center gap-6">
                    <img src={settings.profileImage} alt="Profile Preview" className="w-24 h-24 rounded-xl object-cover border-2 border-slate-700" />
                    <div>
                      <label className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer transition-colors">
                        <ImageIcon size={18} /> Upload New Image
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                      <p className="text-xs text-slate-400 mt-2">Recommended: Square image, max 2MB. Image is saved locally to your browser via Base64.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700">
                  <h3 className="text-lg font-medium text-white mb-2">Web3Forms API Key (For Contact Form)</h3>
                  <p className="text-sm text-slate-400 mb-4">
                    To receive emails, sign up at <a href="https://web3forms.com" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline">web3forms.com</a> and paste your Access Key here.
                  </p>
                  <input 
                    type="text" 
                    value={settings.web3formsKey} 
                    onChange={e => setSettings({...settings, web3formsKey: e.target.value})} 
                    placeholder="e.g. 12345678-abcd-1234-abcd-1234567890ab"
                    className="w-full bg-slate-800 border border-slate-700 rounded-lg p-3 text-white font-mono text-sm" 
                  />
                </div>
                
                <div className="pt-8 mt-8 border-t border-slate-700">
                  <button 
                    onClick={() => {
                      if(window.confirm('Are you sure you want to reset all data to default? This cannot be undone.')) {
                        resetToDefault();
                        window.location.reload();
                      }
                    }}
                    className="text-red-400 hover:text-red-300 text-sm font-medium"
                  >
                    Reset all data to defaults
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
