import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [notes, setNotes] = useState([]);

  const fetch = async () => {
    const u = await api.get('/api/admin/users');
    const n = await api.get('/api/admin/notes');
    setUsers(u.data);
    setNotes(n.data);
  };

  useEffect(() => { fetch(); }, []);

  const deleteNote = async (id) => {
    if (!confirm('Delete this note permanently?')) return;
    await api.delete(`/api/admin/note/${id}`);
    fetch();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-4">Admin Panel</h1>

        <section className="mb-6 bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">Users</h2>
          <ul>
            {users.map(u => <li key={u._id} className="mb-2">{u.email} {u.isAdmin && '(admin)'}</li>)}
          </ul>
        </section>

        <section className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">All notes</h2>
          <ul>
            {notes.map(n => (
              <li key={n._id} className="mb-3 border-b pb-2">
                <div className="flex justify-between">
                  <div>
                    <div className="font-semibold">{n.title}</div>
                    <div className="text-sm text-gray-600">{n.description}</div>
                    <div className="text-xs text-gray-400">{n.user?.email}</div>
                  </div>
                  <div>
                    <button className="text-red-600" onClick={()=>deleteNote(n._id)}>Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
