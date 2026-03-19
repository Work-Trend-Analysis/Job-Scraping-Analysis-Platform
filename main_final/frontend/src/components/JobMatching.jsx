import { useEffect, useMemo, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Star, MapPin, Building, Clock, DollarSign, Users, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FALLBACK_SKILLS = [
  { name: 'Communication', proficiency: 75 },
  { name: 'Problem Solving', proficiency: 75 },
  { name: 'Teamwork', proficiency: 75 }
];

function parseSalaryValue(salary) {
  if (!salary) return 0;
  if (typeof salary === 'number') return salary;

  const numeric = String(salary).replace(/,/g, '').match(/\d+/g);
  if (!numeric) return 0;
  return Number(numeric[numeric.length - 1]) || 0;
}

function formatPosted(rawDate) {
  if (!rawDate) return 'Unknown';
  const date = new Date(rawDate);
  if (Number.isNaN(date.getTime())) return String(rawDate);

  const diffMs = Date.now() - date.getTime();
  const day = 24 * 60 * 60 * 1000;
  const days = Math.floor(diffMs / day);

  if (days <= 0) return 'today';
  if (days === 1) return '1 day ago';
  if (days < 7) return `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks === 1) return '1 week ago';
  return `${weeks} weeks ago`;
}

export function JobMatching({ user }) {
  const [sortBy, setSortBy] = useState('match');
  const [filterByLocation, setFilterByLocation] = useState('all');
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useRerank, setUseRerank] = useState(true);
  const [rerankTopN, setRerankTopN] = useState('50');

  const userSkills = useMemo(() => {
    if (Array.isArray(user?.skills) && user.skills.length > 0) {
      return user.skills.map((name) => ({ name, proficiency: 80 }));
    }
    return FALLBACK_SKILLS;
  }, [user]);

  const fetchMatches = async () => {
    if (!user?.email) {
      setMatchedJobs([]);
      setError('Please log in to get job matches.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        email: user.email,
        topK: '20',
        rerank: String(useRerank),
        rerankTopN: String(Number(rerankTopN) || 50),
      });
      const response = await fetch(`http://localhost:8000/api/jobs/match?${params.toString()}`);
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload?.error || 'Failed to fetch matched jobs');
      }

      setMatchedJobs(Array.isArray(payload.jobs) ? payload.jobs : []);
    } catch (err) {
      setError(err.message || 'Failed to fetch matched jobs');
      setMatchedJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, [user?.email, useRerank, rerankTopN]);

  const sortedJobs = [...matchedJobs].sort((a, b) => {
    switch (sortBy) {
      case 'match':
        return (b.matchScore || 0) - (a.matchScore || 0);
      case 'salary':
        return parseSalaryValue(b.salary) - parseSalaryValue(a.salary);
      case 'recent': {
        const dateA = new Date(a.posted || 0).getTime() || 0;
        const dateB = new Date(b.posted || 0).getTime() || 0;
        return dateB - dateA;
      }
      default:
        return 0;
    }
  });

  const filteredJobs = sortedJobs.filter(
    (job) =>
      filterByLocation === 'all' ||
      String(job.location || '').toLowerCase().includes(filterByLocation.toLowerCase())
  );

  const getMatchScoreColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-50 py-8">
      <div className="w-full px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart Job Matching</h1>
          <p className="text-lg text-gray-600">AI-powered job recommendations based on your skills and profile</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Skills</h3>
              <div className="space-y-3">
                {userSkills.map((skill, index) => (
                  <div key={`${skill.name}-${index}`} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">{skill.name}</span>
                      <span className="text-gray-500">{skill.proficiency}%</span>
                    </div>
                    <Progress value={skill.proficiency} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Ranking Settings</h3>
              <p className="text-xs text-gray-600 mb-3">
                These settings control how the backend reranks matched jobs from your saved profile.
              </p>
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={useRerank}
                    onChange={(e) => setUseRerank(e.target.checked)}
                  />
                  Use cross-encoder reranking
                </label>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">
                    Rerank top N candidates
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={rerankTopN}
                    onChange={(e) => setRerankTopN(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <Button
                  size="sm"
                  className="bg-blue-900 hover:bg-blue-800"
                  onClick={() => fetchMatches()}
                  disabled={loading}
                >
                  Refresh Matches
                </Button>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Sort by</label>
                  <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="match">Best Match</SelectItem>
                      <SelectItem value="salary">Highest Salary</SelectItem>
                      <SelectItem value="recent">Most Recent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Location</label>
                  <Select value={filterByLocation} onValueChange={setFilterByLocation}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="chennai">Chennai</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-white shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Match Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Matches</span>
                  <span className="font-semibold text-gray-900">{filteredJobs.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Excellent Matches (90%+)</span>
                  <span className="font-semibold text-green-600">
                    {filteredJobs.filter((job) => (job.matchScore || 0) >= 90).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Good Matches (80-89%)</span>
                  <span className="font-semibold text-blue-600">
                    {filteredJobs.filter((job) => (job.matchScore || 0) >= 80 && (job.matchScore || 0) < 90).length}
                  </span>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-3 space-y-6">
            {loading && (
              <Card className="p-6 bg-white shadow-lg">
                <p className="text-gray-700">Loading matched jobs...</p>
              </Card>
            )}

            {!loading && error && (
              <Card className="p-6 bg-white shadow-lg">
                <p className="text-red-700">{error}</p>
              </Card>
            )}

            {!loading && !error && filteredJobs.length === 0 && (
              <Card className="p-6 bg-white shadow-lg">
                <p className="text-gray-700">No job matches found. Complete your profile to improve recommendations.</p>
              </Card>
            )}

            {filteredJobs.map((job) => (
              <Card key={job.id} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <Badge className={`${getMatchScoreColor(job.matchScore || 0)} font-semibold`}>
                        {job.matchScore || 0}% Match
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-gray-600 mb-3">
                      <div className="flex items-center gap-1">
                        <Building className="w-4 h-4" />
                        <span className="text-sm">{job.company}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{job.companyRating || '-'}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{job.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{job.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium">{job.salary}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-sm">
                        {job.experience} • {job.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span className="text-sm">
                        {job.applicants || 0} applicants • Posted {formatPosted(job.posted)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Match Score:</span>
                    <Progress value={job.matchScore || 0} className="w-24 h-2" />
                    <span className="text-sm font-medium">{job.matchScore || 0}%</span>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      Save Job
                    </Button>
                    <Button className="bg-blue-900 hover:bg-blue-800" size="sm">
                      Apply Now
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
