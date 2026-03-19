import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Filter, TrendingUp, Users } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

const indiaRegions = [
  {
    id: 1,
    name: "Bangalore",
    state: "Karnataka",
    coordinates: { x: 45, y: 70 },
    demand: "Most-Demand",
    color: "bg-red-500",
    jobs: ["Software Engineer", "Data Scientist", "Product Manager", "DevOps Engineer"],
    skills: ["React", "Python", "AWS", "Machine Learning", "JavaScript"],
    jobCount: 1250,
  },
  {
    id: 2,
    name: "Mumbai",
    state: "Maharashtra",
    coordinates: { x: 35, y: 55 },
    demand: "Most-Demand",
    color: "bg-red-500",
    jobs: ["Financial Analyst", "Full Stack Developer", "Marketing Manager", "Business Analyst"],
    skills: ["Excel", "SQL", "React", "Digital Marketing", "Analytics"],
    jobCount: 980,
  },
  {
    id: 3,
    name: "Delhi",
    state: "Delhi",
    coordinates: { x: 40, y: 25 },
    demand: "Most-Demand",
    color: "bg-red-500",
    jobs: ["Government Relations", "Policy Analyst", "Software Developer", "Consultant"],
    skills: ["Public Policy", "Java", "Communication", "Project Management"],
    jobCount: 850,
  },
  {
    id: 4,
    name: "Hyderabad",
    state: "Telangana",
    coordinates: { x: 48, y: 60 },
    demand: "High-Demand",
    color: "bg-orange-500",
    jobs: ["Cloud Engineer", "Cybersecurity Analyst", "Software Developer", "QA Engineer"],
    skills: ["AWS", "Security", "Python", "Testing", "DevOps"],
    jobCount: 720,
  },
  {
    id: 5,
    name: "Chennai",
    state: "Tamil Nadu",
    coordinates: { x: 48, y: 78 },
    demand: "High-Demand",
    color: "bg-orange-500",
    jobs: ["Automotive Engineer", "Software Developer", "Manufacturing Engineer", "Data Analyst"],
    skills: ["CAD", "Manufacturing", "Python", "SQL", "Process Engineering"],
    jobCount: 650,
  },
  {
    id: 6,
    name: "Pune",
    state: "Maharashtra",
    coordinates: { x: 38, y: 58 },
    demand: "High-Demand",
    color: "bg-orange-500",
    jobs: ["Software Engineer", "Mechanical Engineer", "Quality Analyst", "Research Scientist"],
    skills: ["Java", "Automotive", "Testing", "Research", "Problem Solving"],
    jobCount: 580,
  },
  {
    id: 7,
    name: "Kolkata",
    state: "West Bengal",
    coordinates: { x: 60, y: 50 },
    demand: "Medium-Demand",
    color: "bg-yellow-500",
    jobs: ["Content Writer", "Education Specialist", "Customer Service", "Sales Representative"],
    skills: ["Writing", "Teaching", "Communication", "Sales", "Bengali"],
    jobCount: 320,
  },
  {
    id: 8,
    name: "Ahmedabad",
    state: "Gujarat",
    coordinates: { x: 32, y: 45 },
    demand: "Medium-Demand",
    color: "bg-yellow-500",
    jobs: ["Textile Engineer", "Chemical Engineer", "Business Development", "Operations Manager"],
    skills: ["Manufacturing", "Chemistry", "Business Development", "Operations"],
    jobCount: 290,
  },
  {
    id: 9,
    name: "Kochi",
    state: "Kerala",
    coordinates: { x: 42, y: 85 },
    demand: "Medium-Demand",
    color: "bg-yellow-500",
    jobs: ["IT Support", "Tourism Manager", "Content Creator", "Teacher"],
    skills: ["IT Support", "Tourism", "Content Creation", "Education"],
    jobCount: 180,
  },
  {
    id: 10,
    name: "Jaipur",
    state: "Rajasthan",
    coordinates: { x: 38, y: 35 },
    demand: "Least-Demand",
    color: "bg-gray-400",
    jobs: ["Tourism Guide", "Handicrafts Specialist", "Government Officer", "Teacher"],
    skills: ["Tourism", "Handicrafts", "Administration", "Teaching"],
    jobCount: 120,
  },
];

