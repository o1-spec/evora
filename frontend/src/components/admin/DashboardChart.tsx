'use client';

import { useState } from 'react';

interface ChartDataPoint {
  label: string;
  value: number;
}

interface DashboardChartProps {
  title: string;
  data: ChartDataPoint[];
  type?: 'line' | 'bar';
  prefix?: string;
  suffix?: string;
  color?: string;
}

export function DashboardChart({
  title,
  data,
  type = 'line',
  prefix = '',
  suffix = '',
  color = '#8b5cf6',
}: DashboardChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (!data || data.length === 0) {
    return (
      <div className="admin-card" style={{ padding: 24, minHeight: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
        No data available
      </div>
    );
  }

  // Dimensions
  const width = 500;
  const height = 180;
  const paddingLeft = 40;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const values = data.map((d) => d.value);
  const maxVal = Math.max(...values, 1);
  const minVal = 0; // Baseline at 0 looks cleaner

  const points = data.map((d, idx) => {
    const x = paddingLeft + (idx / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.value - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  // Construct SVG Path for Line
  let pathD = '';
  let areaD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map((p) => `L ${p.x} ${p.y}`).join(' ');
    areaD = `${pathD} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
  }

  // Gridlines values
  const gridLinesCount = 4;
  const gridLines = Array.from({ length: gridLinesCount }).map((_, i) => {
    const ratio = i / (gridLinesCount - 1);
    const y = paddingTop + ratio * chartHeight;
    const val = maxVal - ratio * (maxVal - minVal);
    return { y, val };
  });

  return (
    <div className="admin-card" style={{ padding: '20px 24px', flex: 1, minWidth: 280 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 className="admin-card-title" style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8' }}>
          {title}
        </h3>
        {hoveredIdx !== null && (
          <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>
            {points[hoveredIdx].label}: <span style={{ color }}>{prefix}{points[hoveredIdx].value.toLocaleString()}{suffix}</span>
          </div>
        )}
      </div>

      <div style={{ position: 'relative', width: '100%', height }}>
        <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
          <defs>
            <linearGradient id={`gradient-${title.replace(/\s+/g, '-')}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={color} stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y Axis labels */}
          {gridLines.map((line, i) => (
            <g key={i}>
              <line
                x1={paddingLeft}
                y1={line.y}
                x2={width - paddingRight}
                y2={line.y}
                stroke="rgba(255, 255, 255, 0.05)"
                strokeDasharray="4"
              />
              <text
                x={paddingLeft - 8}
                y={line.y + 4}
                fill="#64748b"
                fontSize="10"
                textAnchor="end"
                fontFamily="sans-serif"
              >
                {prefix}{line.val >= 1000 ? `${(line.val / 1000).toFixed(1)}k` : line.val.toFixed(line.val < 1 && line.val > 0 ? 3 : 0)}{suffix}
              </text>
            </g>
          ))}

          {/* X Axis labels */}
          {points.map((p, idx) => {
            // Show every label if small, else show first, middle, last
            const shouldShowLabel = data.length <= 8 || idx === 0 || idx === data.length - 1 || idx === Math.floor(data.length / 2);
            if (!shouldShowLabel) return null;
            return (
              <text
                key={idx}
                x={p.x}
                y={height - 8}
                fill="#64748b"
                fontSize="10"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {p.label}
              </text>
            );
          })}

          {/* Render Area & Line */}
          {type === 'line' ? (
            <>
              <path
                d={areaD}
                fill={`url(#gradient-${title.replace(/\s+/g, '-')})`}
              />
              <path
                d={pathD}
                fill="none"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </>
          ) : (
            // Render Bars
            points.map((p, idx) => {
              const barWidth = Math.max(8, (chartWidth / data.length) * 0.5);
              const barHeight = chartHeight - (p.y - paddingTop);
              return (
                <rect
                  key={idx}
                  x={p.x - barWidth / 2}
                  y={p.y}
                  width={barWidth}
                  height={Math.max(2, barHeight)}
                  rx="3"
                  fill={hoveredIdx === idx ? color : `${color}cc`}
                  style={{ transition: 'all 0.15s ease' }}
                />
              );
            })
          )}

          {/* Hover interactive areas */}
          {points.map((p, idx) => (
            <g key={idx}>
              {/* Invisible trigger panel for hover */}
              <rect
                x={idx === 0 ? paddingLeft : p.x - chartWidth / (data.length - 1) / 2}
                y={paddingTop}
                width={chartWidth / (data.length - 1)}
                height={chartHeight}
                fill="transparent"
                style={{ cursor: 'pointer' }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              />

              {/* Glowing hover circle on line */}
              {type === 'line' && hoveredIdx === idx && (
                <>
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    fill={color}
                    stroke="#111827"
                    strokeWidth="2"
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="12"
                    fill={color}
                    fillOpacity="0.2"
                    style={{ pointerEvents: 'none' }}
                  />
                </>
              )}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
