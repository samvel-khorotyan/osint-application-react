import React from 'react';
import { Link } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    LinearProgress,
    CardActionArea
} from '@mui/material';
import { Scan, ScanStatus } from '../types';
import { format } from 'date-fns';

interface ScanCardProps {
    scan: Scan;
    onDragStart: () => void;
    onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop: () => void;
}

const ScanCard: React.FC<ScanCardProps> = ({ scan, onDragStart, onDragOver, onDrop }) => {
    const getStatusColor = (status: ScanStatus) => {
        switch (status) {
            case ScanStatus.COMPLETED:
                return 'success';
            case ScanStatus.FAILED:
                return 'error';
            case ScanStatus.RUNNING:
                return 'primary';
            case ScanStatus.PENDING:
            default:
                return 'warning';
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return 'N/A';
        return format(new Date(dateString), 'MMM d, yyyy HH:mm:ss');
    };

    const getResultsSummary = () => {
        if (!scan.results) return null;

        const subdomains = scan.results.subdomains?.length || 0;
        const ips = scan.results.ips?.length || 0;

        return (
            <Box sx={{ mt: 1 }}>
                <Typography variant="body2" color="text.secondary">
                    Found {subdomains} subdomains and {ips} IP addresses
                </Typography>
            </Box>
        );
    };

    return (
        <Card
            sx={{
                mb: 2,
                position: 'relative',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3,
                }
            }}
            draggable
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {scan.status === ScanStatus.RUNNING && (
                <LinearProgress sx={{ position: 'absolute', top: 0, left: 0, right: 0 }} />
            )}
            <CardActionArea component={Link} to={`/scans/${scan.id}`}>
                <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Typography variant="h6" component="h2" sx={{ mb: 1 }}>
                            {scan.domain}
                        </Typography>
                        <Chip
                            label={scan.status}
                            size="small"
                            color={getStatusColor(scan.status) as 'success' | 'error' | 'primary' | 'warning'}
                        />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Tool: {scan.tool}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Started: {formatDate(scan.startTime)}
                    </Typography>

                    {scan.endTime && (
                        <Typography variant="body2" color="text.secondary">
                            Completed: {formatDate(scan.endTime)}
                        </Typography>
                    )}

                    {scan.status === ScanStatus.COMPLETED && getResultsSummary()}

                    {scan.status === ScanStatus.FAILED && scan.results?.error && (
                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                            Error: {scan.results.error}
                        </Typography>
                    )}
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default ScanCard;
