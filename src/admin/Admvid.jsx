import React, { useEffect, useState } from 'react'
import { getAllVideos, delVideo } from '../../server/server'

const Th = ({ children, className = "" }) => (
  <th className={`p-4 font-semibold text-gray-600 text-sm ${className}`}>{children}</th>
);

const Td = ({ children, className = "" }) => (
  <td className={`p-4 text-sm text-gray-700 ${className}`}>{children}</td>
);

export default function Admvid() {
  const [video, setvideo] = useState([])

  const loaddata = async () => {
    try {
      const res = await getAllVideos()
      setvideo(res.data)
    }
    catch (err) { }
  }

  useEffect(() => {
    loaddata()
  }, [])

  const handleDelete = async (id) => {
    await delVideo(id)
    setvideo(prev => prev.filter(v => v.id !== id))
  }

  return (
    <div>
      <div className="p-6 min-h-screen bg-white font-sans">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Video Management</h2>
            <p className="text-gray-500 text-sm mt-1">Create and manage eSports videos</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors shadow-sm flex items-center gap-2">
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
                    <tr key={t.id} className="hover:bg-gray-50 transition-colors group">
                      <Td>
                        <img
                          src={t.img}
                          alt={t.title}
                          className="w-20 h-14 rounded-lg object-cover border border-gray-200"
                        />
                      </Td>

                      <Td>
                        <div>
                          <p className="font-bold text-gray-900">{t.title || "Untitled Video"}</p>
                          <p className="text-xs text-gray-500 mt-1">ID: {t.id}</p>
                        </div>
                      </Td>

                      <Td>
                        <div className="flex items-center gap-2 text-gray-600">
                          <i className="fa-regular fa-calendar text-xs"></i>
                          <span>{t.date ? new Date(t.date).toLocaleDateString() : 'TBA'}</span>
                        </div>
                      </Td>

                      <Td>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleDelete(t.id)}
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
          </div>
        </div>
      </div>
    </div>
  )
}
