import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


export const CalculatorChart = ({ data }) => {
    const chartData = Array.from({ length: 31 }, (_, index) => {

        const x = index - 10; // X-axis labels from -10 to 20
        const y = data * x;   // Example calculation based on x value
    
        return {
          name: `${x}`, // X-axis label
          uv: y,        // Y-axis value based on the calculation
          fill: y < 0 ? '#ff0110' : '#11119d', // Red for negative values, greenish for positive
        };
      });
    
      return (
        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" domain={['auto', 'auto']} tick={{ fill: '#666666' }} />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fill={chartData.map(entry => entry.fill)} yAxisId="left" />
          </AreaChart>
        </ResponsiveContainer>
      );
    };

    