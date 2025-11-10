import React from 'react'

export default function Videos() {
    return (
        <div className=" py-4 bg-black">
            {/* head */}
            <div className="flex flex-row items-start md:items-center justify-between py-4 px-6 md:px-10 gap-4">
                {/* title */}
                <div>
                    <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">
                        Featured
                        <span className="ml-2 text-red-600 drop-shadow-[0_0_8px_rgba(255,0,0,0.7)]">
                            Tournaments
                        </span>
                    </h1>
                    <p className="mt-2 text-gray-400 text-sm md:text-base max-w-md">
                        Join upcoming tournaments and compete for prizes
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-8 py-8 justify-items-center">

                <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
                    <div className="relative overflow-hidden">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                            alt="Valorant Tournament"
                            className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110 rounded-xl"
                        />
                        <div className="absolute bottom-1 right-3">
                            <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                12.45
                            </span>
                        </div>
                    </div>

                    {/* content section */}
                    <div className="p-5 space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Summer Championship
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Aug 15, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
                    <div className="relative overflow-hidden rounded-xl">
                        {/* Image */}
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                            alt="Valorant Tournament"
                            className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 transform scale-90 group-hover:scale-100">
                                <i className="fa-solid fa-play text-xl"></i>
                            </button>
                        </div>


                        {/* Bottom Right Duration Label */}
                        <div className="absolute bottom-2 right-3">
                            <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                12:45
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Summer Championship
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Aug 15, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
                    <div className="relative overflow-hidden">
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                            alt="Valorant Tournament"
                            className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110 rounded-xl"
                        />
                        <div className="absolute bottom-1 right-3">
                            <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                12.45
                            </span>
                        </div>
                    </div>

                    {/* content section */}
                    <div className="p-5 space-y-4">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Summer Championship
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Aug 15, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="group w-full max-w-[404px] rounded-xl overflow-hidden transition-all duration-300">
                    <div className="relative overflow-hidden rounded-xl">
                        {/* Image */}
                        <img
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3cjF8yqeUhb0YcGr959-N3hfuGyTwIzwmSw&s"
                            alt="Valorant Tournament"
                            className="w-full h-[200px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button className="w-14 h-14 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 transform scale-90 group-hover:scale-100">
                                <i className="fa-solid fa-play text-xl"></i>
                            </button>
                        </div>


                        {/* Bottom Right Duration Label */}
                        <div className="absolute bottom-2 right-3">
                            <span className="bg-black/70 text-white text-sm font-semibold px-3 py-1 rounded-md shadow">
                                12:45
                            </span>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Summer Championship
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                                <i className="fa-regular fa-calendar"></i>
                                <span>Aug 15, 2025</span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}
