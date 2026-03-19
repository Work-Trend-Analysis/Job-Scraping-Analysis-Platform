import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, FileText, Users, DollarSign, TrendingUp, Code, Zap } from "lucide-react";

export function Features({ onFeatureClick }) {
  return (
    <section className="py-20 px-6 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="w-full">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
          Powerful Features
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Job Demand Heatmap */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('geo-heatmap')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1751273907387-cf1f5d273960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMG1hcCUyMGdlb2dyYXBoeXxlbnwxfHx8fDE3NTgwODk3MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="India Map"
                className="w-full h-full object-cover opacity-70"
              />
              <div className="absolute inset-0 bg-linear-to-br from-red-400/30 via-yellow-400/30 to-green-400/30 mix-blend-multiply"></div>
              <MapPin className="absolute top-4 right-4 w-8 h-8 text-blue-900 group-hover:scale-125 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Job Demand Heatmap</h3>
            <p className="text-gray-600">Visualize job opportunities across India with our interactive heatmap showing demand hotspots.</p>
          </Card>

          {/* Resume Score */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('resume-score')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-green-200 flex items-center justify-center relative">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <span className="text-3xl font-bold text-green-600">85</span>
              </div>
              <FileText className="absolute top-4 right-4 w-8 h-8 text-blue-900 group-hover:scale-125 transition-transform" />
              <div className="absolute inset-0 bg-linear-to-r from-green-400/20 to-blue-400/20 animate-pulse"></div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Resume Score</h3>
            <p className="text-gray-600">Upload your resume and get an instant score with personalized improvement suggestions.</p>
          </Card>

          {/* Job Matching */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('job-matching')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-purple-100 to-purple-200 flex items-center justify-center relative">
              <div className="w-20 h-20 bg-white rounded-lg shadow-lg flex items-center justify-center transform rotate-3">
                <Users className="w-10 h-10 text-purple-600" />
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-lg shadow-lg flex items-center justify-center transform -rotate-12 absolute top-8 right-8">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <TrendingUp className="absolute top-4 right-4 w-8 h-8 text-blue-900 group-hover:scale-125 transition-transform" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Job Matching</h3>
            <p className="text-gray-600">AI-powered matching that aligns jobs with your resume, skills, and career goals.</p>
          </Card>

          {/* Top Skills */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('top-skills')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-cyan-100 to-blue-200 flex items-center justify-center relative">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <Code className="w-12 h-12 text-cyan-600" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-cyan-400/20 to-blue-400/20"></div>
              <div className="absolute top-2 right-2 flex gap-1">
                <Zap className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Top Skills in Demand</h3>
            <p className="text-gray-600">Explore the most sought-after skills with detailed market analysis and learning paths.</p>
          </Card>

          {/* High-Paying Opportunities */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('high-paying')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-yellow-100 to-yellow-200 flex items-center justify-center relative">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <DollarSign className="w-12 h-12 text-yellow-600" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-yellow-400/20 to-orange-400/20"></div>
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">High-Paying Jobs</h3>
            <p className="text-gray-600">Discover premium opportunities that match your skills and offer competitive compensation.</p>
          </Card>

          {/* Upcoming Trending Jobs */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('upcoming-jobs')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-green-100 to-emerald-200 flex items-center justify-center relative">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-emerald-600" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-emerald-400/20 to-green-400/20"></div>
              <div className="absolute top-2 right-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Upcoming Trending Jobs</h3>
            <p className="text-gray-600">Explore jobs that are gaining momentum and will be in high demand soon.</p>
          </Card>

          {/* Future Job Predictions */}
          <Card
            className="p-8 bg-white shadow-xl transform transition-all hover:scale-105 hover:shadow-2xl border-0 group cursor-pointer"
            onClick={() => onFeatureClick('future-predictions')}
          >
            <div className="aspect-square mb-6 overflow-hidden rounded-lg bg-linear-to-br from-purple-100 to-indigo-200 flex items-center justify-center relative">
              <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                <TrendingUp className="w-12 h-12 text-indigo-600" />
              </div>
              <div className="absolute inset-0 bg-linear-to-r from-indigo-400/20 to-purple-400/20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 border-4 border-indigo-300 rounded-full animate-spin opacity-30"></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Future Job Predictions</h3>
            <p className="text-gray-600">Discover emerging roles that will define the future of work and technology.</p>
          </Card>
        </div>
      </div>
    </section>
  );
}
