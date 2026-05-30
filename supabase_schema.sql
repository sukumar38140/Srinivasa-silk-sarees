-- SQL Migration script for Supabase tables
-- Sri Srinivasa Silk Sarees Database Structure

-- 1. BANNERS TABLE
CREATE TABLE IF NOT EXISTS public.banners (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    link TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. COLLECTIONS TABLE
CREATE TABLE IF NOT EXISTS public.collections (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. SAREES TABLE
CREATE TABLE IF NOT EXISTS public.sarees (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "categorySlug" TEXT REFERENCES public.collections(slug) ON DELETE CASCADE,
    tags TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    review TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    date TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. INQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    mobile TEXT NOT NULL,
    city TEXT NOT NULL,
    requirement TEXT NOT NULL,
    message TEXT NOT NULL,
    date TEXT NOT NULL,
    status TEXT CHECK (status IN ('new', 'read', 'contacted')) DEFAULT 'new' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS) policies setup
-- Enable RLS on all tables
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sarees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Banners: Read access for everyone
CREATE POLICY "Allow public read access to banners" ON public.banners
    FOR SELECT USING (true);

-- Collections: Read access for everyone
CREATE POLICY "Allow public read access to collections" ON public.collections
    FOR SELECT USING (true);

-- Sarees: Read access for everyone
CREATE POLICY "Allow public read access to sarees" ON public.sarees
    FOR SELECT USING (true);

-- Testimonials: Read access for everyone
CREATE POLICY "Allow public read access to testimonials" ON public.testimonials
    FOR SELECT USING (true);

-- Inquiries: Write access for everyone (for submissions), but read/update only for admins
CREATE POLICY "Allow public submissions to inquiries" ON public.inquiries
    FOR INSERT WITH CHECK (true);

-- All tables: Full permissions for service role (Service key bypasses RLS)
-- The Next.js API endpoints use the Supabase Service Role key, giving them read/write admin powers.
