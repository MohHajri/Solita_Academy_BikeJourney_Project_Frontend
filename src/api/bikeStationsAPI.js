import axios from 'axios';
import moment from 'moment';


const api = axios.create({
  baseURL: 'http://localhost:8080',
});

export const getAllTrips = async (params) => {
  try {
    const response = await api.get('/getalltrips', {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error getting all trips:', error);
    return error;
  }
};

export const getStationDetailsByName = async (stationName) => {
  try {
    const response = await api.get('/getstationdetailsbyname', {
      params: {
        stationname: stationName,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting station details by name:', error);
    return error;
  }
};

export const getStationDetailsWithDateFilter = async (stationName, startDate, endDate) => {
  try {
    const response = await api.get('/getstationdetailsbyname', {
      params: {
        stationname: stationName,
        startDate,
        endDate,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error getting station details with date filter:', error);
    return error;
  }
};

export const getCoordinatesForAddress = async (address) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=YOUR_API_KEY`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return [lat, lng];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return error;
  }
};

export const saveBikeTrip = async (bikeTrip) => {
  try {
     const formattedDepartureTime = moment.utc(bikeTrip.departureTime).format('YYYY-MM-DD HH:mm:ss');
     const formattedReturnTime = moment.utc(bikeTrip.returnTime).format('YYYY-MM-DD HH:mm:ss');

    console.log('Formatted departureTime:', formattedDepartureTime);

    const formattedBikeTrip = {
      ...bikeTrip,
      departureTime: formattedDepartureTime,
      returnTime: formattedReturnTime
    };

    const params = new URLSearchParams();
    
    Object.keys(formattedBikeTrip).forEach(key => params.append(key, formattedBikeTrip[key]));

    const response = await api.post('/savebiketrip', params, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error saving bike trip:', error);
    return error;
  }
};

  export const getBikeTripById = async (id) => {
    try {
      const response = await api.get('/gettripbyid', {
        params: {
          id,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error getting bike trip by ID:', error);
      return error;
    }
  };


const bikeStationsAPI = {
  getAllTrips,
  getStationDetailsByName,
  getStationDetailsWithDateFilter,
  getCoordinatesForAddress,
  saveBikeTrip,
  getBikeTripById,
};

export default bikeStationsAPI;