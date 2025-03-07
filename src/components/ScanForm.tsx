import React, { useState } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    FormHelperText,
    Box,
    Slider,
    Typography,
    InputAdornment
} from '@mui/material';
import { ScanRequest } from '../types';

interface ScanFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: ScanRequest) => Promise<void>;
}

const ScanForm: React.FC<ScanFormProps> = ({ open, onClose, onSubmit }) => {
    const [domain, setDomain] = useState('');
    const [timeout, setTimeout] = useState(60);
    const [passive, setPassive] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const domainRegex = /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    const isValidDomain = domainRegex.test(domain);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isValidDomain) {
            setError('Please enter a valid domain');
            return;
        }

        try {
            setLoading(true);
            setError(null);
            await onSubmit({ domain, timeout, passive });
            setDomain('');
            setTimeout(60);
            setPassive(true);
            onClose();
        } catch (err) {
            setError('Failed to start scan. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Start New Domain Scan</DialogTitle>
            <form onSubmit={handleSubmit}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="domain"
                        label="Domain"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={domain}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="example.com"
                        required
                        error={domain !== '' && !isValidDomain}
                        helperText={domain !== '' && !isValidDomain ? 'Please enter a valid domain' : ''}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">https://</InputAdornment>,
                        }}
                    />

                    <Box sx={{ mt: 3 }}>
                        <Typography gutterBottom>Timeout (minutes)</Typography>
                        <Slider
                            value={timeout}
                            onChange={(_, value) => setTimeout(value as number)}
                            aria-labelledby="timeout-slider"
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={5}
                            max={120}
                        />
                    </Box>

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={passive}
                                onChange={(e) => setPassive(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Passive scan (recommended)"
                    />
                    <FormHelperText>
                        Passive scanning only uses external data sources and doesn't directly interact with the target domain
                    </FormHelperText>

                    {error && (
                        <Box sx={{ mt: 2, color: 'error.main' }}>
                            {error}
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} disabled={loading}>Cancel</Button>
                    <Button
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading || !domain || !isValidDomain}
                    >
                        {loading ? 'Starting...' : 'Start Scan'}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
};

export default ScanForm;
