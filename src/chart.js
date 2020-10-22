import React from 'react';

import Slider from '@material-ui/core/Slider';
import { VictoryChart, VictoryLine, VictoryTheme, VictoryContainer, VictoryAxis, VictoryLabel } from 'victory';

import FetchLib from './fetchLib';

// Chart component that wraps VictoryChart
class Chart extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            currentFrame: 0,
            maxFrame: 10,
            frameSize: 5,
            chartData: [],
            isRunning: false,
        }
    }

    // Retrieves JSON from Cloud Blob
    FetchChartData() {
        const resultsURL = FetchLib.BlobURL("OutputResults.json");
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
    
    componentDidMount() {
        this.FetchChartData();
    }

    // Timer switch for button and init
    StartStop() {
        const isRunning = this.state.isRunning;
        const currentFrame = this.state.currentFrame;
        const maxFrame = this.state.maxFrame;
        const frameSize = this.state.frameSize;
        // advance the frame one if paused in the middle, to avoid a lag
        const advanceFrame = currentFrame > 0 && currentFrame !== (maxFrame - frameSize)
                                ? this.state.currentFrame + 1 : 0;
        if (isRunning)
        {
            this.StopTimer();
        }
        else {
            this.setState({isRunning: true, currentFrame: advanceFrame},
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
        const fullData = this.state.chartData;
        const isRunning = this.state.isRunning;

        const sliderChange = (event, newValue) => {
            if (!isRunning) {
                this.setState({currentFrame: newValue});
            }
        };

        return (
            <div className="ChartContainer">
                <section className="ChartContainerInner">
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
                            interpolation={"linear"}
                            
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
                            label={"Trade Date"}
                            axisLabelComponent={
                                <VictoryLabel
                                    dy={30}
                                    style={{fill:"rgb(69, 90, 100)",
                                            fontSize: 12,}}
                                />
                            }
                        />
                    </VictoryChart>         
                </section>
                <section className="SmallSpacer"/>
                <section className="ChartButtonBar ">
                    <Slider
                        onChange={sliderChange}
                        track={false}
                        value={frame}
                        aria-labelledby="trade dates"
                        marks min={0} max={fullData.length > frameSize ? fullData.length - frameSize : fullData.length}
                    />    
                </section>
                <section className="SmallSpacer" />
                <section className="ChartButtonBar ">
                    <button onClick={() => this.PreviousFrame()} disabled={isRunning}>Previous</button>
                    <button onClick={() => this.StartStop()}>{!isRunning ? "Play" : "Stop"}</button>
                    <button onClick={() => this.NextFrame()} disabled={isRunning}>Next</button>
                </section>
                <section className="Spacer" />
            </div>
        );
    }
}

export default Chart;