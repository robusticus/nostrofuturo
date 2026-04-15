import { useState, useEffect } from 'react';

import FetchLib from './fetchLib';
import DateLib from './dateLib';

// Informational cards about return, status, etc.
function DashboardCards() {

    const [cardData, setCardData] = useState([])

    // Retrieves JSON from Cloud Blob
    function FetchCardData() {
        fetch(FetchLib.BlobURL("DashboardCards.json"))
            .then(response => response.json())
            .then(data => setCardData(data));
    }
    
    useEffect(() => {
        FetchCardData();
    }, [cardData]);

    return (
        <section className="DashboardCardContainer SmallText">
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
            <div className="DashboardCard NoMobileTopBorder">
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
            <div className="DashboardCard NoMobileTopBorder">
                <div className="DashboardRow">
                    <span>Years/Months:</span><span>{DateLib.numMonths(cardData.FirstTradeDate)}</span>
                </div>
                <div className="DashboardRow">
                    <span>Return $:</span><span><b>{cardData.TotalReturnDollars}</b></span>
                </div>
                <div className="DashboardRow">
                    <span>Return %:</span><span><b>{cardData.TotalReturnPct}</b></span>
                </div>
            </div>
        </section>
    )
}

export default DashboardCards;
