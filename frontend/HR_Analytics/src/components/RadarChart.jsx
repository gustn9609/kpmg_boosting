import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'
import { Box, Typography, useTheme, Button } from "@mui/material";
import { userRadarData } from "../data/radarData";

function RadarChart() {
  const theme = {
    textColor: "white",
    axis: {
      ticks: {
        text: {
          fontSize: "15px",
          fill: "#ffd166",
          fontWeight: 700,
        }
      }
    }
  }

  return (
    <ResponsiveRadar
        theme={theme}
        data={userRadarData}
        keys={[ 'syrah' ]}
        indexBy="ability"
        valueFormat=">-.2f"
        margin={{ top: 50, right: 80, bottom: 40, left: 80 }}
        borderColor={{ from: 'color' }}
        gridShape="linear"
        gridLabelOffset={20}
        dotSize={10}
        dotColor={{ theme: 'background' }}
        dotBorderWidth={2}
        colors={{ scheme: 'purpleRed_green' }}
        blendMode="multiply"
        motionConfig="wobbly"
        
    />
  )
}

export default RadarChart