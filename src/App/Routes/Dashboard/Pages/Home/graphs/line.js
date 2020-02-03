import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const Line = ({ data, theme, lang, color }) => (
    <ResponsiveLine
        theme={{
            textColor: '#222',
            fontFamily: 'Vazir',
            tooltip: {
                container: {
                    background: theme? '#fff5':'#000d'
                }
            }
        }}
        data={data}
        margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
        xScale={{ type: 'point' }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        enableGridX={false}
        enableGridY={false}
        colors={db => (theme? '#fff':color)} // or db.color
        enablePoints={false}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="y"
        pointLabelYOffset={-12}
        enableArea={true}
        useMesh={true}
        legends={[]}
    />
)

export default Line