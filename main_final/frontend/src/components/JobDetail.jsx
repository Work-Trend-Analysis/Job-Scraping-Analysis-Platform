import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, MapPin, DollarSign, Users, Briefcase, Clock } from "lucide-react";

const trendingJobs = [
  {
    id: 1,
    role: "AI/ML Engineer",
    company: "TechCorp India",
    location: "Bangalore",
    demand: "Very High",
    demandLevel: 95,
    skills: ["Python", "TensorFlow", "Deep Learning", "Computer Vision"],
    description: "Build cutting-edge AI solutions for enterprise clients",
    salaryRange: "₹15-35 LPA",
    image: "https://images.unsplash.com/photo-1616333827064-52d363cf4bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "3-7 years",
    jobType: "Full-time",
    remote: "Hybrid",
    teamSize: "10-50",
    growth: "+28%",
    marketTrend: "Rapidly growing demand across all industries",
    responsibilities: [
      "Develop and deploy machine learning models for production use",
      "Collaborate with data scientists to implement AI solutions",
      "Optimize model performance and scalability",
      "Research and implement cutting-edge AI techniques",
      "Work with cross-functional teams to integrate AI into products"
    ],
    requirements: [
      "Bachelor's/Master's in Computer Science or related field",
      "Strong proficiency in Python and ML frameworks",
      "Experience with TensorFlow, PyTorch, or similar",
      "Knowledge of data structures and algorithms",
      "Understanding of cloud platforms (AWS, GCP, Azure)"
    ]
  },
  {
    id: 2,
    role: "DevOps Engineer",
    company: "CloudScale",
    location: "Hyderabad",
    demand: "High",
    demandLevel: 88,
    skills: ["Docker", "Kubernetes", "AWS", "Jenkins"],
    description: "Streamline deployment and infrastructure management",
    salaryRange: "₹12-28 LPA",
    image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "2-5 years",
    jobType: "Full-time",
    remote: "Remote",
    teamSize: "5-20",
    growth: "+22%",
    marketTrend: "High demand for cloud infrastructure automation",
    responsibilities: [
      "Design and implement CI/CD pipelines",
      "Manage containerized applications with Docker and Kubernetes",
      "Monitor and optimize system performance",
      "Automate infrastructure provisioning and deployment",
      "Ensure security and compliance in deployment processes"
    ],
    requirements: [
      "Experience with containerization technologies",
      "Proficiency in cloud platforms (AWS, Azure, GCP)",
      "Knowledge of infrastructure as code (Terraform, CloudFormation)",
      "Strong scripting skills (Python, Bash, PowerShell)",
      "Understanding of monitoring and logging tools"
    ]
  },
  {
    id: 3,
    role: "Full Stack Developer",
    company: "StartupHub",
    location: "Mumbai",
    demand: "High",
    demandLevel: 85,
    skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    description: "Create end-to-end web applications for startups",
    salaryRange: "₹10-25 LPA",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    experience: "2-6 years",
    jobType: "Full-time",
    remote: "Hybrid",
    teamSize: "3-15",
    growth: "+18%",
    marketTrend: "Consistent demand for versatile full-stack skills",
    responsibilities: [
      "Develop responsive web applications using React",
      "Build and maintain RESTful APIs with Node.js",
      "Design and implement database schemas",
      "Collaborate with designers to implement UI/UX",
      "Optimize applications for performance and scalability"
    ],
    requirements: [
      "Proficiency in JavaScript/TypeScript",
      "Experience with React and modern frontend frameworks",
      "Knowledge of backend technologies (Node.js, Express)",
      "Database experience (MongoDB, PostgreSQL, MySQL)",
      "Understanding of version control (Git) and agile methodologies"
    ]
  }
  // ... (other job objects remain unchanged)
];

const getDemandColor = (level) => {
  if (level >= 90) return "bg-red-500";
  if (level >= 80) return "bg-orange-500";
  return "bg-yellow-500";
};

const getDemandBadgeColor = (demand) => {
  if (demand === "Very High") return "bg-red-100 text-red-800";
  if (demand === "High") return "bg-orange-100 text-orange-800";
  return "bg-yellow-100 text-yellow-800";
};

export function JobDetail({ jobId }) {
  const job = trendingJobs.find((j) => j.id === jobId);

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Job Not Found</h1>
          <p className="text-gray-600">The requested job details could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Card className="mb-8 overflow-hidden">
          <div className="relative">
            <div className="aspect-3/1 overflow-hidden">
              <ImageWithFallback
                src={job.image}
                alt={job.role}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Badge className={`${getDemandBadgeColor(job.demand)} font-medium`}>
                    {job.demand} Demand
                  </Badge>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-400" />
                    <span className="text-lg font-medium text-green-400">{job.growth}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-bold mb-2">{job.role}</h1>
                <div className="flex items-center gap-6 text-lg">
                  <span className="font-medium">{job.company}</span>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-green-400 font-medium">{job.salaryRange}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Overview */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Job Overview</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">{job.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Briefcase className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Experience</div>
                  <div className="font-medium text-gray-900">{job.experience}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Job Type</div>
                  <div className="font-medium text-gray-900">{job.jobType}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Work Style</div>
                  <div className="font-medium text-gray-900">{job.remote}</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Team Size</div>
                  <div className="font-medium text-gray-900">{job.teamSize}</div>
                </div>
              </div>
            </Card>

            {/* Responsibilities */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Responsibilities</h3>
              <ul className="space-y-3">
                {job.responsibilities.map((responsibility, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 shrink-0"></div>
                    <span className="text-gray-700">{responsibility}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Requirements */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Requirements</h3>
              <ul className="space-y-3">
                {job.requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-600 rounded-full mt-2 shrink-0"></div>
                    <span className="text-gray-700">{requirement}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Demand */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Market Demand</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Demand Level</span>
                    <span className="text-sm font-bold text-gray-900">{job.demandLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full ${getDemandColor(job.demandLevel)}`}
                      style={{ width: `${job.demandLevel}%` }}
                    />
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-700 mb-2">Market Trend</div>
                  <p className="text-sm text-gray-600">{job.marketTrend}</p>
                </div>
              </div>
            </Card>

            {/* Skills Required */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Skills Required</h3>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 hover:bg-blue-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Salary Information */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Compensation</h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">{job.salaryRange}</div>
                <div className="text-sm text-gray-600">Annual Package</div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Growth:</strong> {job.growth} year-over-year increase in demand
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
