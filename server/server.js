import base from './base.js'
import axios from 'axios'
// USERS
export const getAllUsers = () => axios.get(`${base}/users`);
export const userLogin = (email, password) => axios.post(`${base}/users/login`, { email, password })
export const getUserById = (id) => axios.get(`${base}/users/${id}`);
export const addUser = (data) => axios.post(`${base}/users/register`, data);
export const updUser = (id, data) => axios.put(`${base}/users/${id}`, data);
export const delUser = (id) => axios.delete(`${base}/users/${id}`);

// TOURNAMENTS
export const getAllTournaments = () => axios.get(`${base}/tournaments`);
export const getTournamentById = (id) => axios.get(`${base}/tournaments/${id}`);
export const addTournament = (data) => axios.post(`${base}/tournaments`, data);
export const updTournament = (id, data) => axios.put(`${base}/tournaments/${id}`, data);
export const delTournament = (id) => axios.delete(`${base}/tournaments/${id}`);

// Get all payments
export const getAllPayments = () => axios.get(`${base}/payments`)
// Get payment by ID
export const getPaymentById = (id) => axios.get(`${base}/payments/${id}`)
// Add payment
export const addPayment = (data) => axios.post(`${base}/payments`, data)
// Update payment
export const updPayment = (id, data) => axios.put(`${base}/payments/${id}`, data);


// Get all matches
export const getAllMatches = () => axios.get(`${base}/matches`)
// Add match
export const addMatch = (data) => axios.post(`${base}/matches`, data)
// Delete match
export const delMatch = (id) => axios.delete(`${base}/matches/${id}`);
// Get match by ID
export const getMatchById = (id) => axios.get(`${base}/matches/${id}`)
// Update match
export const updMatch = (id, data) => axios.put(`${base}/matches/${id}`, data)
export const statMatch=(id,data)=>axios.put(`${base}/matches/status/${id}`,data)
export const winMatch=(id,data)=>axios.put(`${base}/matches/winner/${id}`,data)

// Get all videos
export const getAllVideos = () => axios.get(`${base}/videos`)
// Add video
export const addVideo = (data) => axios.post(`${base}/videos`, data)
// Delete video
export const delVideo = (id) => axios.delete(`${base}/videos/${id}`)
// Get video by ID
export const getVideoById = (id) => axios.get(`${base}/videos/${id}`)
// Update video
export const updVideo = (id, data) => axios.put(`${base}/videos/${id}`, data)
