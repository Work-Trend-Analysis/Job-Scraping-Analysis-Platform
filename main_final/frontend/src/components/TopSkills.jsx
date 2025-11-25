import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { TrendingUp, Code, Zap } from "lucide-react";

const topSkills = [
  {
    name: "Python",
    category: "Programming",
    demand: "Very High",
    demandLevel: 95,
    growth: "+25%",
    jobRoles: ["AI/ML Engineer", "Data Scientist", "Backend Developer", "DevOps Engineer"],
    averageSalary: "₹12-30 LPA",
    description: "Most sought-after programming language for AI, data science, and backend development",
    companies: ["Google", "Microsoft", "Amazon", "Flipkart", "Zomato"],
  },
  {
    name: "React",
    category: "Frontend",
    demand: "High",
    demandLevel: 88,
    growth: "+20%",
    jobRoles: ["Frontend Developer", "Full Stack Developer", "UI Developer"],
    averageSalary: "₹8-25 LPA",
    description: "Leading JavaScript library for building user interfaces",
    companies: ["Facebook", "Netflix", "Airbnb", "Swiggy", "PayTM"],
  },
  {
    name: "AWS",
    category: "Cloud",
    demand: "Very High",
    demandLevel: 92,
    growth: "+30%",
    jobRoles: ["Cloud Architect", "DevOps Engineer", "Solutions Architect"],
    averageSalary: "₹15-35 LPA",
    description: "Amazon Web Services - leading cloud computing platform",
    companies: ["Amazon", "Netflix", "Spotify", "Razorpay", "BYJU'S"],
  },
  {
    name: "Machine Learning",
    category: "AI/Data",
    demand: "Very High",
    demandLevel: 90,
    growth: "+28%",
    jobRoles: ["ML Engineer", "Data Scientist", "AI Researcher"],
    averageSalary: "₹14-32 LPA",
    description: "Core technology driving AI revolution across industries",
    companies: ["Google", "Microsoft", "IBM", "Flipkart", "Ola"],
  },
  {
    name: "Docker",
    category: "DevOps",
    demand: "High",
    demandLevel: 85,
    growth: "+22%",
    jobRoles: ["DevOps Engineer", "Site Reliability Engineer", "Cloud Engineer"],
    averageSalary: "₹10-28 LPA",
    description: "Containerization platform for application deployment",
    companies: ["Docker", "Red Hat", "Kubernetes", "Amazon", "Google"],
  },
  {
    name: "Node.js",
    category: "Backend",
    demand: "High",
    demandLevel: 82,
    growth: "+18%",
    jobRoles: ["Backend Developer", "Full Stack Developer", "API Developer"],
    averageSalary: "₹9-24 LPA",
    description: "JavaScript runtime for server-side development",
    companies: ["Netflix", "LinkedIn", "Uber", "PayPal", "WhatsApp"],
  },
  {
    name: "Kubernetes",
    category: "DevOps",
    demand: "High",
    demandLevel: 87,
    growth: "+26%",
    jobRoles: ["Kubernetes Admin", "DevOps Engineer", "Cloud Architect"],
    averageSalary: "₹12-30 LPA",
    description: "Container orchestration platform for scalable applications",
    companies: ["Google", "Red Hat", "VMware", "Cisco", "Intel"],
  },
  {
    name: "Figma",
    category: "Design",
    demand: "Medium",
    demandLevel: 75,
    growth: "+15%",
    jobRoles: ["UI/UX Designer", "Product Designer", "Visual Designer"],
    averageSalary: "₹6-18 LPA",
    description: "Collaborative design tool for UI/UX designers",
    companies: ["Figma", "Adobe", "Sketch", "InVision", "Zeplin"],
  },
  {
    name: "TensorFlow",
    category: "AI/Data",
    demand: "High",
    demandLevel: 83,
    growth: "+24%",
    jobRoles: ["ML Engineer", "AI Developer", "Data Scientist"],
    averageSalary: "₹13-28 LPA",
    description: "Open-source machine learning framework by Google",
    companies: ["Google", "DeepMind", "OpenAI", "Tesla", "Uber"],
  },
  {
    name: "Cybersecurity",
    category: "Security",
    demand: "Very High",
    demandLevel: 94,
    growth: "+32%",
    jobRoles: ["Security Analyst", "Ethical Hacker", "Security Architect"],
    averageSalary: "₹11-26 LPA",
    description: "Critical skill for protecting digital assets and infrastructure",
    companies: ["Cisco", "Palo Alto", "CrowdStrike", "FireEye", "Symantec"],
  },
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

const getCategoryIcon = (category) => {
  switch (category) {
    case "Programming":
    case "Frontend":
    case "Backend":
      return <Code className="w-4 h-4" />;
    case "AI/Data":
      return <TrendingUp className="w-4 h-4" />;
    default:
      return <Zap className="w-4 h-4" />;
  }
};

export function TopSkills({ onSkillClick }) {
  return (
    <section className="py-16 px-6 bg-linear-to-br  from-purple-50 to-pink-50">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Top Skills in Demand</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any skill to explore detailed demand trends and associated job opportunities
          </p>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {topSkills.map((skill, index) => (
            <Card
              key={index}
              className="p-4 bg-white shadow-md transform transition-all hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-100 text-center group"
              onClick={() => onSkillClick && onSkillClick(skill.name)}
            >
              <div className="mb-3">
                <div className="flex items-center justify-center gap-1 mb-2">
                  {getCategoryIcon(skill.category)}
                  <span className="text-xs text-gray-500">{skill.category}</span>
                </div>
                <Badge className={`${getDemandBadgeColor(skill.demand)} font-medium text-xs`}>
                  {skill.demand}
                </Badge>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                {skill.name}
              </h3>

              <div className="flex items-center justify-center gap-1 text-green-600 text-sm mb-2">
                <TrendingUp className="w-3 h-3" />
                <span className="font-medium">{skill.growth}</span>
              </div>

              <div className="text-sm text-gray-600">{skill.averageSalary}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export { topSkills };
