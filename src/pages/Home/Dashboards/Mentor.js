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
  ApiFetchMentor,
  ApiFetchMentorCount,
  ApiFetchScheduleMeetingsDetailsWithMentor,
  ApiFetchStartupData,
} from "../../../API/API";

/** How many specialization bars to show in "Most Represented Specializations". */
const TOP_SPECIALIZATION_BAR_COUNT = 5;

/**
 * Donut-style stat used for the three "quick stats" cards at the bottom.
 * @param {number} progress — 0–100 for the green ring sweep
 * @param {string} value — main number shown in the center
 * @param {string} subtitle — label under the ring
 * @param {string} total — secondary line (e.g. totals) in green
 */
function CircleGauge({ progress, value, subtitle, total }) {
  const conicRingStyle = {
    background: `conic-gradient(#45C74D ${progress * 3.6}deg, #E5E7EB 0deg)`,
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 rounded-full p-[7px]" style={conicRingStyle}>
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
  const [formattedTotalMentoringDuration, setFormattedTotalMentoringDuration] = useState("0min");
  const [totalScheduledMeetingsCount, setTotalScheduledMeetingsCount] = useState(0);
  const [totalMentorsInProgram, setTotalMentorsInProgram] = useState(0);
  const [totalStartupRecordsCount, setTotalStartupRecordsCount] = useState(0);


  const [allScheduledMeetingRows, setAllScheduledMeetingRows] = useState([]);
  const [allMentorRecords, setAllMentorRecords] = useState([]);

  // —— Mentoring hours chart filters
  const [mentoringHoursChartYearFilter, setMentoringHoursChartYearFilter] = useState("");
  const [mentoringHoursChartMonthFilter, setMentoringHoursChartMonthFilter] = useState("all");

  const shortMonthLabels = useMemo(
    () => ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    []
  );

  /**
   * Normalizes API duration strings (e.g. "1hr", "30 min") or numeric minutes into a minute total.
   */
  const parseDurationToMinutes = (durationValue) => {
    if (!durationValue) return 0;

    if (typeof durationValue === "number") return durationValue;

    const normalizedText = String(durationValue).toLowerCase().trim();
    const durationParts = normalizedText.match(/(\d+(?:\.\d+)?)\s*(hour|hr|h|minute|min|mins|m)?/g);

    if (!durationParts) return 0;

    return durationParts.reduce((accumulatedMinutes, part) => {
      const numericMatch = part.match(/(\d+(?:\.\d+)?)/);
      if (!numericMatch) return accumulatedMinutes;

      const numericValue = Number(numericMatch[1]);
      if (Number.isNaN(numericValue)) return accumulatedMinutes;

      if (/(hour|hr|h)/.test(part)) {
        return accumulatedMinutes + numericValue * 60;
      }
      if (/(minute|min|mins|m)/.test(part)) {
        return accumulatedMinutes + numericValue;
      }
      return accumulatedMinutes + numericValue;
    }, 0);
  };


  const formatMinutesAsHoursLabel = (totalMinutes) => {
    const roundedTotal = Math.max(0, Math.round(totalMinutes));
    const wholeHours = Math.floor(roundedTotal / 60);
    const remainderMinutes = roundedTotal % 60;

    if (wholeHours > 0 && remainderMinutes > 0) return `${wholeHours}hr ${remainderMinutes}min`;
    if (wholeHours > 0) return `${wholeHours}hr`;
    return `${remainderMinutes}min`;
  };

  const extractRowsFromApiResponse = (apiResponse) => {
    if (Array.isArray(apiResponse)) return apiResponse;
    if (Array.isArray(apiResponse?.STATUS?.rows)) return apiResponse.STATUS.rows;
    if (Array.isArray(apiResponse?.rows)) return apiResponse.rows;
    return [];
  };

  /**
   * Mentor count endpoint.
   */
  const parseMentorCountFromResponse = (mentorCountApiResponse) => {
    if (typeof mentorCountApiResponse?.count === "number") return mentorCountApiResponse.count;

    const summaryRows =
      (Array.isArray(mentorCountApiResponse?.rows) && mentorCountApiResponse.rows) ||
      extractRowsFromApiResponse(mentorCountApiResponse);
    if (Array.isArray(summaryRows) && summaryRows.length > 0) {
      const firstSummaryRow = summaryRows[0];
      const parsedCount =
        Number(firstSummaryRow?.count) ||
        Number(firstSummaryRow?.total) ||
        Number(firstSummaryRow?.mentor_count) ||
        Number(firstSummaryRow?.mentorCount);
      if (!Number.isNaN(parsedCount) && parsedCount >= 0) return parsedCount;
    }

    return 0;
  };

  const countScheduledMeetings = (meetingRows) => (Array.isArray(meetingRows) ? meetingRows.length : 0);

  const parseScheduledMeetingDate = (meetingRow) => {
    const rawDate = meetingRow?.date || meetingRow?.meeting_date || meetingRow?.meetingDate;
    const parsedDate = new Date(rawDate);
    return Number.isNaN(parsedDate.getTime()) ? null : parsedDate;
  };

  
  const parseExpertiseLabelsFromMentor = (mentorRow) => {
    const raw = mentorRow?.area_of_expertise;
    if (!raw || typeof raw !== "string") return [];

    const splitLabels = raw
      .split(/[,;]|\s+and\s+/i)
      .map((label) => label.trim())
      .filter(Boolean);

    return [...new Set(splitLabels)];
  };

  // Years present in meeting data — drives the year `<select>`.
  const distinctYearsFromMeetings = useMemo(() => {
    const yearSet = new Set();

    allScheduledMeetingRows.forEach((meetingRow) => {
      const meetingDate = parseScheduledMeetingDate(meetingRow);
      if (meetingDate) yearSet.add(meetingDate.getFullYear());
    });

    return Array.from(yearSet).sort((a, b) => b - a);
  }, [allScheduledMeetingRows]);

  useEffect(() => {
    if (!mentoringHoursChartYearFilter && distinctYearsFromMeetings.length > 0) {
      setMentoringHoursChartYearFilter(String(distinctYearsFromMeetings[0]));
    }
  }, [distinctYearsFromMeetings, mentoringHoursChartYearFilter]);

  // Aggregated points for the line chart (filtered by year/month).
  const mentoringHoursChartDataPoints = useMemo(() => {
    const minutesByBucketKey = {};

    allScheduledMeetingRows.forEach((meetingRow) => {
      const meetingDate = parseScheduledMeetingDate(meetingRow);
      if (!meetingDate) return;

      const meetingYear = String(meetingDate.getFullYear());
      const monthIndexZeroBased = meetingDate.getMonth();
      const monthIndexAsString = String(monthIndexZeroBased);

      if (mentoringHoursChartYearFilter && mentoringHoursChartYearFilter !== "all" && meetingYear !== mentoringHoursChartYearFilter) {
        return;
      }
      if (mentoringHoursChartMonthFilter !== "all" && monthIndexAsString !== mentoringHoursChartMonthFilter) {
        return;
      }

      const bucketKey =
        mentoringHoursChartYearFilter === "all" ? `${meetingYear}-${monthIndexZeroBased}` : String(monthIndexZeroBased);
      minutesByBucketKey[bucketKey] =
        (minutesByBucketKey[bucketKey] || 0) + parseDurationToMinutes(meetingRow?.meeting_duration);
    });

    if (mentoringHoursChartYearFilter && mentoringHoursChartYearFilter !== "all") {
      const monthsForSelectedYear = shortMonthLabels.map((monthLabel, monthIndex) => ({
        month: monthLabel,
        hours: Number(((minutesByBucketKey[String(monthIndex)] || 0) / 60).toFixed(2)),
      }));

      return mentoringHoursChartMonthFilter === "all"
        ? monthsForSelectedYear
        : monthsForSelectedYear.filter((_, monthIndex) => String(monthIndex) === mentoringHoursChartMonthFilter);
    }

    return Object.entries(minutesByBucketKey)
      .map(([compositeKey, minutes]) => {
        const [yearPart, monthIndexPart] = compositeKey.split("-").map(Number);
        return {
          year: yearPart,
          monthIndex: monthIndexPart,
          month: `${shortMonthLabels[monthIndexPart]} ${String(yearPart).slice(-2)}`,
          hours: Number((minutes / 60).toFixed(2)),
        };
      })
      .sort((a, b) => (a.year !== b.year ? a.year - b.year : a.monthIndex - b.monthIndex));
  }, [
    allScheduledMeetingRows,
    mentoringHoursChartYearFilter,
    mentoringHoursChartMonthFilter,
    shortMonthLabels,
  ]);

  /**
   * Top specializations by mentor count; bar width is relative to the top count in the list.
   */
  const topSpecializationBreakdown = useMemo(() => {
    const mentorCountByExpertiseLabel = {};

    allMentorRecords.forEach((mentorRow) => {
      parseExpertiseLabelsFromMentor(mentorRow).forEach((label) => {
        mentorCountByExpertiseLabel[label] = (mentorCountByExpertiseLabel[label] || 0) + 1;
      });
    });

    const sortedByCount = Object.entries(mentorCountByExpertiseLabel)
      .map(([expertiseLabel, mentorCount]) => ({ expertiseLabel, mentorCount }))
      .sort((a, b) => b.mentorCount - a.mentorCount);

    const topSlice = sortedByCount.slice(0, TOP_SPECIALIZATION_BAR_COUNT);
    const maxMentorCountAmongTop = topSlice[0]?.mentorCount || 1;

    return topSlice.map(({ expertiseLabel, mentorCount }) => ({
      expertiseLabel,
      mentorCount,
      /** 0–100 for CSS width; scales so the highest bar in this list is full width. */
      barFillPercent: Math.round((mentorCount / maxMentorCountAmongTop) * 100),
    }));
  }, [allMentorRecords]);

  // Three derived averages for the bottom gauge cards.
  const quickStatGaugeItems = useMemo(() => {
    const formatOneDecimal = (numericValue) => {
      const rounded = Math.round(numericValue * 10) / 10;
      return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    };

    const totalMeetingsCount = allScheduledMeetingRows.length;
    const sumMeetingDurationMinutes = allScheduledMeetingRows.reduce(
      (runningSum, meetingRow) => runningSum + parseDurationToMinutes(meetingRow?.meeting_duration),
      0
    );

    const mentorCountDenominator = totalMentorsInProgram > 0 ? totalMentorsInProgram : 1;
    const averageStartupsPerMentor = totalStartupRecordsCount / mentorCountDenominator;
    const averageSessionsPerMentor = totalMeetingsCount / mentorCountDenominator;
    const averageSessionDurationMinutes =
      totalMeetingsCount > 0 ? sumMeetingDurationMinutes / totalMeetingsCount : 0;

    return [
      {
        cardTitle: "Average start-ups per mentor",
        centerValue: formatOneDecimal(averageStartupsPerMentor),
        subtitleUnderRing: "Total start-ups",
        totalLine: String(totalStartupRecordsCount),
        ringProgressPercent: Math.min(100, Math.round(averageStartupsPerMentor * 10)),
      },
      {
        cardTitle: "Average Mentoring Sessions per mentor",
        centerValue: formatOneDecimal(averageSessionsPerMentor),
        subtitleUnderRing: "Total sessions",
        totalLine: String(totalMeetingsCount),
        ringProgressPercent: Math.min(100, Math.round(averageSessionsPerMentor * 10)),
      },
      {
        cardTitle: "Average duration of session",
        centerValue: formatMinutesAsHoursLabel(averageSessionDurationMinutes),
        subtitleUnderRing: "Total duration",
        totalLine: formatMinutesAsHoursLabel(sumMeetingDurationMinutes),
        ringProgressPercent: Math.min(100, Math.round((averageSessionDurationMinutes / 120) * 100)),
      },
    ];
  }, [allScheduledMeetingRows, totalMentorsInProgram, totalStartupRecordsCount]);

  useEffect(() => {
    const loadMentorDashboardData = async () => {
      try {
        const [meetingsPayload, mentorCountPayload, startupsPayload, mentorsListPayload] = await Promise.all([
          ApiFetchScheduleMeetingsDetailsWithMentor(),
          ApiFetchMentorCount(),
          ApiFetchStartupData(),
          ApiFetchMentor(),
        ]);

        const meetingRows = extractRowsFromApiResponse(meetingsPayload);
        setAllScheduledMeetingRows(Array.isArray(meetingRows) ? meetingRows : []);

        const startupRows = extractRowsFromApiResponse(startupsPayload);
        setTotalStartupRecordsCount(Array.isArray(startupRows) ? startupRows.length : 0);

        const mentorListRows = extractRowsFromApiResponse(mentorsListPayload);
        setAllMentorRecords(Array.isArray(mentorListRows) ? mentorListRows : []);

        const aggregateDurationMinutes = meetingRows.reduce(
          (sum, row) => sum + parseDurationToMinutes(row?.meeting_duration),
          0
        );

        setFormattedTotalMentoringDuration(formatMinutesAsHoursLabel(aggregateDurationMinutes));
        setTotalScheduledMeetingsCount(countScheduledMeetings(meetingRows));
        setTotalMentorsInProgram(parseMentorCountFromResponse(mentorCountPayload));
      } catch (error) {
        console.error("Failed to fetch mentor dashboard stats:", error);
      }
    };

    loadMentorDashboardData();
  }, []);

  return (
    <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b bg-white">
        <div className="text-2xl font-semibold text-gray-900">Mentor Dashboard</div>
      </div>

      <div className="px-6 py-4">
        {/* Overview: headline totals */}
        <div className="text-lg text-gray-700 mb-4">Overview</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border rounded-xl p-4 shadow-sm">
            <CheckCircle2 size={18} className="text-[#45C74D] mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{formattedTotalMentoringDuration}</div>
            <div className="text-xs text-gray-500">Total Mentoring Hours</div>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <Search size={18} className="text-[#F59E0B] mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{totalScheduledMeetingsCount}</div>
            <div className="text-xs text-gray-500">Total Scheduled Meetings</div>
          </div>

          <div className="border rounded-xl p-4 shadow-sm">
            <CircleUserRound size={18} className="text-[#EF4444] mb-2" />
            <div className="text-2xl font-semibold text-gray-900">{totalMentorsInProgram}</div>
            <div className="text-xs text-gray-500">Total Mentors</div>
          </div>
        </div>

        {/* Mentoring hours trend */}
        <div className="border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="text-base font-medium text-gray-800">Mentoring Hours</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <Clock3 size={14} className="text-gray-500" />
                <select
                  className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-700"
                  value={mentoringHoursChartYearFilter}
                  onChange={(e) => setMentoringHoursChartYearFilter(e.target.value)}
                >
                  <option value="all">All years</option>
                  {distinctYearsFromMeetings.map((calendarYear) => (
                    <option key={calendarYear} value={String(calendarYear)}>
                      {calendarYear}
                    </option>
                  ))}
                </select>
                <select
                  className="text-xs border border-gray-200 rounded-md px-2 py-1 text-gray-700"
                  value={mentoringHoursChartMonthFilter}
                  onChange={(e) => setMentoringHoursChartMonthFilter(e.target.value)}
                >
                  <option value="all">All months</option>
                  {shortMonthLabels.map((monthLabel, monthIndex) => (
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
              <LineChart data={mentoringHoursChartDataPoints} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="#E5E7EB" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#6B7280" }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip
                  formatter={(chartValue) => {
                    const tooltipMinutes = Math.round(Number(chartValue || 0) * 60);
                    const tooltipHours = Math.floor(tooltipMinutes / 60);
                    const tooltipMinsRemainder = tooltipMinutes % 60;
                    if (tooltipMinsRemainder === 0) return `${tooltipHours} hr`;
                    return `${tooltipHours} hr ${tooltipMinsRemainder} mins`;
                  }}
                  labelFormatter={(axisLabel) => `${axisLabel}`}
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

        {/* Specializations from live mentor records (area_of_expertise) */}
        <div className="border rounded-xl p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-base font-medium text-gray-800">Most Represented Specializations</div>
            <div className="text-sm text-gray-500">Top {TOP_SPECIALIZATION_BAR_COUNT}</div>
          </div>
          {topSpecializationBreakdown.length === 0 ? (
            <div className="text-sm text-gray-500">No specialization data yet. Add area of expertise to mentor profiles.</div>
          ) : (
            <div className="space-y-3">
              {topSpecializationBreakdown.map(({ expertiseLabel, mentorCount, barFillPercent }) => (
                <div key={expertiseLabel}>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{expertiseLabel}</span>
                    <span>
                      {mentorCount} mentor{mentorCount === 1 ? "" : "s"}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-[#45C74D] rounded-full transition-[width] duration-300"
                      style={{ width: `${barFillPercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Averages: startups per mentor, sessions per mentor, session length */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickStatGaugeItems.map((gaugeItem) => (
            <div key={gaugeItem.cardTitle} className="border rounded-xl p-4">
              <div className="text-xs text-gray-500 min-h-[30px]">{gaugeItem.cardTitle}</div>
              <div className="mt-2">
                <CircleGauge
                  progress={gaugeItem.ringProgressPercent}
                  value={gaugeItem.centerValue}
                  subtitle={gaugeItem.subtitleUnderRing}
                  total={gaugeItem.totalLine}
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
