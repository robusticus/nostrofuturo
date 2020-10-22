import React from 'react';

import './index.css';

// Text block half of page
class Synopsis extends React.Component {

    render () {
        return (
            <section className="Synopsis">
                <div className="SynopsisInner">
                    <h1>Prescient</h1>
                    <p className="DefinitionPart">[ˈpreSH(ē)ənt]</p>
                    <p className="DefinitionPart">ADJECTIVE</p>
                    <p className="DefinitionText">having or showing knowledge of events before they take place.</p>
                    <p>Since the dawn of time humans have been fascinated with obtaining knowledge of the future. And advantage thereof in a myriad of ways that form a large part of our social fabric.</p>
                    <p>While we have come far from the days of rolling bones and reading tea leaves to determine <b>when to act</b>, still the fascination remains. Our assertion is the advent of modern AI can grant the advantage long promised.</p>
                    <p>Prescient AI is a set of platforms and applications for price and sports prediction, social gambling and the creation and operation of futures markets for media and celebrity.</p>
                    <p>Please peruse the results of the first project: trading in 2X tech leverage with the S&P500 as a price baseline. If you are interested in learning more, get in touch @ <a href="mailto:wtd.dev@gmail.com">wtd.dev@gmail.com</a>. Thank you.</p>
                </div>
            </section>
        )
    }
}

export default Synopsis;
