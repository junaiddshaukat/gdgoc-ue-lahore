'use client'
import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../components/ui/button';
import Sidebar from '../components/Sidebar';
import TeamManagement from '../components/TeamManagement';
import EventManagement from '../components/EventManagement';
import axios from 'axios';

const googleColors = {
  red: '#EA4335',
  yellow: '#FBBC05',
  blue: '#4285F4',
  green: '#34A853'
};



function App() {

  
  const [newMember, setNewMember] = useState({
    name: '',
    position: '',
    image: null,
    linkedin: '',
    github: '',
    level: 1
  });
  
  const [activeSection, setActiveSection] = useState('welcome');
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



 

 

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e, type) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      if (type === 'member') {
        setNewMember({ ...newMember, image: file });
      } else {
        setNewEvent({ ...newEvent, image: file });
      }
    }
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setActiveSection={setActiveSection} googleColors={googleColors} />

      <main className="flex-1 p-8">
        {isMobile && (
          <Button variant="ghost" className="mb-4">
            <Menu className="h-6 w-6" />
          </Button>
        )}

        {activeSection === 'welcome' && (
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4" style={{ color: googleColors.blue }}>
              Welcome to GDGOC Admin Panel
            </h1>
            <p className="text-xl text-gray-600">
              Select an option from the sidebar to get started.
            </p>
          </div>
        )}

        {activeSection === 'team' && (
          <TeamManagement
          
           
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
   
            isDragging={isDragging}
            googleColors={googleColors}
          />
        )}

        {activeSection === 'events' && (
          <EventManagement
           
          
         
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}

            isDragging={isDragging}
            googleColors={googleColors}
          />
        )}
      </main>
    </div>
  );
}

export default App;