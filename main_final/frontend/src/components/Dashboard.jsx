import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  MapPin,
  Mail,
  Phone,
  Linkedin,
  Calendar,
  GraduationCap,
  MapIcon,
  FileText,
  User,
  Settings,
  Users,
} from "lucide-react";

// Mock data for skills-based job demand
const skillsJobData = [
  { skill: "React", demand: 85, jobs: 1250 },
  { skill: "Python", demand: 90, jobs: 1450 },
  { skill: "Java", demand: 78, jobs: 980 },
  { skill: "Node.js", demand: 82, jobs: 1100 },
  { skill: "SQL", demand: 75, jobs: 850 },
  { skill: "AWS", demand: 88, jobs: 1300 },
];

// Mock data for job titles
const jobTitles = [
  "Software Developer",
  "Data Analyst",
  "Product Manager",
  "UI/UX Designer",
  "DevOps Engineer",
];

// Mock regional demand data
const regionalDemand = {
  "Software Developer": [
    { region: "Mumbai", demand: 95, color: "#dc2626" },
    { region: "Bangalore", demand: 98, color: "#dc2626" },
    { region: "Delhi", demand: 85, color: "#ea580c" },
    { region: "Hyderabad", demand: 88, color: "#ea580c" },
    { region: "Chennai", demand: 82, color: "#f59e0b" },
    { region: "Pune", demand: 90, color: "#dc2626" },
    { region: "Kolkata", demand: 70, color: "#65a30d" },
    { region: "Ahmedabad", demand: 75, color: "#65a30d" },
  ],
};

// Mock improvement areas data
const improvementData = {
  "Software Developer": [
    { name: "Technical Skills", value: 35, color: "#ef4444" },
    { name: "Soft Skills", value: 25, color: "#f97316" },
    { name: "Industry Knowledge", value: 20, color: "#eab308" },
    { name: "Certifications", value: 20, color: "#22c55e" },
  ],
};

export function Dashboard({ user, onViewChange }) {
  const [selectedJob, setSelectedJob] = useState("Software Developer");

  const currentRegionalData = regionalDemand[selectedJob] || [];
  const currentImprovementData = improvementData[selectedJob] || [];

  const defaultUser = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    linkedinId: "linkedin.com/in/johndoe",
    currentLocation: "Mumbai, Maharashtra",
    dateOfBirth: "June 15, 1999",
    college: "Indian Institute of Technology, Mumbai",
    course: "Bachelor of Computer Science",
    profilePicture:
      "https://images.unsplash.com/photo-1576558656222-ba66febe3dec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMHBvcnRyYWl0fGVufDF8fHx8MTc1ODA0OTA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  };

  const displayUser = { ...defaultUser, ...user };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8">
          {/* Left Panel - Personal Information */}
          <div className="lg:col-span-3">
            <Card className="p-8 bg-white shadow-lg sticky top-6">
              {/* Profile Picture */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <ImageWithFallback
                    src={displayUser.profilePicture}
                    alt={displayUser.fullName}
                    className="w-32 h-32 rounded-full object-cover shadow-xl border-4 border-white"
                  />
                  <div className="absolute inset-0 rounded-full shadow-lg"></div>
                </div>
              </div>

              {/* Username */}
              <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
                {displayUser.fullName}
              </h2>

              {/* Quick Actions */}
              <div className="space-y-3 mb-8">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => onViewChange("resume-score")}
                >
                  <FileText className="w-4 h-4" />
                  Your Resume
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2"
                  onClick={() => onViewChange("profile")}
                >
                  <User className="w-4 h-4" />
                  Edit Profile
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Settings className="w-4 h-4" />
                  Settings
                </Button>
              </div>

              {/* Academic Details */}
              <div className="space-y-4 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Academic Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">{displayUser.course}</p>
                      <p className="text-gray-600">{displayUser.college}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">
                  Contact Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-gray-700 break-all text-sm">{displayUser.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                    <p className="text-gray-700">{displayUser.phone}</p>
                  </div>
                  {displayUser.linkedinId && (
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-5 h-5 text-blue-600 shrink-0" />
                      <p className="text-gray-700 break-all text-sm">{displayUser.linkedinId}</p>
                    </div>
                  )}
                  {displayUser.currentLocation && (
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600 shrink-0" />
                      <p className="text-gray-700">{displayUser.currentLocation}</p>
                    </div>
                  )}
                  {displayUser.dateOfBirth && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600 shrink-0" />
                      <p className="text-gray-700">{displayUser.dateOfBirth}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-7 space-y-8">
            <Card className="p-6 bg-linear-to-r from-blue-900 to-purple-900 text-white">
              <h2 className="text-2xl font-bold mb-2">
                Welcome back, {displayUser.fullName?.split(" ")[0] || "User"}!
              </h2>
              <p className="text-blue-100">
                Here's your personalized career dashboard with insights and recommendations.
              </p>
            </Card>

            {/* Skills Chart */}
            <Card className="p-8 bg-white shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">
                Job Demand Based on Your Skills
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={skillsJobData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="skill" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "demand" ? `${value}% Demand` : `${value} Jobs`,
                        name === "demand" ? "Market Demand" : "Available Jobs",
                      ]}
                    />
                    <Bar dataKey="demand" fill="#1e40af" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Regional & Improvement Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Regional Demand */}
              <Card className="p-8 bg-white shadow-lg">
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Regional Job Demand</h3>
                  <Select value={selectedJob} onValueChange={setSelectedJob}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a job title" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobTitles.map((job) => (
                        <SelectItem key={job} value={job}>
                          {job}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {currentRegionalData.map((region) => (
                    <div key={region.region} className="flex items-center justify-between">
                      <span className="font-medium text-gray-700">{region.region}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all duration-500"
                            style={{ width: `${region.demand}%`, backgroundColor: region.color }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium text-gray-600 w-12">
                          {region.demand}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center justify-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-600 rounded"></div>
                    <span>High Demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-orange-500 rounded"></div>
                    <span>Medium Demand</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-600 rounded"></div>
                    <span>Low Demand</span>
                  </div>
                </div>
              </Card>

              {/* Improvement Areas */}
              <Card className="p-8 bg-white shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">
                  Areas for Improvement
                </h3>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={currentImprovementData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={120}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {currentImprovementData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {currentImprovementData.map((area) => (
                    <div key={area.name} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: area.color }}
                      ></div>
                      <span className="text-sm text-gray-700">{area.name}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                className="p-6 h-auto flex-col gap-2"
                onClick={() => onViewChange("job-matching")}
              >
                <Users className="w-8 h-8 text-blue-600" />
                <span>Job Matching</span>
              </Button>

              <Button
                variant="outline"
                className="p-6 h-auto flex-col gap-2"
                onClick={() => onViewChange("high-paying")}
              >
                <MapPin className="w-8 h-8 text-green-600" />
                <span>High Paying Jobs</span>
              </Button>

              <Button
                variant="outline"
                className="p-6 h-auto flex-col gap-2"
                onClick={() => onViewChange("geo-heatmap")}
              >
                <MapIcon className="w-8 h-8 text-purple-600" />
                <span>Job Heatmap</span>
              </Button>

              <Button
                variant="outline"
                className="p-6 h-auto flex-col gap-2"
                onClick={() => onViewChange("upcoming-jobs")}
              >
                <Calendar className="w-8 h-8 text-orange-600" />
                <span>Future Trends</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
