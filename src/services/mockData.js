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

export function generateMockJobs(count = 20) {
  const jobs = [];
  for (let i = 0; i < count; i++) {
    jobs.push({
      id: `job-${i}-${Date.now()}`,
      title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
      description: 'We are looking for hardworking individuals for our farm.',
      location: locations[Math.floor(Math.random() * locations.length)],
      salary: {
        min: Math.floor(Math.random() * 20000),
        max: Math.floor(Math.random() * 30000) + 20000,
      },
      jobType: ['full-time', 'part-time', 'seasonal', 'contract'][Math.floor(Math.random() * 4)],
      workType: ['crop', 'livestock', 'equipment', 'supervision', 'management'][Math.floor(Math.random() * 5)],
      company: {
        id: `comp-${Math.floor(Math.random() * 7)}`,
        name: companyNames[Math.floor(Math.random() * companyNames.length)],
      },
      requiredSkills: skills.slice(0, Math.floor(Math.random() * 4) + 2),
      experience: `${Math.floor(Math.random() * 10) + 1}+ years`,
      posted: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      deadline: new Date(Date.now() + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      status: ['open', 'closed', 'filled'][Math.floor(Math.random() * 3)],
      applicants: Math.floor(Math.random() * 50),
    });
  }
  return jobs;
}

export function generateMockWorkers(count = 15) {
  const workers = [];
  const firstNames = ['John', 'Maria', 'David', 'Sarah', 'James', 'Ana', 'Michael', 'Emma'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Garcia', 'Martinez', 'Rodriguez', 'Lee'];

  for (let i = 0; i < count; i++) {
    workers.push({
      id: `worker-${i}-${Date.now()}`,
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      email: `worker${i}@example.com`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      bio: 'Hardworking agricultural worker.',
      skills: skills.slice(0, Math.floor(Math.random() * 5) + 2),
      experience: Math.floor(Math.random() * 30),
      availability: ['full-time', 'part-time', 'seasonal', 'flexible'][Math.floor(Math.random() * 4)],
      specializations: specializations.slice(0, Math.floor(Math.random() * 3) + 1),
      certifications: certifications.slice(0, Math.floor(Math.random() * 3) + 1),
      rating: Math.floor(Math.random() * 2) + 3.5,
      reviews: Math.floor(Math.random() * 50),
      status: ['active', 'inactive', 'unavailable'][Math.floor(Math.random() * 3)],
    });
  }
  return workers;
}

export function generateMockCompanies(count = 7) {
  const companies = [];
  for (let i = 0; i < count; i++) {
    companies.push({
      id: `comp-${i}-${Date.now()}`,
      name: companyNames[Math.floor(Math.random() * companyNames.length)],
      email: `contact@company${i}.com`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
      location: locations[Math.floor(Math.random() * locations.length)],
      description: 'A leading agricultural company.',
      size: ['small', 'medium', 'large'][Math.floor(Math.random() * 3)],
      industry: 'Agriculture',
      rating: Math.floor(Math.random() * 2) + 3.5,
      reviews: Math.floor(Math.random() * 100),
      verified: Math.random() > 0.3,
      status: 'active',
    });
  }
  return companies;
}

export function generateMockApplications(jobIds, workerIds, companyIds, count = 30) {
  const applications = [];
  const statuses = ['pending', 'accepted', 'rejected', 'withdrawn', 'offered'];

  for (let i = 0; i < count; i++) {
    applications.push({
      id: `app-${i}-${Date.now()}`,
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
