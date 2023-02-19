import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
        "country": "상처",
        "hot dog": 2,
        "hot dogColor": "hsl(201, 70%, 50%)",
      },
      {
        "country": "당황",
        "hot dog": 1,
        "hot dogColor": "hsl(328, 70%, 50%)",
      },
      {
        "country": "불안",
        "hot dog": 3,
        "hot dogColor": "hsl(142, 70%, 50%)",
      },
      {
        "country": "긍정",
        "hot dog": 8,
        "hot dogColor": "hsl(308, 70%, 50%)",
      },
      {
        "country": "부정",
        "hot dog": 2,
        "hot dogColor": "hsl(109, 70%, 50%)",
      },
      {
        "country": "슬픔",
        "hot dog": 0,
        "hot dogColor": "hsl(109, 70%, 50%)",
      },
      {
        "country": "분노",
        "hot dog": 1,
        "hot dogColor": "hsl(109, 70%, 50%)",
      },
      {
        "country": "감사",
        "hot dog": 7,
        "hot dogColor": "hsl(109, 70%, 50%)",
      },
]


function FeedbackChart() {
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
            'hot dog',
        ]}
        indexBy="country"
        margin={{ top: 20, right: 20, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: '#38bcb2',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: '#eed312',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'fries'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'sandwich'
                },
                id: 'lines'
            }
        ]}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Feeling',
            legendPosition: 'middle',
            legendOffset: 38
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={function(e){return e.id+": "+e.formattedValue+" in country: "+e.indexValue}}
    />
  )
}

export default FeedbackChart