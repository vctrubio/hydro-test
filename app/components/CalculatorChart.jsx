import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const CalculatorChart = ({ data }) => {
    const chartData = Array.from({ length: 13 }, (_, index) => {
        const x = index - 4;
        const y = data * x;

        return {
            
            uv: y,
        };
    });


    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" label={{ value: 'Años tras la inversion' }} />
                <YAxis yAxisId="left" domain={['auto', 'auto']} tick={{ fill: '#666666' }} label={{ value: 'acumulación de ahorro (€)', angle: -90, position: 'insideLeft', style: { fontSize: '18px' }, dx: -6, dy: 40 }} />
                <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#000000"
                    yAxisId="left"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
