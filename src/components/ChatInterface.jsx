// src/components/ChatInterface.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import './ChatInterface.css'; // Assuming you'll use the CSS you shared

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    { type: 'bot', content: 'Hi there! I\'m Bolt, your AI coding assistant. How can I help you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef(null);
  const threeJsRef = useRef(null);
  const chatBodyRef = useRef(null);

  // Example queries for the chips
  const exampleQueries = [
    "Create a React form component",
    "Help me debug this useEffect hook",
    "Write a CSS grid layout",
    "Optimize this database query"
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', content: inputValue }]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev,
        { 
          type: 'bot', 
          content: getBotResponse(inputValue)
        }
      ]);
    }, 1500);
  };

  // Simple response generator (in a real app, this would be your AI API call)
  const getBotResponse = (input) => {
    if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
      return "Hello! How can I assist with your coding project today?";
    } else if (input.toLowerCase().includes('react')) {
      return "React is a JavaScript library for building user interfaces. Need help with a specific React component or concept?";
    } else if (input.toLowerCase().includes('component')) {
      return `Here's a basic React component structure:
      
\`\`\`jsx
import React, { useState } from 'react';

const MyComponent = ({ initialData }) => {
  const [data, setData] = useState(initialData);
  
  return (
    <div className="my-component">
      <h2>My Component</h2>
      <p>{data}</p>
      <button onClick={() => setData('Updated data')}>
        Update Data
      </button>
    </div>
  );
};

export default MyComponent;
\`\`\`

Would you like me to explain how this works or customize it for your needs?`;
    } else {
      return "I'd be happy to help with that! Could you provide more details about what you're trying to build?";
    }
  };

  // Handle example chip click
  const handleChipClick = (query) => {
    setInputValue(query);
  };

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.body.classList.toggle('light-mode');
  };

  // Set up 3D visual element
  useEffect(() => {
    if (!threeJsRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(200, 200);
    threeJsRef.current.innerHTML = '';
    threeJsRef.current.appendChild(renderer.domElement);
    
    // Create a glowing sphere representing AI
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    
    // Create a glowing material
    const material = new THREE.MeshBasicMaterial({
      color: 0x4f8cff,
      transparent: true,
      opacity: 0.8,
    });
    
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
    
    // Add a point light inside the sphere
    const light = new THREE.PointLight(0x4f8cff, 2, 50);
    light.position.set(0, 0, 0);
    scene.add(light);
    
    // Add a particle system around the sphere
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 100;
    
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Position particles in a sphere-like shape
      const radius = 1.5 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      sizes[i] = 0.02 + Math.random() * 0.05;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x4f8cff,
      transparent: true,
      opacity: 0.7,
      size: 0.1,
      sizeAttenuation: true,
    });
    
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
    
    camera.position.z = 4;
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the sphere subtly
      sphere.rotation.y += 0.005;
      sphere.rotation.z += 0.003;
      
      // Make particles move slightly
      particles.rotation.y += 0.002;
      
      // Pulse effect
      const time = Date.now() * 0.001;
      sphere.scale.x = 0.9 + Math.sin(time) * 0.1;
      sphere.scale.y = 0.9 + Math.sin(time) * 0.1;
      sphere.scale.z = 0.9 + Math.sin(time) * 0.1;
      
      light.intensity = 1.8 + Math.sin(time) * 0.3;
      
      renderer.render(scene, camera);
    };
    animate();
    
    // Cleanup
    return () => {
      if (threeJsRef.current && threeJsRef.current.contains(renderer.domElement)) {
        threeJsRef.current.removeChild(renderer.domElement);
      }
      scene.remove(sphere);
      scene.remove(light);
      scene.remove(particles);
      geometry.dispose();
      material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  // Add scroll animation effects
  useEffect(() => {
    const handleScroll = () => {
      if (!chatBodyRef.current) return;
      
      const messageElements = chatBodyRef.current.querySelectorAll('.message-container');
      
      messageElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
          el.classList.add('visible');
        }
      });
    };
    
    chatBodyRef.current?.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      chatBodyRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [messages]);

  return (
    <div className={`chat-container ${isDarkTheme ? 'dark' : 'light'}`}>
      <header className="chat-header glass-card">
        <div className="header-left">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <span>bolt</span>
          </div>
        </div>
        <div className="header-right">
          <div className="theme-toggle" onClick={toggleTheme}>
            {isDarkTheme ? '☀️' : '🌙'}
          </div>
          <div className="user-avatar">
            <span>RK</span>
          </div>
        </div>
      </header>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.length === 1 && (
          <div className="assistant-avatar" ref={threeJsRef}></div>
        )}
        
        {messages.map((message, index) => (
          <motion.div
            key={index}
            className={`message-container ${message.type}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="message-content">
              {message.content.includes('```') ? (
                <div>
                  {message.content.split('```').map((part, i) => {
                    if (i % 2 === 0) {
                      return <p key={i}>{part}</p>;
                    } else {
                      return (
                        <pre key={i}>
                          <code>{part}</code>
                        </pre>
                      );
                    }
                  })}
                </div>
              ) : (
                <p>{message.content}</p>
              )}
              
              {index === 0 && (
                <div className="example-chips">
                  {exampleQueries.map((query, i) => (
                    <motion.div
                      key={i}
                      className="example-chip"
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleChipClick(query)}
                    >
                      {query}
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
        
        {isTyping && (
          <motion.div
            className="message-container bot"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-container">
        <form className="chat-input-form" onSubmit={handleSubmit}>
          <div className="chat-input-wrapper">
            <textarea
              className="chat-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder=""
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="chat-input-placeholder">
              Ask Bolt anything about coding...
            </div>
          </div>
          <motion.button
            className="submit-button"
            type="submit"
            disabled={!inputValue.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 2L11 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </form>
      </div>
    </div>
  );
};

export default ChatInterface;