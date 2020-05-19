import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Grid from '@material-ui/core/Grid';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryContainer } from 'victory';

class NostroFuturo extends React.Component {

    constructor (props) {
        super(props);
        this.maxFrames = 10;
        this.GetChartData();
        this.interval = setInterval(this.GetChartData.bind(this), 1000)
    }

    GetChartData() {
        const startYear = 1999;
        if (this.state != null)
        {
            const frame = this.state.currentFrame;
            if (frame < this.maxFrames) {
                this.setState({
                    currentFrame: frame + 1,
                    chartData: [
                        { x: (startYear + frame), y: 2 + frame  },
                        { x: (startYear + frame + 1), y: 4 + frame  },
                        { x: (startYear + frame + 2), y: 3 + frame  },
                        { x: (startYear + frame + 3), y: 6 + frame  },
                    ],
                });
            }
            else {
                return this.state.chartData;
                clearInterval(this.interval);
            }
        }
        else {
            this.state = {
                currentFrame: 1,
                chartData: [
                    { x: "1999", y: 2  },
                    { x: "2000", y: 3  },
                    { x: "2001", y: 5  },
                    { x: "2002", y: 4  },
                ],
            }
        }
    }

    render() {
        const chartData = this.state.chartData;

        return (
            <div className="Container">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <div className="Header">
                            <img src="nostrologo.png" alt="Nostro Futuro"/>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <div className="Synapsis">
                            <div className="SynapsisInner">
                                <h1>Prescience.</h1>
                                <p>Since the beginning of civilization human beings have been fascinated with the future and obtaining knowledge thereof. And advantage thereof in a myriad of ways that form a large part of our social fabric.</p>
                                <p>While we have come far from the days of rolling bones and reading tea leaves to determine  when to act, still the fascination with the future remains. My assertion is the advent of modern data analytics, computing power and web services can grant the advantage long promised but never delivered.</p>
                                <p>Nostro Futuro is a set of platforms and applications that aim to harness technology to create markets and facilitate fair contests as well as to predict prices, sports, media and celebrity.</p>
                                <p>Please peruse the results of the first project: price prediction trading in 3X leverage with the S&P500 as a baseline. If you are interested in learning more, get in touch @ <a href="mailto:wtd.dev@gmail.com">wtd.dev@gmail.com</a>. Thank you.</p>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={7}>
                        <div className="Dashboard">
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={6} xl={4}>
                                    <div className="DashboardCard">
                                        <div>Last Trade Date: 5/7/2020</div>
                                        <div>Current Direction: Short</div>
                                        <div>Status: OK</div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} xl={4}>
                                    <div className="DashboardCard">
                                        <div>Algorithm: Band Momentum Grey</div>
                                        <div>First Trade Date: 8/1/2006</div>
                                        <div>Initial Outlay: $15,000</div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={12} xl={4}>
                                    <Grid container spacing={0} alignContent={"flex-end"}>
                                        <Grid item xs={12} sm={4}>
                                            <div className="DashboardCard">
                                                <div>1 Year</div>
                                                <div>$26.7m</div>
                                                <div>26,534%</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="DashboardCard">
                                                <div>5 Years</div>
                                                <div>$26.7m</div>
                                                <div>26,534%</div>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <div className="DashboardCard">
                                                <div>Total</div>
                                                <div><b>$26.7m</b></div>
                                                <div><b>26,534%</b></div>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <div className="ChartContainer">
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    animation={{
                                        duration: 500,
                                    }}
                                    containerComponent={<VictoryContainer responsive={true}/>}
                                >
                                    <VictoryLine
                                        style={{
                                            data: { stroke: "steelblue" },
                                            parent: { border: "1px solid #ccc"}
                                        }}
                                        data={chartData}
                                    />
                                </VictoryChart>         
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className="Footer">
                            <p>© 2020 William Dickey, All Rights Reserved.</p>
                            <p>Nothing within this site is intended as a recommendation to buy or sell securities.</p>
                            <p>Past performance is never a guarantee of future returns.</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}


// ========================================

ReactDOM.render(
    <NostroFuturo />,
    document.getElementById('root')
  );