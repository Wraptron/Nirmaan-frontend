import React, { useState } from "react";

const EditMentorForm = ({ initialData, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl w-full relative">
      <button onClick={onClose} className="absolute top-2 right-4 text-xl">
        &times;
      </button>
      <h2 className="text-lg font-semibold mb-4">Edit Mentor Info</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="mentor_name"
          value={formData.mentor_name || ""}
          onChange={handleChange}
          placeholder="Mentor Name"
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="designation"
          value={formData.designation || ""}
          onChange={handleChange}
          placeholder="Designation"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="about"
          value={formData.about || ""}
          onChange={handleChange}
          placeholder="About"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditMentorForm;
