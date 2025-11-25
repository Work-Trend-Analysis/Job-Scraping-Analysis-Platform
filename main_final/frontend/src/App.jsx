import React from "react";
import { useState } from "react";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { TrendingJobs } from "./components/TrendingJobs";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Dashboard } from "./components/Dashboard";
import { AuthModal } from "./components/AuthModal";
import { GeoHeatmap } from "./components/GeoHeatmap";
import { ResumeScore } from "./components/ResumeScore";
import { JobMatching } from "./components/JobMatching";
import { HighPayingSalaries } from "./components/HighPayingSalaries";
import { UpcomingTrendingJobs } from "./components/UpcomingTrendingJobs";
import { ProfileUpload } from "./components/ProfileUpload";
import { JobDetail } from "./components/JobDetail";
import { SkillDetail } from "./components/SkillDetail";
import { FuturePredictions } from "./components/FuturePredictions";
import { TopSkills } from "./components/TopSkills";
import { Button } from "./components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect } from 'react';


export default function App() {
  const [viewHistory, setViewHistory] = useState([{ view: "home" }]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const currentViewState = viewHistory[viewHistory.length - 1];
  const currentView = currentViewState.view;
  const selectedJobId = currentViewState.jobId || null;
  const selectedSkillName = currentViewState.skillName || null;

  const handleViewChange = (view, jobId, skillName) => {
    if (!isAuthenticated && view !== "home" && view !== "job-detail" && view !== "skill-detail" && view !== "future-predictions" && view !== "top-skills") {
      setShowAuthModal(true);
      return;
    }

    const newViewState = { view };
    if (jobId) newViewState.jobId = jobId;
    if (skillName) newViewState.skillName = skillName;

    setViewHistory(prev => [...prev, newViewState]);
  };

  const handleAuthSuccess = (userData, token) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthModal(false);

    // Save token and user in localStorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(/* default demo user */);
    setViewHistory([{ view: "home" }]);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };


  const handleGoBack = () => {
    if (viewHistory.length > 1) {
      setViewHistory(prev => prev.slice(0, -1));
    }
  };

  const handleBackToHome = () => {
    setViewHistory([{ view: "home" }]);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(Dashboard, {
          user: user,
          onViewChange: handleViewChange
        }));
      case "geo-heatmap":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(GeoHeatmap, null));
      case "resume-score":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(ResumeScore, {
          user: user
        }));
      case "job-matching":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(JobMatching, {
          user: user
        }));
      case "high-paying":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(HighPayingSalaries, null));
      case "upcoming-jobs":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(UpcomingTrendingJobs, null));
      case "profile":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(ProfileUpload, {
          user: user,
          setUser: setUser
        }));
      case "job-detail":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(JobDetail, {
          jobId: selectedJobId
        }));
      case "skill-detail":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(SkillDetail, {
          skillName: selectedSkillName
        }));
      case "future-predictions":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(FuturePredictions, null));
      case "top-skills":
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
          className: "p-6 border-b border-gray-200 bg-white"
        }, /*#__PURE__*/React.createElement("div", {
          className: "w-full"
        }, /*#__PURE__*/React.createElement(Button, {
          variant: "ghost",
          className: "flex items-center gap-2 hover:bg-blue-50",
          onClick: handleGoBack
        }, /*#__PURE__*/React.createElement(ArrowLeft, {
          className: "w-4 h-4"
        }), "Back"))), /*#__PURE__*/React.createElement(TopSkills, {
          onSkillClick: skillName => handleViewChange("skill-detail", undefined, skillName)
        }));
      default:
        return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(HeroSection, null), /*#__PURE__*/React.createElement(TrendingJobs, {
          onJobClick: jobId => handleViewChange("job-detail", jobId)
        }), /*#__PURE__*/React.createElement(Features, {
          onFeatureClick: handleViewChange
        }), /*#__PURE__*/React.createElement(Footer, null));
    }
  };

  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-white"
  }, /*#__PURE__*/React.createElement(Header, {
    onProfileClick: () => handleViewChange("dashboard"),
    onAuthClick: () => setShowAuthModal(true),
    isAuthenticated: isAuthenticated,
    user: user,
    onLogout: handleLogout
  }), renderCurrentView(), /*#__PURE__*/React.createElement(AuthModal, {
    isOpen: showAuthModal,
    onClose: () => setShowAuthModal(false),
    onAuthSuccess: handleAuthSuccess
  }));
}