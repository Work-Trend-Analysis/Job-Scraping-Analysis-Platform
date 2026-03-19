import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import {
  Upload,
  User,
  Camera,
  GraduationCap,
  Briefcase,
  FileText,
  Plus,
  X,
} from 'lucide-react';

export function ProfileUpload({ user, setUser }) {
  const emptyProfile = {
    fullName: '',
    username: '',
    email: '',
    phone: '',
    linkedinId: '',
    currentLocation: '',
    dateOfBirth: '',
    bio: '',
    college: '',
    course: '',
    graduationYear: '',
    currentCompany: '',
    currentRole: '',
    experience: '',
    skills: [],
    certifications: [],
    projects: [],
    profilePicture: null,
  };

  const [profileData, setProfileData] = useState(emptyProfile);

  // Always fetch the latest profile from DB, including after any save.
  const fetchProfile = async (email) => {
    if (!email) return;
    try {
      const res = await fetch(`http://localhost:8000/api/user/profile?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const dbUser = await res.json();
        setProfileData({
          fullName: dbUser.fullName || '',
          username: dbUser.username || '',
          email: dbUser.email || '',
          phone: dbUser.phone || '',
          linkedinId: dbUser.linkedinId || '',
          currentLocation: dbUser.currentLocation || '',
          dateOfBirth: dbUser.dateOfBirth || '',
          bio: dbUser.bio || '',
          college: dbUser.college || '',
          course: dbUser.course || '',
          graduationYear: dbUser.graduationYear || '',
          currentCompany: dbUser.currentCompany || '',
          currentRole: dbUser.currentRole || '',
          experience: dbUser.experience || '',
          skills: Array.isArray(dbUser.skills) ? dbUser.skills : [],
          certifications: Array.isArray(dbUser.certifications) ? dbUser.certifications : [],
          projects: Array.isArray(dbUser.projects) ? dbUser.projects : [],
          profilePicture: dbUser.profilePicture || null,
        });
        setUser(dbUser);
      }
    } catch (err) {
      setProfileData(emptyProfile);
    }
  };

  useEffect(() => {
    fetchProfile(user?.email);
    // eslint-disable-next-line
  }, [user?.email]);

  const [newSkill, setNewSkill] = useState('');
  const [newCertification, setNewCertification] = useState('');
  const [newProject, setNewProject] = useState({ name: '', description: '', link: '' });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      handleInputChange('skills', [...profileData.skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    handleInputChange(
      'skills',
      profileData.skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const handleAddCertification = () => {
    if (newCertification.trim() && !profileData.certifications.includes(newCertification.trim())) {
      handleInputChange('certifications', [...profileData.certifications, newCertification.trim()]);
      setNewCertification('');
    }
  };

  const handleRemoveCertification = (certToRemove) => {
    handleInputChange(
      'certifications',
      profileData.certifications.filter((cert) => cert !== certToRemove)
    );
  };

  const handleAddProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      handleInputChange('projects', [...profileData.projects, { ...newProject }]);
      setNewProject({ name: '', description: '', link: '' });
    }
  };

  const handleRemoveProject = (index) => {
    handleInputChange('projects', profileData.projects.filter((_, i) => i !== index));
  };

  const handleProfilePictureUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        handleInputChange('profilePicture', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResumeUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      alert(`Resume "${file.name}" uploaded successfully!`);
    }
  };

  // Always save to DB, then immediately reload latest from DB to show
  const handleSaveProfile = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileData),
      });
      if (!res.ok) throw new Error("Profile update failed");
      alert("Profile updated successfully!");
      fetchProfile(profileData.email); // reload latest from DB after update
    } catch (error) {
      alert("Failed to save profile!");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br  from-blue-50 to-indigo-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile Management</h1>
          <p className="text-lg text-gray-600">
            Complete your profile to get better job recommendations
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Picture & Basic Info */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <User className="w-6 h-6" />
              Basic Information
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1 text-center">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 mx-auto mb-4">
                    <AvatarImage src={profileData.profilePicture} />
                    <AvatarFallback className="bg-linear-to-br from-blue-900 to-blue-700 text-white text-2xl">
                      {profileData.fullName?.[0] || profileData.username?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <label className="absolute bottom-4 right-0 bg-blue-900 text-white p-2 rounded-full cursor-pointer hover:bg-blue-800 transition-colors">
                    <Camera className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-600">Click camera icon to upload photo</p>
              </div>

              <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={profileData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profileData.username}
                    onChange={(e) => handleInputChange('username', e.target.value)}
                    placeholder="johndoe"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <Label htmlFor="linkedinId">LinkedIn Profile</Label>
                  <Input
                    id="linkedinId"
                    value={profileData.linkedinId}
                    onChange={(e) => handleInputChange('linkedinId', e.target.value)}
                    placeholder="linkedin.com/in/johndoe"
                  />
                </div>

                <div>
                  <Label htmlFor="currentLocation">Current Location</Label>
                  <Input
                    id="currentLocation"
                    value={profileData.currentLocation}
                    onChange={(e) => handleInputChange('currentLocation', e.target.value)}
                    placeholder="Bangalore, Karnataka"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="dateOfBirth">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Brief description about yourself and your career goals..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Education */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <GraduationCap className="w-6 h-6" />
              Education
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="college">College/University</Label>
                <Input
                  id="college"
                  value={profileData.college}
                  onChange={(e) => handleInputChange('college', e.target.value)}
                  placeholder="ABC University"
                />
              </div>
              <div>
                <Label htmlFor="course">Course/Degree</Label>
                <Input
                  id="course"
                  value={profileData.course}
                  onChange={(e) => handleInputChange('course', e.target.value)}
                  placeholder="B.Tech Computer Science"
                />
              </div>
              <div>
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={profileData.graduationYear}
                  onChange={(e) => handleInputChange('graduationYear', e.target.value)}
                  placeholder="2022"
                />
              </div>
            </div>
          </Card>

          {/* Professional Experience */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Briefcase className="w-6 h-6" />
              Professional Experience
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="currentCompany">Current Company</Label>
                <Input
                  id="currentCompany"
                  value={profileData.currentCompany}
                  onChange={(e) => handleInputChange('currentCompany', e.target.value)}
                  placeholder="TechCorp India"
                />
              </div>
              <div>
                <Label htmlFor="currentRole">Current Role</Label>
                <Input
                  id="currentRole"
                  value={profileData.currentRole}
                  onChange={(e) => handleInputChange('currentRole', e.target.value)}
                  placeholder="Software Engineer"
                />
              </div>
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  value={profileData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="3 years"
                />
              </div>
            </div>
          </Card>

          {/* Skills */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Skills</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder="Add a skill (e.g., React, Python, AWS)"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {profileData.skills.map((skill, index) => (
                  <Badge key={index} className="bg-blue-100 text-blue-800 flex items-center gap-1">
                    {skill}
                    <button onClick={() => handleRemoveSkill(skill)}>
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </Card>

          {/* Certifications */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Certifications</h2>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add a certification (e.g., AWS Certified Developer)"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddCertification()}
                />
                <Button onClick={handleAddCertification} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {profileData.certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg"
                  >
                    <span className="text-green-800">{cert}</span>
                    <button
                      onClick={() => handleRemoveCertification(cert)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Projects */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Projects</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="Project name"
                />
                <Input
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Brief description"
                />
                <div className="flex gap-2">
                  <Input
                    value={newProject.link}
                    onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                    placeholder="Project link (optional)"
                  />
                  <Button onClick={handleAddProject} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                {profileData.projects.map((project, index) => (
                  <div key={index} className="p-4 bg-purple-50 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-purple-900">{project.name}</h4>
                        <p className="text-sm text-purple-700 mt-1">{project.description}</p>
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-xs text-purple-600 hover:underline mt-1 inline-block"
                          >
                            View Project →
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemoveProject(index)}
                        className="text-red-600 hover:text-red-800 ml-2"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Resume Upload */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <FileText className="w-6 h-6" />
              Resume Upload
            </h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your resume here, or click to browse
              </p>

              <label className="cursor-pointer">
                <Button className="bg-blue-900 hover:bg-blue-800">Choose File</Button>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                />
              </label>

              <p className="text-sm text-gray-500 mt-2">
                Supports PDF, DOC, DOCX (Max 10MB)
              </p>
            </div>
          </Card>

          {/* Save Button */}
          <div className="text-center">
            <Button
              onClick={handleSaveProfile}
              className="bg-blue-900 hover:bg-blue-800 px-12 py-3 text-lg"
            >
              Save Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
