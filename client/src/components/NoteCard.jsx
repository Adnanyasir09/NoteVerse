import React from 'react';

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="p-5 border border-gray-200 rounded-xl shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{note.title}</h3>
          <p className="mt-1 text-gray-600">{note.description}</p>
        </div>
        <div className="flex flex-col items-end space-y-2">
          <button
            className="px-3 py-1 text-sm text-blue-600 font-medium border border-blue-200 rounded hover:bg-blue-50 transition-colors"
            onClick={() => onEdit(note)}
          >
            Edit
          </button>
          <button
            className="px-3 py-1 text-sm text-red-600 font-medium border border-red-200 rounded hover:bg-red-50 transition-colors"
            onClick={() => onDelete(note._id)}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        Created at: {new Date(note.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
