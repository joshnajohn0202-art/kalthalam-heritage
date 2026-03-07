import React, { useEffect, useState } from 'react';
import './UserProfileModal.css';

export default function UserProfileModal({ open, user = {}, onClose, onSave, saving = false }) {
  const [form, setForm] = useState(user);
  const [preview, setPreview] = useState(user.profileImage || null);

  useEffect(() => {
    setForm(user);
    setPreview(user.profileImage || null);
  }, [user, open]);

  if (!open) return null;

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleImage = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      setForm((prev) => ({ ...prev, profileImage: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const save = async () => {
    if (!onSave) {
      if (onClose) onClose();
      return;
    }
    const shouldClose = await onSave(form);
    if (shouldClose !== false && onClose) onClose();
  };

  return (
    <div className="upm-overlay" role="dialog" aria-modal="true">
      <div className="upm-modal">
        <header className="upm-header">
          <h3>Edit Profile</h3>
          <button className="upm-close" onClick={onClose} aria-label="Close">
            x
          </button>
        </header>

        <div className="upm-body">
          <div className="upm-left">
            <div className="upm-avatar-box">
              {preview ? (
                <img src={preview} alt="preview" />
              ) : (
                <div className="upm-initials">
                  {(form.name || '')
                    .split(' ')
                    .map((s) => s[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
              )}
            </div>
            <label className="upm-upload">
              Change Photo
              <input type="file" accept="image/*" onChange={handleImage} />
            </label>
            <div className="upm-summary">
              <div>
                <strong>{form.name}</strong>
              </div>
              <small>{form.email}</small>
            </div>
          </div>

          <form
            className="upm-form"
            onSubmit={async (e) => {
              e.preventDefault();
              await save();
            }}
          >
            <div className="upm-row">
              <label>
                Full name
                <input name="name" value={form.name || ''} onChange={handleChange} />
              </label>
              <label>
                Username
                <input name="username" value={form.username || ''} onChange={handleChange} />
              </label>
            </div>

            <div className="upm-row">
              <label>
                Email
                <input name="email" value={form.email || ''} onChange={handleChange} />
              </label>
              <label>
                Phone
                <input name="phone" value={form.phone || ''} onChange={handleChange} />
              </label>
            </div>

            <div className="upm-row">
              <label>
                Father's name
                <input name="father" value={form.father || ''} onChange={handleChange} />
              </label>
              <label>
                Mother's name
                <input name="mother" value={form.mother || ''} onChange={handleChange} />
              </label>
            </div>

            <label>
              Address
              <input name="address" value={form.address || ''} onChange={handleChange} />
            </label>

            <div className="upm-row">
              <label>
                City
                <input name="city" value={form.city || ''} onChange={handleChange} />
              </label>
              <label>
                State
                <input name="state" value={form.state || ''} onChange={handleChange} />
              </label>
              <label>
                ZIP
                <input name="zip" value={form.zip || ''} onChange={handleChange} />
              </label>
            </div>

            <div className="upm-row">
              <label>
                DOB
                <input type="date" name="dob" value={form.dob || ''} onChange={handleChange} />
              </label>
              <label>
                Bio
                <input name="bio" value={form.bio || ''} onChange={handleChange} />
              </label>
            </div>

            <div className="upm-actions">
              <button type="button" className="btn ghost" onClick={onClose} disabled={saving}>
                Cancel
              </button>
              <button type="submit" className="btn primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
