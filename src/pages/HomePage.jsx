import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Shield, MapPin, Zap, ArrowRight, Star, Check } from 'lucide-react';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const features = [
    {
      icon: Shield,
      title: 'Secure & Verified',
      description: 'All workers and employers are verified with OTP security',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: TrendingUp,
      title: 'Fast Growth',
      description: 'Connect with opportunities in minutes, not weeks',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Join thousands of farmers and workers already connected',
      gradient: 'from-purple-400 to-purple-600',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Get instant notifications for new opportunities',
      gradient: 'from-yellow-400 to-orange-600',
    },
  ];

  const stats = [
    { label: 'Active Users', value: '25K+', icon: Users },
    { label: 'Jobs Posted', value: '1.2K+', icon: Briefcase },
    { label: 'Successful Hires', value: '8.5K+', icon: TrendingUp },
    { label: 'Verified Workers', value: '15K+', icon: Shield },
  ];

  const jobs = [
    {
      title: 'Harvest Supervisor',
      company: 'Green Valley Farms',
      location: 'Punjab',
      salary: '₹15,000 - ₹20,000/month',
      type: 'Full-time',
    },
    {
      title: 'Tractor Operator',
      company: 'Midwest Agriculture',
      location: 'Haryana',
      salary: '₹12,000 - ₹18,000/month',
      type: 'Seasonal',
    },
    {
      title: 'Crop Manager',
      company: 'Prairie Harvest',
      location: 'Rajasthan',
      salary: '₹18,000 - ₹25,000/month',
      type: 'Full-time',
    },
  ];

  return (
    <div className="w-full min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4 md:px-8">
        {/* Animated background elements */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-500 to-blue-500 rounded-full opacity-20 blur-3xl"
            animate={{
              y: [0, 20, 0],
              x: [0, 10, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-amber-500 to-red-500 rounded-full opacity-15 blur-3xl"
            animate={{
              y: [0, -20, 0],
              x: [0, -10, 0],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-6xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-sm font-semibold">
              Next-Gen Agricultural Network
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 bg-clip-text text-transparent leading-tight"
          >
            Connect Farmers with Skilled Workers
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Hire trusted agricultural professionals or find meaningful farm work opportunities quickly and securely with AgriConnect.
          </motion.p>

          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <RouterLink
              to="/jobs"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              Find Jobs <ArrowRight size={20} />
            </RouterLink>
            <RouterLink
              to="/workers"
              className="px-8 py-4 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              Browse Workers
            </RouterLink>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 rounded-lg backdrop-blur-md bg-white/10 dark:bg-white/5 border border-white/20 hover:border-green-500/50 transition-all duration-300"
                >
                  <Icon className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-foreground/70">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 md:px-8 bg-foreground/2">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Why Choose AgriConnect?
            </h2>
            <p className="text-xl text-foreground/70">Platform features built for agricultural professionals</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-6 rounded-xl bg-white dark:bg-slate-800 border border-green-200 dark:border-green-900 hover:border-green-500 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group cursor-pointer"
                >
                  <div className={`inline-block p-3 rounded-lg bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-foreground/70">{feature.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Jobs Section */}
      <section className="py-20 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Latest Agricultural Opportunities</h2>
            <p className="text-xl text-foreground/70">Real-time openings posted by farmers and companies</p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {jobs.map((job, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border border-green-200 dark:border-green-900 hover:shadow-xl hover:shadow-green-500/20 hover:border-green-500 transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold mb-1">{job.title}</h3>
                    <p className="text-sm text-foreground/60">{job.company}</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                    {job.type}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-foreground/70">
                    <MapPin size={16} />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Briefcase size={16} />
                    <span className="text-sm font-semibold text-green-600">{job.salary}</span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                >
                  Apply Now
                </motion.button>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mt-12"
          >
            <RouterLink
              to="/jobs"
              className="inline-block px-8 py-3 border-2 border-green-600 text-green-600 font-semibold rounded-full hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-300"
            >
              View All Jobs
            </RouterLink>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-green-600 to-emerald-600">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90">Join thousands of farmers and workers building a better agricultural future</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <RouterLink
              to="/register"
              className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign Up Now
            </RouterLink>
            <RouterLink
              to="/login"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300"
            >
              Sign In
            </RouterLink>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
