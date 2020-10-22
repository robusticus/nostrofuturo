import React from 'react';

import Grid from '@material-ui/core/Grid';

import FetchLib from './fetchLib';

// Informational cards about return, status, etc.
class DashboardCards extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            cardData: {},
        }
    }

     // Retrieves JSON from Cloud Blob
     FetchCardData() {
        const resultsURL = FetchLib.BlobURL("DashboardCards.json");
        fetch(resultsURL)
            .then(response => response.json())
            .then(data => this.setState(
                { cardData: data },
            ));
    }
    
    componentDidMount() {
        this.FetchCardData();
    }

    monthDiff(d1, d2) {
        var months;
        months = (d2.getFullYear() - d1.getFullYear()) * 12;
        months += d2.getMonth() - d1.getMonth();
        return months;
    }

    // Now versus start of algorithm run
    numMonths(startDate) {
        var monthDiff = this.monthDiff(new Date(startDate), new Date(Date.now()));
        var years = Math.trunc(monthDiff / 12);
        var months = monthDiff % 12;
        return years + "/" + months;
    }
    
    render () {
        const cardData = this.state.cardData;
        return (
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <div className="DashboardCard">
                        <div className="DashboardRow">
                            <span>Last Status:</span><span>{cardData.Status}</span>
                        </div>
                        <div className="DashboardRow">
                            <span>Last Trade Date:</span><span>{cardData.LastTradeDate}</span>
                        </div>
                        <div className="DashboardRow"> 
                            <span>Current Direction:</span><span>{cardData.CurrentDirection}</span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <div className="DashboardCard">
                        <div className="DashboardRow">
                            <span>Algorithm:</span><span>{cardData.Algorithm}</span>
                        </div>
                        <div className="DashboardRow">
                            <span>First Trade Date:</span><span>{cardData.FirstTradeDate}</span>
                        </div>
                        <div className="DashboardRow">
                            <span>Initial Outlay:</span><span>{cardData.InitialOutlay}</span>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                    <div className="DashboardCard">
                        <div className="DashboardRow">
                            <span>Years/Months:</span><span>{this.numMonths(cardData.FirstTradeDate)}</span>
                        </div>
                        <div className="DashboardRow">
                            <span>Return $:</span><span><b>{cardData.TotalReturnDollars}</b></span>
                        </div>
                        <div className="DashboardRow">
                            <span>Return %:</span><span><b>{cardData.TotalReturnPct}</b></span>
                        </div>
                    </div>
                </Grid>
            </Grid>
        )
    }
}

export default DashboardCards;
