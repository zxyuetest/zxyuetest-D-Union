"use client";
import React, { useState } from 'react';
import Home from './Home';
import Dues from './Dues';
import Activities from './Activities';
import Suggestions from './Suggestions';
import Points from './Points';
import Matchmaking from './Matchmaking';
import Insurance from './Insurance';
import Counseling from './Counseling';
import LegalAid from './LegalAid';
import Finance from './Finance';
import Surveys from './Surveys';
import Chat from './Chat';
import Login, { UserType } from './Login';

export default function App() {
  const [user, setUser] = useState<UserType | null>(null);
  const [currentView, setCurrentView] = useState('home');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
        <div className="w-full max-w-md bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
          <Login onLogin={setUser} />
        </div>
      </div>
    );
  }

  const renderView = () => {
    if (currentView.startsWith('chat_')) {
      const parts = currentView.split('_');
      const chatName = parts.slice(2).join('_'); // Handle names with underscores
      return <Chat onBack={() => setCurrentView('home')} user={user} chatName={chatName} />;
    }

    switch (currentView) {
      case 'dues': return <Dues onBack={() => setCurrentView('home')} />;
      case 'activities': return <Activities onBack={() => setCurrentView('home')} />;
      case 'suggestions': return <Suggestions onBack={() => setCurrentView('home')} />;
      case 'points': return <Points onBack={() => setCurrentView('home')} />;
      case 'matchmaking': return <Matchmaking onBack={() => setCurrentView('home')} />;
      case 'insurance': return <Insurance onBack={() => setCurrentView('home')} />;
      case 'counseling': return <Counseling onBack={() => setCurrentView('home')} />;
      case 'legal_aid': return <LegalAid onBack={() => setCurrentView('home')} />;
      case 'surveys': return <Surveys onBack={() => setCurrentView('home')} user={user} />;
      case 'fund_approval': return <Finance onBack={() => setCurrentView('home')} defaultTab="fund" />;
      case 'expense_reimbursement': return <Finance onBack={() => setCurrentView('home')} defaultTab="expense" />;
      case 'home':
      default:
        return <Home onNavigate={setCurrentView} user={user} onLogout={() => setUser(null)} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
      {/* Mobile Container */}
      <div className="w-full max-w-md bg-gray-50 min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
        {renderView()}
      </div>
    </div>
  );
}
