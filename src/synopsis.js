import React from 'react';

import './index.css';

// Text block half of page
class Synopsis extends React.Component {

    render () {
        return (
            <section className="Synopsis">
                <div className="SynopsisInner">
                    <h1>"You can not see the future without seeing the past."</h1>
                    <p>Trend Friend AI is a set of platforms and applications for price and sports prediction, peer to peer social gambling and NFT based celebrity/media futures.</p>
                    <p>Please peruse the results of the first two projects:</p>
                    <p>Stock Trading in 2X leveraged tech with the S&P500 as a price baseline.</p>
                    <p>Outcome prediction of profesional football games.</p>
                    <p>If you are interested in learning more, get in touch @ <a href="mailto:wtd.dev@gmail.com">wtd.dev@gmail.com</a>.</p>
                </div>
            </section>
        )
    }
}

export default Synopsis;
