import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import Grid from '@material-ui/core/Grid';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryContainer, VictoryAxis } from 'victory';

// Main UI component
class NostroFuturo extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            currentFrame: 0,
            maxFrame: 10,
            frameSize: 5,
            chartData: [],
            isRunning: false,
            cardData: {},
        }
    }

    componentDidMount() {
        this.FetchCardData();
        this.FetchChartData();
    }

    // Utility for building a URL
    BlobURL(file) {
        return "https://nostrofuturo.blob.core.windows.net/nostrofuturo/" + file + "?sv=2019-10-10&ss=b&srt=sco&sp=r&se=2021-06-08T00:14:16Z&st=2020-06-07T16:14:16Z&spr=https&sig=fi694WbXc%2BDnV7qqhyaZnkaJYHZo4%2BpBC37M0J5D6M8%3D&_=1591563533365"
    }

    // Retrieves JSON from Azure Blob
    FetchCardData() {
        const resultsURL = this.BlobURL("DashboardCards.json");
        fetch(resultsURL)
            .then(response => response.json())
            .then(data => this.setState(
                { cardData: data },
            ));
    }

    // Retrieves JSON from Azure Blob
    FetchChartData() {
        const resultsURL = this.BlobURL("OutputResults.json");
        fetch(resultsURL)
            .then(response => response.json())
            .then(data => this.setState(
                { 
                    chartData: data, 
                    maxFrame: data.length 
                },
                this.StartStop()
            ));
    }

    // Timer switch for button and init
    StartStop() {
        const isRunning = this.state.isRunning;
        if (isRunning)
        {
            this.StopTimer();
        }
        else {
            this.setState({isRunning: true, currentFrame: 0},
                this.StartTimer()
            )
        }
    }

    // Starts the interval
    StartTimer() {
        this.interval = setInterval(this.NextFrame.bind(this), 1500)
    }

    // Clears the interval
    StopTimer() {
        clearInterval(this.interval);
        this.setState({isRunning: false});
    }

    // Advance + 1
    NextFrame() {
        this.MoveFrame(1);
    }

    // Advance - 1
    PreviousFrame() {
        if (this.state.currentFrame > 0)
        {
            this.MoveFrame(-1);
        }
    }

    // Either next or previous, sets range of X axis
    MoveFrame(frameDelta) {
        if (this.state != null)
        {
            const frame = this.state.currentFrame;
            const maxFrame = this.state.maxFrame;
            const frameSize = this.state.frameSize;
            const isRunning = this.state.isRunning;
            if (isRunning) {
                // if at the end, shut off timer, done, otherwise progress frame
                if (frame < maxFrame - frameSize) {
                    this.setState({
                        currentFrame: frame + frameDelta,
                    });
                }
                else {
                    this.StopTimer();
                }
            }
            else {
                // verify not out of bounds
                if (frame + frameDelta + frameSize <= maxFrame) {
                    // if at the end, reset to the end minus one frame for previous
                    if (frame + frameSize >= maxFrame) {
                        this.setState({
                            currentFrame: maxFrame - frameSize + frameDelta,
                        })
                    }
                    else {
                        this.setState({
                            currentFrame: frame + frameDelta,
                        })
                    }
                }
            }
        }
    }

    render() {
        const frame = this.state.currentFrame;
        const frameSize = this.state.frameSize;
        const chartData = this.state.chartData.slice(frame, frame + frameSize);
        const isRunning = this.state.isRunning;
        const cardData = this.state.cardData;

        return (
            <div className="Container">
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <header className="Header">
                            <img src="nostrologo.png" alt="Nostro Futuro"/>
                        </header>
                    </Grid>
                    <Grid item xs={12} sm={6} md={5}>
                        <section className="Synapsis">
                            <div className="SynapsisInner">
                                <h1>Prescience.</h1>
                                <p>Since the beginning of civilization human beings have been fascinated with the future and obtaining knowledge thereof. And advantage thereof in a myriad of ways that form a large part of our social fabric.</p>
                                <p>While we have come far from the days of rolling bones and reading tea leaves to determine  when to act, still the fascination with the future remains. Our assertion is the advent of modern data analytics, computing power and web services can grant the advantage long promised but never delivered.</p>
                                <p>Nostro Futuro is a set of platforms and applications that aim to harness technology to create markets and facilitate fair contests as well as to predict prices, sports, media and celebrity.</p>
                                <p>Please peruse the results of the first project: price prediction trading in 2X leverage with the S&P500 as a baseline. If you are interested in learning more, get in touch @ <a href="mailto:wtd.dev@gmail.com">wtd.dev@gmail.com</a>. Thank you.</p>
                            </div>
                        </section>
                    </Grid>
                    <Grid item xs={12} sm={6} md={7}>
                        <section className="Dashboard">
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={6} lg={5}>
                                    <div className="DashboardCard">
                                        <div>Last Trade Date: {cardData.LastTradeDate}</div>
                                        <div>Current Direction: {cardData.CurrentDirection}</div>
                                        <div>Status: {cardData.Status}</div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={5}>
                                    <div className="DashboardCard">
                                        <div>Algorithm: {cardData.Algorithm}</div>
                                        <div>First Trade Date: {cardData.FirstTradeDate}</div>
                                        <div>Initial Outlay: {cardData.InitialOutlay}</div>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={2}>
                                    <div className="DashboardCard">
                                        <div>Total Return</div>
                                        <div><b>{cardData.TotalReturnDollars}</b></div>
                                        <div><b>{cardData.TotalReturnPct}</b></div>
                                    </div>
                                </Grid>
                            </Grid>
                            <section className="ChartContainer">
                                <VictoryChart
                                    theme={VictoryTheme.material}
                                    animate={{
                                        duration: 1400,
                                        easing: "linear"
                                    }}
                                    containerComponent={<VictoryContainer responsive={true}/>}
                                    style={{
                                        background: { fill: "whitesmoke" },
                                        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                    }}
                                >
                                    <VictoryLine
                                        style={{
                                            data: { stroke: "steelblue" },
                                            parent: { border: "1px solid lightslategrey"},
                                        }}
                                        data={chartData}
                                        interpolation={"natural"}
                                    />
                                    <VictoryAxis dependentAxis
                                        style={{
                                            grid: { stroke: "lightslategrey" },
                                            tickLabels: { fontSize: 12, padding: 0, fontWeight: 600 },
                                        }}
                                        tickFormat={(t) => "$" + t.toLocaleString(undefined, {minimumFractionDigits: 0})}
                                    />

                                    <VictoryAxis crossAxis
                                        style={{
                                            grid: { stroke: "lightslategrey" },
                                            tickLabels: { fontSize: 12, fontWeight: 600 },
                                        }}
                                    />
                                </VictoryChart>         
                            </section>
                            <section className="ChartButtonBar ">
                                <button onClick={() => this.PreviousFrame()} disabled={isRunning}>Previous</button>
                                <button onClick={() => this.StartStop()}>{!isRunning ? "Replay" : "Stop"}</button>
                                <button onClick={() => this.NextFrame()} disabled={isRunning}>Next</button>
                            </section>
                        </section>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <footer className="Footer">
                            <p>© 2020 William Dickey, All Rights Reserved.</p>
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
    <NostroFuturo />,
    document.getElementById('root')
  );