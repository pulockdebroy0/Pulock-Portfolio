-- Create media table for gallery
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_media_featured ON media(featured);
CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at DESC);
