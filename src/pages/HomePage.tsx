import React, { useState } from 'react';
import { Typography, Button, Box, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import ScanForm from '../components/ScanForm';
import ScanGrid from '../components/ScanGrid';
import LoadingSpinner from '../components/LoadingSpinner';
import { useScans } from '../hooks/useScans';
import { ScanRequest } from '../types';

const HomePage: React.FC = () => {
    const { scans, loading, error, fetchScans, createScan, updateOrder } = useScans();
    const [openScanForm, setOpenScanForm] = useState(false);

    const handleCreateScan = async (scanRequest: ScanRequest) => {
        await createScan(scanRequest);
        setOpenScanForm(false);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Domain Scans
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={() => fetchScans()}
                        sx={{ mr: 2 }}
                    >
                        Refresh
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenScanForm(true)}
                    >
                        New Scan
                    </Button>
                </Box>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                    {error}
                </Alert>
            )}

            {loading && scans.length === 0 ? (
                <LoadingSpinner />
            ) : (
                <ScanGrid scans={scans} onUpdateOrder={updateOrder} />
            )}

            <ScanForm
                open={openScanForm}
                onClose={() => setOpenScanForm(false)}
                onSubmit={handleCreateScan}
            />
        </Box>
    );
};

export default HomePage;
