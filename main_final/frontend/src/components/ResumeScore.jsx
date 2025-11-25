import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Upload, FileText, CheckCircle, AlertCircle, XCircle, Download } from 'lucide-react';

const mockResumeAnalysis = {
  overallScore: 78,
  sections: {
    contact: { score: 95, status: 'excellent' },
    summary: { score: 70, status: 'good' },
    experience: { score: 85, status: 'excellent' },
    education: { score: 90, status: 'excellent' },
    skills: { score: 60, status: 'needs-improvement' },
    formatting: { score: 75, status: 'good' }
  },
  improvements: [
    {
      category: 'Skills Section',
      priority: 'high',
      suggestion: 'Add more relevant technical skills like React, TypeScript, and cloud technologies',
      impact: '+12 points'
    },
    {
      category: 'Summary',
      priority: 'medium', 
      suggestion: 'Strengthen your professional summary with quantifiable achievements',
      impact: '+8 points'
    },
    {
      category: 'Formatting',
      priority: 'low',
      suggestion: 'Use consistent bullet points and improve spacing between sections',
      impact: '+5 points'
    }
  ],
  grammarIssues: [
    { line: 12, issue: 'Missing period at end of bullet point', severity: 'low' },
    { line: 18, issue: 'Inconsistent tense usage', severity: 'medium' },
    { line: 24, issue: 'Comma splice', severity: 'low' }
  ],
  missingElements: [
    'LinkedIn Profile URL',
    'Portfolio Website',
    'Certifications Section',
    'Projects Section'
  ],
  keywords: {
    present: ['JavaScript', 'Python', 'SQL', 'Git'],
    missing: ['React', 'Node.js', 'AWS', 'Docker', 'Kubernetes']
  }
};

export function ResumeScore({ user }) {
  const [hasUploadedResume, setHasUploadedResume] = useState(true); // Mock as true for demo
  const [resumeFile, setResumeFile] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFile(file);
      setHasUploadedResume(true);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'good':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'needs-improvement':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!hasUploadedResume) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Score Analysis</h1>
            <p className="text-lg text-gray-600">Upload your resume to get detailed scoring and improvement suggestions</p>
          </div>

          <Card className="p-12 text-center bg-white shadow-lg">
            <Upload className="w-16 h-16 text-blue-600 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Upload Your Resume</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Get instant feedback on your resume with our AI-powered analysis tool. Supports PDF, DOC, and DOCX formats.
            </p>
            
            <div className="relative">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <Button className="bg-blue-900 hover:bg-blue-800 text-lg px-8 py-3">
                Choose File to Upload
              </Button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">Maximum file size: 10MB</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br  from-blue-50 to-indigo-50 py-8">
      <div className="w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Resume Score Analysis</h1>
          <p className="text-lg text-gray-600">Detailed analysis and improvement suggestions for your resume</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Resume Preview */}
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Your Resume</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6 min-h-[600px] border">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{user?.fullName || 'John Doe'}</h2>
                  <p className="text-gray-600">{user?.email || 'john.doe@email.com'}</p>
                  <p className="text-gray-600">{user?.phone || '+91 9876543210'}</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 border-b border-gray-300 pb-1">Professional Summary</h3>
                    <p className="text-sm text-gray-700 mt-2">
                      Experienced software developer with 5+ years in full-stack development. 
                      Proficient in JavaScript, Python, and modern frameworks.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 border-b border-gray-300 pb-1">Experience</h3>
                    <div className="mt-2 space-y-2">
                      <div>
                        <p className="font-medium text-sm">Senior Software Engineer</p>
                        <p className="text-xs text-gray-600">TechCorp India • 2021 - Present</p>
                        <ul className="text-xs text-gray-700 mt-1 ml-4 list-disc">
                          <li>Led development of React-based applications</li>
                          <li>Improved system performance by 40%</li>
                          <li>Mentored junior developers</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 border-b border-gray-300 pb-1">Skills</h3>
                    <p className="text-sm text-gray-700 mt-2">
                      JavaScript, Python, SQL, Git, HTML/CSS
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 border-b border-gray-300 pb-1">Education</h3>
                    <p className="text-sm text-gray-700 mt-2">
                      B.Tech Computer Science • ABC University • 2019
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Score Analysis */}
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Overall Resume Score</h3>
              
              <div className="text-center mb-6">
                <div className={`text-6xl font-bold mb-2 ${getScoreColor(mockResumeAnalysis.overallScore)}`}>
                  {mockResumeAnalysis.overallScore}%
                </div>
                <Progress value={mockResumeAnalysis.overallScore} className="w-full h-3" />
                <p className="text-gray-600 mt-2">Your resume is performing well with room for improvement</p>
              </div>
            </Card>

            {/* Section Breakdown */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Section Analysis</h3>
              
              <div className="space-y-4">
                {Object.entries(mockResumeAnalysis.sections).map(([section, data]) => (
                  <div key={section} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(data.status)}
                      <span className="font-medium capitalize">{section}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={data.score} className="w-20 h-2" />
                      <span className={`font-semibold ${getScoreColor(data.score)}`}>
                        {data.score}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Improvement Suggestions */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Improvement Suggestions</h3>
              
              <div className="space-y-4">
                {mockResumeAnalysis.improvements.map((improvement, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{improvement.category}</h4>
                      <div className="flex items-center gap-2">
                        <Badge className={getPriorityColor(improvement.priority)}>
                          {improvement.priority} priority
                        </Badge>
                        <Badge variant="outline" className="text-green-700 border-green-300">
                          {improvement.impact}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{improvement.suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Grammar & Formatting Issues */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Grammar & Formatting</h3>
              
              <div className="space-y-3">
                {mockResumeAnalysis.grammarIssues.map((issue, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Line {issue.line}</p>
                      <p className="text-sm text-gray-600">{issue.issue}</p>
                    </div>
                    <Badge className={issue.severity === 'medium' ? 'bg-orange-100 text-orange-800' : 'bg-yellow-100 text-yellow-800'}>
                      {issue.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Missing Elements */}
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Additions</h3>
              
              <div className="grid grid-cols-2 gap-3">
                {mockResumeAnalysis.missingElements.map((element, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-900">{element}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
