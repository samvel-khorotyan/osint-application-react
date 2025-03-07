import { useState, useEffect, useCallback } from 'react';
import { Scan, ScanRequest } from '../types';
import * as api from '../services/api';

export const useScans = () => {
    const [scans, setScans] = useState<Scan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchScans = useCallback(async () => {
        try {
            setLoading(true);
            const data = await api.getScans();
            setScans(data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch scans');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const createScan = useCallback(async (scanRequest: ScanRequest) => {
        try {
            setLoading(true);
            const newScan = await api.createScan(scanRequest);
            setScans(prev => [...prev, newScan]);
            return newScan;
        } catch (err) {
            setError('Failed to create scan');
            console.error(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    const updateOrder = useCallback(async (scanId: number, newOrder: number) => {
        try {
            await api.updateDisplayOrder({ scanId, newOrder });
            fetchScans();
        } catch (err) {
            setError('Failed to update order');
            console.error(err);
        }
    }, [fetchScans]);

    useEffect(() => {
        fetchScans();
    }, [fetchScans]);

    return {
        scans,
        loading,
        error,
        fetchScans,
        createScan,
        updateOrder
    };
};
