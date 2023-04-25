import axios from 'axios';

const APIHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  Authorization: {
    toString() {
      return `Bearer ${sessionStorage.getItem('token')}`;
    },
  },
};

export const API = axios.create({
  baseURL: 'http://localhost:8000/api/v1',
  headers: APIHeaders,
  timeout: 2500,
});
