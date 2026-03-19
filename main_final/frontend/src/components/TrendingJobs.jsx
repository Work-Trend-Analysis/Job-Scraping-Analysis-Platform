import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

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
    image: "https://images.unsplash.com/photo-1616333827064-52d363cf4bea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
    image: "https://images.unsplash.com/photo-1667372393086-9d4001d51cf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
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
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 4,
    role: "Data Scientist",
    company: "DataFlow Analytics",
    location: "Pune",
    demand: "Very High",
    demandLevel: 92,
    skills: ["Python", "R", "SQL", "Machine Learning"],
    description: "Extract insights from complex data sets",
    salaryRange: "₹14-30 LPA",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 5,
    role: "UX/UI Designer",
    company: "DesignStudio",
    location: "Delhi",
    demand: "High",
    demandLevel: 80,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    description: "Design intuitive user experiences",
    salaryRange: "₹8-20 LPA",
    image: "https://images.unsplash.com/photo-1625855706500-1c130f2a76f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 6,
    role: "Cybersecurity Analyst",
    company: "SecureNet",
    location: "Chennai",
    demand: "Very High",
    demandLevel: 90,
    skills: ["Ethical Hacking", "CISSP", "Network Security", "Penetration Testing"],
    description: "Protect digital assets from cyber threats",
    salaryRange: "₹12-26 LPA",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 7,
    role: "Cloud Architect",
    company: "CloudTech Solutions",
    location: "Bangalore",
    demand: "High",
    demandLevel: 87,
    skills: ["AWS", "Azure", "GCP", "Microservices"],
    description: "Design scalable cloud infrastructure",
    salaryRange: "₹18-40 LPA",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 8,
    role: "Product Manager",
    company: "InnovateTech",
    location: "Gurgaon",
    demand: "High",
    demandLevel: 83,
    skills: ["Product Strategy", "Agile", "Market Research", "Analytics"],
    description: "Drive product vision and strategy",
    salaryRange: "₹16-35 LPA",
    image: "https://images.unsplash.com/photo-1622151835432-6e98c7118bcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 9,
    role: "Blockchain Developer",
    company: "CryptoSolutions",
    location: "Mumbai",
    demand: "Medium",
    demandLevel: 75,
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3"],
    description: "Build decentralized applications",
    salaryRange: "₹10-22 LPA",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  },
  {
    id: 10,
    role: "Digital Marketing Specialist",
    company: "MarketGrow",
    location: "Kolkata",
    demand: "Medium",
    demandLevel: 72,
    skills: ["SEO", "SEM", "Social Media", "Content Marketing"],
    description: "Drive digital marketing campaigns",
    salaryRange: "₹6-15 LPA",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
  }
];

export function TrendingJobs({ onJobClick }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  // Adjust items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(4);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalPages = Math.ceil(trendingJobs.length / itemsPerPage);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentJobs = () => {
    const start = currentIndex * itemsPerPage;
    return trendingJobs.slice(start, start + itemsPerPage);
  };

  return (
    <section className="py-16 px-6 bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trending Jobs</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Click on any job to explore detailed market insights and requirements
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={prevSlide}
            disabled={totalPages <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg"
            onClick={nextSlide}
            disabled={totalPages <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>

          {/* Job Cards */}
          <div className="overflow-hidden mx-4 md:mx-12">
            <div
              className={`grid gap-6 ${
                itemsPerPage === 1
                  ? "grid-cols-1"
                  : itemsPerPage === 2
                  ? "grid-cols-2"
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {getCurrentJobs().map((job) => (
                <Card
                  key={job.id}
                  className="bg-white shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl cursor-pointer border-0 overflow-hidden group"
                  onClick={() => onJobClick(job.id)}
                >
                  <div className="relative">
                    <div className="aspect-4/3 overflow-hidden">
                      <ImageWithFallback
                        src={job.image}
                        alt={job.role}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1 group-hover:text-blue-200 transition-colors">
                        {job.role}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? "bg-blue-600"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
