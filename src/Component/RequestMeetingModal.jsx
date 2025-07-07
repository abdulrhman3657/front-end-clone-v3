import React from "react";

export default function RequestMeetingModal({
  isOpen,
  onClose,
  onSubmit,
  formData,
  setFormData,
}) {
  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white w-full max-w-md mx-auto rounded-xl p-6 shadow-xl">
        <div className="w-full flex flex-col justify-start items-start py-4">
          <p className="font-bold text-center">Request Meeting</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Topic</label>
            <input
              type="text"
              name="topic"
              placeholder="Meeting Topic"
              value={formData.topic}
              onChange={handleChange}
              className="w-full border border-stone-400 px-3 py-1 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">Date & Time</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full border border-stone-400 px-3 py-1 rounded-md"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="block text-sm font-medium">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              min="15"
              max="240"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-stone-400 px-3 py-1 rounded-md"
              required
            />
          </div>

          <label className="block text-sm font-medium">
            <input
              type="checkbox"
              name="isPrivate"
              checked={formData.isPrivate}
              onChange={handleChange}
              className="mr-2"
            />
            Private Meeting (do not record)
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#1E40AF] text-white rounded hover:bg-blue-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
