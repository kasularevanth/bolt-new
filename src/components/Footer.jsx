// Footer component for Bolt landing page
import React from 'react';
import { Github } from 'lucide-react';
import { GithubIcon,        // ✅ fixed lowercase "h"
    Twitter,
    Linkedin,
    Facebook,
    Mail,
    MessageCircle,
    FileText,
    HelpCircle,
    Shield,
    Book,
    Code,
    Users } from 'lucide-react';
import './Footer.css'; // Make sure to include the updated CSS

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="enhanced-footer">
      <div className="footer-gradient"></div>
      
      <div className="footer-content-wrapper">
        <div className="footer-main">
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="logo-icon">⚡</div>
              <span>bolt</span>
            </div>
            <p className="footer-tagline">
              Build better software, faster with AI assistance.
            </p>
            <div className="social-links">
              <a href="#" aria-label="GitHub" className="social-icon">
                <Github size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="social-icon">
                <Twitter size={20} />
              </a>
              <a href="#" aria-label="LinkedIn" className="social-icon">
                <Linkedin size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="social-icon">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="footer-links-container">
            <div className="footer-column">
              <h4><Code size={18} /> Product</h4>
              <ul>
                <li><a href="#">Features</a></li>
                <li><a href="#">Pricing</a></li>
                <li><a href="#">Roadmap</a></li>
                <li><a href="#">Changelog</a></li>
                <li><a href="#">Integrations</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4><Book size={18} /> Resources</h4>
              <ul>
                <li><a href="#">Documentation</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">API Reference</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4><Users size={18} /> Company</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Press Kit</a></li>
                <li><a href="#">Partners</a></li>
              </ul>
            </div>
            
            <div className="footer-column">
              <h4><HelpCircle size={18} /> Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Status</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#" className="with-icon">
                  <MessageCircle size={16} />
                  <span>Live Chat</span>
                </a></li>
                <li><a href="#" className="with-icon">
                  <Mail size={16} />
                  <span>Contact Us</span>
                </a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="copyright">
            © {currentYear} Bolt AI. All rights reserved.
          </div>
          <div className="legal-links">
            <a href="#"><Shield size={16} /> Privacy Policy</a>
            <a href="#"><FileText size={16} /> Terms of Service</a>
            <a href="#">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;