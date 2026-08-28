import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Music from './components/Music';
import Movies from './components/Movies';
import Series from './components/Series';
import Books from './components/Books';
import CodeMusic from './components/CodeMusic';
import Blender from './components/Blender';
import Secret from './components/Secret';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/series" element={<Series />} />
        <Route path="/books" element={<Books />} />
        <Route path="/codemusic" element={<CodeMusic />} />
        <Route path="/blender" element={<Blender />} />
        <Route path="/secret" element={<Secret />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;