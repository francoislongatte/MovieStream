/***
 * Service for use Local API
 */
import axios from "axios";
export const baseUrl = "http://localhost:9005";

export default {
  getTorrentBySearch: (query,category) =>
    axios
      .get(`${baseUrl}/search`, {
        params: { 
            q: query,
            category: category
        }
      })
      .then(res => res.data)
      .catch(error => console.log(error)),
  getMagnetFromTorrent: (torrent) =>
    axios
      .post(`${baseUrl}/magnet`, torrent)
      .then(res => res.data)
      .catch(error => console.log(error)),
  getProvidersActive: () =>
    axios
      .get(`${baseUrl}/providers`)
      .then(res => res)
      .catch(error => console.log(error))
};
