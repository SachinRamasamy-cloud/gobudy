import api from './api.js';
import base from './base.js'
import axios from 'axios'
// USERS
const token = localStorage.getItem("token"); // JWT from login


export const getAllUsers = () => api.get(`${base}/users`, {
    headers: { Authorization: `Bearer ${token}` }
});

export const userLogin = (email, password) => api.post(`${base}/users/login`, { email, password });

export const getUserById = (id) => api.get(`${base}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});

export const addUser = (data) => api.post(`${base}/users/register`, data);

export const updUser = (id, data) => api.put(`${base}/users/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
});

export const delUser = (id) => api.delete(`${base}/users/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
});
export const updateWallet = (id, amount) =>
    api.put(`${base}/users/wallet/${id}`, { amount }, {
        headers: { Authorization: `Bearer ${token}` }
    });


// TOURNAMENTS
export const getTournamentById = (id) =>
    axios.get(`${base}/tournaments/${id}`);

export const addTournament = (data) =>
    axios.post(`${base}/tournaments`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const delTournament = (id) =>
    axios.delete(`${base}/tournaments/${id}`);

export const getAllTournaments = () =>
    api.get(`/tournaments`, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updTournament = (id, data) =>
    axios.put(`${base}/tournaments/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const updateTournamentStatus = (id, data) =>
    axios.put(`${base}/tournaments/status/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });

export const winTournament = (id, data) =>
    axios.post(`${base}/tournaments/win/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
export const vidTournament = (id, data) =>
    axios.post(`${base}/tournaments/video/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });


// Get all payments
export const getAllPayments = () => axios.get(`${base}/payments`)
// Get payment by ID
export const getPaymentById = (id) => axios.get(`${base}/payments/${id}`)
// Add payment
export const addPayment = (data) => axios.post(`${base}/payments`, data)
// Update payment
export const updPayment = (id, data) => axios.put(`${base}/payments/${id}`, data);


// Get all matches
export const getMatchById = (id) => axios.get(`${base}/matches/${id}`);
// server/server.js
export const winMatch = (id, data) =>
    axios.post(`${base}/matches/win/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
export const updMatch = async (id, data) => axios.put(`${base}/matches/${id}`, data);
export const updateMatchStatus = (id, data) =>
    axios.put(`${base}/matches/status/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
export const delMatch = (id) => axios.delete(`${base}/matches/${id}`);
export const getAllMatches = async () => api.get(`/matches`, { headers: { Authorization: `Bearer ${token}` } });
export const addMatch = (data) =>
    axios.post(`${base}/matches`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });



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
export const updateVideoStatus = (id, data) =>
    axios.put(`${base}/videos/status/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });


// send mail
export const SendMail = async (emaildata) => axios.post(`${base}/email/send`, emaildata)

// get redeem codes
export const getAllRedeem = () => axios.get(`${base}/redeem`);
export const addRedeem = (data) => axios.post(`${base}/redeem`, data);
export const delRedeem = (id) => axios.delete(`${base}/redeem/${id}`);
export const getRedeemById = (id) => axios.get(`${base}/redeem/${id}`);
export const updRedeem = (id, data) => axios.put(`${base}/redeem/${id}`, data);
export const getRedeemCodeByPrice = (price, email) =>
    axios.get(`${base}/redeem/get-code/${price}?email=${encodeURIComponent(email)}`);
export const checkStock = (price, email) =>
    axios.get(`${base}/redeem/check-stock/${price}?email=${encodeURIComponent(email)}`);

