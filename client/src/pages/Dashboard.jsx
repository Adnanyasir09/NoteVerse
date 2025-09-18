import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import AuthContext from '../context/AuthContext';
import NoteForm from '../components/NoteForm';
import { format } from 'date-fns';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editing, setEditing] = useState(null); // Holds the note object being viewed/edited
  const [showModal, setShowModal] = useState(false);
  const [isEditingNote, setIsEditingNote] = useState(false); // State for modal view/edit mode

  // State for the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  const token = localStorage.getItem('token');

  const fetchNotes = async () => {
    try {
      const res = await api.get('/api/notes', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error.response?.data || error);
      alert('Failed to fetch notes. Please try again.');
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Reset form and modal states
  const resetForm = () => {
    setEditing(null);
    setTitle('');
    setDescription('');
    setShowModal(false);
    setIsEditingNote(false); // Reset the edit mode
  };

  const createNote = async () => {
    if (!title || !description) return alert('Title and Description are required.');
    try {
      await api.post('/api/notes', { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error('Failed to create note:', error.response?.data || error);
      alert('Failed to create note. Please try again.');
    }
  };

  const saveEdit = async () => {
    if (!title || !description) return alert('Title and Description are required.');
    try {
      await api.put(`/api/notes/${editing._id}`, { title, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      resetForm();
      fetchNotes();
    } catch (error) {
      console.error('Failed to update note:', error.response?.data || error);
      alert('Failed to update note. Please try again.');
    }
  };
  
  // Opens the modal in "view" mode
  const handleWatchNote = (note) => {
    setEditing(note);
    setTitle(note.title);
    setDescription(note.description);
    setIsEditingNote(false); // Start in view mode
    setShowModal(true);
  };

  // Opens the modal for creating a new note
  const handleAddNoteClick = () => {
    setEditing(null); // No existing note
    setTitle('');
    setDescription('');
    setIsEditingNote(true); // Go directly to edit mode
    setShowModal(true);
  };
  
  // --- Delete Logic ---
  const handleDeleteRequest = (id) => {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setNoteToDelete(null);
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = async () => {
    if (!noteToDelete) return;
    try {
      await api.delete(`/api/notes/${noteToDelete}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
      handleCancelDelete();
    } catch (error) {
      console.error('Failed to delete note:', error.response?.data || error);
      alert(error.response?.data?.message || 'Failed to delete note. Please try again.');
      handleCancelDelete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 to-blue-200 py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">My Notes</h1>
          <p className="text-gray-500 text-lg">Welcome, {user?.email}</p>
        </header>

        {/* Notes List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 bg-gray-100 p-4 font-semibold text-gray-700">
            <div className="col-span-6">Title</div>
            <div className="col-span-3">Created At</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>

          {/* Notes */}
          {notes.map((note) => (
            <div
              key={note._id}
              className="grid grid-cols-12 gap-4 p-5 items-center border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="col-span-6 font-semibold text-gray-900 text-lg truncate">{note.title}</div>
              <div className="col-span-3 text-gray-500 text-sm">
                {note.createdAt ? format(new Date(note.createdAt), 'MMM dd, yyyy, h:mm a') : 'N/A'}
              </div>
              <div className="col-span-3 flex justify-end gap-3">
                <button
                  onClick={() => handleWatchNote(note)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300"
                >
                  Watch
                </button>
                <button
                  onClick={() => handleDeleteRequest(note._id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-md transition-colors duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Floating Add Note Button */}
        <button
          onClick={handleAddNoteClick}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform hover:scale-105 z-50"
        >
          + Add Note
        </button>

        {/* Main Modal for Viewing/Editing/Adding */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-3xl p-6 w-full max-w-lg shadow-2xl relative">
              <button
                onClick={resetForm}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl font-bold z-10"
              >
                ×
              </button>
              
              {isEditingNote ? (
                // EDITING / ADDING MODE
                <NoteForm
                  title={title}
                  description={description}
                  setTitle={setTitle}
                  setDescription={setDescription}
                  editing={editing}
                  onSave={saveEdit}
                  onCancel={resetForm}
                  onAdd={createNote}
                />
              ) : (
                // VIEWING MODE
                <div className="p-4 max-h-[70vh] overflow-y-auto">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 break-words">{editing?.title}</h2>
                  <p className="text-gray-700 whitespace-pre-wrap break-words">{editing?.description}</p>
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={resetForm}
                      className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => setIsEditingNote(true)}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Confirm Deletion</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this note? This action cannot be undone.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleCancelDelete}
                  className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}