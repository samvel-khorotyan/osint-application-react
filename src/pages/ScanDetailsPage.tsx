import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Typography,
    Box,
    Paper,
    Chip,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    Tab,
    Tabs,
    Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { format } from 'date-fns';
import LoadingSpinner from '../components/LoadingSpinner';
import { getScanById } from '../services/api';
import { Scan, ScanStatus } from '../types';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scan-tabpanel-${index}`}
            aria-labelledby={`scan-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const ScanDetailsPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [scan, setScan] = useState<Scan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        const fetchScan = async () => {
            try {
                if (!id) return;
                setLoading(true);
                const data = await getScanById(parseInt(id));
                setScan(data);
            } catch (err) {
                setError('Failed to load scan details');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchScan();
    }, [id]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

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

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error || !scan) {
        return (
            <Box>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/')}
                    sx={{ mb: 2 }}
                >
                    Back to Scans
                </Button>
                <Alert severity="error">
                    {error || 'Scan not found'}
                </Alert>
            </Box>
        );
    }

    return (
        <Box>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ mb: 2 }}
            >
                Back to Scans
            </Button>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h4" component="h1">
                        {scan.domain}
                    </Typography>
                    <Chip
                        label={scan.status}
                        color={getStatusColor(scan.status) as 'success' | 'error' | 'primary' | 'warning'}
                    />
                </Box>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                            Tool: {scan.tool}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                            ID: {scan.id}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                            Started: {formatDate(scan.startTime)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Typography variant="body2" color="text.secondary">
                            Completed: {formatDate(scan.endTime)}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            <Paper sx={{ mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="scan results tabs">
                        <Tab label="Subdomains" />
                        <Tab label="IP Addresses" />
                        <Tab label="Raw Output" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    {scan.results?.subdomains && scan.results.subdomains.length > 0 ? (
                        <List dense>
                            {scan.results.subdomains.map((subdomain, index) => (
                                <ListItem key={index} divider={index < scan.results!.subdomains!.length - 1}>
                                    <ListItemText primary={subdomain} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No subdomains found
                        </Typography>
                    )}
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    {scan.results?.ips && scan.results.ips.length > 0 ? (
                        <List dense>
                            {scan.results.ips.map((ip, index) => (
                                <ListItem key={index} divider={index < scan.results!.ips!.length - 1}>
                                    <ListItemText primary={ip} />
                                </ListItem>
                            ))}
                        </List>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No IP addresses found
                        </Typography>
                    )}
                </TabPanel>
                <TabPanel value={tabValue} index={2}>
                    {scan.results?.rawOutput ? (
                        <Box component="pre" sx={{
                            p: 2,
                            bgcolor: 'background.default',
                            borderRadius: 1,
                            overflow: 'auto',
                            maxHeight: '500px',
                            fontSize: '0.875rem'
                        }}>
                            {scan.results.rawOutput}
                        </Box>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No raw output available
                        </Typography>
                    )}
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default ScanDetailsPage;
