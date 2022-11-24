// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import {Box, Card, Typography} from '@mui/material';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
// components
import Iconify from '../../components/iconify';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

// ----------------------------------------------------------------------

const StyledIcon = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
    color: PropTypes.string,
    icon: PropTypes.string,
    title: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, diff, icon, color = 'primary', sx, ...other }) {
    return (
        <Card
            sx={{
                py: 5,
                boxShadow: 0,
                textAlign: 'center',
                color: '#ffffff',
                backgroundColor: '#c1beff',
                borderRadius: '10%',
                ...sx,
            }}
            {...other}
        >
            <StyledIcon
                sx={{
                    color: '#ffffff',
                    backgroundImage: (theme) =>
                        `linear-gradient(135deg, ${alpha('#ffffff', 0)} 0%, ${alpha(
                            '#ffffff',
                            0.24
                        )} 100%)`,
                }}
            >
                <Iconify icon={icon} width={24} height={24} />
            </StyledIcon>

            <Typography variant="h3">{fShortenNumber(total)}</Typography>

            <Typography variant="subtitle2" sx={{ opacity: 0.72, marginBottom:1 }}>
                {title}
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40%',
                    margin: 'auto',

                }}
            >

                {diff > 0 && <TrendingUpIcon sx={{ color: '#ffffff' }}/>}
                {diff > 0 && <Typography variant="h5" sx={{ color: '#ffffff' }}>+{diff}%</Typography>}
                {diff < 0 && <TrendingDownIcon sx={{ color: '#ffffff' }}/>}
                {diff < 0 && <Typography variant="h5" sx={{ color: '#ffffff' }}>{diff}%</Typography>}
                {diff === 0 || !diff && <Typography variant="h5" sx={{ color: '#ffffff' }}>0%</Typography>}
            </Box>
        </Card>
    );
}