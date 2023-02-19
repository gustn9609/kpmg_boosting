import React from 'react'
import { ResponsiveBar } from '@nivo/bar'

const data = [
    {
        "country": "문제 정의",
        "hot dog": 150,
        "hot dogColor": "hsl(201, 70%, 50%)",
      },
      {
        "country": "주도성",
        "hot dog": 16,
        "hot dogColor": "hsl(328, 70%, 50%)",
      },
      {
        "country": "협업",
        "hot dog": 33,
        "hot dogColor": "hsl(142, 70%, 50%)",
      },
      {
        "country": "업무 이해",
        "hot dog": 42,
        "hot dogColor": "hsl(308, 70%, 50%)",
      },
      {
        "country": "성실성",
        "hot dog": 61,
        "hot dogColor": "hsl(109, 70%, 50%)",
      },
]


function RankChart() {
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
            legend: 'Ability',
            legendPosition: 'middle',
            legendOffset: 38
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Rank',
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

export default RankChart