import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ApiFetchFunding,
  ApiFetchFundingDetain,
  ApiFetchStartup,
  ApiFetchStartupCount,
} from "../../../API/API";
import { SkeletonLoader } from "../../../components/SkeletonLoader";

function FundingGauge({ progress, value, subtitle, detail }) {
  const pct = Math.min(100, Math.max(0, progress));
  const ringStyle = {
    background: `conic-gradient(#45C74D ${pct * 3.6}deg, #E5E7EB 0deg)`,
  };

  return (
    <div className="flex flex-col items-center text-center">
      <div className="relative w-28 h-28 rounded-full p-[8px]" style={ringStyle}>
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-inner px-2">
          <div className="text-[#45C74D] text-sm font-semibold leading-tight break-words">
            {value}
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500 max-w-[200px]">{subtitle}</div>
      {detail ? <div className="mt-1 text-xs text-gray-600">{detail}</div> : null}
    </div>
  );
}

const fundingCardConfig = {
  funding_disbursed: {
    title: "Funding Disbursed",
    color: "#4CAF50",
    bgColor: "bg-green-50",
    icon: <div className="w-4 h-4 bg-green-500 rounded-full" />,
  },
  funding_utilized: {
    title: "Funding Utilized",
    color: "#FF9800",
    bgColor: "bg-orange-50",
    icon: <div className="w-4 h-4 bg-orange-500 rounded-full" />,
  },
  external_funding: {
    title: "External Funding",
    color: "#F44336",
    bgColor: "bg-red-50",
    icon: <div className="w-4 h-4 bg-red-500 rounded-full" />,
  },
};

