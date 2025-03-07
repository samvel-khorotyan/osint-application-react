import axios from 'axios';
import { Scan, ScanRequest, UpdateDisplayOrderRequest } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const getScans = async (): Promise<Scan[]> => {
    const response = await api.get<Scan[]>('/scans');
    return response.data;
};

export const getScanById = async (id: number): Promise<Scan> => {
    const response = await api.get<Scan>(`/scans/${id}`);
    return response.data;
};

export const createScan = async (scanRequest: ScanRequest): Promise<Scan> => {
    const response = await api.post<Scan>('/scans', scanRequest);
    return response.data;
};

export const updateDisplayOrder = async (request: UpdateDisplayOrderRequest): Promise<void> => {
    await api.put('/scans/order', request);
};

export const checkHealth = async (): Promise<any> => {
    const response = await api.get('/health');
    return response.data;
};

const apiService = {
    getScans,
    getScanById,
    createScan,
    updateDisplayOrder,
    checkHealth
};

export default apiService;
