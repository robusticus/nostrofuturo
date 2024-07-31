import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Grid from '@material-ui/core/Grid';

import Synopsis from './synopsis';
import DashboardCards from './dashboardCards';
import Chart from './chart';

// Main UI component
class NostroFuturo extends React.Component {

    render() {
        return (
            <div className="Container">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <header className="Header">
                            <img src="logoTrend.png" alt="Trend Friend AI"/>
                        </header>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <Synopsis/>
                    </Grid>
                    <Grid item xs={12} sm={6} md={7}>
                        
                        <section className="Dashboard">
                            <div className="DashboardInner">
                                <DashboardCards/>
                                <Chart/>
                            </div>
                        </section>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <footer className="Footer">
                            <p>© 2020-2024 William Dickey, All Rights Reserved.</p>
                            <p>Nothing within this site is intended as a recommendation to buy or sell securities.</p>
                            <p>Past performance is never a guarantee of future returns.</p>
                        </footer>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <React.StrictMode>
        <NostroFuturo />
    </React.StrictMode>,
    document.getElementById('root')
  );