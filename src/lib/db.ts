import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

// Types
export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface Saree {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  categorySlug: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  review: string;
  rating: number;
  date: string;
}

export interface Inquiry {
  id: string;
  name: string;
  mobile: string;
  city: string;
  requirement: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'contacted';
}

// Supabase client initialization
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const useSupabase = !!(supabaseUrl && supabaseServiceKey);

const supabase = useSupabase ? createClient(supabaseUrl, supabaseServiceKey) : null;

// Local JSON path setup
const jsonFilePath = path.join(process.cwd(), 'src/data/db.json');

// Reading local DB
function readLocalDb() {
  try {
    if (!fs.existsSync(jsonFilePath)) {
      // create parent directories if not exist
      const dir = path.dirname(jsonFilePath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(jsonFilePath, JSON.stringify({ banners: [], collections: [], sarees: [], testimonials: [], inquiries: [] }, null, 2));
    }
    const data = fs.readFileSync(jsonFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading local JSON database:', error);
    return { banners: [], collections: [], sarees: [], testimonials: [], inquiries: [] };
  }
}

// Writing local DB
function writeLocalDb(data: any) {
  try {
    const dir = path.dirname(jsonFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error writing local JSON database:', error);
  }
}

// Database helper functions
export async function getBanners(): Promise<Banner[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('banners').select('*').order('id', { ascending: true });
    if (!error && data) return data;
    console.error('Supabase banner read error, falling back:', error);
  }
  return readLocalDb().banners;
}

export async function saveBanners(banners: Banner[]): Promise<void> {
  if (useSupabase && supabase) {
    // Truncate and insert
    await supabase.from('banners').delete().neq('id', '0');
    const { error } = await supabase.from('banners').insert(banners);
    if (!error) return;
    console.error('Supabase banner save error:', error);
  }
  const db = readLocalDb();
  db.banners = banners;
  writeLocalDb(db);
}

export async function getCollections(): Promise<Collection[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('collections').select('*').order('id', { ascending: true });
    if (!error && data) return data;
    console.error('Supabase collections read error, falling back:', error);
  }
  return readLocalDb().collections;
}

export async function saveCollections(collections: Collection[]): Promise<void> {
  if (useSupabase && supabase) {
    await supabase.from('collections').delete().neq('id', '0');
    const { error } = await supabase.from('collections').insert(collections);
    if (!error) return;
    console.error('Supabase collections save error:', error);
  }
  const db = readLocalDb();
  db.collections = collections;
  writeLocalDb(db);
}

export async function getSarees(): Promise<Saree[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('sarees').select('*');
    if (!error && data) return data;
    console.error('Supabase sarees read error, falling back:', error);
  }
  return readLocalDb().sarees;
}

export async function saveSarees(sarees: Saree[]): Promise<void> {
  if (useSupabase && supabase) {
    await supabase.from('sarees').delete().neq('id', '0');
    const { error } = await supabase.from('sarees').insert(sarees);
    if (!error) return;
    console.error('Supabase sarees save error:', error);
  }
  const db = readLocalDb();
  db.sarees = sarees;
  writeLocalDb(db);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('testimonials').select('*').order('date', { ascending: false });
    if (!error && data) return data;
    console.error('Supabase testimonials read error, falling back:', error);
  }
  return readLocalDb().testimonials;
}

export async function saveTestimonials(testimonials: Testimonial[]): Promise<void> {
  if (useSupabase && supabase) {
    await supabase.from('testimonials').delete().neq('id', '0');
    const { error } = await supabase.from('testimonials').insert(testimonials);
    if (!error) return;
    console.error('Supabase testimonials save error:', error);
  }
  const db = readLocalDb();
  db.testimonials = testimonials;
  writeLocalDb(db);
}

export async function getInquiries(): Promise<Inquiry[]> {
  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('inquiries').select('*').order('date', { ascending: false });
    if (!error && data) return data;
    console.error('Supabase inquiries read error, falling back:', error);
  }
  return readLocalDb().inquiries;
}

export async function addInquiry(inquiry: Omit<Inquiry, 'id' | 'date' | 'status'>): Promise<Inquiry> {
  const newInquiry: Inquiry = {
    ...inquiry,
    id: 'inq_' + Math.random().toString(36).substr(2, 9),
    date: new Date().toISOString(),
    status: 'new'
  };

  if (useSupabase && supabase) {
    const { data, error } = await supabase.from('inquiries').insert([newInquiry]).select();
    if (!error && data && data[0]) return data[0];
    console.error('Supabase inquiry insert error, falling back:', error);
  }

  const db = readLocalDb();
  db.inquiries.unshift(newInquiry);
  writeLocalDb(db);
  return newInquiry;
}

export async function updateInquiryStatus(id: string, status: 'new' | 'read' | 'contacted'): Promise<void> {
  if (useSupabase && supabase) {
    const { error } = await supabase.from('inquiries').update({ status }).eq('id', id);
    if (!error) return;
    console.error('Supabase inquiry status update error:', error);
  }
  const db = readLocalDb();
  const index = db.inquiries.findIndex((inq: Inquiry) => inq.id === id);
  if (index !== -1) {
    db.inquiries[index].status = status;
    writeLocalDb(db);
  }
}

export async function deleteInquiry(id: string): Promise<void> {
  if (useSupabase && supabase) {
    const { error } = await supabase.from('inquiries').delete().eq('id', id);
    if (!error) return;
    console.error('Supabase inquiry delete error:', error);
  }
  const db = readLocalDb();
  db.inquiries = db.inquiries.filter((inq: Inquiry) => inq.id !== id);
  writeLocalDb(db);
}
