import React from 'react'
import { ResponsiveRadar } from '@nivo/radar'

import strings from '../../../../../../static/strings.json'

const keys = strings.dashboard.home.graphs.radar.keys

const Radar = ({ data, theme, /*lang*/ }) => (
    <ResponsiveRadar
        theme={{
            textColor: (theme? '#222':'#DDD'),
            fontFamily: 'Vazir',
            tooltip: {
                container: {
                    background: (theme? '#FFF':'#000')
                }
            },
            grid: {
                line: {
                    stroke: (theme? '#2225':'#9995'),
                }
            }
        }}
        data={data}
        keys={[ 
            keys.rec_sys[/*lang*/1], 
            keys.ads[/*lang*/1], 
            keys.soc_net[/*lang*/1] 
        ]}
        indexBy="taste"
        maxValue="auto"
        margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
        curve="cardinalClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={2}
        gridShape="circular"
        gridLabelOffset={12}
        enableDots={true}
        dotSize={16}
        dotColor={{ from: 'color', modifiers: [] }}
        dotBorderWidth={0}
        dotBorderColor={{ from: 'color' }}
        enableDotLabel={false}
        dotLabel="value"
        dotLabelYOffset={-12}
        colors={{ scheme: theme? 'set2':'dark2' }}
        fillOpacity={0.3}
        blendMode="normal"
        animate={true}
        motionStiffness={95}
        motionDamping={15}
        isInteractive={true}
        legends={[
            {
                anchor: 'top-left',
                direction: 'column',
                translateX: -50,
                translateY: -40,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: (theme? '#222':'#DDD'),
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: (theme? '#000':'#FFF')
                        }
                    }
                ]
            }
        ]}
    />
)

export default Radar