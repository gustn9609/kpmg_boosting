import React, {useState} from 'react'
import { ResponsiveBar } from '@nivo/bar'


function BarChart({data}) {

  const theme = {
    textColor: "white",
    axis: {
      ticks: {
        text: {
          fill:"#ffffff",
        }
      }
    }
  }

  return (
    <ResponsiveBar
        theme={theme}
        data={data}
        keys={[
            'dumpy',
            'dumpy1',
            'dumpy2',
            'dumpy3',
            'data_count'
        ]}
        indexBy="user"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    3
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'User Name',
            legendPosition: 'middle',
            legendOffset: 40,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 10,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -50,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
  )
}

export default BarChart