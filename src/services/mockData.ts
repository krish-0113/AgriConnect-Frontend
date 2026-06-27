import { Job } from '../store/slices/jobsSlice';
import { Worker } from '../store/slices/workersSlice';
import { Company } from '../store/slices/companiesSlice';
import { Application } from '../store/slices/applicationsSlice';

const jobTitles = [
  'Farm Laborer',
  'Tractor Operator',
  'Crop Manager',
  'Livestock Handler',
  'Irrigation Specialist',
  'Equipment Technician',
  'Harvest Supervisor',
  'Greenhouse Worker',
  'Soil Specialist',
  'Dairy Handler',
];

const locations = ['Iowa', 'Nebraska', 'Illinois', 'Minnesota', 'Wisconsin', 'Indiana'];
const skills = [
  'Tractor Operation',
  'Crop Management',
  'Livestock Care',
  'Equipment Repair',
  'Irrigation Management',
  'Pesticide Application',
  'Record Keeping',
  'Safety Protocols',
];

const specializations = [
  'Corn Cultivation',
  'Soybean Farming',
  'Livestock Management',
  'Dairy Farming',
  'Organic Farming',
];

const certifications = [
  'Agricultural Safety Certification',
  'Equipment Operation License',
  'Pesticide Applicator License',
  'Forklift Certification',
];

const companyNames = [
  'Green Fields Farm Co.',
  'Midwest Agriculture Inc.',
  'Prairie Harvest Farms',
  'Golden Grain Cooperative',
  'Fresh Produce Growers',
  'Valley Livestock Corp.',
  'Sustainable Agriculture Ltd.',
];

export function generateMockJobs(count: number = 20): Job[] {
  const jobs: Job[] = [];
  for (let i = 0; i < count; i++) {
    jobs.push({
      id: `job-${i}`,
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      description: 'We are looking for skilled agricultural professionals to join our team. This role offers competitive compensation and benefits.',
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: {
        min: 30000 + Math.random() * 20000,
        max: 50000 + Math.random() * 30000,
      },
      jobType: ['full-time', 'part-time', 'seasonal', 'contract'][Math.floor(Math.random() * 4)] as any,
      workType: ['field-work', 'livestock', 'equipment', 'supervision', 'management'][Math.floor(Math.random() * 5)] as any,
      company: {
        id: `company-${Math.floor(Math.random() * 7)}`,
        name: companyNames[Math.floor(Math.random() * companyNames.length)],
      },
      requiredSkills: skills.slice(0, Math.floor(Math.random() * 4) + 2),
      experience: `${Math.floor(Math.random() * 10) + 1}+ years`,
      posted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: ['open', 'closed', 'filled'][Math.floor(Math.random() * 3)] as any,
      applicants: Math.floor(Math.random() * 50),
    });
  }
  return jobs;
}

export function generateMockWorkers(count: number = 15): Worker[] {
  const workers: Worker[] = [];
  const firstNames = ['John', 'Maria', 'David', 'Sarah', 'James', 'Ana', 'Michael', 'Emma'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Garcia', 'Martinez', 'Rodriguez', 'Lee'];

  for (let i = 0; i < count; i++) {
    workers.push({
      id: `worker-${i}`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      email: `worker${i}@example.com`,
      phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      bio: 'Experienced agricultural professional with strong work ethic.',
      skills: skills.slice(0, Math.floor(Math.random() * 5) + 2),
      experience: Math.floor(Math.random() * 30),
      availability: ['full-time', 'part-time', 'seasonal', 'flexible'][Math.floor(Math.random() * 4)] as any,
      specializations: specializations.slice(0, Math.floor(Math.random() * 3) + 1),
      certifications: certifications.slice(0, Math.floor(Math.random() * 3) + 1),
      rating: Math.random() * 2 + 3.5,
      reviews: Math.floor(Math.random() * 50),
      status: ['active', 'inactive', 'unavailable'][Math.floor(Math.random() * 3)] as any,
    });
  }
  return workers;
}

export function generateMockCompanies(count: number = 7): Company[] {
  const companies: Company[] = [];
  for (let i = 0; i < count; i++) {
    companies.push({
      id: `company-${i}`,
      name: companyNames[i] || `Farm Company ${i}`,
      email: `contact@farm${i}.com`,
      phone: `+1-555-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      description: 'Leading agricultural company dedicated to sustainable farming practices.',
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)] as any,
      industry: 'Agriculture',
      rating: Math.random() * 2 + 3.5,
      reviews: Math.floor(Math.random() * 100),
      verified: Math.random() > 0.3,
      status: 'active',
    });
  }
  return companies;
}

export function generateMockApplications(
  jobIds: string[],
  workerIds: string[],
  companyIds: string[],
  count: number = 30
): Application[] {
  const applications: Application[] = [];
  const statuses: Application['status'][] = ['pending', 'accepted', 'rejected', 'withdrawn', 'offered'];

  for (let i = 0; i < count; i++) {
    applications.push({
      id: `application-${i}`,
      jobId: jobIds[Math.floor(Math.random() * jobIds.length)],
      workerId: workerIds[Math.floor(Math.random() * workerIds.length)],
      companyId: companyIds[Math.floor(Math.random() * companyIds.length)],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      appliedDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      message: 'I am very interested in this position.',
    });
  }
  return applications;
}
