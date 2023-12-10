import axios from 'axios'

export const API_URL = "http://134.209.252.52:8007";

export const $api = axios.create({
  baseURL: API_URL + '/',
})
