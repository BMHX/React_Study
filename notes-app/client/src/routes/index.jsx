import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Notes from '@/pages/Notes';
import CreateNote from '@/pages/CreateNote';
import EditNote from '@/pages/EditNote';
import Categories from '@/pages/Categories';
import CategoryNotes from '@/pages/CategoryNotes';
import Note from '@/pages/Note';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/notes" element={<Notes />} />
      <Route path="/create-note" element={<CreateNote />} />
      <Route path="/notes/edit/:id" element={<EditNote />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/categories/:id" element={<CategoryNotes />} />
      <Route path="/" element={<Notes />} />
      <Route path="/notes/:id" element={<Note />} />
      <Route path="/notes/categories/:categoryId" element={<CategoryNotes />} />
    </Routes>
  );
};

export default AppRoutes;
