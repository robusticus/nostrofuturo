import { useState, useEffect, useRef } from 'react';

import Slider from '@mui/material/Slider';
import { PlayArrow, SkipNext, SkipPrevious, Stop } from '@mui/icons-material';
import ReactECharts from 'echarts-for-react';

import FetchLib from './fetchLib';

// Chart component that wraps 3rd party
function Chart() {

    const TIMER_INTERVAl = 150;
    const frameSize = 8;

    const [currentFrame, setCurrentFrame] = useState(0);
    const [maxFrame, setMaxFrame] = useState(10);
    const [isRunning, setIsRunning] = useState(false);
    const [chartData, setChartData] = useState([]);
    const [chartViewX, setChartViewX] = useState([]);
    const [chartViewY, setChartViewY] = useState([]);

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
                formatter: function (params) {
                    const formatted = new Intl.NumberFormat('en-US').format(params);
                    return "$" + formatted;
                }
            }
        },
        series: {
            type: 'line',
            smooth: false,
            areaStyle: {
                color: 'rgb(255, 158, 68)',
            },
            data: chartViewY,
            symbolSize: 0,
        },
        animationDuration: 0,
        animationDurationUpdate: 0,
        animationEasing: 'circularOut',
    };

    function SetChartOptions(newFrame) {

        const data = chartData;

        if (data.length > 0) {

            setChartViewX(data.slice(newFrame, newFrame + frameSize).map(item => item['x']));
            setChartViewY(data.slice(newFrame, newFrame + frameSize).map(item => item['y']));
        }
    }

    const interval = useRef(null); // Store interval ID to clear later

    // these functions are used from within the timer thread,
    // thus they have to use the setter function to retrieve the value due to stale state
    function GetCurrentFrame() {
        let prevVal = 0;
        setCurrentFrame(prev => { prevVal = prev; return prev; });
        return (prevVal);
    }

    function GetMaxFrame() {
        let prevVal = 0;
        setMaxFrame(prev => { prevVal = prev; return prev; });
        return (prevVal);
    }

    function GetIsRunning() {
        let prevVal = 0;
        setIsRunning(prev => { prevVal = prev; return prev; });
        return (prevVal);
    }
    
    // Retrieves JSON from Cloud Blob
    function FetchChartData() {
        const resultsURL = FetchLib.BlobURL("OutputResults.json");
        fetch(resultsURL)
            .then(response => response.json())
            .then(data => {
                setMaxFrame(data.length);
                setChartData(data);
            });
    }
    
    // Starts the interval
    function StartTimer() { 
        interval.current = window.setInterval(NextFrame, TIMER_INTERVAl)
    };

    // Clears the interval
    function StopTimer() {
        clearInterval(interval.current);
    };

    useEffect(() => {
        FetchChartData();
        // Cleanup on unmount
        return () => {
            StopTimer();
        };
    }, []);

    // after fetch
    useEffect(() => {
        if (chartData.length > 0) {
            // TODO: The obvious changes here cause the state to close out and be inaccessible
            // This may be that rare case where a component should be a class, not a function
            // eslint-disable-next-line react-hooks/exhaustive-deps
            StartStop();
        }
    }, [chartData]);
    
    // Timer switch for button and init
    function StartStop() {
        if (isRunning)
        {
            StopTimer();
            setIsRunning(false);
        }
        else {
            // advance the frame one if paused in the middle, to avoid a lag
            const advanceFrame = currentFrame > 0 && currentFrame !== (maxFrame - frameSize)
                                    ? currentFrame + 1 : 0;
            SetFrame(advanceFrame);
            setIsRunning(true);
            StartTimer();
        }
    }

    // Advance + 1
    function NextFrame() {
        MoveFrame(1);
    };

    // Advance - 1
    function PreviousFrame() {
        if (currentFrame > 0)
        {
            MoveFrame(-1);
        }
    }

    // Either next or previous, sets range of X axis
    function MoveFrame(frameDelta) {
        const frame = GetCurrentFrame();
        const max = GetMaxFrame();
        const running = GetIsRunning();
        if (running) {
            // if at the end, shut off timer, done, otherwise progress frame
            if (frame < max - frameSize) {
                SetFrame(frame + frameDelta);
            }
            else {
                StopTimer();
                setIsRunning(false);
            }
        }
        else {
            // verify not out of bounds
            if (currentFrame + frameDelta + frameSize <= max) {
                // if at the end, reset to the end minus one frame for previous
                if (currentFrame + frameSize >= max) {
                    SetFrame(max - frameSize + frameDelta);
                }
                else {
                    SetFrame(currentFrame + frameDelta);
                }
            }
        }
    };

    function SetFrame(value) {
        setCurrentFrame(value);
        SetChartOptions(value);
    };

    const sliderChange = (event, newValue) => {
        if (!GetIsRunning()) {
            SetFrame(newValue);
        }
    };
    
    return (
        <section className="DashboardCardContainer Wide">
            <div className="ChartContainer">
                <section className="ChartContainerInner">
                    <ReactECharts option={chartOptions} />
                </section>
                <section className="ChartButtonBar ">
                    <Slider
                        onChange={sliderChange}
                        track={false}
                        value={currentFrame}
                        aria-labelledby="trade dates"
                        marks min={0} max={chartData.length > frameSize ? chartData.length - frameSize : chartData.length}
                    />    
                </section>
                <section className="ChartButtonBar ">
                    <button onClick={() => PreviousFrame()} disabled={isRunning} title="Previous">
                        <SkipPrevious></SkipPrevious>
                    </button>
                    <button onClick={() => StartStop()} title={isRunning ? "Stop" : "Play"}>
                        {!isRunning && (<PlayArrow></PlayArrow>)}
                        {isRunning && (<Stop></Stop>)}
                    </button>
                    <button onClick={() => NextFrame()} disabled={isRunning} title="Next">
                        <SkipNext></SkipNext>
                    </button>
                </section>
            </div>
        </section>
    )
}

export default Chart;