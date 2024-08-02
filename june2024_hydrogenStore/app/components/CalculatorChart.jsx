import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export const CalculatorChart = ({ data, ahorroMensual }) => {
    console.log('data', data);
    const chartData = Array.from({ length: 13 }, (_, index) => {
        const x = index;
        const y = -data + (ahorroMensual * x);
        return {
            name: x,
            uv: y,
        };
    });

    console.log('chartData', chartData)
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

    const customTickFormatter = (value, index) => {
        return index % 4 === 0 ? value : '';
    };

    return (
        <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData}>
                <CartesianGrid stroke="none" />
                <XAxis dataKey="name" label={{ value: 'Meses tras la inversion', dy: 12 }}
                    tickFormatter={customTickFormatter}
                />
                <YAxis
                    yAxisId="left"
                    domain={[-5000, 25000]}
                    label={{ value: 'Acumulación de ahorro (€)', angle: -90, position: 'insideLeft', style: { fontSize: '18px' }, dy: 90 }}
                    tickFormatter={(value) => value === 0 ? '0' : `${(Math.round(value / 1000))}k`} // Formats the tick values as "8k" or "0"
                />
                <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset={off} stopColor="green" stopOpacity={1} />
                        <stop offset={off} stopColor="red" stopOpacity={1} />
                    </linearGradient>
                </defs>
                <Area type="natural" dataKey="uv" stroke="#555" fill="url(#splitColor)" yAxisId="left"
                    isAnimationActive={true}
                    animationBegin={0}
                    animationDuration={1000}
                    animationEasing="ease-out" />
            </AreaChart>
        </ResponsiveContainer>
    );
};
