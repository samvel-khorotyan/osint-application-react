import React from 'react';
import { Box, Typography, Paper, Chip, Grid, Tabs, Tab } from '@mui/material';
import { format } from 'date-fns';
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

interface ScanDetailsProps {
    scan: Scan;
}

const ScanDetails: React.FC<ScanDetailsProps> = ({ scan }) => {
    const [tabValue, setTabValue] = React.useState(0);

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

    return (
        <Box>
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

                <Grid container spacing={2}>
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

            <Paper>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} aria-label="scan results tabs">
                        <Tab label="Subdomains" />
                        <Tab label="IP Addresses" />
                        <Tab label="Raw Output" />
                    </Tabs>
                </Box>
                <TabPanel value={tabValue} index={0}>
                    {scan.results?.subdomains && scan.results.subdomains.length > 0 ? (
                        <Box component="ul" sx={{ pl: 2 }}>
                            {scan.results.subdomains.map((subdomain, index) => (
                                <Typography component="li" key={index}>
                                    {subdomain}
                                </Typography>
                            ))}
                        </Box>
                    ) : (
                        <Typography variant="body1" color="text.secondary">
                            No subdomains found
                        </Typography>
                    )}
                </TabPanel>
                <TabPanel value={tabValue} index={1}>
                    {scan.results?.ips && scan.results.ips.length > 0 ? (
                        <Box component="ul" sx={{ pl: 2 }}>
                            {scan.results.ips.map((ip, index) => (
                                <Typography component="li" key={index}>
                                    {ip}
                                </Typography>
                            ))}
                        </Box>
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

export default ScanDetails;
