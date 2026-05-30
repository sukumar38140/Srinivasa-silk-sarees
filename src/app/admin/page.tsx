'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Lock, LogOut, MessageSquare, Trash2, CheckCircle2, User, Landmark, HelpCircle, Star, Plus, FileText, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Component interfaces
interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}

interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

interface Saree {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categorySlug: string;
  tags: string[];
}

interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

interface Inquiry {
  id: string;
  name: string;
  mobile: string;
  city: string;
  requirement: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'contacted';
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'inquiries' | 'sarees' | 'testimonials'>('inquiries');
  const [loading, setLoading] = useState(false);
  
  // Dynamic DB states
  const [banners, setBanners] = useState<Banner[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);
  const [sarees, setSarees] = useState<Saree[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Saree Form state
  const [newSaree, setNewSaree] = useState({
    name: '',
    description: '',
    categorySlug: 'wedding-collection',
    imageUrl: '/images/wedding-saree-1.png',
    tags: ''
  });

  // Testimonial Form State
  const [newTestimonial, setNewTestimonial] = useState({
    name: '',
    role: '',
    review: '',
    rating: 5
  });

  // Load from local storage on mount
  useEffect(() => {
    const savedPasscode = sessionStorage.getItem('admin_passcode');
    if (savedPasscode) {
      handleLogin(savedPasscode);
    }
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(passcode);
  };

  const handleLogin = async (codeToVerify: string) => {
    setLoading(true);
    setLoginError('');
    try {
      const res = await fetch('/api/admin/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passcode: codeToVerify })
      });
      const resData = await res.json();
      if (res.ok && resData.success) {
        setIsAuthenticated(true);
        setPasscode(codeToVerify);
        sessionStorage.setItem('admin_passcode', codeToVerify);
        
        // set database states
        setBanners(resData.data.banners);
        setCollections(resData.data.collections);
        setSarees(resData.data.sarees);
        setTestimonials(resData.data.testimonials);
        setInquiries(resData.data.inquiries);
      } else {
        setLoginError(resData.error || 'Incorrect passcode. Please try again.');
        sessionStorage.removeItem('admin_passcode');
      }
    } catch (err) {
      console.error(err);
      setLoginError('Error connecting to database api.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode('');
    sessionStorage.removeItem('admin_passcode');
  };

  // Inquiry actions
  const handleInquiryStatus = async (id: string, status: 'new' | 'read' | 'contacted') => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        setInquiries(inquiries.map(inq => inq.id === id ? { ...inq, status } : inq));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInquiryDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/admin/inquiries?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode }
      });
      if (res.ok) {
        setInquiries(inquiries.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Saree actions
  const handleAddSaree = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSaree.name || !newSaree.description) return;
    
    setLoading(true);
    try {
      const tagsArray = newSaree.tags.split(',').map(t => t.trim()).filter(Boolean);
      const res = await fetch('/api/admin/sarees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify({
          name: newSaree.name,
          description: newSaree.description,
          categorySlug: newSaree.categorySlug,
          imageUrl: newSaree.imageUrl,
          tags: tagsArray
        })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSarees([data.saree, ...sarees]);
        setNewSaree({
          name: '',
          description: '',
          categorySlug: 'wedding-collection',
          imageUrl: '/images/wedding-saree-1.png',
          tags: ''
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSaree = async (id: string) => {
    if (!confirm('Delete this saree from showcase?')) return;
    try {
      const res = await fetch(`/api/admin/sarees?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode }
      });
      if (res.ok) {
        setSarees(sarees.filter(s => s.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Testimonial actions
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTestimonial.name || !newTestimonial.review) return;

    setLoading(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-passcode': passcode
        },
        body: JSON.stringify(newTestimonial)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setTestimonials([data.testimonial, ...testimonials]);
        setNewTestimonial({ name: '', role: '', review: '', rating: 5 });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTestimonial = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      const res = await fetch(`/api/admin/testimonials?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-passcode': passcode }
      });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Login view screen
  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center flex-grow py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border-2 border-gold-secondary/25 p-8 rounded-xl shadow-2xl space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-maroon-primary text-gold-secondary shadow-lg">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="font-luxury text-3xl font-bold text-maroon-dark">Admin Login</h1>
            <p className="text-xs text-darktext/60">Enter showroom passcode to manage website content.</p>
          </div>

          {loginError && (
            <div className="bg-red-50 border border-red-400 p-3 rounded text-red-700 text-xs text-center font-semibold">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="code" className="text-xs font-bold text-maroon-primary uppercase tracking-wide">
                Showroom Passcode
              </label>
              <input
                id="code"
                type="password"
                required
                placeholder="••••••••••••"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-cream/40 px-4 py-3 text-sm rounded border border-gold-secondary/35 focus:outline-none focus:border-maroon-primary text-darktext text-center font-mono text-lg"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-maroon-primary hover:bg-maroon-dark text-white font-bold uppercase tracking-wider text-xs py-3.5 rounded shadow-lg transition-colors"
            >
              {loading ? 'Authenticating...' : 'Unlock Portal'}
            </button>
          </form>
          
          <p className="text-[10px] text-center text-darktext/50">
            Note: Default setup code is <strong>SrinivasaAdmin2026</strong>.
          </p>
        </motion.div>
      </div>
    );
  }

  // Dashboard view screen
  return (
    <div className="flex-grow flex flex-col bg-cream/30">
      
      {/* Dashboard Sub Header */}
      <div className="bg-maroon-dark text-white border-b border-gold-secondary/20 py-4 shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="font-luxury text-xl font-bold tracking-wider text-gold-secondary">
              Sri Srinivasa Admin CMS
            </h2>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gold-secondary hover:text-white border border-gold-secondary/40 px-4 py-2 rounded transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-8 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Menu Column */}
        <div className="lg:col-span-3 space-y-2.5">
          <button
            onClick={() => setActiveTab('inquiries')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-left transition-all ${
              activeTab === 'inquiries'
                ? 'bg-maroon-primary text-white shadow-md'
                : 'bg-white text-darktext hover:bg-cream border border-gold-secondary/15'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Inquiries ({inquiries.length})</span>
          </button>
          
          <button
            onClick={() => setActiveTab('sarees')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-left transition-all ${
              activeTab === 'sarees'
                ? 'bg-maroon-primary text-white shadow-md'
                : 'bg-white text-darktext hover:bg-cream border border-gold-secondary/15'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
            <span>Sarees Showcase ({sarees.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('testimonials')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-wider text-left transition-all ${
              activeTab === 'testimonials'
                ? 'bg-maroon-primary text-white shadow-md'
                : 'bg-white text-darktext hover:bg-cream border border-gold-secondary/15'
            }`}
          >
            <Star className="w-5 h-5" />
            <span>Testimonials ({testimonials.length})</span>
          </button>
        </div>

        {/* Right Details Panel Column */}
        <div className="lg:col-span-9 bg-white p-6 sm:p-8 rounded-xl border border-gold-secondary/20 shadow-xl overflow-hidden flex flex-col justify-start">
          
          {/* TAB 1: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="border-b border-gold-secondary/15 pb-4">
                <h3 className="font-luxury text-2xl font-bold text-maroon-dark">Customer Inquiries</h3>
                <p className="text-xs text-darktext/50">Manage submitted inquiries from contact forms and saree details.</p>
              </div>

              {inquiries.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-gold-secondary/20 rounded">
                  <p className="text-xs text-darktext/40">No inquiries found in the database.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className={`p-5 rounded-lg border text-xs space-y-3.5 transition-all shadow-sm ${
                        inq.status === 'new'
                          ? 'border-l-4 border-l-maroon-primary bg-maroon-primary/5 border-gold-secondary/15'
                          : inq.status === 'contacted'
                          ? 'border-l-4 border-l-emerald-500 bg-white border-gold-secondary/10'
                          : 'border-l-4 border-l-amber-500 bg-white border-gold-secondary/10'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gold-secondary/10 pb-2">
                        <div className="space-y-1">
                          <h4 className="font-bold text-maroon-dark text-sm">{inq.name}</h4>
                          <p className="text-[10px] text-darktext/60 font-mono">
                            📅 {new Date(inq.date).toLocaleString()} | 📍 {inq.city}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                            inq.status === 'new'
                              ? 'bg-maroon-primary text-white'
                              : inq.status === 'contacted'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <span className="font-bold text-gold-dark uppercase tracking-wider text-[9px]">
                            Requirement
                          </span>
                          <p className="font-semibold text-darktext">{inq.requirement}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="font-bold text-gold-dark uppercase tracking-wider text-[9px]">
                            Mobile Number
                          </span>
                          <p className="font-mono text-darktext text-xs font-semibold">
                            📱 {inq.mobile}
                          </p>
                        </div>
                      </div>

                      {inq.message && (
                        <div className="bg-cream/40 p-3 rounded border border-gold-secondary/10 italic text-darktext/85">
                          &ldquo;{inq.message}&rdquo;
                        </div>
                      )}

                      {/* Administrative Actions */}
                      <div className="flex flex-wrap justify-between items-center pt-2 border-t border-gold-secondary/10 gap-2">
                        <div className="flex space-x-2">
                          {inq.status !== 'read' && (
                            <button
                              onClick={() => handleInquiryStatus(inq.id, 'read')}
                              className="bg-amber-500 hover:bg-amber-600 text-white font-bold uppercase tracking-wider text-[9px] px-2.5 py-1.5 rounded transition-colors"
                            >
                              Mark Read
                            </button>
                          )}
                          {inq.status !== 'contacted' && (
                            <button
                              onClick={() => handleInquiryStatus(inq.id, 'contacted')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold uppercase tracking-wider text-[9px] px-2.5 py-1.5 rounded transition-colors"
                            >
                              Mark Contacted
                            </button>
                          )}
                          <a
                            href={`https://wa.me/91${inq.mobile}?text=Hello%20${encodeURIComponent(inq.name)},%20this%20is%20Sri%20Srinivasa%20Silk%20Sarees%20replying%20to%20your%20inquiry%20about%20${encodeURIComponent(inq.requirement)}.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-sky-600 hover:bg-sky-700 text-white font-bold uppercase tracking-wider text-[9px] px-2.5 py-1.5 rounded transition-colors flex items-center space-x-1"
                          >
                            <MessageSquare className="w-3 h-3 text-white fill-sky-600" />
                            <span>Reply Saree Specs</span>
                          </a>
                        </div>

                        <button
                          onClick={() => handleInquiryDelete(inq.id)}
                          className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-colors"
                          aria-label="Delete inquiry"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SAREES SHOWCASE */}
          {activeTab === 'sarees' && (
            <div className="space-y-8">
              <div className="border-b border-gold-secondary/15 pb-4 flex justify-between items-center">
                <div>
                  <h3 className="font-luxury text-2xl font-bold text-maroon-dark">Manage Sarees Showcase</h3>
                  <p className="text-xs text-darktext/50">Add or delete sarees appearing in the Digital Showroom catalog.</p>
                </div>
              </div>

              {/* Add Saree Form */}
              <form onSubmit={handleAddSaree} className="bg-cream/20 p-5 rounded-lg border border-gold-secondary/25 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon-primary border-b border-gold-secondary/10 pb-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Saree Model</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="sname" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Saree Name *
                    </label>
                    <input
                      id="sname"
                      type="text"
                      required
                      placeholder="E.g., Swarna Zari Kanchipuram"
                      value={newSaree.name}
                      onChange={(e) => setNewSaree({ ...newSaree, name: e.target.value })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="scat" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Category *
                    </label>
                    <select
                      id="scat"
                      value={newSaree.categorySlug}
                      onChange={(e) => setNewSaree({ ...newSaree, categorySlug: e.target.value })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    >
                      {collections.map(c => (
                        <option key={c.slug} value={c.slug}>{c.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="simg" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Select Showcase Image *
                    </label>
                    <select
                      id="simg"
                      value={newSaree.imageUrl}
                      onChange={(e) => setNewSaree({ ...newSaree, imageUrl: e.target.value })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    >
                      <option value="/images/wedding-saree-1.png">Red Kanchipuram Silk (/images/wedding-saree-1.png)</option>
                      <option value="/images/bridal-saree-2.png">Ivory Temple Bridal (/images/bridal-saree-2.png)</option>
                      <option value="/images/designer-saree-3.png">Maroon Brocade Designer (/images/designer-saree-3.png)</option>
                      <option value="/images/traditional-saree-4.png">Purple Mustard Traditional (/images/traditional-saree-4.png)</option>
                      <option value="/images/wholesale-saree-5.png">Handloom Showroom Stack (/images/wholesale-saree-5.png)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="stags" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Tags (Comma Separated)
                    </label>
                    <input
                      id="stags"
                      type="text"
                      placeholder="E.g., Wedding, Silk, Heavy, Bridal"
                      value={newSaree.tags}
                      onChange={(e) => setNewSaree({ ...newSaree, tags: e.target.value })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="sdesc" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                    Saree Description *
                  </label>
                  <textarea
                    id="sdesc"
                    required
                    rows={3}
                    placeholder="Weave details, thread counts, border patterns..."
                    value={newSaree.description}
                    onChange={(e) => setNewSaree({ ...newSaree, description: e.target.value })}
                    className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-maroon-primary hover:bg-maroon-dark text-white font-bold uppercase tracking-wider text-[10px] px-6 py-2.5 rounded shadow transition-colors"
                >
                  {loading ? 'Adding...' : 'Add Saree to Showcase'}
                </button>
              </form>

              {/* Saree List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sarees.map((s) => (
                  <div
                    key={s.id}
                    className="flex border border-gold-secondary/15 rounded bg-white overflow-hidden shadow-sm hover:shadow transition-all relative group"
                  >
                    <div className="relative w-24 h-full min-h-[100px] bg-cream">
                      <Image src={s.imageUrl} alt={s.name} fill className="object-cover" />
                    </div>
                    <div className="p-4 flex-grow flex flex-col justify-between text-xs space-y-2">
                      <div>
                        <span className="text-[9px] font-bold uppercase text-gold-dark">
                          {collections.find(c => c.slug === s.categorySlug)?.name || 'Heritage'}
                        </span>
                        <h4 className="font-bold text-maroon-dark mt-0.5 leading-snug">{s.name}</h4>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteSaree(s.id)}
                        className="text-red-600 hover:text-red-800 flex items-center space-x-1 font-bold uppercase tracking-wider text-[9px] w-fit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TESTIMONIALS */}
          {activeTab === 'testimonials' && (
            <div className="space-y-8">
              <div className="border-b border-gold-secondary/15 pb-4">
                <h3 className="font-luxury text-2xl font-bold text-maroon-dark">Manage Testimonials</h3>
                <p className="text-xs text-darktext/50">Add reviews from bridal clients or wholesale partners.</p>
              </div>

              {/* Add Testimonial Form */}
              <form onSubmit={handleAddTestimonial} className="bg-cream/20 p-5 rounded-lg border border-gold-secondary/25 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-maroon-primary border-b border-gold-secondary/10 pb-2">
                  <Plus className="w-4 h-4" />
                  <span>Add New Testimonial</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="tname" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Client Name *
                    </label>
                    <input
                      id="tname"
                      type="text"
                      required
                      placeholder="E.g., Aaradhya Reddy"
                      value={newTestimonial.name}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="trole" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Client Role *
                    </label>
                    <input
                      id="trole"
                      type="text"
                      required
                      placeholder="E.g., Bride from Hyderabad"
                      value={newTestimonial.role}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, role: e.target.value })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="trate" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                      Rating (1-5 Stars) *
                    </label>
                    <select
                      id="trate"
                      value={newTestimonial.rating}
                      onChange={(e) => setNewTestimonial({ ...newTestimonial, rating: Number(e.target.value) })}
                      className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext"
                    >
                      <option value={5}>⭐⭐⭐⭐⭐ (5 Stars)</option>
                      <option value={4}>⭐⭐⭐⭐ (4 Stars)</option>
                      <option value={3}>⭐⭐⭐ (3 Stars)</option>
                      <option value={2}>⭐⭐ (2 Stars)</option>
                      <option value={1}>⭐ (1 Star)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="trev" className="text-[10px] font-bold text-maroon-primary uppercase tracking-wide">
                    Review Text *
                  </label>
                  <textarea
                    id="trev"
                    required
                    rows={3}
                    placeholder="Enter review detail..."
                    value={newTestimonial.review}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, review: e.target.value })}
                    className="w-full bg-white px-3 py-2 text-xs rounded border border-gold-secondary/30 focus:outline-none focus:border-maroon-primary text-darktext resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-maroon-primary hover:bg-maroon-dark text-white font-bold uppercase tracking-wider text-[10px] px-6 py-2.5 rounded shadow transition-colors"
                >
                  {loading ? 'Adding...' : 'Add Testimonial'}
                </button>
              </form>

              {/* Testimonials List */}
              <div className="space-y-4">
                {testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="p-5 border border-gold-secondary/15 rounded bg-white text-xs space-y-3.5 shadow-sm"
                  >
                    <div className="flex justify-between items-center border-b border-gold-secondary/10 pb-2">
                      <div>
                        <h4 className="font-bold text-maroon-dark">{t.name}</h4>
                        <p className="text-[10px] text-darktext/60 mt-0.5">{t.role}</p>
                      </div>
                      <div className="flex space-x-0.5">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-gold-accent text-gold-accent" />
                        ))}
                      </div>
                    </div>
                    <p className="italic text-darktext/80">&ldquo;{t.review}&rdquo;</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[9px] text-darktext/50 font-mono">Date: {t.date}</span>
                      <button
                        onClick={() => handleDeleteTestimonial(t.id)}
                        className="text-red-600 hover:text-red-800 flex items-center space-x-1 font-bold uppercase tracking-wider text-[9px]"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
