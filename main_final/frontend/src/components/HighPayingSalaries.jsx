import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import {
  DollarSign,
  MapPin,
  Building,
  Filter,
  Users,
} from 'lucide-react';

export function HighPayingSalaries() {
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [sortBy, setSortBy] = useState('salary');
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const res = await fetch('http://localhost:8000/api/jobs/high-paying');
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error('Could not fetch high paying jobs:', err);
      }
    }
    fetchJobs();
  }, []);

  // Regions for your filter dropdown (can be dynamic)
  const regions = [
    "Bangalore", "Mumbai", "Hyderabad", "Delhi", "Pune", "Chennai"
  ];

  const filteredJobs = jobs
    .filter(job => selectedRegion === 'all' || job.location === selectedRegion)
    .sort((a, b) => {
      if (sortBy === 'salary') return b.salary - a.salary;
      return 0; // Add more sorting logic as needed
    });

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8">
      <div className="w-full px-6">
        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            High-Paying Salary Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Explore lucrative career opportunities and salary trends across India's major tech hubs
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-8 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-blue-900" />
              <span className="font-medium text-gray-900">Filters:</span>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem value={region} key={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="salary">Highest Salary</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Showing {filteredJobs.length} high-paying roles
              </p>
              <p className="text-xs text-gray-500">Updated recently</p>
            </div>
          </div>
        </Card>

        {/* High-Paying Jobs List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            High-Paying Job Roles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <Card
                key={job._id}
                className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {job.job_title}
                    </h3>
                    <div className="flex items-center gap-2 mb-3">
                      <DollarSign className="w-5 h-5 text-green-600" />
                      <span className="text-2xl font-bold text-green-600">
                        ₹{(job.salary / 100000).toFixed(2)} LPA
                      </span>
                      <span className="text-sm text-gray-500">avg</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">Job position open</span>
                  </div>
                </div>
                <div className="space-y-3 mb-4">
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">
                      Company:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Building className="w-3 h-3 mr-1" />
                        {job.company_name}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">
                      Key Skills Required:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {Array.isArray(job.skills) && job.skills.map((skill, index) => (
                        <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <Button className="bg-blue-900 hover:bg-blue-800" size="sm">
                    View Job
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
