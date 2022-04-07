import React from 'react'
import Cards from './Cards'
import NumberFormat from 'react-number-format';



function CovidSummary(props) {

    const {
        totalconfirmed,
        newdeaths,
        totaldeaths,
        country
    } = props;

    return (

        <div>
            <div>
                <h1 style={{ textTransform: 'capitalize' }}>{country === '' ? 'World Wide Covid Report' : country}</h1>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <Cards>
                        <span style={{ color: "red" }}>Total Confirmed</span> <br />
                        <span>{<NumberFormat
                            value={totalconfirmed}
                            displayType={'text'}
                            thousandSeparator={true}
                        />}  </span>
                    </Cards>
                    <Cards>
                        <span style={{ color: "green" }}>New Deaths</span> <br />
                        <span>{<NumberFormat
                            value={newdeaths}
                            displayType={'text'}
                            thousandSeparator={true}
                        />}</span>
                    </Cards>
                    <Cards>
                        <span style={{ color: "blue" }}>Total Deaths</span> <br />
                        <span>{<NumberFormat
                            value={totaldeaths}
                            displayType={'text'}
                            thousandSeparator={true}
                        />}</span>
                    </Cards>
                </div>

            </div>
        </div>

    )
}

export default CovidSummary