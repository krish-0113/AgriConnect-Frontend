import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { useToast } from '../components/common/Toast.jsx';
import Input from '../components/common/Input.jsx';
import PrimaryButton from '../components/common/PrimaryButton.jsx';
import { UserCheck, Landmark, Briefcase, MapPin, Award, DollarSign } from 'lucide-react';

export default function CompleteProfilePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user, completeProfile, isLoading } = useAuth();
  const toast = useToast();

  const role = state?.role || user?.role || 'worker';

  // State for Worker profile
  const [workerData, setWorkerData] = useState({
  });

  // State for Company profile
  const [companyData, setCompanyData] = useState({
  });

  const [errors, setErrors] = useState({});

  const handleWorkerSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!workerData.title) newErrors.title = 'Job title/category is required';
    if (!workerData.experienceYears || isNaN(Number(workerData.experienceYears))) {
      newErrors.experienceYears = 'Please enter a valid number of years';
    }
    if (!workerData.hourlyRate || isNaN(Number(workerData.hourlyRate))) {
      newErrors.hourlyRate = 'Please enter a valid rate (e.g. 500/day)';
    }
    if (!workerData.location) newErrors.location = 'Location details are required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await completeProfile('worker', {
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      });
      toast.success('Your profile is complete! Welcome to AgriConnect.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Profile save failed.');
    }
  };

  const handleCompanySubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const newErrors = {};

    if (!companyData.companyName) newErrors.companyName = 'Farm or Company name is required';
    if (!companyData.location) newErrors.location = 'Farm location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await completeProfile('company', {
      });
      toast.success('Your Farm profile is complete! Start listing jobs.');
      navigate('/company-dashboard');
    } catch (err) {
      toast.error(err.message || 'Profile save failed.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-secondary flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 border border-border text-left">
        <div className="text-center mb-8">
          <div className="mx-auto w-14 h-14 bg-[#e8f0ed] text-primary flex items-center justify-center rounded-full mb-4">
            <UserCheck size={28} />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Complete Your Profile</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Just a few more details to customize your experience on the platform.
          </p>
        </div>

        {role === 'worker' ? (
          <form onSubmit={handleWorkerSubmit} className="space-y-5">
            <h2 className="text-lg font-bold border-b pb-2 text-[#2d6a4f] flex items-center">
              <Briefcase className="mr-2" size={18} /> Worker Details
            </h2>

            <Input
              label="Primary Work Category / Job Title"
              placeholder="e.g. Harvester Operator, Field Laborer, Tractor Driver"
              value={workerData.title}
              onChange={(e) => setWorkerData({ ...workerData, title: e.target.value })}
              error={errors.title}
              disabled={isLoading}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Years of Experience"
                type="number"
                placeholder="e.g. 5"
                value={workerData.experienceYears}
                onChange={(e) => setWorkerData({ ...workerData, experienceYears: e.target.value })}
                error={errors.experienceYears}
                disabled={isLoading}
                icon={<Award size={18} />}
                required
              />

              <Input
                label="Desired Rate (₹ / Day)"
                type="number"
                placeholder="e.g. 600"
                value={workerData.hourlyRate}
                onChange={(e) => setWorkerData({ ...workerData, hourlyRate: e.target.value })}
                error={errors.hourlyRate}
                disabled={isLoading}
                icon={<DollarSign size={18} />}
                required
              />
            </div>

            <Input
              label="Current Location (City / District)"
              placeholder="e.g. Sangrur, Punjab"
              value={workerData.location}
              onChange={(e) => setWorkerData({ ...workerData, location: e.target.value })}
              error={errors.location}
              disabled={isLoading}
              icon={<MapPin size={18} />}
              required
            />

            <Input
              label="Key Skills (Separated by commas)"
              placeholder="e.g. Wheat Harvesting, Organic Composting, Tractor Operation"
              value={workerData.skills}
              onChange={(e) => setWorkerData({ ...workerData, skills: e.target.value })}
              disabled={isLoading}
            />

            <div className="w-full text-left">
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Bio / About Yourself (Optional)
              </label>
              <textarea
                rows={3}
                placeholder="Share a brief overview of your farming background and skills..."
                value={workerData.bio}
                onChange={(e) => setWorkerData({ ...workerData, bio: e.target.value })}
                disabled={isLoading}
                className="block w-full px-4 py-2.5 rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <PrimaryButton type="submit" loading={isLoading}>
              Save and Continue
            </PrimaryButton>
          </form>
        ) : (
          <form onSubmit={handleCompanySubmit} className="space-y-5">
            <h2 className="text-lg font-bold border-b pb-2 text-[#2d6a4f] flex items-center">
              <Landmark className="mr-2" size={18} /> Farm / Business Details
            </h2>

            <Input
              label="Farm / Company Name"
              placeholder="e.g. Golden Crops Agribusiness"
              value={companyData.companyName}
              onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
              error={errors.companyName}
              disabled={isLoading}
              required
            />

            <div className="w-full text-left">
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                Farm Type / Category
              </label>
              <select
                value={companyData.category}
                onChange={(e) => setCompanyData({ ...companyData, category: e.target.value })}
                disabled={isLoading}
                className="block w-full px-4 py-2.5 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white transition-all"
              >
                <option value="Crop Cultivation">Grain & Crop Cultivation</option>
                <option value="Dairy Farming">Dairy & Cattle Husbandry</option>
                <option value="Horticulture">Horticulture & Orchards</option>
                <option value="Agri-Tech">Agri-tech & Fertilizer Retail</option>
                <option value="Poultry">Poultry Farming</option>
              </select>
            </div>

            <Input
              label="Farm Location / Address"
              placeholder="e.g. Nashik, Maharashtra"
              value={companyData.location}
              onChange={(e) => setCompanyData({ ...companyData, location: e.target.value })}
              error={errors.location}
              disabled={isLoading}
              icon={<MapPin size={18} />}
              required
            />

            <Input
              label="Contact Website or Phone Link (Optional)"
              placeholder="e.g. www.goldencrops.com"
              value={companyData.website}
              onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
              disabled={isLoading}
            />

            <div className="w-full text-left">
              <label className="block text-sm font-semibold text-foreground mb-1.5">
                About the Farm / Company Description
              </label>
              <textarea
                rows={3}
                placeholder="Describe your cultivation crops, machinery, or company background..."
                value={companyData.description}
                onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                disabled={isLoading}
                className="block w-full px-4 py-2.5 rounded-lg border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <PrimaryButton type="submit" loading={isLoading}>
              Save and Continue
            </PrimaryButton>
          </form>
        )}
      </div>
    </div>
  );
}
