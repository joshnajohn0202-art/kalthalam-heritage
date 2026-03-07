import React, { useState } from 'react';
import './UserProfileAlt.css';
import UserProfileModal from './UserProfileModal';

const sampleUser = {
  id: 1,
  username: 'jd',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  phone: '9876543210',
  address: '123 Main Street, Prestige Enclave',
  city: 'Mumbai',
  state: 'Maharashtra',
  zip: '400001',
  father: 'Mr. Doe',
  mother: 'Mrs. Doe',
  dob: '1990-05-15',
  bio: 'Travel enthusiast and nature lover',
  points: 1250,
  bookings: 5,
  profileImage: null
};

export default function UserProfileAlt() {
  const [user, setUser] = useState(sampleUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(sampleUser);
  const [preview, setPreview] = useState(sampleUser.profileImage);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => {
      setPreview(r.result);
      setForm(prev => ({ ...prev, profileImage: r.result }));
    };
    r.readAsDataURL(f);
  };

  const save = () => {
    setUser(form);
    setEditing(false);
  };

  const cancel = () => {
    setForm(user);
    setPreview(user.profileImage);
    setEditing(false);
  };

  const initials = (n) => (n || '').split(' ').map(s=>s[0]).join('').slice(0,2).toUpperCase();

  return (
    <div className="upa-wrapper">
      <div className="upa-card">
        <div className="upa-left">
          <div className="upa-avatar">
            {preview ? (
              <img src={preview} alt="avatar" />
            ) : (
              <div className="upa-initials">{initials(user.name)}</div>
            )}
          </div>

          <div className="upa-stats">
            <div className="stat">
              <div className="stat-num">{user.bookings}</div>
              <div className="stat-label">Bookings</div>
            </div>
            <div className="stat">
              <div className="stat-num">{user.points}</div>
              <div className="stat-label">Points</div>
            </div>
          </div>

          <div className="upa-actions">
            <button className="btn flat" onClick={() => setEditing(!editing)}>
              {editing ? 'Close' : 'Edit'}
            </button>
            <label className="btn secondary">
              Upload
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
            <button className="btn flat" onClick={() => setModalOpen(true)}>Edit in Modal</button>
          </div>
        </div>

        <div className="upa-right">
          {!editing ? (
            <div className="info-view">
              <h2 className="name">{user.name} <span className="username">({user.username})</span></h2>
              <p className="small">{user.bio}</p>

              <div className="info-grid">
                <div><b>Email</b><div className="val">{user.email}</div></div>
                <div><b>Phone</b><div className="val">{user.phone}</div></div>
                <div><b>Address</b><div className="val">{user.address}</div></div>
                <div><b>City / State</b><div className="val">{user.city} / {user.state}</div></div>
                <div><b>ZIP</b><div className="val">{user.zip}</div></div>
                <div><b>DOB</b><div className="val">{new Date(user.dob).toLocaleDateString()}</div></div>
                <div><b>Father</b><div className="val">{user.father}</div></div>
                <div><b>Mother</b><div className="val">{user.mother}</div></div>
              </div>
            </div>
          ) : (
            <div className="info-edit">
              <div className="row">
                <label>Full name
                  <input name="name" value={form.name} onChange={handleChange} />
                </label>
                <label>Username
                  <input name="username" value={form.username} onChange={handleChange} />
                </label>
              </div>

              <div className="row">
                <label>Email
                  <input name="email" value={form.email} onChange={handleChange} />
                </label>
                <label>Phone
                  <input name="phone" value={form.phone} onChange={handleChange} />
                </label>
              </div>

              <div className="row">
                <label>Father's name
                  <input name="father" value={form.father} onChange={handleChange} />
                </label>
                <label>Mother's name
                  <input name="mother" value={form.mother} onChange={handleChange} />
                </label>
              </div>

              <label>Address
                <input name="address" value={form.address} onChange={handleChange} />
              </label>

              <div className="row actions-row">
                <button className="btn primary" onClick={save} type="button">Save</button>
                <button className="btn ghost" onClick={cancel} type="button">Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <UserProfileModal
        open={modalOpen}
        user={user}
        onClose={() => setModalOpen(false)}
        onSave={(data) => { setUser(data); setForm(data); setPreview(data.profileImage || null); setModalOpen(false); }}
      />
    </div>
  );
}
