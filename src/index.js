import ReactDOM from "react-dom/client";

import './index.css';

import Grid from '@mui/material/Grid';
import { Mail, GitHub, LinkedIn } from '@mui/icons-material'

import Synopsis from './synopsis';
import DashboardCards from './dashboardCards';
import Chart from './chart';
import PathCastAppBar from './pathCastAppBar';

// Main UI component
function App() {
    return (
        <div className="Container">
            <Grid container spacing={0}>
                <Grid size={12}>
                    <header className="Header">
                        <img src="pathCastLogo.png" alt="pathCast AI"/>
                        <PathCastAppBar/>
                    </header>
                </Grid>
                <Grid size={12}>
                    <Synopsis/>
                </Grid>
                <Grid size={12}>
                    <section className="Dashboard Stocks" id="Securities">
                        <div className="DashboardHeader">
                            <h2>
                                Automated Algorithmic Stock Trading
                            </h2>
                            <h3>
                                2008-Present Simulation based on S&P 500 as price analysis, with 2x leveraged Tech Long 
                                and 2x leveraged S&P 500 Short 
                            </h3>
                        </div>
                        <div className="DashboardInner">
                            <Grid container spacing={0} justifyContent={"center"} width={"90%"} maxWidth={"1100px"}>
                                <Grid item size={{ xs: 12, sm: 12, md: 4}}>
                                    <DashboardCards/>
                                </Grid>
                                <Grid item size={{ xs: 12, sm: 12, md: 8 }}>
                                    <Chart/>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                </Grid>
                <Grid size={12}>
                    <section className="Dashboard Sports" id="Sports">
                        <div className="DashboardHeader">
                            <h2>
                                Future and In-Progress Projects
                            </h2>
                        </div>
                        <div className="DashboardInner">
                            <Grid container spacing={1} justifyContent={"center"} width={"90%"} maxWidth={"1100px"}>
                                <Grid item size={{ sm: 12, md: 6}}>
                                    <h3 className="CenterText">
                                        Professional Sports Predictions
                                    </h3>
                                    <div className="DashboardCardContainer Short">
                                        <div className="DashboardCard">
                                            Using large data sets of every individual play and player for every game, 
                                            tactical analysis combined with historical wager odds data.
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item size={{ sm: 12, md: 6}}>
                                    <h3 className="CenterText" id="Media">
                                        Media Futures Market
                                    </h3>
                                    <div className="DashboardCardContainer Short">
                                        <div className="DashboardCard">
                                            NFT markets for individual works: music, film and literature. 
                                            Enabling artists and investors to monetize popularity and growth.
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                </Grid>
                <Grid size={12}>
                    <section className="Dashboard Consulting" id="Contact">
                        <div className="DashboardHeader">
                            <h2>
                                Contact
                            </h2>
                            <h3>
                                Predictive AI Methodology and Consulting
                            </h3>
                        </div>
                        <div className="DashboardInner">
                            <Grid container spacing={5} justifyContent={"center"} width={"90%"} maxWidth={"1100px"}>
                                <Grid item size={12}>
                                    <div className="DashboardCardContainer Short">
                                        <div className="DashboardCard">
                                            If you are interested in learning more about our open source Predictive AI methodology and/or
                                            what we can do for your project on a consulting basis, please feel free to reach out.
                                            <div className="ContactBar">
                                                <a className="ContactLink" href="mailto:wtd.dev@gmail.com" 
                                                    title="wtd.dev@gmail.com" target="_blank" rel="noreferrer">
                                                    <Mail className="IconPadding" alt="wtd.dev@gmail.com"/>
                                                </a>
                                                <a className="ContactLink" href="https://www.linkedin.com/company/pathcastai-com" 
                                                    title="PathCast AI LinkedIn" target="_blank" rel="noreferrer">
                                                    <LinkedIn className="IconPadding"/>
                                                </a>
                                                <a className="ContactLink" href="https://github.com/robusticus/nostrofuturo" 
                                                    title="Site GitHub" target="_blank" rel="noreferrer">
                                                    <GitHub className="IconPadding"/>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </section>
                </Grid>                
                <Grid size={12}>
                    <footer className="Footer">
                        <p>© 2020-2026 William Dickey, All Rights Reserved.</p>
                        <p>Nothing within this site is intended as a recommendation to buy or sell securities.</p>
                        <p>Past performance is never a guarantee of future returns.</p>
                    </footer>
                </Grid>
            </Grid>
        </div>
    );
}


// ========================================

ReactDOM.createRoot(document.getElementById("root")).render(<App />);