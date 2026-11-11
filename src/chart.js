import { Component, createRef } from 'react';

import Slider from '@mui/material/Slider';
import { PlayArrow, SkipNext, SkipPrevious, Stop } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

import FetchLib from './fetchLib';

// Chart component that wraps 3rd party
class Chart extends Component {
    TIMER_INTERVAL = 250;
    frameSize = 8;

    state = {
        currentFrame: 0,
        maxFrame: 10,
        isRunning: false,
        chartData: [],
        chartViewX: [],
        chartViewY: [],
    };

    interval = null;
    chartContainerRef = createRef();
    hasAutoStarted = false;
    observer = null;

    componentDidMount() {
        this.fetchChartData();
        this.observeVisibility();
    }

    componentDidUpdate() {
        if (
            !this.hasAutoStarted &&
            this.state.chartData.length > 0 &&
            this.state.hasChartBeenVisible
        ) {
            this.hasAutoStarted = true;
            this.startStop();
        }
    }

    componentWillUnmount() {
        this.stopTimer();
        if (this.observer) {
            this.observer.disconnect();
        }
    }

    fetchChartData = () => {
        const resultsURL = FetchLib.BlobURL('OutputResults.json');
        fetch(resultsURL)
            .then(response => response.json())
            .then(data => {
                this.setState({ maxFrame: data.length, chartData: data });
            });
    };

    observeVisibility = () => {
        const chartContainer = this.chartContainerRef.current;

        if (!chartContainer) {
            return;
        }

        if (!('IntersectionObserver' in window)) {
            this.setState({ hasChartBeenVisible: true });
            return;
        }

        this.observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                this.setState({ hasChartBeenVisible: true });
                this.observer.disconnect();
            }
        }, { threshold: 0.2 });

        this.observer.observe(chartContainer);
    };

    startTimer = () => {
        this.stopTimer();
        this.interval = window.setInterval(this.nextFrame, this.TIMER_INTERVAL);
    };

    stopTimer = () => {
        if (this.interval !== null) {
            window.clearInterval(this.interval);
            this.interval = null;
        }
    };

    startStop = () => {
        if (this.state.isRunning) {
            this.stopTimer();
            this.setState({ isRunning: false });
            return;
        }

        // Advance the frame when resuming in the middle to avoid a lag.
        const { currentFrame, maxFrame } = this.state;
        const advanceFrame = currentFrame > 0 && currentFrame !== maxFrame - this.frameSize
            ? currentFrame + 1
            : 0;

        this.setFrame(advanceFrame, () => {
            this.setState({ isRunning: true }, this.startTimer);
        });
    };

    nextFrame = () => this.moveFrame(1);

    previousFrame = () => {
        if (this.state.currentFrame > 0) {
            this.moveFrame(-1);
        }
    };

    moveFrame = frameDelta => {
        const { currentFrame, maxFrame, isRunning } = this.state;

        if (isRunning) {
            if (currentFrame < maxFrame - this.frameSize) {
                this.setFrame(currentFrame + frameDelta);
            } else {
                this.stopTimer();
                this.setState({ isRunning: false });
            }
            return;
        }

        const maxStartFrame = Math.max(0, maxFrame - this.frameSize);
        const nextFrame = Math.min(maxStartFrame, Math.max(0, currentFrame + frameDelta));
        this.setFrame(nextFrame);
    };

    setFrame = (value, callback) => {
        const { chartData } = this.state;
        const visibleData = chartData.slice(value, value + this.frameSize);

        this.setState({
            currentFrame: value,
            chartViewX: visibleData.map(item => item.x),
            chartViewY: visibleData.map(item => item.y),
        }, callback);
    };

    sliderChange = (_event, newValue) => {
        if (!this.state.isRunning) {
            this.setFrame(newValue);
        }
    };

    render() {
        const { currentFrame, isRunning, chartViewX, chartViewY, chartData } = this.state;
        const chartOptions = {
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: chartViewX,
                animation: 0,
                animationDuration: 0,
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                animation: 0,
                animationDuration: 0,
                axisLabel: {
                    formatter: params => `$${new Intl.NumberFormat('en-US').format(params)}`,
                },
            },
            series: {
                type: 'line',
                smooth: false,
                areaStyle: { color: 'rgb(255, 158, 68)' },
                data: chartViewY,
                symbolSize: 0,
            },
            animationDuration: 0,
            animationDurationUpdate: 0,
            animationEasing: 'circularOut',
        };

        return (
            <section className="DashboardCardContainer Wide" ref={this.chartContainerRef}>
                <div className="ChartContainer">
                    <section className="ChartContainerInner">
                        <ReactECharts option={chartOptions} />
                    </section>
                    <section className="ChartButtonBar ">
                        <Slider
                            onChange={this.sliderChange}
                            track={false}
                            value={currentFrame}
                            aria-labelledby="trade dates"
                            marks
                            min={0}
                            max={chartData.length > this.frameSize ? chartData.length - this.frameSize : chartData.length}
                        />
                    </section>
                    <section className="ChartButtonBar ">
                        <button onClick={this.previousFrame} disabled={isRunning} title="Previous">
                            <SkipPrevious />
                        </button>
                        <button onClick={this.startStop} title={isRunning ? 'Stop' : 'Play'}>
                            {!isRunning && <PlayArrow />}
                            {isRunning && <Stop />}
                        </button>
                        <button onClick={this.nextFrame} disabled={isRunning} title="Next">
                            <SkipNext />
                        </button>
                    </section>
                </div>
            </section>
        );
    }
}

export default Chart;
