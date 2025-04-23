'use client';
import { useState } from 'react';

const ProfileEditor = () => {
  const [formData, setFormData] = useState({
    portfolio: '',
    gender: '',
    occupation: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted');
  };

  return (
    <div style={{
      backgroundColor: '#10202d',
      minHeight: '100vh',
      color: '#aec5ca',
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '700px',
        backgroundColor: '#000d18',
        padding: '30px',
        borderRadius: '1rem',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '30px',
          borderBottom: '1px solid #10202d',
          paddingBottom: '10px'
        }}>
          Edit Profile
        </h1>

        <div style={{
          border: '1px solid #001a2e',
          borderRadius: '1rem',
          padding: '20px',
          marginBottom: '30px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#001a2e'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid #aec5ca',
            backgroundColor: '#93b5be',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{ width: '50%', height: '50%', backgroundColor: '#000d18', borderRadius: '50%' }} />
          </div>
          <button type="button" style={{
            padding: '10px 16px',
            backgroundColor: '#aec5ca',
            color: '#000d18',
            borderRadius: '8px',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer'
          }}>
            CHANGE PICTURE
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {['portfolio', 'gender', 'occupation'].map((field) => (
            <div key={field} style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontSize: '1.25rem',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type="text"
                name={field}
                value={formData[field]}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: 'transparent',
                  color: '#aec5ca',
                  border: '1px solid #001a2e',
                  borderRadius: '0.5rem',
                  outline: 'none'
                }}
              />
            </div>
          ))}

          <button type="submit" style={{
            padding: '12px',
            fontSize: '1rem',
            backgroundColor: '#000d18',
            color: '#ffffff',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditor;   