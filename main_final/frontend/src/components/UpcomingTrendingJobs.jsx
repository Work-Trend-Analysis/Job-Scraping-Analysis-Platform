import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TrendingUp, Calendar, Users, Zap, Brain, Shield, Cpu, Cloud, Palette, Globe } from 'lucide-react';

const upcomingJobs = [
  {
    id: 1,
    role: 'Quantum Computing Engineer',
    category: 'Emerging Technology',
    timeframe: '2025-2026',
    growth: '+150%',
    demand: 'Very High',
    icon: <Cpu className="w-6 h-6" />,
    description: 'Design and develop quantum algorithms and quantum software systems',
    skills: ['Quantum Mechanics', 'Linear Algebra', 'Python', 'Qiskit', 'Cirq'],
    avgSalary: '₹25-45 LPA',
    currentJobs: 15,
    projectedJobs: 380,
    regions: ['Bangalore', 'Mumbai', 'Hyderabad'],
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 2,
    role: 'Extended Reality (XR) Developer',
    category: 'Virtual Reality',
    timeframe: '2025',
    growth: '+120%',
    demand: 'Very High',
    icon: <Globe className="w-6 h-6" />,
    description: 'Create immersive AR/VR/MR experiences for various industries',
    skills: ['Unity', 'Unreal Engine', 'C#', '3D Modeling', 'WebXR'],
    avgSalary: '₹18-35 LPA',
    currentJobs: 145,
    projectedJobs: 1200,
    regions: ['Bangalore', 'Pune', 'Delhi'],
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 3,
    role: 'AI Ethics Specialist',
    category: 'AI & Ethics',
    timeframe: '2024-2025',
    growth: '+95%',
    demand: 'High',
    icon: <Brain className="w-6 h-6" />,
    description: 'Ensure responsible AI development and deployment practices',
    skills: ['AI/ML', 'Ethics', 'Policy Development', 'Risk Assessment'],
    avgSalary: '₹20-40 LPA',
    currentJobs: 85,
    projectedJobs: 650,
    regions: ['Bangalore', 'Mumbai', 'Delhi'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 4,
    role: 'Sustainability Technology Analyst',
    category: 'Green Technology',
    timeframe: '2024-2026',
    growth: '+80%',
    demand: 'High',
    icon: <TrendingUp className="w-6 h-6" />,
    description: 'Analyze and implement sustainable technology solutions for businesses',
    skills: ['Environmental Science', 'Data Analysis', 'Renewable Energy', 'Carbon Footprinting'],
    avgSalary: '₹15-30 LPA',
    currentJobs: 120,
    projectedJobs: 850,
    regions: ['Mumbai', 'Chennai', 'Bangalore'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 5,
    role: 'Web3 Security Auditor',
    category: 'Blockchain Security',
    timeframe: '2024-2025',
    growth: '+110%',
    demand: 'Very High',
    icon: <Shield className="w-6 h-6" />,
    description: 'Audit smart contracts and blockchain applications for security vulnerabilities',
    skills: ['Solidity', 'Smart Contract Auditing', 'Cryptography', 'Penetration Testing'],
    avgSalary: '₹22-42 LPA',
    currentJobs: 65,
    projectedJobs: 520,
    regions: ['Bangalore', 'Mumbai', 'Hyderabad'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 6,
    role: 'Edge Computing Specialist',
    category: 'Distributed Computing',
    timeframe: '2025',
    growth: '+90%',
    demand: 'High',
    icon: <Cloud className="w-6 h-6" />,
    description: 'Design and implement edge computing solutions for IoT and real-time applications',
    skills: ['Edge Computing', 'IoT', 'Kubernetes', 'Microservices', '5G Technology'],
    avgSalary: '₹20-38 LPA',
    currentJobs: 95,
    projectedJobs: 720,
    regions: ['Bangalore', 'Hyderabad', 'Pune'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 7,
    role: 'Conversational AI Designer',
    category: 'AI/UX Design',
    timeframe: '2024-2025',
    growth: '+75%',
    demand: 'Medium',
    icon: <Palette className="w-6 h-6" />,
    description: 'Design natural language interfaces and conversational experiences',
    skills: ['NLP', 'UX Design', 'Conversational Design', 'Voice UI', 'Chatbots'],
    avgSalary: '₹16-32 LPA',
    currentJobs: 110,
    projectedJobs: 680,
    regions: ['Bangalore', 'Mumbai', 'Delhi'],
    image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  },
  {
    id: 8,
    role: 'Neural Interface Engineer',
    category: 'Biotech & AI',
    timeframe: '2026-2027',
    growth: '+200%',
    demand: 'Medium',
    icon: <Zap className="w-6 h-6" />,
    description: 'Develop brain-computer interfaces and neural prosthetics',
    skills: ['Neuroscience', 'Signal Processing', 'Machine Learning', 'Biomedical Engineering'],
    avgSalary: '₹30-55 LPA',
    currentJobs: 8,
    projectedJobs: 125,
    regions: ['Bangalore', 'Mumbai', 'Chennai'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080'
  }
];

const getDemandColor = (demand) => {
  switch (demand) {
    case 'Very High':
      return 'bg-red-100 text-red-800';
    case 'High':
      return 'bg-orange-100 text-orange-800';
    case 'Medium':
      return 'bg-yellow-100 text-yellow-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const getGrowthColor = (growth) => {
  const value = parseInt(growth.replace('%', '').replace('+', ''));
  if (value >= 150) return 'text-red-600';
  if (value >= 100) return 'text-orange-600';
  if (value >= 75) return 'text-green-600';
  return 'text-blue-600';
};

export function UpcomingTrendingJobs() {
  return (
    <section className="py-20 px-6 bg-linear-to-br from-purple-50 to-pink-50">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Upcoming Trending Jobs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Stay ahead of the curve with our predictions for the most in-demand job roles of the future. 
            Plan your career strategically with insights into emerging technologies and market trends.
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center bg-linear-to-br from-blue-50 to-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
            <div className="text-sm text-blue-700">Emerging Job Categories</div>
          </Card>
          
          <Card className="p-6 text-center bg-linear-to-br from-green-50 to-green-100">
            <div className="text-3xl font-bold text-green-600 mb-2">+120%</div>
            <div className="text-sm text-green-700">Average Growth Prediction</div>
          </Card>
          
          <Card className="p-6 text-center bg-linear-to-br from-purple-50 to-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-2">₹25L</div>
            <div className="text-sm text-purple-700">Average Starting Salary</div>
          </Card>
          
          <Card className="p-6 text-center bg-linear-to-br from-orange-50 to-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-2">2025</div>
            <div className="text-sm text-orange-700">Peak Demand Year</div>
          </Card>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {upcomingJobs.map((job) => (
            <Card 
              key={job.id}
              className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border-0"
            >
              <div className="relative">
                <div className="aspect-4/3 overflow-hidden">
                  <ImageWithFallback
                    src={job.image}
                    alt={job.role}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={getDemandColor(job.demand)}>
                    {job.demand}
                  </Badge>
                </div>
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-2">
                  {job.icon}
                </div>
              </div>

              <div className="p-6">
                <Badge variant="outline" className="text-xs mb-2 text-purple-700 border-purple-300">
                  {job.category}
                </Badge>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-900 transition-colors">
                  {job.role}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>

                <div className="space-y-3 my-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{job.timeframe}</span>
                    </div>
                    <div className={`text-sm font-semibold ${getGrowthColor(job.growth)}`}>
                      <TrendingUp className="w-3 h-3 inline mr-1" />
                      {job.growth}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Salary Range:</span>
                    <span className="text-sm font-semibold text-green-600">{job.avgSalary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-xs text-gray-600">
                      {job.currentJobs} → {job.projectedJobs} jobs
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-medium text-gray-700 block mb-1">Key Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                      {job.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{job.skills.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-700 block mb-1">Top Regions:</span>
                    <div className="flex flex-wrap gap-1">
                      {job.regions.map((region, index) => (
                        <Badge key={index} variant="outline" className="text-xs text-gray-600 border-gray-300">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Projected Growth</span>
                    <span className={`font-medium ${getGrowthColor(job.growth)}`}>
                      {job.growth} by {job.timeframe.split('-')[1] || job.timeframe}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <Card className="p-8 mt-12 text-center bg-linear-to-r from-blue-900 to-purple-900 text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Future-Proof Your Career?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Start building the skills needed for tomorrow's most in-demand roles. Our AI-powered platform 
            can help you create a personalized learning path based on these trending opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              Create Learning Path
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-900 transition-colors">
              Explore All Trends
            </button>
          </div>
        </Card>
      </div>
    </section>
  );
}
