'use client';
import React, { useState } from 'react';

export default function EditProfile() {
  const [portfolio, setPortfolio] = useState('');
  const [gender, setGender] = useState('');
  const [occupation, setOccupation] = useState('');
  const [image, setImage] = useState(null);

  const handlePictureChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    alert(JSON.stringify({ portfolio, gender, occupation }));
  };

  return (
    <div className="min-h-screen bg-[#0d1b24] text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-10">Edit Profile</h1>

      <div className="bg-[#112e3a] p-6 rounded-xl shadow-lg flex items-center justify-between mb-10">
        <div className="flex items-center gap-5">
          {image ? (
            <img
              src={image}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border-4 border-gray-500"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-600" />
          )}
          <label className="bg-slate-300 text-black font-semibold px-4 py-2 rounded cursor-pointer hover:bg-slate-200 transition">
            CHANGE PICTURE
            <input type="file" className="hidden" onChange={handlePictureChange} />
          </label>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-semibold mb-1">Portfolio</label>
          <input
            type="text"
            className="w-full bg-[#0b222c] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Gender</label>
          <input
            type="text"
            className="w-full bg-[#0b222c] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-lg font-semibold mb-1">Occupation</label>
          <input
            type="text"
            className="w-full bg-[#0b222c] text-white p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-10 bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-md font-semibold transition"
      >
        Save Changes
      </button>
    </div>
  );
}
