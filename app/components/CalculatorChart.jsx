import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const CalculatorChart = ({ data }) => {
    const chartData = Array.from({ length: 13 }, (_, index) => {
        const x = index - 4;
        const y = data * x;

        return {
            uv: y,
            fill: y < 0 ? '#fa0000' : '#82ca9d', // Red for negative values, greenish for non-negative values
        };
    });

    const gradientOffset = () => {
        const dataMax = Math.max(...chartData.map((i) => i.uv));
        const dataMin = Math.min(...chartData.map((i) => i.uv));

        if (dataMax <= 0) {
            return 0;
        }
        if (dataMin >= 0) {
            return 1;
        }

        return dataMax / (dataMax - dataMin);
    };

    const off = gradientOffset();

    return (
        <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" label={{ value: 'Años tras la inversion' }} />
                <YAxis yAxisId="left" domain={['auto', 'auto']} tick={{ fill: '#666666' }} label={{ value: 'acumulación de ahorro (€)', angle: -90, position: 'insideLeft', style: { fontSize: '18px' }, dx: -6, dy: 40 }} />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1} />
                        <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="uv" stroke="#000" fill="url(#splitColor)" yAxisId="left" />
            </AreaChart>
        </ResponsiveContainer>
    );
};
