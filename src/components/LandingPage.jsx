// src/components/LandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './LandingPage.css';
import Footer from './Footer';
import SignupModal from './SignupModal';// Import the new component

const LandingPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const threeJsContainerRef = useRef(null);
  
    // Function to open modal
    const openSignupModal = (e) => {
      e.preventDefault(); // Prevent default link behavior
      setIsModalOpen(true);
    };
  
    // Function to close modal
    const closeSignupModal = () => {
      setIsModalOpen(false);
    };
useEffect(() => {
    // Handle scroll effect for navbar
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // ThreeJS setup for 3D element
    if (!threeJsContainerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    threeJsContainerRef.current.appendChild(renderer.domElement);
    
    // Create 3D cube with code-like texture
    const geometry = new THREE.BoxGeometry(3, 3, 3);
    const materials = Array(6).fill().map((_, i) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      context.fillStyle = i % 2 === 0 ? '#0c0e14' : '#12141c';
      context.fillRect(0, 0, 256, 256);
      
      // Add some code-like elements
      context.font = '10px monospace';
      context.fillStyle = '#4f8cff';
      
      for (let j = 0; j < 15; j++) {
        const y = j * 16 + 20;
        const indent = Math.floor(Math.random() * 5) * 10;
        context.fillText(''.padStart(indent, ' ') + 
          ['const', 'let', 'function', 'return', 'if', 'await', 'import', '{}', '()=>'][Math.floor(Math.random() * 9)], 
          10, y);
      }
      
      return new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvas) });
    });
    
    const cube = new THREE.Mesh(geometry, materials);
    scene.add(cube);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x4f8cff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.002;
      cube.rotation.y += 0.004;
      renderer.render(scene, camera);
    };
    animate();
    
    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      threeJsContainerRef.current?.removeChild(renderer.domElement);
      geometry.dispose();
      materials.forEach(material => material.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div className="landing-container">
      <div 
        className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      >
        <div className="logo">
          <div className="logo-icon">⚡</div>
          <span>bolt</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#about">About</a>
          <a href="#" className="try-button" onClick={openSignupModal}>Try Bolt</a>
        </div>
      </div>

      <section className="hero-section">

      
        <div className="hero-content">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-title"
          >
            Code Faster with<br />AI Assistance
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-subtitle"
          >
            The AI coding assistant that understands your codebase and helps you build better software.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="cta-buttons"
          >
            <a href="#" className="primary-button" onClick={openSignupModal}>
              Try Bolt Now
              <span className="button-glow"></span>
              </a>
            <a href="#how-it-works" className="secondary-button">
              <span>How it works</span>
            </a>
          </motion.div>
        </div>
        <div className="hero-3d-element" ref={threeJsContainerRef}></div>
      </section>

      <section id="features" className="features-section">
        <div className="section-header">
          <h2>Why developers love Bolt</h2>
          <p>Supercharge your development workflow</p>
        </div>
        
        <div className="features-grid">
          <motion.div 
            className="feature-card glass-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">🚀</div>
            <h3>Faster Development</h3>
            <p>Write code up to 5x faster with AI that understands context and intent.</p>
          </motion.div>
          
          <motion.div 
            className="feature-card glass-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">🧠</div>
            <h3>Understands Your Codebase</h3>
            <p>Bolt learns your code patterns and style to give personalized suggestions.</p>
          </motion.div>
          
          <motion.div 
            className="feature-card glass-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">🔍</div>
            <h3>Smart Code Analysis</h3>
            <p>Identify bugs and optimize your code with detailed suggestions and improvements.</p>
          </motion.div>
          
          <motion.div 
            className="feature-card glass-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.1)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="feature-icon">📚</div>
            <h3>Comprehensive Docs</h3>
            <p>Generate documentation automatically based on your code implementation.</p>
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works-section">
        <div className="section-header">
          <h2>How Bolt Works</h2>
          <p>A seamless AI coding experience</p>
        </div>
        
        <div className="steps-container">
          <motion.div 
            className="step-card glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="step-number">01</div>
            <h3>Connect Your Project</h3>
            <p>Link your codebase or start a new project directly in the Bolt interface.</p>
          </motion.div>
          
          <motion.div 
            className="step-card glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="step-number">02</div>
            <h3>Describe What You Need</h3>
            <p>Tell Bolt what you're trying to build in natural language.</p>
          </motion.div>
          
          <motion.div 
            className="step-card glass-card"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="step-number">03</div>
            <h3>Review & Implement</h3>
            <p>Review Bolt's suggestions, make adjustments, and implement the code.</p>
          </motion.div>
        </div>
        
        <div className="demo-container glass-card">
          <div className="demo-header">
            <div className="demo-controls">
              <span className="control red"></span>
              <span className="control yellow"></span>
              <span className="control green"></span>
            </div>
            <div className="demo-title">bolt.new/chat</div>
          </div>
          <div className="demo-content">
            <div className="chat-message user">
              I need a React component that fetches data from an API and displays it in a table
            </div>
            <div className="chat-message bot">
              Here's a React component that fetches data and displays it in a table:
              
              <pre>
                <code>
                        {`function DataTable() {
                          const [data, setData] = useState([]);
                          const [loading, setLoading] = useState(true);
                          
                          useEffect(() => {
                            const fetchData = async () => {
                              try {
                                const response = await fetch('https://api.example.com/data');
                                const result = await response.json();
                                setData(result);
                                setLoading(false);
                              } catch (error) {
                                console.error('Error fetching data:', error);
                                setLoading(false);
                              }
                            };
                            
                            fetchData();
                          }, []);
                          
                          if (loading) return <div>Loading...</div>;
                          
                          return (
                            <table>
                              <thead>
                                <tr>
                                  {Object.keys(data[0]).map(key => (
                                    <th key={key}>{key}</th>
                                  ))}
                                </tr>
                              </thead>
                              <tbody>
                                {data.map((row, index) => (
                                  <tr key={index}>
                                    {Object.values(row).map((value, i) => (
                                      <td key={i}>{value}</td>
                                    ))}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          );
                        }`}
                </code>
              </pre>
              
              Would you like me to explain how this works or make any improvements?
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing-section">
        <div className="section-header">
          <h2>Simple Pricing</h2>
          <p>Start for free, upgrade as you grow</p>
        </div>
        
        <div className="pricing-container">
          <motion.div 
            className="pricing-card glass-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.1)" }}
          >
            <div className="pricing-header">
              <h3>Free</h3>
              <div className="price">$0<span>/month</span></div>
            </div>
            <ul className="pricing-features">
              <li>100 AI suggestions per month</li>
              <li>Basic code completion</li>
              <li>Single project support</li>
              <li>Community support</li>
            </ul>
            <a href="#" className="pricing-button" onClick={openSignupModal}>Get Started</a>
          </motion.div>
          
          <motion.div 
            className="pricing-card glass-card featured"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.15)" }}
          >
            <div className="pricing-tag">Popular</div>
            <div className="pricing-header">
              <h3>Pro</h3>
              <div className="price">$19<span>/month</span></div>
            </div>
            <ul className="pricing-features">
              <li>Unlimited AI suggestions</li>
              <li>Advanced code completion</li>
              <li>Multiple project support</li>
              <li>Code analysis & optimization</li>
              <li>Priority support</li>
            </ul>
            <a href="#" className="pricing-button" onClick={openSignupModal}>Upgrade to Pro</a>
          </motion.div>
          
          <motion.div 
            className="pricing-card glass-card"
            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(79, 140, 255, 0.1)" }}
          >
            <div className="pricing-header">
              <h3>Team</h3>
              <div className="price">$49<span>/month</span></div>
            </div>
            <ul className="pricing-features">
              <li>Everything in Pro</li>
              <li>Team collaboration features</li>
              <li>Advanced analytics</li>
              <li>Custom integrations</li>
              <li>Dedicated support</li>
            </ul>
            <a href="#" className="pricing-button" onClick={openSignupModal}>Contact Sales</a>
          </motion.div>
        </div>
      </section>

      <Footer />
      <SignupModal isOpen={isModalOpen} onClose={closeSignupModal} />
    </div>
  );
};

export default LandingPage;