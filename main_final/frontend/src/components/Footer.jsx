import { Separator } from "./ui/separator";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-linear-to-r from-gray-900 via-blue-900 to-black text-white py-16 px-6">
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand & Description */}
          <div className="lg:col-span-1">
            <div className="bg-linear-to-r from-blue-600 to-blue-400 text-white px-4 py-2 rounded-lg shadow-lg inline-block mb-6 transform transition-transform hover:scale-105">
              <h3 className="text-xl font-bold">CareerLens</h3>
            </div>
            <p className="text-gray-300 mb-6">
              Your gateway to exceptional career opportunities. We connect talent
              with the right jobs using cutting-edge technology and personalized
              matching.
            </p>
            <div className="flex gap-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <div
                  key={index}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shadow-lg transform transition-all hover:scale-110 hover:bg-blue-600 cursor-pointer"
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "Find Jobs",
                "Post a Job",
                "Resume Builder",
                "Career Advice",
                "Salary Insights",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Employers */}
          <div>
            <h4 className="text-lg font-semibold mb-6">For Employers</h4>
            <ul className="space-y-3">
              {[
                "Post Jobs",
                "Find Candidates",
                "Employer Branding",
                "Recruitment Solutions",
                "Analytics",
              ].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">hello@careerlens.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span className="text-gray-300">
                  Mumbai, Maharashtra, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400">
            © 2025 CareerLens. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
