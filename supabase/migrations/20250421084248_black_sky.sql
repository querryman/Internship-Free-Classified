/*
  # Create Jobs and Services Tables

  1. New Tables
    - `jobs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `company` (text)
      - `location` (text)
      - `salary` (text)
      - `description` (text)
      - `requirements` (text array)
      - `created_at` (timestamp)

    - `job_applications`
      - `id` (uuid, primary key)
      - `job_id` (uuid, references jobs)
      - `user_id` (uuid, references auth.users)
      - `cover_letter` (text)
      - `resume_url` (text)
      - `status` (text)
      - `created_at` (timestamp)

    - `services`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `title` (text)
      - `provider` (text)
      - `category` (text)
      - `price` (text)
      - `description` (text)
      - `availability` (text array)
      - `created_at` (timestamp)

    - `service_requests`
      - `id` (uuid, primary key)
      - `service_id` (uuid, references services)
      - `user_id` (uuid, references auth.users)
      - `preferred_date` (date)
      - `preferred_time` (time)
      - `details` (text)
      - `status` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for:
      - Public read access to jobs and services
      - Authenticated users can create jobs and services
      - Users can only view their own applications and requests
      - Job/service owners can view applications/requests for their listings
*/

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  company text NOT NULL,
  location text NOT NULL,
  salary text NOT NULL,
  description text NOT NULL,
  requirements text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  cover_letter text NOT NULL,
  resume_url text,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  title text NOT NULL,
  provider text NOT NULL,
  category text NOT NULL,
  price text NOT NULL,
  description text NOT NULL,
  availability text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create service requests table
CREATE TABLE IF NOT EXISTS service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  preferred_date date NOT NULL,
  preferred_time time NOT NULL,
  details text NOT NULL,
  status text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_requests ENABLE ROW LEVEL SECURITY;

-- Jobs policies
CREATE POLICY "Jobs are viewable by everyone"
  ON jobs FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own jobs"
  ON jobs FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Job applications policies
CREATE POLICY "Users can view their own applications"
  ON job_applications FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT user_id FROM jobs WHERE id = job_applications.job_id
    )
  );

CREATE POLICY "Users can create applications"
  ON job_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON job_applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Services policies
CREATE POLICY "Services are viewable by everyone"
  ON services FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can create services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own services"
  ON services FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own services"
  ON services FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Service requests policies
CREATE POLICY "Users can view their own requests"
  ON service_requests FOR SELECT
  TO authenticated
  USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT user_id FROM services WHERE id = service_requests.service_id
    )
  );

CREATE POLICY "Users can create requests"
  ON service_requests FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own requests"
  ON service_requests FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);