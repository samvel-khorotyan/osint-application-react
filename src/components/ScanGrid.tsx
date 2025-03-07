import React from 'react';
import { Grid, Box, Typography } from '@mui/material';
import ScanCard from './ScanCard';
import { Scan } from '../types';
import { useDragAndDrop } from '../hooks/useDragAndDrop';

interface ScanGridProps {
    scans: Scan[];
    onUpdateOrder: (scanId: number, newOrder: number) => Promise<void>;
}

const ScanGrid: React.FC<ScanGridProps> = ({ scans, onUpdateOrder }) => {
    const { handleDragStart, handleDragOver, handleDrop } = useDragAndDrop(
        scans,
        onUpdateOrder
    );

    if (scans.length === 0) {
        return (
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                bgcolor: 'background.paper',
                borderRadius: 1,
                p: 3
            }}>
                <Typography variant="body1" color="text.secondary">
                    No scans found. Start a new scan to see results here.
                </Typography>
            </Box>
        );
    }

    return (
        <Grid container spacing={3}>
            {scans.map((scan) => (
                <Grid item xs={12} sm={6} md={4} key={scan.id}>
                    <ScanCard
                        scan={scan}
                        onDragStart={() => handleDragStart(scan)}
                        onDragOver={handleDragOver}
                        onDrop={() => handleDrop(scan)}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ScanGrid;
