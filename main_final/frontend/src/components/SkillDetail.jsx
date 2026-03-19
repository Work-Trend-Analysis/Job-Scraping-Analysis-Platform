import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, MapPin, DollarSign, Users, Code, Zap, Building, Calendar } from "lucide-react";
import { topSkills } from "./TopSkills";

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

const getCategoryIcon = (category) => {
  switch (category) {
    case "Programming":
    case "Frontend":
    case "Backend":
      return <Code className="w-6 h-6" />;
    case "AI/Data":
      return <TrendingUp className="w-6 h-6" />;
    default:
      return <Zap className="w-6 h-6" />;
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Programming":
      return "text-blue-600 bg-blue-100";
    case "Frontend":
      return "text-purple-600 bg-purple-100";
    case "Backend":
      return "text-green-600 bg-green-100";
    case "AI/Data":
      return "text-red-600 bg-red-100";
    case "Cloud":
      return "text-cyan-600 bg-cyan-100";
    case "DevOps":
      return "text-orange-600 bg-orange-100";
    case "Design":
      return "text-pink-600 bg-pink-100";
    case "Security":
      return "text-gray-600 bg-gray-100";
    default:
      return "text-indigo-600 bg-indigo-100";
  }
};

// Additional skill data for learning resources and regional demand
const getSkillDetails = (skillName) => {
  const baseSkill = topSkills.find((skill) => skill.name === skillName);
  if (!baseSkill) return null;

  const additionalData = {
    Python: {
      learningPath: [
        "Variables and Data Types",
        "Control Structures",
        "Functions",
        "OOP Concepts",
        "Libraries (NumPy, Pandas)",
        "Machine Learning",
        "Web Frameworks"
      ],
      timeToLearn: "4-6 months",
      difficulty: "Beginner-Friendly",
      certifications: [
        "Python Institute PCAP",
        "Microsoft Python Certification",
        "Google Python Certification"
      ],
      regionalDemand: {
        Bangalore: 98,
        Hyderabad: 95,
        Mumbai: 92,
        Pune: 90,
        Delhi: 88,
        Chennai: 85
      },
      jobOpenings: 12500,
      remoteOpportunities: 8500
    },
    React: {
      learningPath: [
        "JavaScript Fundamentals",
        "JSX Syntax",
        "Components",
        "State Management",
        "Hooks",
        "Router",
        "Testing"
      ],
      timeToLearn: "3-4 months",
      difficulty: "Intermediate",
      certifications: [
        "Meta React Developer",
        "React Native Certification",
        "Frontend Masters React"
      ],
      regionalDemand: {
        Mumbai: 95,
        Bangalore: 92,
        Hyderabad: 88,
        Pune: 85,
        Delhi: 82,
        Chennai: 80
      },
      jobOpenings: 8500,
      remoteOpportunities: 6200
    },
    AWS: {
      learningPath: [
        "Cloud Fundamentals",
        "EC2 & Storage",
        "Networking",
        "Security",
        "Database Services",
        "Serverless",
        "DevOps Tools"
      ],
      timeToLearn: "6-8 months",
      difficulty: "Intermediate-Advanced",
      certifications: [
        "AWS Cloud Practitioner",
        "AWS Solutions Architect",
        "AWS DevOps Engineer"
      ],
      regionalDemand: {
        Bangalore: 96,
        Hyderabad: 94,
        Mumbai: 90,
        Delhi: 88,
        Pune: 85,
        Chennai: 82
      },
      jobOpenings: 9800,
      remoteOpportunities: 7200
    }
  };

  return {
    ...baseSkill,
    ...(additionalData[skillName] || {
      learningPath: [
        "Fundamentals",
        "Intermediate Concepts",
        "Advanced Topics",
        "Real-world Projects"
      ],
      timeToLearn: "3-6 months",
      difficulty: "Intermediate",
      certifications: ["Industry Standard Certifications Available"],
      regionalDemand: {
        Bangalore: 85,
        Mumbai: 82,
        Hyderabad: 80,
        Delhi: 78,
        Pune: 75,
        Chennai: 72
      },
      jobOpenings: 5000,
      remoteOpportunities: 3500
    })
  };
};

export function SkillDetail({ skillName }) {
  const skill = skillName ? getSkillDetails(skillName) : null;

  if (!skill) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Skill Not Found</h1>
          <p className="text-gray-600">
            The requested skill details could not be found.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <Card className="mb-8 p-8 bg-linear-to-r  from-blue-600 to-purple-600 text-white">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg ${getCategoryColor(skill.category)} ${
                    getCategoryColor(skill.category).split(" ")[0]
                  } bg-white`}
                >
                  {getCategoryIcon(skill.category)}
                </div>
                <Badge
                  className={`${getDemandBadgeColor(skill.demand)} font-medium`}
                >
                  {skill.demand} Demand
                </Badge>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-300" />
                  <span className="text-lg font-medium text-green-300">
                    {skill.growth}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">{skill.name}</h1>
              <p className="text-xl opacity-90 mb-4">{skill.description}</p>
              <div className="flex items-center gap-6 text-lg">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-300" />
                  <span className="text-green-300 font-medium">
                    {skill.averageSalary}
                  </span>
                </div>
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {skill.category}
                </Badge>
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-1">{skill.demandLevel}%</div>
              <div className="text-sm opacity-80">Market Demand</div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Job Roles */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Associated Job Roles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {skill.jobRoles.map((role, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-900">{role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Learning Path */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Learning Path
              </h3>
              <div className="space-y-3">
                {skill.learningPath?.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-700 font-medium">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-900">
                    Estimated Learning Time
                  </span>
                </div>
                <p className="text-blue-800">
                  {skill.timeToLearn} • {skill.difficulty}
                </p>
              </div>
            </Card>

            {/* Regional Demand Map */}
            <Card className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Regional Demand Analysis
              </h3>
              <div className="space-y-4">
                {Object.entries(skill.regionalDemand || {}).map(
                  ([city, demand]) => (
                    <div key={city} className="flex items-center gap-4">
                      <div className="w-24 text-sm font-medium text-gray-700">
                        {city}
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className={`h-3 rounded-full ${getDemandColor(demand)}`}
                          style={{ width: `${demand}%` }}
                        />
                      </div>
                      <div className="w-12 text-sm font-bold text-gray-900">
                        {demand}%
                      </div>
                    </div>
                  )
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Market Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Market Statistics
              </h3>
              <div className="space-y-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {skill.jobOpenings?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Active Job Openings</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {skill.remoteOpportunities?.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    Remote Opportunities
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {skill.growth}
                  </div>
                  <div className="text-sm text-gray-600">YoY Growth</div>
                </div>
              </div>
            </Card>

            {/* Top Companies */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Top Hiring Companies
              </h3>
              <div className="space-y-3">
                {skill.companies.map((company, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <Building className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{company}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Certifications */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recommended Certifications
              </h3>
              <div className="space-y-2">
                {skill.certifications?.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="w-full justify-start bg-gray-100 text-gray-800 p-2 h-auto"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Salary Information */}
            <Card className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Salary Range
              </h3>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {skill.averageSalary}
                </div>
                <div className="text-sm text-gray-600">Average Annual Package</div>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="text-sm text-green-800">
                    <strong>Growth Trend:</strong> {skill.growth} increase in
                    market demand
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
