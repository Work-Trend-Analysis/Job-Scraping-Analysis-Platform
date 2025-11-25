import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { TrendingUp, Clock, Zap, Cpu, Globe, Shield, Atom, Brain } from "lucide-react";

const futurePredictions = [
  {
    id: 1,
    role: "Quantum Computing Engineer",
    timeframe: "2025-2027",
    probability: 85,
    category: "Emerging Technology",
    description: "Design and develop quantum algorithms and quantum software applications",
    demandLevel: 75,
    expectedSalary: "₹25-50 LPA",
    skills: ["Quantum Mechanics", "Linear Algebra", "Python", "Qiskit", "Quantum Algorithms"],
    icon: <Atom className="w-8 h-8" />,
    drivers: ["Quantum Computing Breakthroughs", "Government Investment", "Corporate R&D"],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 2,
    role: "AI Ethics Specialist",
    timeframe: "2024-2026",
    probability: 92,
    category: "AI Governance",
    description: "Ensure responsible AI development and deployment across organizations",
    demandLevel: 88,
    expectedSalary: "₹20-40 LPA",
    skills: ["AI/ML", "Ethics", "Policy Development", "Risk Assessment", "Compliance"],
    icon: <Shield className="w-8 h-8" />,
    drivers: ["AI Regulation", "Corporate Responsibility", "Public Trust"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 3,
    role: "Metaverse Experience Designer",
    timeframe: "2024-2025",
    probability: 78,
    category: "Virtual Reality",
    description: "Create immersive virtual experiences and environments for the metaverse",
    demandLevel: 82,
    expectedSalary: "₹15-35 LPA",
    skills: ["3D Design", "Unity", "Unreal Engine", "VR/AR", "User Experience"],
    icon: <Globe className="w-8 h-8" />,
    drivers: ["Metaverse Adoption", "VR/AR Technology", "Digital Commerce"],
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 4,
    role: "Neurotechnology Engineer",
    timeframe: "2026-2028",
    probability: 68,
    category: "Biotech",
    description: "Develop brain-computer interfaces and neural enhancement technologies",
    demandLevel: 70,
    expectedSalary: "₹30-60 LPA",
    skills: ["Neuroscience", "Signal Processing", "Machine Learning", "Electronics", "Biology"],
    icon: <Brain className="w-8 h-8" />,
    drivers: ["Medical Breakthroughs", "Aging Population", "Neural Interface Tech"],
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 5,
    role: "Autonomous Systems Engineer",
    timeframe: "2025-2027",
    probability: 89,
    category: "Robotics & AI",
    description: "Design and implement self-operating systems for various industries",
    demandLevel: 85,
    expectedSalary: "₹22-45 LPA",
    skills: ["Robotics", "AI/ML", "Computer Vision", "Sensor Fusion", "Control Systems"],
    icon: <Cpu className="w-8 h-8" />,
    drivers: ["Automation Demand", "Labor Shortage", "Efficiency Needs"],
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 6,
    role: "Climate Tech Specialist",
    timeframe: "2024-2026",
    probability: 94,
    category: "Sustainability",
    description: "Develop technological solutions for climate change mitigation and adaptation",
    demandLevel: 90,
    expectedSalary: "₹18-38 LPA",
    skills: ["Environmental Science", "Data Analysis", "IoT", "Renewable Energy", "Carbon Tech"],
    icon: <Zap className="w-8 h-8" />,
    drivers: ["Climate Crisis", "Government Policies", "Corporate ESG"],
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 7,
    role: "Digital Twin Architect",
    timeframe: "2025-2026",
    probability: 87,
    category: "IoT & Simulation",
    description: "Create virtual replicas of physical systems for monitoring and optimization",
    demandLevel: 83,
    expectedSalary: "₹20-42 LPA",
    skills: ["IoT", "3D Modeling", "Simulation", "Data Analytics", "Cloud Computing"],
    icon: <Globe className="w-8 h-8" />,
    drivers: ["Industry 4.0", "Predictive Maintenance", "Smart Cities"],
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 8,
    role: "Biocomputing Specialist",
    timeframe: "2027-2030",
    probability: 65,
    category: "Biotechnology",
    description: "Develop computing systems using biological components and processes",
    demandLevel: 72,
    expectedSalary: "₹28-55 LPA",
    skills: ["Biotechnology", "Computer Science", "Molecular Biology", "Biochemistry", "Algorithms"],
    icon: <Atom className="w-8 h-8" />,
    drivers: ["Biological Computing", "Drug Discovery", "Sustainable Computing"],
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

const getProbabilityColor = (probability) => {
  if (probability >= 85) return "bg-green-500";
  if (probability >= 70) return "bg-yellow-500";
  return "bg-orange-500";
};

const getProbabilityBadgeColor = (probability) => {
  if (probability >= 85) return "bg-green-100 text-green-800";
  if (probability >= 70) return "bg-yellow-100 text-yellow-800";
  return "bg-orange-100 text-orange-800";
};

const getCategoryColor = (category) => {
  const colors = {
    "Emerging Technology": "bg-purple-100 text-purple-800",
    "AI Governance": "bg-blue-100 text-blue-800",
    "Virtual Reality": "bg-pink-100 text-pink-800",
    "Biotech": "bg-green-100 text-green-800",
    "Robotics & AI": "bg-indigo-100 text-indigo-800",
    "Sustainability": "bg-emerald-100 text-emerald-800",
    "IoT & Simulation": "bg-cyan-100 text-cyan-800",
    "Biotechnology": "bg-teal-100 text-teal-800"
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export function FuturePredictions() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Future Job Predictions
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore emerging job roles that will shape the future workforce. These predictions are based on 
            technological trends, market analysis, and industry expert insights.
          </p>
        </div>

        {/* Predictions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {futurePredictions.map((prediction) => (
            <Card
              key={prediction.id}
              className="overflow-hidden bg-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl border-0"
            >
              <div className="relative">
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={prediction.image}
                    alt={prediction.role}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute top-4 left-4">
                  <Badge className={getCategoryColor(prediction.category)}>
                    {prediction.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge className={`${getProbabilityBadgeColor(prediction.probability)} font-medium`}>
                    {prediction.probability}% Likely
                  </Badge>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    {prediction.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{prediction.role}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>{prediction.timeframe}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {prediction.description}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Expected Demand:</span>
                    <span className="text-sm font-bold text-gray-900">{prediction.demandLevel}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getProbabilityColor(prediction.demandLevel)}`}
                      style={{ width: `${prediction.demandLevel}%` }}
                    />
                  </div>

                  <div className="flex items-center gap-2 text-green-600">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{prediction.expectedSalary}</span>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Key Skills:</span>
                    <div className="flex flex-wrap gap-1">
                      {prediction.skills.slice(0, 3).map((skill, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="text-xs bg-blue-100 text-blue-800"
                        >
                          {skill}
                        </Badge>
                      ))}
                      {prediction.skills.length > 3 && (
                        <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                          +{prediction.skills.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-sm font-medium text-gray-700 block mb-2">Key Drivers:</span>
                    <div className="space-y-1">
                      {prediction.drivers.map((driver, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                          <span className="text-xs text-gray-600">{driver}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Timeline View */}
        <Card className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergence Timeline</h2>
          <div className="space-y-4">
            {["2024-2025", "2025-2026", "2026-2027", "2027-2030"].map((timeframe) => {
              const timeframePredictions = futurePredictions.filter(p => p.timeframe.includes(timeframe.split('-')[0]));
              return (
                <div key={timeframe} className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{timeframe}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {timeframePredictions.map((prediction) => (
                      <div key={prediction.id} className="p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{prediction.role}</span>
                          <Badge className={`${getProbabilityBadgeColor(prediction.probability)} text-xs`}>
                            {prediction.probability}%
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">{prediction.expectedSalary}</div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}