function FundingCard({ title, amount, color, bgColor, icon, data, gradientKey }) {
  const gid = `fdash-${gradientKey}`;
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <div className={`p-2 rounded-lg ${bgColor}`}>{icon}</div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-4">{amount}</div>
      <div className="h-16">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                <stop offset="100%" stopColor={color} stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              fill={`url(#${gid})`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function buildSparklineSeries(total) {
  const v = Number(total) || 0;
  return [
    { value: 0 },
    { value: v * 0.25 },
    { value: v * 0.5 },
    { value: v * 0.75 },
    { value: v },
  ];
}

function FundingDashboard() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [totals, setTotals] = useState({
    funding_disbursed: 0,
    funding_utilized: 0,
    external_funding: 0,
  });
  const [cohortSeries, setCohortSeries] = useState([]);
  const [sectorBars, setSectorBars] = useState([]);
  const [startupTotal, setStartupTotal] = useState(0);
  const [fundedStartupCount, setFundedStartupCount] = useState(0);

  useEffect(() => {
    const load = async () => {
      try {
        const [detail, fundingRes, startupsRes, countRes] = await Promise.all([
          ApiFetchFundingDetain(),
          ApiFetchFunding(),
          ApiFetchStartup(),
          ApiFetchStartupCount(),
        ]);

        const t = detail || {};
        setTotals({
          funding_disbursed: Number(t.funding_disbursed) || 0,
          funding_utilized: Number(t.funding_utilized) || 0,
          external_funding: Number(t.external_funding) || 0,
        });

        const rows = fundingRes?.rows || [];
        const monthTotals = {};
        rows
          .filter((r) => r.funding_type === "Funding Disbursed")
          .forEach((r) => {
            const d = dayjs(r.funding_date);
            if (!d.isValid()) return;
            const key = d.format("YYYY-MM");
            monthTotals[key] = (monthTotals[key] || 0) + Number(r.amount || 0);
          });

        const cohort = Object.entries(monthTotals)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([key, value]) => ({
            month: dayjs(`${key}-01`).format("MMM YY"),
            value,
          }));

        setCohortSeries(
          cohort.length
            ? cohort
            : [{ month: "—", value: Number(t.funding_disbursed) || 0 }]
        );

        const disbursedByStartup = {};
        rows
          .filter((r) => r.funding_type === "Funding Disbursed")
          .forEach((r) => {
            const id = r.startup_id ?? r.startup_name;
            if (id == null) return;
            disbursedByStartup[id] =
              (disbursedByStartup[id] || 0) + Number(r.amount || 0);
          });
        const funded = Object.values(disbursedByStartup).filter((x) => x > 0).length;
        setFundedStartupCount(funded);

        const startupRows = startupsRes?.rows || [];
        const sectorByEmail = {};
        startupRows.forEach((s) => {
          const email = (s.email_address || s.official_email_address || "").toLowerCase();
          if (!email) return;
          const sector = s.startup_sector || s.startup_domain || "Other";
          sectorByEmail[email] = sector;
        });

        const sectorTotals = {};
        rows
          .filter((r) => r.funding_type === "Funding Disbursed")
          .forEach((r) => {
            const email = String(r.startup_name || "").toLowerCase();
            const sector = sectorByEmail[email] || "Other";
            sectorTotals[sector] = (sectorTotals[sector] || 0) + Number(r.amount || 0);
          });

        const topSectors = Object.entries(sectorTotals)
          .map(([name, amount]) => ({ name, amount }))
          .sort((a, b) => b.amount - a.amount)
          .slice(0, 5);

        setSectorBars(topSectors.length ? topSectors : [{ name: "No data", amount: 0 }]);

        setStartupTotal(Number(countRes?.startup_total) || startupRows.length || 0);
      } catch (e) {
        console.error("Funding dashboard load failed:", e);
      } finally {
        setIsLoaded(true);
      }
    };

    load();
  }, []);

  const sparklineMap = useMemo(() => {
    const out = {};
    Object.entries(totals).forEach(([key, val]) => {
      out[key] = buildSparklineSeries(val);
    });
    return out;
  }, [totals]);

  const avgPerStartup =
    fundedStartupCount > 0
      ? Math.round(totals.funding_disbursed / fundedStartupCount)
      : 0;
  const pctFunded =
    startupTotal > 0 ? Math.round((fundedStartupCount / startupTotal) * 100) : 0;
  const pctUtilized =
    totals.funding_disbursed > 0
      ? Math.round((totals.funding_utilized / totals.funding_disbursed) * 100)
      : 0;

  const avgGaugeProgress =
    fundedStartupCount > 0
      ? Math.min(100, Math.round((avgPerStartup / 500000) * 100))
      : 0;

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-white flex items-center justify-between">
        <div className="text-2xl font-semibold text-gray-900">Funding Dashboard</div>
        <button
          type="button"
          className="p-2 border rounded-lg text-gray-500 hover:bg-gray-50"
          aria-label="Section menu"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      <div className="px-6 py-4">
        <div className="text-lg text-gray-700 mb-4">Overview</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {!isLoaded
            ? [1, 2, 3].map((k) => (
                <div key={k} className="bg-white rounded-xl p-6 shadow-sm border h-40 flex items-center justify-center">
                  <SkeletonLoader />
                </div>
              ))
            : Object.entries(totals).map(([key]) => {
                const config = fundingCardConfig[key];
                if (!config) return null;
                const latest = totals[key];
                return (
                  <FundingCard
                    key={key}
                    gradientKey={key}
                    title={config.title}
                    amount={`Rs. ${latest.toLocaleString("en-IN")}`}
                    icon={config.icon}
                    color={config.color}
                    bgColor={config.bgColor}
                    data={sparklineMap[key]}
                  />
                );
              })}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Funding by cohort</h3>
            <select
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white"
              disabled
              aria-disabled="true"
              title="Filtered to all cohorts"
            >
              <option>Funding by cohort</option>
            </select>
          </div>
          <div className="h-64">
            {isLoaded ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cohortSeries} margin={{ top: 12, right: 16, left: 0, bottom: 8 }}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "#6B7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis hide />
                  <Tooltip
                    formatter={(v) => [`Rs. ${Number(v).toLocaleString("en-IN")}`, "Disbursed"]}
                    contentStyle={{ borderRadius: 8, borderColor: "#E5E7EB" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#45C74D"
                    strokeWidth={3}
                    dot={{ fill: "#45C74D", r: 5, strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <SkeletonLoader />
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Most funded sectors</h3>
            <select
              className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 bg-white"
              disabled
              aria-disabled="true"
            >
              <option>Top 5 sectors</option>
            </select>
          </div>
          <div className="h-[280px]">
            {isLoaded ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  layout="vertical"
                  data={sectorBars}
                  margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={120}
                    tick={{ fontSize: 11, fill: "#4B5563" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(v) => [`Rs. ${Number(v).toLocaleString("en-IN")}`, "Disbursed"]}
                    contentStyle={{ borderRadius: 8, borderColor: "#E5E7EB" }}
                  />
                  <Bar dataKey="amount" fill="#45C74D" radius={[0, 6, 6, 0]} barSize={22} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <SkeletonLoader />
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-500 text-center min-h-[32px] flex items-center justify-center">
              Average funding per start-up
            </div>
            {isLoaded ? (
              <FundingGauge
                progress={avgGaugeProgress}
                value={`Rs. ${avgPerStartup.toLocaleString("en-IN")}`}
                subtitle="Disbursed divided by funded start-ups"
                detail={`Rs. ${totals.funding_disbursed.toLocaleString("en-IN")} · ${fundedStartupCount} funded`}
              />
            ) : (
              <div className="py-8 flex justify-center">
                <SkeletonLoader />
              </div>
            )}
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-500 text-center min-h-[32px] flex items-center justify-center">
              Share of start-ups funded
            </div>
            {isLoaded ? (
              <FundingGauge
                progress={pctFunded}
                value={`${pctFunded}%`}
                subtitle="Funded start-ups vs total"
                detail={`${fundedStartupCount} funded · ${startupTotal} total`}
              />
            ) : (
              <div className="py-8 flex justify-center">
                <SkeletonLoader />
              </div>
            )}
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <div className="text-xs text-gray-500 text-center min-h-[32px] flex items-center justify-center">
              Funding utilized
            </div>
            {isLoaded ? (
              <FundingGauge
                progress={pctUtilized}
                value={`${pctUtilized}%`}
                subtitle="Utilized vs disbursed"
                detail={`Rs. ${totals.funding_utilized.toLocaleString("en-IN")} · Rs. ${totals.funding_disbursed.toLocaleString("en-IN")}`}
              />
            ) : (
              <div className="py-8 flex justify-center">
                <SkeletonLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FundingDashboard;
