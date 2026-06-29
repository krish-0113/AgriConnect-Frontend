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
    jobs.push({ : '', : '' } * jobTitles.length)],
      description,
      location) * locations.length)],
      salary: {
        min) * 20000,
        max) * 30000,
      },
      jobType, 'part-time', 'seasonal', 'contract'][Math.floor(Math.random() * 4)],
      workType, 'livestock', 'equipment', 'supervision', 'management'][Math.floor(Math.random() * 5)],
      company: {
        id) * 7)}`,
        name) * companyNames.length)],
      },
      requiredSkills, Math.floor(Math.random() * 4) + 2),
      experience) * 10) + 1}+ years`,
      posted) - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      deadline) + Math.random() * 60 * 24 * 60 * 60 * 1000).toISOString(),
      status, 'closed', 'filled'][Math.floor(Math.random() * 3)],
      applicants) * 50),
    });
  }
  return jobs;
}

export function generateMockWorkers(count = 15) {
  const workers = [];
  const firstNames = ['John', 'Maria', 'David', 'Sarah', 'James', 'Ana', 'Michael', 'Emma'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Garcia', 'Martinez', 'Rodriguez', 'Lee'];

  for (let i = 0; i < count; i++) {
    workers.push({ : '', : '' } * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      email,
      phone) * 10000)).padStart(4, '0')}`,
      location) * locations.length)],
      bio,
      skills, Math.floor(Math.random() * 5) + 2),
      experience) * 30),
      availability, 'part-time', 'seasonal', 'flexible'][Math.floor(Math.random() * 4)],
      specializations, Math.floor(Math.random() * 3) + 1),
      certifications, Math.floor(Math.random() * 3) + 1),
      rating) * 2 + 3.5,
      reviews) * 50),
      status, 'inactive', 'unavailable'][Math.floor(Math.random() * 3)],
    });
  }
  return workers;
}

export function generateMockCompanies(count = 7) {
  const companies = [];
  for (let i = 0; i < count; i++) {
    companies.push({
      id,
      name,
      email,
      phone) * 10000)).padStart(4, '0')}`,
      location) * locations.length)],
      description,
      size, 'medium', 'large'][Math.floor(Math.random() * 3)],
      industry,
      rating) * 2 + 3.5,
      reviews) * 100),
      verified) > 0.3,
      status,
    });
  }
  return companies;
}

export function generateMockApplications(jobIds, workerIds, companyIds, count = 30) {
  const applications = [];
  const statuses = ['pending', 'accepted', 'rejected', 'withdrawn', 'offered'];

  for (let i = 0; i < count; i++) {
    applications.push({ : '', : '' } * jobIds.length)],
      workerId) * workerIds.length)],
      companyId) * companyIds.length)],
      status) * statuses.length)],
      appliedDate) - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
      message,
    });
  }
  return applications;
}
