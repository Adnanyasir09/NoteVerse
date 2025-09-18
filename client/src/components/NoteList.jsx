import React from 'react';
import NoteCard from './NoteCard';

export default function NoteList({ notes, onEdit, onDelete }) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </section>
  );
}
