import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Star, MapPin, Building, Clock, DollarSign, Users, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

// Mock user skills from resume
const userSkills = [
  { name: 'JavaScript', proficiency: 85 },
  { name: 'Python', proficiency: 78 },
  { name: 'React', proficiency: 82 },
  { name: 'SQL', proficiency: 75 },
  { name: 'Git', proficiency: 80 },
  { name: 'HTML/CSS', proficiency: 88 },
  { name: 'Node.js', proficiency: 70 }
];

const matchedJobs = [
  {
    id: 1,
    title: 'Senior Full Stack Developer',
    company: 'TechVision Labs',
    location: 'Bangalore, Karnataka',
    type: 'Full-time',
    experience: '3-5 years',
    salary: '₹18-28 LPA',
    matchScore: 94,
    requiredSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    matchingSkills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL'],
    missingSkills: [],
    description: 'Join our innovative team to build cutting-edge web applications using modern technologies.',
    benefits: ['Health Insurance', 'Remote Work', 'Stock Options', 'Learning Budget'],
    posted: '2 days ago',
    applicants: 45,
    companyRating: 4.6
  },
  {
    id: 2,
    title: 'Frontend Developer',
    company: 'DigitalCraft Solutions',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹12-20 LPA',
    matchScore: 89,
    requiredSkills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript', 'Redux'],
    matchingSkills: ['React', 'JavaScript', 'HTML/CSS'],
    missingSkills: ['TypeScript', 'Redux'],
    description: 'Create beautiful and responsive user interfaces for our digital products.',
    benefits: ['Flexible Hours', 'Health Insurance', 'Team Outings'],
    posted: '1 day ago',
    applicants: 32,
    companyRating: 4.3
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'DataFlow Systems',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    experience: '3-6 years',
    salary: '₹15-25 LPA',
    matchScore: 85,
    requiredSkills: ['Python', 'Django', 'PostgreSQL', 'AWS', 'Docker'],
    matchingSkills: ['Python'],
    missingSkills: ['Django', 'PostgreSQL', 'AWS', 'Docker'],
    description: 'Build scalable backend systems and APIs for our data-driven applications.',
    benefits: ['Health Insurance', 'Professional Development', 'Work from Home'],
    posted: '3 days ago',
    applicants: 28,
    companyRating: 4.4
  },
  {
    id: 4,
    title: 'Software Engineer',
    company: 'InnovateTech',
    location: 'Pune, Maharashtra',
    type: 'Full-time',
    experience: '1-3 years',
    salary: '₹10-18 LPA',
    matchScore: 82,
    requiredSkills: ['JavaScript', 'Python', 'Git', 'Agile', 'Testing'],
    matchingSkills: ['JavaScript', 'Python', 'Git'],
    missingSkills: ['Agile', 'Testing'],
    description: 'Work on diverse projects and contribute to our growing technology stack.',
    benefits: ['Health Insurance', 'Gym Membership', 'Learning Resources'],
    posted: '1 week ago',
    applicants: 67,
    companyRating: 4.2
  },
  {
    id: 5,
    title: 'Web Developer',
    company: 'Creative Digital',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    experience: '2-4 years',
    salary: '₹8-16 LPA',
    matchScore: 78,
    requiredSkills: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress'],
    matchingSkills: ['HTML/CSS', 'JavaScript'],
    missingSkills: ['PHP', 'MySQL', 'WordPress'],
    description: 'Develop custom websites and web applications for our diverse client base.',
    benefits: ['Flexible Hours', 'Client Interaction', 'Project Variety'],
    posted: '4 days ago',
    applicants: 23,
    companyRating: 4.1
  },
  {
    id: 6,
    title: 'Python Developer',
    company: 'AI Solutions Inc',
    location: 'Delhi, Delhi',
    type: 'Full-time',
    experience: '2-5 years',
    salary: '₹14-22 LPA',
    matchScore: 75,
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'NumPy', 'Pandas'],
    matchingSkills: ['Python'],
    missingSkills: ['Machine Learning', 'TensorFlow', 'NumPy', 'Pandas'],
    description: 'Develop AI-powered solutions and machine learning models.',
    benefits: ['Cutting-edge Tech', 'Research Opportunities', 'Conference Attendance'],
    posted: '5 days ago',
    applicants: 41,
    companyRating: 4.5
  }
];

export function JobMatching({ user }) {
  const [sortBy, setSortBy] = useState('match');
  const [filterByLocation, setFilterByLocation] = useState('all');

  const sortedJobs = [...matchedJobs].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return b.matchScore - a.matchScore;
      case 'salary':
        const aMax = parseInt(a.salary.split('-')[1].replace(/[^\d]/g, ''));
        const bMax = parseInt(b.salary.split('-')[1].replace(/[^\d]/g, ''));
        return bMax - aMax;
      case 'recent':
        const getPostedDays = (posted) => {
          if (posted.includes('day')) return parseInt(posted);
          if (posted.includes('week')) return parseInt(posted) * 7;
          return 0;
        };
        return getPostedDays(a.posted) - getPostedDays(b.posted);
      default:
        return 0;
    }
  });

  const filteredJobs = sortedJobs.filter(
    (job) =>
      filterByLocation === 'all' ||
      job.location.toLowerCase().includes(filterByLocation.toLowerCase())
  );

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8">
      <div className="w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Job Matching</h1>
          <p className="text-lg text-gray-600">AI-powered job recommendations based on your skills and profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - User Skills & Filters */}
          <div className="space-y-6">
            {/* User Skills */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Skills</h3>
              <div className="space-y-3">
                {userSkills.map((skill, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.proficiency}%</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            {/* Filters */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Sort by</label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Location</label>
                  <Select value={filterByLocation} onValueChange={setFilterByLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Match Statistics */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Matches</span>
                  <span className="font-semibold text-gray-900">{filteredJobs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Excellent Matches (90%+)</span>
                  <span className="font-semibold text-green-600">
                    {filteredJobs.filter((job) => job.matchScore >= 90).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Good Matches (80-89%)</span>
                  <span className="font-semibold text-blue-600">
                    {filteredJobs.filter((job) => job.matchScore >= 80 && job.matchScore < 90).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3 space-y-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <Badge className={`${getMatchScoreColor(job.matchScore)} font-semibold`}>
                        {job.matchScore}% Match
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{job.companyRating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {job.experience} • {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">
                        {job.applicants} applicants • Posted {job.posted}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <span className="text-sm font-medium text-gray-700 block mb-1">Matching Skills:</span>
                      <div className="flex flex-wrap gap-1">
                        {job.matchingSkills.map((skill, index) => (
                          <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {job.missingSkills.length > 0 && (
                      <div>
                        <span className="text-sm font-medium text-gray-700 block mb-1">Skills to Learn:</span>
                        <div className="flex flex-wrap gap-1">
                          {job.missingSkills.map((skill, index) => (
                            <Badge key={index} className="bg-orange-100 text-orange-800 text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-sm font-medium text-gray-700 block mb-2">Benefits:</span>
                  <div className="flex flex-wrap gap-2">
                    {job.benefits.map((benefit, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Match Score:</span>
                    <Progress value={job.matchScore} className="w-24 h-2" />
                    <span className="text-sm font-medium">{job.matchScore}%</span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Save Job
                    </Button>
                    <Button className="bg-blue-900 hover:bg-blue-800" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
