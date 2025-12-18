import React, { useEffect, useState } from 'react'
import { getAllVideos, delVideo, addVideo, updateVideoStatus } from '../../server/server'

const Th = ({ children, className = "" }) => (
  <th className={`p-4 font-semibold text-gray-600 text-sm ${className}`}>{children}</th>
);

const Td = ({ children, className = "" }) => (
  <td className={`p-4 text-sm text-gray-700 ${className}`}>{children}</td>
);

export default function Admvid() {
  const [video, setvideo] = useState([])
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [status, setStatus] = useState("");
  const [newvideo, setNewvideo] = useState({
    title: "",
    date: "",
    duration: "",
    thumb: "",
    src: "",
    tag: ""
  });
  const loaddata = async () => {
    try {
      const res = await getAllVideos()
      setvideo(res.data)
    }
    catch (err) { 
      console.error(err)
    }
  }

  useEffect(() => {
    loaddata()
  }, [])

  const handleDelete = async (id) => {
    await delVideo(id)
    setvideo(prev => prev.filter(v => v._id !== id))
  }
  const saveVideo = async () => {
    try {
      await addVideo(newvideo);
      alert("Video added successfully!");
      setShowAddPopup(false);
      setNewvideo({
        title: "",
        date: "",
        duration: "",
        thumb: "",
        src: "",
        tag: ""
      });
      loaddata();
    } catch (err) {
      console.error(err);
      alert("Failed to add Video");
    }
  };
  const saveStatus = async () => {
    if (!selectedVideo) return;

    try {
      await updateVideoStatus(selectedVideo._id, { tag: status });
      alert("Video status updated");
      setShowStatusPopup(false);
      closeAllPopups();
      loaddata();

    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };


  const closeAllPopups = () => {
    setShowStatusPopup(false);
    setStatus("");
  };
  return (
    <div>
      <div className="p-6 min-h-screen bg-white font-sans">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Video Management</h2>
            <p className="text-gray-500 text-sm mt-1">Create and manage eSports videos</p>
          </div>
          <button
            onClick={() => setShowAddPopup(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
            <i className="fa-solid fa-plus"></i> Add Video
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <Th>Image</Th>
                  <Th>Title</Th>
                  <Th>Date</Th>
                  <Th>Type</Th>
                  <Th className="text-right">Actions</Th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {video.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-400">
                      No video found. Create one to get started.
                    </td>
                  </tr>
                ) : (
                  video.map((t) => (
                    <tr key={t._id} className="hover:bg-gray-50 transition-colors group">
                      <Td>
                        <img
                          src={t.thumb}
                          alt={t.title}
                          className="w-20 h-14 rounded-lg object-cover border border-gray-200"
                        />
                      </Td>

                      <Td>
                        <div>
                          <p className="font-bold text-gray-900">{t.title || "Untitled Video"}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {t._id}</p>
                        </div>
                      </Td>

                      <Td>
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fa-regular fa-calendar text-xs"></i>
                          <span>{t.date ? new Date(t.date).toLocaleDateString() : 'TBA'}</span>
                        </div>
                      </Td>

                      <Td>
                        <div className="flex justify-center">
                          <p className={`font-bold px-3 py-1 rounded text-center ${{
                              'live': 'bg-red-100 text-red-600',
                              'upcoming': 'bg-blue-100 text-blue-600',
                              'highlight': 'bg-yellow-100 text-yellow-700',
                            }[t.tag?.toLowerCase()] || 'bg-gray-100 text-gray-900'
                            }`}>
                            {t.tag || "No Tag"}
                          </p>
                        </div>
                      </Td>
                      <Td>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => {
                              setSelectedVideo(t);
                              setStatus(t.tag);
                              setShowStatusPopup(true);
                            }}
                            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                          >
                            Edit Type
                          </button>

                          <button
                            onClick={() => handleDelete(t._id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                          >
                            Delete
                          </button>
                        </div>

                      </Td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
            {showAddPopup && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-5 w-96 text-black">
                  <h1
                    className="text-xl font-bold mb-4">Add New Match</h1>

                  <div className="space-y-3 text-sm">
                    <input
                      type="text"
                      placeholder="Video Name"
                      value={newvideo.title}
                      onChange={e => setNewvideo({ ...newvideo, title: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Image Link"
                      value={newvideo.thumb}
                      onChange={e => setNewvideo({ ...newvideo, thumb: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Duration"
                      value={newvideo.duration}
                      onChange={e => setNewvideo({ ...newvideo, duration: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Video Link"
                      value={newvideo.src}
                      onChange={e => setNewvideo({ ...newvideo, src: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="date"
                      placeholder="Date"
                      value={newvideo.date}
                      onChange={e => setNewvideo({ ...newvideo, date: e.target.value })}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <select
                    value={newvideo.tag}
                    onChange={e => setNewvideo({ ...newvideo, tag: e.target.value })}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select Type</option>
                    <option value="Normal">Normal</option>
                    <option value="Highlight">HighLight</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Live">Live</option>
                  </select>

                  <div className="flex justify-end gap-3 mt-4">
                    <button className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowAddPopup(false)}>Cancel</button>
                    <button className="px-5 py-2 bg-blue-600 text-white rounded-lg" onClick={saveVideo}>Add Match</button>
                  </div>
                </div>
              </div>
            )}
            {/* Status Popup */}
            {showStatusPopup && selectedVideo && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl shadow-lg p-5 w-80">
                  <h2 className="text-xl font-bold mb-4">Change Match Status</h2>
                  <label className="block mb-2 text-sm font-medium">New Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-2 border text-black border-gray-300 rounded-lg mb-4 text-sm"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Live">Live</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Highlight">Highlight</option>
                  </select>
                  <div className="flex justify-end gap-3 mt-4">
                    <button className="px-5 py-2 bg-gray-300 text-gray-700 rounded-lg" onClick={() => setShowStatusPopup(false)}>Back</button>
                    <button className="px-5 py-2 bg-yellow-500 text-white rounded-lg" onClick={saveStatus}>Save Status</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