export function GeoHeatmap() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [filterType, setFilterType] = useState('jobs');

  const getDemandStats = () => {
    const mostDemand = indiaRegions.filter((r) => r.demand === "Most-Demand").length;
    const highDemand = indiaRegions.filter((r) => r.demand === "High-Demand").length;
    const mediumDemand = indiaRegions.filter((r) => r.demand === "Medium-Demand").length;
    const leastDemand = indiaRegions.filter((r) => r.demand === "Least-Demand").length;

    return { mostDemand, highDemand, mediumDemand, leastDemand };
  };

  const stats = getDemandStats();

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8">
      <div className="w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">India Job Demand Heatmap</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore job opportunities across India. Click on any region to see detailed job roles and skill requirements.
          </p>
        </div>

        {/* Filter Panel */}
        <Card className="p-4 mb-8 bg-white shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-blue-900" />
              <span className="font-medium text-gray-900">Filter by:</span>
              <Select value={filterType} onValueChange={(value) => setFilterType(value)}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="jobs">Trending Job Roles</SelectItem>
                  <SelectItem value="skills">Trending Skills Demand</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Most Demand ({stats.mostDemand})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span className="text-sm">High Demand ({stats.highDemand})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-sm">Medium Demand ({stats.mediumDemand})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-sm">Least Demand ({stats.leastDemand})</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* India Map */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-white shadow-lg h-[600px]">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Interactive India Map
              </h3>

              <div className="relative w-full h-full bg-linear-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden">
                {/* Simplified India Map Background */}
                <div className="absolute inset-0 opacity-20">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <path
                      d="M20,20 Q30,15 40,20 Q50,10 60,20 Q70,15 80,25 L85,35 Q80,45 75,55 Q70,65 60,70 Q50,80 40,75 Q30,85 25,75 Q15,65 20,55 Q10,45 15,35 Z"
                      fill="currentColor"
                      className="text-blue-300"
                    />
                  </svg>
                </div>

                {/* Region Dots */}
                {indiaRegions.map((region) => (
                  <div
                    key={region.id}
                    className={`absolute w-4 h-4 ${region.color} rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 hover:scale-150 transition-all duration-200 shadow-lg hover:shadow-xl`}
                    style={{
                      left: `${region.coordinates.x}%`,
                      top: `${region.coordinates.y}%`,
                    }}
                    onClick={() => setSelectedRegion(region)}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                      {region.name}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Region Details */}
          <div className="space-y-6">
            {selectedRegion ? (
              <>
                <Card className="p-6 bg-white shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-4 h-4 ${selectedRegion.color} rounded-full`}></div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{selectedRegion.name}</h3>
                      <p className="text-gray-600">{selectedRegion.state}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Demand Level:</span>
                      <Badge
                        className={
                          selectedRegion.demand === "Most-Demand"
                            ? "bg-red-100 text-red-800"
                            : selectedRegion.demand === "High-Demand"
                            ? "bg-orange-100 text-orange-800"
                            : selectedRegion.demand === "Medium-Demand"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }
                      >
                        {selectedRegion.demand}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">Available Jobs:</span>
                      <span className="font-semibold text-blue-600">{selectedRegion.jobCount}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white shadow-lg">
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    {filterType === 'jobs' ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <Users className="w-4 h-4" />
                    )}
                    {filterType === 'jobs' ? 'Top Job Roles' : 'In-Demand Skills'}
                  </h4>

                  <div className="space-y-2">
                    {(filterType === 'jobs' ? selectedRegion.jobs : selectedRegion.skills).map(
                      (item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <span className="text-sm font-medium text-gray-900">{item}</span>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3 text-green-600" />
                            <span className="text-xs text-green-600">High</span>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </Card>
              </>
            ) : (
              <Card className="p-8 bg-white shadow-lg text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Region</h3>
                <p className="text-gray-600">
                  Click on any dot on the map to view detailed job information for that region.
                </p>
              </Card>
            )}
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="p-6 text-center bg-linear-to-br from-red-50 to-red-100">
            <div className="text-3xl font-bold text-red-600">{stats.mostDemand}</div>
            <div className="text-sm text-red-700 font-medium">Most Demand Regions</div>
          </Card>

          <Card className="p-6 text-center bg-linear-to-br  from-orange-50 to-orange-100">
            <div className="text-3xl font-bold text-orange-600">{stats.highDemand}</div>
            <div className="text-sm text-orange-700 font-medium">High Demand Regions</div>
          </Card>

          <Card className="p-6 text-center bg-linear-to-br from-yellow-50 to-yellow-100">
            <div className="text-3xl font-bold text-yellow-600">{stats.mediumDemand}</div>
            <div className="text-sm text-yellow-700 font-medium">Medium Demand Regions</div>
          </Card>

          <Card className="p-6 text-center bg-linear-to-br from-gray-50 to-gray-100">
            <div className="text-3xl font-bold text-gray-600">{stats.leastDemand}</div>
            <div className="text-sm text-gray-700 font-medium">Least Demand Regions</div>
          </Card>
        </div>
      </div>
    </div>
  );
}
