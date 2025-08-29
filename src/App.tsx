import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import WeeklyPlan from './pages/WeeklyPlan';
import Pantry from './pages/Pantry';
import Recipes from './pages/Recipes';
import ShoppingList from './pages/ShoppingList';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weekly-plan" element={<WeeklyPlan />} />
          <Route path="/pantry" element={<Pantry />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
