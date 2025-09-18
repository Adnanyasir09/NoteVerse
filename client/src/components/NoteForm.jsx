import React from 'react';
import { FiEdit3, FiPlus } from 'react-icons/fi';

export default function NoteForm({ title, description, setTitle, setDescription, editing, onSave, onCancel, onAdd }) {
  return (
    <div className="p-6 bg-white rounded-3xl shadow-xl border border-gray-100 w-full">
      {/* Header */}
      <div className="flex items-center mb-5">
        {editing ? (
          <FiEdit3 className="text-blue-500 text-2xl mr-2" />
        ) : (
          <FiPlus className="text-green-500 text-2xl mr-2" />
        )}
        <h2 className="text-2xl font-bold text-gray-800">{editing ? 'Edit Note' : 'Create Note'}</h2>
      </div>

      {/* Title Input */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full mb-4 p-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
      />

      {/* Description Input */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={5}
        className="w-full mb-4 p-3 rounded-xl border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm resize-none"
      />

      {/* Buttons */}
      <div className="flex justify-end gap-3">
        {editing ? (
          <>
            <button
              onClick={onSave}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-2 rounded-xl hover:from-blue-600 hover:to-blue-700 shadow-md transition-all flex items-center gap-2"
            >
              <FiEdit3 /> Save
            </button>
            <button
              onClick={onCancel}
              className="bg-gray-200 px-5 py-2 rounded-xl hover:bg-gray-300 transition-all"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={onAdd}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white px-5 py-2 rounded-xl hover:from-green-600 hover:to-green-700 shadow-md transition-all flex items-center gap-2"
          >
            <FiPlus /> Add Note
          </button>
        )}
      </div>
    </div>
  );
}
