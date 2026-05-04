import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle2, CircleUserRound, Clock3, Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  ApiFetchMentorCount,
  ApiFetchScheduleMeetingsDetailsWithMentor,
  ApiFetchStartupData,
} from "../../../API/API";

const specializationData = [
  { name: "Marketing & Sales", score: 65 },
  { name: "Biology", score: 88 },
  { name: "Finance", score: 72 },
  { name: "General Management", score: 98 },
  { name: "Technology", score: 55 },
];

function CircleGauge({ progress, value, subtitle, total }) {
  const ringStyle = {
    background: `conic-gradient(#45C74D ${progress * 3.6}deg, #E5E7EB 0deg)`,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 rounded-full p-[7px]" style={ringStyle}>
        <div className="w-full h-full bg-white rounded-full flex items-center justify-center shadow-inner">
          <div className="text-[#45C74D] text-lg font-semibold">{value}</div>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">{subtitle}</div>
      <div className="text-sm font-medium text-[#45C74D]">{total}</div>
    </div>
  );
}

function Mentor() {
  const [totalMentoringHours, setTotalMentoringHours] = useState("0hr");
  const [sessionCount, setSessionCount] = useState(0);
  const [mentorCount, setMentorCount] = useState(0);
  const [totalStartups, setTotalStartups] = useState(0);
  const [meetingsRows, setMeetingsRows] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("all");

  const monthNames = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  );

  const parseDurationToMinutes = (durationValue) => {
    if (!durationValue) return 0;

    if (typeof durationValue === "number") return durationValue;

    const text = String(durationValue).toLowerCase().trim();
    const matches = text.match(/(\d+(?:\.\d+)?)\s*(hour|hr|h|minute|min|mins|m)?/g);

    if (!matches) return 0;

    return matches.reduce((total, part) => {
      const numMatch = part.match(/(\d+(?:\.\d+)?)/);
      if (!numMatch) return total;

      const value = Number(numMatch[1]);
      if (Number.isNaN(value)) return total;

      if (/(hour|hr|h)/.test(part)) {
        return total + value * 60;
      }
      if (/(minute|min|mins|m)/.test(part)) {
        return total + value;
      }

      // Fallback: treat unitless values as minutes.
      return total + value;
    }, 0);
  };

  const formatMinutesAsHours = (minutes) => {
    const total = Math.max(0, Math.round(minutes));
    const hours = Math.floor(total / 60);
    const mins = total % 60;

    if (hours > 0 && mins > 0) return `${hours}hr ${mins}min`;
    if (hours > 0) return `${hours}hr`;
    return `${mins}min`;
  };

  const responseRows = (response) =>
    (Array.isArray(response) && response) ||
    response?.STATUS?.rows ||
    [];

  const getMentorCount = (response) => {
    if (typeof response?.count === "number") return response.count;
    // if (typeof response?.total === "number") return response.total;
    // if (typeof response?.STATUS?.count === "number") return response.STATUS.count;
    // if (typeof response?.STATUS?.total === "number") return response.STATUS.total;

    const rows = responseRows(response);
    if (Array.isArray(rows) && rows.length > 0) {
      const first = rows[0];
      const parsed =
        Number(first?.count) ||
        Number(first?.total) ||
        Number(first?.mentor_count) ||
        Number(first?.mentorCount);
      if (!Number.isNaN(parsed) && parsed >= 0) return parsed;
    }

    return 0;
  };

  const getSessionCount = (rows) => (Array.isArray(rows) ? rows.length : 0);

  const parseMeetingDate = (row) => {
    const dateValue = row?.date || row?.meeting_date || row?.meetingDate;
    const parsed = new Date(dateValue);
    return Number.isNaN(parsed.getTime()) ? null : parsed;
  };

  const availableYears = useMemo(() => {
    const years = new Set();

    meetingsRows.forEach((row) => {
      const date = parseMeetingDate(row);
      if (date) years.add(date.getFullYear());
    });

    return Array.from(years).sort((a, b) => b - a);
  }, [meetingsRows]);

  useEffect(() => {
    if (!selectedYear && availableYears.length > 0) {
      setSelectedYear(String(availableYears[0]));
    }
  }, [availableYears, selectedYear]);

  const mentoringHoursData = useMemo(() => {
    const monthlyMinutes = {};

    meetingsRows.forEach((row) => {
      const date = parseMeetingDate(row);
      if (!date) return;

      const year = String(date.getFullYear());
      const monthIndex = date.getMonth();
      const monthAsString = String(monthIndex);

      if (selectedYear && selectedYear !== "all" && year !== selectedYear) return;
      if (selectedMonth !== "all" && monthAsString !== selectedMonth) return;

      const key = selectedYear === "all" ? `${year}-${monthIndex}` : String(monthIndex);
      monthlyMinutes[key] = (monthlyMinutes[key] || 0) + parseDurationToMinutes(row?.meeting_duration);
    });

    if (selectedYear && selectedYear !== "all") {
      const completeMonths = monthNames.map((name, monthIndex) => ({
        month: name,
        hours: Number(((monthlyMinutes[String(monthIndex)] || 0) / 60).toFixed(2)),
      }));

      return selectedMonth === "all"
        ? completeMonths
        : completeMonths.filter((_, monthIndex) => String(monthIndex) === selectedMonth);
    }

    return Object.entries(monthlyMinutes)
      .map(([key, minutes]) => {
        const [year, monthIndex] = key.split("-").map(Number);
        return {
          year,
          monthIndex,
          month: `${monthNames[monthIndex]} ${String(year).slice(-2)}`,
          hours: Number((minutes / 60).toFixed(2)),
        };
      })
      .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.monthIndex - b.monthIndex));
  }, [meetingsRows, selectedYear, selectedMonth, monthNames]);

  const quickStats = useMemo(() => {
    const formatNumber = (value) => {
      const rounded = Math.round(value * 10) / 10;
      return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    };

    const totalSessions = meetingsRows.length;
    const totalDurationMinutes = meetingsRows.reduce(
      (sum, row) => sum + parseDurationToMinutes(row?.meeting_duration),
      0
    );

    const denominator = mentorCount > 0 ? mentorCount : 1;
    const avgStartupsPerMentor = totalStartups / denominator;
    const avgSessionsPerMentor = totalSessions / denominator;
    const avgSessionDurationMinutes = totalSessions > 0 ? totalDurationMinutes / totalSessions : 0;

    return [
      {
        title: "Average start-ups per mentor",
        value: formatNumber(avgStartupsPerMentor),
        subtitle: "Total start-ups",
        total: String(totalStartups),
        progress: Math.min(100, Math.round(avgStartupsPerMentor * 10)),
      },
      {
        title: "Average Mentoring Sessions per mentor",
        value: formatNumber(avgSessionsPerMentor),
        subtitle: "Total sessions",
        total: String(totalSessions),
        progress: Math.min(100, Math.round(avgSessionsPerMentor * 10)),
      },
      {
        title: "Average duration of session",
        value: formatMinutesAsHours(avgSessionDurationMinutes),
        subtitle: "Total duration",
        total: formatMinutesAsHours(totalDurationMinutes),
        progress: Math.min(100, Math.round((avgSessionDurationMinutes / 120) * 100)),
      },
    ];
  }, [meetingsRows, mentorCount, totalStartups]);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const [meetingsResponse, mentorsCountResponse, startupsResponse] = await Promise.all([
          ApiFetchScheduleMeetingsDetailsWithMentor(),
          ApiFetchMentorCount(),
          ApiFetchStartupData(),
        ]);

        const rows = responseRows(meetingsResponse);
        setMeetingsRows(Array.isArray(rows) ? rows : []);
        const startupRows = responseRows(startupsResponse);
        setTotalStartups(Array.isArray(startupRows) ? startupRows.length : 0);

        const totalMinutes = rows.reduce(
          (sum, row) => sum + parseDurationToMinutes(row?.meeting_duration),
          0
        );

        setTotalMentoringHours(formatMinutesAsHours(totalMinutes));
        setSessionCount(getSessionCount(rows));
        setMentorCount(getMentorCount(mentorsCountResponse));
      } catch (error) {
        console.error("Failed to fetch mentor dashboard stats:", error);
      }
    };

    fetchDashboardStats();
  }, []);

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-white">
        <div className="text-2xl font-semibold text-gray-900">Mentor Dashboard</div>
      </div>

      <div className="px-6 py-4">
        <div className="text-lg text-gray-700 mb-4">Overview</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-xl p-4 shadow-sm">
            <CheckCircle2 size={18} className="text-[#45C74D] mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{totalMentoringHours}</div>
            <div className="text-xs text-gray-500">Total Mentoring Hours</div>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <Search size={18} className="text-[#F59E0B] mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{sessionCount}</div>
            <div className="text-xs text-gray-500">Total Scheduled Meetings</div>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <CircleUserRound size={18} className="text-[#EF4444] mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{mentorCount}</div>
            <div className="text-xs text-gray-500">Total Mentors</div>
          </div>
        </div>

        <div className="border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-medium text-gray-800">Mentoring Hours</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Clock3 size={14} className="text-gray-500" />
                <select
                  className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-700"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="all">All years</option>
                  {availableYears.map((year) => (
                    <option key={year} value={String(year)}>
                      {year}
                    </option>
                  ))}
                </select>
                <select
                  className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-700"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                >
                  <option value="all">All months</option>
                  {monthNames.map((monthLabel, monthIndex) => (
                    <option key={monthLabel} value={String(monthIndex)}>
                      {monthLabel}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mentoringHoursData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(value) => {
                    const totalMinutes = Math.round(Number(value || 0) * 60);
                    const hours = Math.floor(totalMinutes / 60);
                    const mins = totalMinutes % 60;
                    if (mins === 0) return `${hours} hr`;
                    return `${hours} hr ${mins} mins`;
                  }}
                  labelFormatter={(label) => `${label}`}
                  contentStyle={{ borderRadius: "8px", borderColor: "#E5E7EB" }}
                />
                <Line
                  type="monotone"
                  dataKey="hours"
                  stroke="#45C74D"
                  strokeWidth={3}
                  dot={{ fill: "#45C74D", r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-base font-medium text-gray-800">Most Represented Specializations</div>
            <div className="text-sm text-gray-500">Top 5</div>
          </div>
          <div className="space-y-3">
            {specializationData.map((item) => (
              <div key={item.name}>
                <div className="text-xs text-gray-500 mb-1">{item.name}</div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-[#45C74D] rounded-full"
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickStats.map((item) => (
            <div key={item.title} className="border rounded-xl p-4">
              <div className="text-xs text-gray-500 min-h-[30px]">{item.title}</div>
              <div className="mt-2">
                <CircleGauge
                  progress={item.progress}
                  value={item.value}
                  subtitle={item.subtitle}
                  total={item.total}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Mentor;
