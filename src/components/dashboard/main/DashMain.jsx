import React from 'react';
import '../../../style/dashboard.scss'
import { faker } from '@faker-js/faker';
import { useTheme } from '@mui/material/styles';
import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from "./components/AppWidgetSummary";
import AppWebsiteVisits from "./components/AppWebsiteVisits";
import AppCurrentVisits from "./components/AppCurrentVisits";
import AppConversionRates from "./components/AppConversionRates";
import AppCurrentSubject from "./components/AppCurrentSubject";
import AppOrderTimeline from "./components/AppOrderTimeline";
import AppTasks from "./components/AppTasks";



const DashMain = () => {
    const theme = useTheme();

    return (
        <Grid container>
            <Container maxWidth="xl">
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Hi, Welcome back
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Users" total={714000} icon={'heroicons:users-20-solid'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Posts" total={1352831} color="info" icon={'bi:file-post'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Chats" total={1723315} color="warning" icon={'bi:chat-dots-fill'} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <AppWidgetSummary title="Bug Reports" total={234} color="error" icon={'ant-design:bug-filled'} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppOrderTimeline
                            title="Order Timeline"
                            list={[...Array(5)].map((_, index) => ({
                                id: faker.datatype.uuid(),
                                title: [
                                    '1983, orders, $4220',
                                    '12 Invoices have been paid',
                                    'Order #37745 from September',
                                    'New order placed #XF-2356',
                                    'New order placed #XF-2346',
                                ][index],
                                type: `order${index + 1}`,
                                time: faker.date.past(),
                            }))}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppTasks
                            title="Tasks"
                            list={[
                                { id: '1', label: 'Create FireStone Logo' },
                                { id: '2', label: 'Add SCSS and JS files if required' },
                                { id: '3', label: 'Stakeholder Meeting' },
                                { id: '4', label: 'Scoping & Estimations' },
                                { id: '5', label: 'Sprint Showcase' },
                                { id: '6', label: 'Sprint Showcase' },
                                { id: '7', label: 'Sprint Showcase' },
                                { id: '8', label: 'Sprint Showcase' },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppWebsiteVisits
                            title="Website Visits"
                            subheader="(+43%) than last year"
                            chartLabels={[
                                '01/01/2003',
                                '02/01/2003',
                                '03/01/2003',
                                '04/01/2003',
                                '05/01/2003',
                                '06/01/2003',
                                '07/01/2003',
                                '08/01/2003',
                                '09/01/2003',
                                '10/01/2003',
                                '11/01/2003',
                            ]}
                            chartData={[
                                {
                                    name: 'Team A',
                                    type: 'column',
                                    fill: 'solid',
                                    data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
                                },
                                {
                                    name: 'Team B',
                                    type: 'area',
                                    fill: 'gradient',
                                    data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
                                },
                                {
                                    name: 'Team C',
                                    type: 'line',
                                    fill: 'solid',
                                    data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                                },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentVisits
                            title="Current Visits"
                            chartData={[
                                { label: 'America', value: 4344 },
                                { label: 'Asia', value: 5435 },
                                { label: 'Europe', value: 1443 },
                                { label: 'Africa', value: 4443 },
                            ]}
                            chartColors={[
                                theme.palette.primary.main,
                                theme.palette.info.main,
                                theme.palette.warning.main,
                                theme.palette.error.main,
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={8}>
                        <AppConversionRates
                            title="Conversion Rates"
                            subheader="(+43%) than last year"
                            chartData={[
                                { label: 'Italy', value: 400 },
                                { label: 'Japan', value: 430 },
                                { label: 'China', value: 448 },
                                { label: 'Canada', value: 470 },
                                { label: 'France', value: 540 },
                                { label: 'Germany', value: 580 },
                                { label: 'South Korea', value: 690 },
                                { label: 'Netherlands', value: 1100 },
                                { label: 'United States', value: 1200 },
                                { label: 'United Kingdom', value: 1380 },
                            ]}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={4}>
                        <AppCurrentSubject
                            title="Current Subject"
                            chartLabels={['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math']}
                            chartData={[
                                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
                            ]}
                            chartColors={[...Array(6)].map(() => theme.palette.text.secondary)}
                        />
                    </Grid>


                </Grid>
            </Container>

        </Grid>
    );
};

export default DashMain;
