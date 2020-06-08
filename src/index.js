import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Grid from '@material-ui/core/Grid';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryContainer, VictoryAxis } from 'victory';

class NostroFuturo extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            currentFrame: 0,
            maxFrame: 10,
            frameSize: 5,
            chartData: [
                {x: 0, y:0},
                {x: 0, y:0},
                {x: 0, y:0},
                {x: 0, y:0},
                {x: 0, y:0},
            ],
        }
        this.interval = setInterval(this.ProgressFrame.bind(this), 1500)
    }

    componentDidMount() {
        this.FetchBlobData();
    }

    FetchBlobData() {
        const resultsURL = "https://nostrofuturo.blob.core.windows.net/nostrofuturo/OutputResults.json?sv=2019-10-10&ss=b&srt=sco&sp=r&se=2021-06-08T00:14:16Z&st=2020-06-07T16:14:16Z&spr=https&sig=fi694WbXc%2BDnV7qqhyaZnkaJYHZo4%2BpBC37M0J5D6M8%3D&_=1591563533365";
        fetch(resultsURL)
            .then(response => response.json())
            .then(data => this.setState({ chartData: data, maxFrame: data.length - 1 }));
    }

    ProgressFrame() {
        if (this.state != null)
        {
            const frame = this.state.currentFrame;
            const maxFrame = this.state.maxFrame;
            const frameSize = this.state.frameSize;
            if (frame < maxFrame - frameSize) {
                this.setState({
                    currentFrame: frame + 1,
                });
            }
            else {
                clearInterval(this.interval);
            }
        }
    }

    render() {
        const frame = this.state.currentFrame;
        const frameSize = this.state.frameSize;
        const chartData = this.state.chartData.slice(frame, frame + frameSize);

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
                                <p>While we have come far from the days of rolling bones and reading tea leaves to determine  when to act, still the fascination with the future remains. Our assertion is the advent of modern data analytics, computing power and web services can grant the advantage long promised but never delivered.</p>
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
                                        <div>Current Direction: N/A</div>
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
                                <Grid item xs={12} sm={12} md={6} xl={4}>
                                    <div className="DashboardCard">
                                        <div>Total Return</div>
                                        <div>$: <b>26.7m</b></div>
                                        <div>%: <b>26,534</b></div>
                                    </div>
                                </Grid>
                            </Grid>
                            <div className="ChartContainer">
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    animate={{
                                        duration: 1400,
                                        easing: "linear"
                                    }}
                                    containerComponent={<VictoryContainer responsive={true}/>}
                                >
                                    <VictoryLine
                                        style={{
                                            data: { stroke: "steelblue" },
                                            parent: { border: "1px solid #ccc"},
                                        }}
                                        data={chartData}
                                    />
                                    <VictoryAxis dependentAxis
                                        style={{
                                            tickLabels: { fontSize: 6 }
                                        }}
                                        tickFormat={(t) => "$" + (t * 1000).toLocaleString(undefined, {minimumFractionDigits: 0})}
                                    />

                                    <VictoryAxis crossAxis
                                        style={{
                                            tickLabels: { fontSize: 8 },
                                            axisLabel: { padding: 35 }
                                        }}
                                    />
                                </VictoryChart>         
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <div className="Footer">
                            <p>© 2020 William Dickey, All Rights Reserved.</p>
                            <p>Nothing within this site is intended as a recommendation to buy or sell securities or any other financial product.</p>
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