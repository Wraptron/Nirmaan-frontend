import React, { useEffect, useMemo, useRef, useState } from "react";
import SideBar from "../../components/sidebar";
import NavBar from "../../components/NavBar";
import filtersvg from "../../assets/images/Filter up and down.svg";
import { ApiFetchStartup } from "../../API/API";
import { FaSpinner } from "react-icons/fa";
import * as XLSX from "xlsx";

/** Omitted from "All Details" export: IDs/name (shown only as Startup Name), logo / image blobs or URLs. */
const EXCLUDED_FROM_ALL_DETAILS_KEYS = new Set(
  [
    "startup_id",
    "id",
    "startup_name",
    "name",
    "ad_logo",
    "logo",
    "logo_image",
    "startup_logo",
    "logo_url",
    "profile_image",
    "image",
    "mentor_logo",
  ].map((k) => k.toLowerCase()),
);

function Reports() {
  const [showw, setShoww] = useState(false);
  const [step, setStep] = useState(1); // 1: Filters, 2: Filtered Start-ups, 3: Select Field to Export
  const [isProgramDropdownOpen, setIsProgramDropdownOpen] = useState(false);
  const [isSectorDropdownOpen, setIsSectorDropdownOpen] = useState(false);
  const [isCohortDropdownOpen, setIsCohortDropdownOpen] = useState(false);
  const programDropdownRef = useRef(null);
  const sectorDropdownRef = useRef(null);
  const cohortDropdownRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [startups, setStartups] = useState([]);
  const programOptions = ["Pratham", "Akshar"];

  const [filters, setFilters] = useState({
    status: "Active",
    sector: [],
    stage: "",
    program: [],
    cohort: [],
    mentor: "",
  });

  const [selectedStartupIds, setSelectedStartupIds] = useState(() => new Set());
  const [step2SearchQuery, setStep2SearchQuery] = useState("");
  const exportFieldOptions = [
    "Email Address",
    "Program",
    "Status",
    "Awards & Recognitions",
    "Founders",
    "Sectors",
    "Stage",
    "Cohort Details",
    "Mentors",
    "Social Links",
    "In Nirmaan Since",
    "About Start-up",
    "Phone Numbers",
    "Team Details",
    "Funding",
  ];
  const [selectedExportFields, setSelectedExportFields] = useState(() => new Set());

  useEffect(() => {
    setShoww(true);

    const fetchStartups = async () => {
      try {
        setLoading(true);
        const res = await ApiFetchStartup();
        const rows = Array.isArray(res?.rows) ? res.rows : [];
        rows.sort((a, b) => (a.startup_id ?? 0) - (b.startup_id ?? 0));
        setStartups(rows);
      } catch (e) {
        console.error("Failed to fetch startups for reports:", e);
        setStartups([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        programDropdownRef.current &&
        !programDropdownRef.current.contains(event.target)
      ) {
        setIsProgramDropdownOpen(false);
      }
      if (
        sectorDropdownRef.current &&
        !sectorDropdownRef.current.contains(event.target)
      ) {
        setIsSectorDropdownOpen(false);
      }
      if (
        cohortDropdownRef.current &&
        !cohortDropdownRef.current.contains(event.target)
      ) {
        setIsCohortDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sectorOptions = useMemo(() => {
    const normalize = (value) =>
      String(value ?? "")
        .replace(/\s+/g, " ")
        .trim();

    return [...new Set(
      startups
        .map((s) => normalize(s.startup_sector ?? s.sector))
        .filter(Boolean),
    )].sort((a, b) => a.localeCompare(b));
  }, [startups]);

  const cohortOptions = useMemo(() => {
    const normalize = (value) =>
      String(value ?? "")
        .replace(/\s+/g, " ")
        .trim();

    return [...new Set(
      startups
        .map((s) => normalize(s.startup_cohort ?? s.cohort))
        .filter(Boolean),
    )].sort((a, b) => a.localeCompare(b));
  }, [startups]);

  const filteredStartups = useMemo(() => {
    const contains = (value, q) =>
      String(value ?? "")
        .toLowerCase()
        .includes(String(q ?? "").toLowerCase());
    const normalize = (value) =>
      String(value ?? "")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();

    const getProgramAliases = (program) => {
      const normalized = normalize(program);
      if (normalized === "pratham" || normalized === "pratha" || normalized === "partham") {
        return ["pratham", "pratha", "partham"];
      }
      return [normalized];
    };

    return startups.filter((s) => {
      const statusOk =
        !filters.status ||
        String(s.startup_status ?? "")
          .toLowerCase()
          .replace(/\s+/g, " ")
          .trim() ===
          String(filters.status)
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();

      const sectorOk =
        !filters.sector.length ||
        filters.sector.some((selectedSector) =>
          contains(s.startup_sector ?? s.sector, selectedSector),
        );
      const stageOk =
        !filters.stage || contains(s.startup_stage ?? s.stage, filters.stage);
      const startupProgramValue =
        s.program ?? s.startup_program ?? s.startupProgram ?? s.scheme;
      const programOk =
        !filters.program.length ||
        filters.program.some((selectedProgram) =>
          getProgramAliases(selectedProgram).some((alias) =>
            contains(startupProgramValue, alias),
          ),
        );
      const cohortOk =
        !filters.cohort.length ||
        filters.cohort.some((selectedCohort) =>
          contains(s.startup_cohort ?? s.cohort, selectedCohort),
        );

      // Backend field may differ; keep it fuzzy for now.
      const mentorOk =
        !filters.mentor ||
        contains(s.mentor_name, filters.mentor) ||
        contains(s.mentor, filters.mentor) ||
        contains(s.mentor_associated, filters.mentor);

      return statusOk && sectorOk && stageOk && programOk && cohortOk && mentorOk;
    });
  }, [startups, filters]);

  /** Step 2 list: filtered start-ups narrowed by name / id / cohort / sector search */
  const startupsVisibleInStep2 = useMemo(() => {
    const q = step2SearchQuery.trim().toLowerCase();
    if (!q) return filteredStartups;

    return filteredStartups.filter((s) => {
      const name = String(s.startup_name || s.name || "").toLowerCase();
      const id = String(s.startup_id ?? s.id ?? "");
      const cohort = String(s.startup_cohort || s.cohort || "").toLowerCase();
      const sector = String(s.startup_sector || s.sector || "").toLowerCase();
      return (
        name.includes(q) ||
        id.toLowerCase().includes(q) ||
        cohort.includes(q) ||
        sector.includes(q)
      );
    });
  }, [filteredStartups, step2SearchQuery]);

  const allVisibleStep2Selected =
    startupsVisibleInStep2.length > 0 &&
    startupsVisibleInStep2.every((s) => selectedStartupIds.has(s.startup_id ?? s.id));

  const activeStepClass = (n) =>
    step >= n ? "bg-[#45C74D] text-white" : "bg-gray-200 text-gray-600";

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      status: "",
      sector: [],
      stage: "",
      program: [],
      cohort: [],
      mentor: "",
    });
  };

  const toggleSector = (sector) => {
    setFilters((prev) => {
      const alreadySelected = prev.sector.includes(sector);
      return {
        ...prev,
        sector: alreadySelected
          ? prev.sector.filter((s) => s !== sector)
          : [...prev.sector, sector],
      };
    });
  };

  const toggleProgram = (program) => {
    setFilters((prev) => {
      const alreadySelected = prev.program.includes(program);
      return {
        ...prev,
        program: alreadySelected
          ? prev.program.filter((p) => p !== program)
          : [...prev.program, program],
      };
    });
  };

  const toggleCohort = (cohort) => {
    setFilters((prev) => {
      const alreadySelected = prev.cohort.includes(cohort);
      return {
        ...prev,
        cohort: alreadySelected
          ? prev.cohort.filter((c) => c !== cohort)
          : [...prev.cohort, cohort],
      };
    });
  };

  const toggleSelected = (startupId) => {
    setSelectedStartupIds((prev) => {
      const next = new Set(prev);
      if (next.has(startupId)) next.delete(startupId);
      else next.add(startupId);
      return next;
    });
  };

  const toggleSelectAllVisibleInStep2 = () => {
    setSelectedStartupIds((prev) => {
      const next = new Set(prev);
      if (allVisibleStep2Selected) {
        startupsVisibleInStep2.forEach((s) => {
          next.delete(s.startup_id ?? s.id);
        });
      } else {
        startupsVisibleInStep2.forEach((s) => {
          next.add(s.startup_id ?? s.id);
        });
      }
      return next;
    });
  };

  const goNext = () => {
    setStep((s) => Math.min(3, s + 1));
  };

  const goBack = () => {
    setStep((s) => Math.max(1, s - 1));
  };

  const toggleExportField = (field) => {
    setSelectedExportFields((prev) => {
      const next = new Set(prev);
      if (next.has(field)) next.delete(field);
      else next.add(field);
      return next;
    });
  };

  const isAllDetailsSelected = selectedExportFields.size === exportFieldOptions.length;

  const toggleAllDetails = () => {
    setSelectedExportFields(
      isAllDetailsSelected ? new Set() : new Set(exportFieldOptions),
    );
  };

  const normalizeText = (value) => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") {
      try {
        return JSON.stringify(value);
      } catch (error) {
        return String(value);
      }
    }
    return String(value);
  };

  const collectKeyValuePairs = (input, parentKey = "") => {
    if (input === null || input === undefined) return [];

    if (Array.isArray(input)) {
      return input.flatMap((item, index) =>
        collectKeyValuePairs(item, parentKey ? `${parentKey}.${index}` : String(index)),
      );
    }

    if (typeof input === "object") {
      return Object.entries(input).flatMap(([key, value]) =>
        collectKeyValuePairs(value, parentKey ? `${parentKey}.${key}` : key),
      );
    }

    return [{ key: parentKey.toLowerCase(), value: input }];
  };

  const firstValueByKeyPatterns = (startup, patterns) => {
    const pairs = collectKeyValuePairs(startup);
    const match = pairs.find(({ key, value }) => {
      const text = normalizeText(value).trim();
      if (!text || text === "-" || text.toLowerCase() === "n/a") return false;
      return patterns.some((pattern) => pattern.test(key));
    });
    return match ? normalizeText(match.value) : "";
  };

  const extractFieldValue = (startup, field) => {
    const fieldGetterMap = {
      "Email Address": () =>
        firstValueByKeyPatterns(startup, [
          /email/,
          /official_email/,
          /founder_email/,
          /contact_email/,
        ]),
      Program: () => startup.program || startup.startup_program || startup.scheme || "",
      Status: () => startup.startup_status || startup.status || "",
      "Awards & Recognitions": () =>
        firstValueByKeyPatterns(startup, [/award/, /recognition/]) ||
        startup.awards_and_recognitions ||
        startup.awards ||
        startup.recognitions ||
        "",
      Founders: () =>
        firstValueByKeyPatterns(startup, [/founder_name/, /founder/, /cofounder/]) ||
        startup.founders ||
        startup.founder_name ||
        startup.founder ||
        "",
      Sectors: () => startup.startup_sector || startup.sector || "",
      Stage: () => startup.startup_stage || startup.stage || "",
      "Cohort Details": () => startup.startup_cohort || startup.cohort || "",
      Mentors: () => startup.mentor_name || startup.mentor || startup.mentor_associated || "",
      "Social Links": () =>
        firstValueByKeyPatterns(startup, [/website/, /linkedin/, /social/, /twitter/, /instagram/]) ||
        startup.social_links ||
        startup.social_link ||
        startup.website ||
        "",
      "In Nirmaan Since": () => startup.in_nirmaan_since || startup.nirmaan_since || "",
      "About Start-up": () => startup.about_startup || startup.about || startup.description || "",
      "Phone Numbers": () =>
        firstValueByKeyPatterns(startup, [
          /official_contact_number/,
          /contact_number/,
          /phone/,
          /mobile/,
          /founder_number/,
          /contact_num/,
        ]) ||
        startup.phone ||
        startup.phone_number ||
        startup.contact_number ||
        startup.mobile ||
        "",
      "Team Details": () => startup.team_details || startup.team || "",
      Funding: () => startup.funding || startup.funding_raised || "",
    };

    return normalizeText(fieldGetterMap[field]?.() ?? "");
  };

  const handleGenerateReport = () => {
    const byId = new Map();
    filteredStartups.forEach((s) => {
      const id = s.startup_id ?? s.id;
      if (id != null && selectedStartupIds.has(id) && !byId.has(id)) {
        byId.set(id, s);
      }
    });
    const selectedStartups = [...byId.values()];

    if (!selectedStartups.length || selectedExportFields.size === 0) return;

    const rows = selectedStartups.map((startup) => {
      const baseRow = {
        "Startup Name": startup.startup_name || startup.name || "",
      };

      if (isAllDetailsSelected) {
        const extras = Object.entries(startup)
          .filter(
            ([key]) => !EXCLUDED_FROM_ALL_DETAILS_KEYS.has(String(key).toLowerCase()),
          )
          .sort(([a], [b]) => a.localeCompare(b))
          .reduce((acc, [key, value]) => {
            acc[key] = normalizeText(value);
            return acc;
          }, {});
        return { ...baseRow, ...extras };
      }

      const selectedFieldRows = {};
      selectedExportFields.forEach((field) => {
        selectedFieldRows[field] = extractFieldValue(startup, field);
      });
      return { ...baseRow, ...selectedFieldRows };
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Startups Report");
    const fileName = `startup-report-${new Date().toISOString().slice(0, 10)}.xlsx`;
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="flex">
        <div>
            <SideBar />
        </div>
        <div id="" className="ms-[221px] flex-grow">
            <NavBar />
            <div className="bg-gray-100">
                <div className={`mx-10 py-5  content ${showw ? "visible": ""}`}>
                           <div className="bg-white rounded-lg shadow-sm p-3">
                                        <div className="text-sm text-[#808080]">Dashboard {'>'} Reports</div>
                                        <div className="mt-3 font-semibold text-lg">Generate Start-ups Reports</div>
                                        <div className="border border-l-0 border-b-0 border-r-0 mt-4">
                                                <div className="mt-10 mx-auto max-w-[860px] px-6">
                                                  <div className="relative">
                                                    <div className="absolute left-7 right-7 top-3 h-1 rounded-full bg-gray-200" />
                                                    <div
                                                      className={`absolute left-7 top-3 h-1 rounded-full bg-[#45C74D] transition-all duration-300 ${
                                                        step === 1 ? "w-0" : step === 2 ? "w-[calc(50%-1.75rem)]" : "w-[calc(100%-3.5rem)]"
                                                      }`}
                                                    />

                                                    <div className="relative grid grid-cols-3 items-start">
                                                      <div className="flex flex-col items-center">
                                                        <span
                                                          className={`${activeStepClass(1)} w-8 h-8 rounded-full text-base font-semibold flex items-center justify-center`}
                                                        >
                                                          1
                                                        </span>
                                                        <div className={`mt-4 text-[14px] leading-none font-medium whitespace-nowrap ${step >= 1 ? "text-[#45C74D]" : "text-gray-500"}`}>
                                                          Filters
                                                        </div>
                                                      </div>

                                                      <div className="flex flex-col items-center">
                                                        <span
                                                          className={`${activeStepClass(2)} w-8 h-8 rounded-full text-base font-semibold flex items-center justify-center`}
                                                        >
                                                          2
                                                        </span>
                                                        <div className={`mt-4 text-[14px] leading-none font-medium whitespace-nowrap ${step >= 2 ? "text-[#45C74D]" : "text-gray-500"}`}>
                                                          Filtered Start-ups
                                                        </div>
                                                      </div>

                                                      <div className="flex flex-col items-center">
                                                        <span
                                                          className={`${activeStepClass(3)} w-8 h-8 rounded-full text-base font-semibold flex items-center justify-center`}
                                                        >
                                                          3
                                                        </span>
                                                        <div className={`mt-4 text-[14px] leading-none font-medium whitespace-nowrap ${step >= 3 ? "text-[#45C74D]" : "text-gray-500"}`}>
                                                          Select Field To Export
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </div>
                                        </div>
                                        {loading ? (
                                          <div className="flex items-center justify-center py-16 gap-3 text-gray-600">
                                            <FaSpinner className="animate-spin text-xl text-[#45C74D]" />
                                            <div>Loading start-ups…</div>
                                          </div>
                                        ) : (
                                          <>
                                            {step === 1 && (
                                              <>
                                                <div className="flex gap-2 mt-5">
                                                        <div><img src={filtersvg} alt="" /></div>
                                                        <div>Filter by</div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                        <div className="p-2">
                                                            <div className='font-semibold text-sm'>Status</div>
                                                            <div className="flex justify-between mt-5">
                                                                    <label className="gap-3 flex cursor-pointer">
                                                                            <input
                                                                              type="radio"
                                                                              name="status"
                                                                              className="mt-1"
                                                                              checked={filters.status === "Active"}
                                                                              onChange={() => updateFilter("status", "Active")}
                                                                            />
                                                                            <span>Active</span>
                                                                    </label>
                                                                    <label className="gap-3 flex cursor-pointer">
                                                                            <input
                                                                              type="radio"
                                                                              name="status"
                                                                              className="mt-1"
                                                                              checked={filters.status === "Graduated"}
                                                                              onChange={() => updateFilter("status", "Graduated")}
                                                                            />
                                                                            <span>Graduated</span>
                                                                    </label>
                                                                    <label className="gap-3 flex cursor-pointer">
                                                                            <input
                                                                              type="radio"
                                                                              name="status"
                                                                              className="mt-1"
                                                                              checked={filters.status === "Dropped Out" || filters.status === "Dropped out"}
                                                                              onChange={() => updateFilter("status", "Dropped Out")}
                                                                            />
                                                                            <span>Dropped out</span>
                                                                    </label>
                                                            </div>
                                                            <div className="mt-7">
                                                                    <div>Sector</div>
                                                                    <div className="mt-2 relative" ref={sectorDropdownRef}>
                                                                      <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                          setIsSectorDropdownOpen((prev) => !prev)
                                                                        }
                                                                        className="w-full min-h-[42px] p-2 text-sm text-left text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] flex items-center justify-between gap-2"
                                                                      >
                                                                        <div className="flex flex-wrap gap-2">
                                                                          {filters.sector.length > 0 ? (
                                                                            filters.sector.map((sector) => (
                                                                              <span
                                                                                key={sector}
                                                                                className="inline-flex items-center gap-1 bg-[#45C74D] text-white text-xs px-2 py-1 rounded-full"
                                                                              >
                                                                                {sector}
                                                                                <span
                                                                                  role="button"
                                                                                  tabIndex={0}
                                                                                  onClick={(e) => {
                                                                                    e.stopPropagation();
                                                                                    toggleSector(sector);
                                                                                  }}
                                                                                  onKeyDown={(e) => {
                                                                                    if (e.key === "Enter" || e.key === " ") {
                                                                                      e.preventDefault();
                                                                                      e.stopPropagation();
                                                                                      toggleSector(sector);
                                                                                    }
                                                                                  }}
                                                                                  className="font-bold leading-none cursor-pointer"
                                                                                >
                                                                                  ×
                                                                                </span>
                                                                              </span>
                                                                            ))
                                                                          ) : (
                                                                            <span className="text-gray-400">Select Sector</span>
                                                                          )}
                                                                        </div>
                                                                        <span className="text-gray-500 text-xs">▼</span>
                                                                      </button>

                                                                      {isSectorDropdownOpen && (
                                                                        <div className="absolute z-20 mt-1 w-full max-h-52 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md py-1">
                                                                          {sectorOptions.length === 0 ? (
                                                                            <div className="px-3 py-2 text-sm text-gray-500">
                                                                              No sectors found
                                                                            </div>
                                                                          ) : (
                                                                            sectorOptions.map((option) => (
                                                                              <label
                                                                                key={option}
                                                                                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                                                                              >
                                                                                <input
                                                                                  type="checkbox"
                                                                                  checked={filters.sector.includes(option)}
                                                                                  onChange={() => toggleSector(option)}
                                                                                  className="accent-[#45C74D]"
                                                                                />
                                                                                <span>{option}</span>
                                                                              </label>
                                                                            ))
                                                                          )}
                                                                        </div>
                                                                      )}
                                                                    </div>
                                                            </div>
                                                            <div className="mt-7">
                                                                    <div>Stage</div>
                                                                    <div className="mt-2">
                                                                      <input
                                                                        value={filters.stage}
                                                                        onChange={(e) => updateFilter("stage", e.target.value)}
                                                                        type="text"
                                                                        placeholder="e.g. MVP"
                                                                        className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                                                                      />
                                                                    </div>
                                                            </div>
                                                        </div>
                                                        <div className="p-2">
                                                            <div className="font-semibold text-sm ">Program</div>
                                                            <div className="mt-2 relative" ref={programDropdownRef}>
                                                              <button
                                                                type="button"
                                                                onClick={() =>
                                                                  setIsProgramDropdownOpen((prev) => !prev)
                                                                }
                                                                className="w-full min-h-[42px] p-2 text-sm text-left text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] flex items-center justify-between gap-2"
                                                              >
                                                                <div className="flex flex-wrap gap-2">
                                                                  {filters.program.length > 0 ? (
                                                                    filters.program.map((program) => (
                                                                      <span
                                                                        key={program}
                                                                        className="inline-flex items-center gap-1 bg-[#45C74D] text-white text-xs px-2 py-1 rounded-full"
                                                                      >
                                                                        {program}
                                                                        <span
                                                                          role="button"
                                                                          tabIndex={0}
                                                                          onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            toggleProgram(program);
                                                                          }}
                                                                          onKeyDown={(e) => {
                                                                            if (e.key === "Enter" || e.key === " ") {
                                                                              e.preventDefault();
                                                                              e.stopPropagation();
                                                                              toggleProgram(program);
                                                                            }
                                                                          }}
                                                                          className="font-bold leading-none cursor-pointer"
                                                                        >
                                                                          ×
                                                                        </span>
                                                                      </span>
                                                                    ))
                                                                  ) : (
                                                                    <span className="text-gray-400">Select Program</span>
                                                                  )}
                                                                </div>
                                                                <span className="text-gray-500 text-xs">▼</span>
                                                              </button>

                                                              {isProgramDropdownOpen && (
                                                                <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md py-1">
                                                                  {programOptions.map((option) => (
                                                                    <label
                                                                      key={option}
                                                                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                                                                    >
                                                                      <input
                                                                        type="checkbox"
                                                                        checked={filters.program.includes(option)}
                                                                        onChange={() => toggleProgram(option)}
                                                                        className="accent-[#45C74D]"
                                                                      />
                                                                      <span>{option}</span>
                                                                    </label>
                                                                  ))}
                                                                </div>
                                                              )}
                                                            </div>
                                                            <div className="mt-7">
                                                                <div>Cohort</div>
                                                                <div className="mt-2 relative" ref={cohortDropdownRef}>
                                                                  <button
                                                                    type="button"
                                                                    onClick={() =>
                                                                      setIsCohortDropdownOpen((prev) => !prev)
                                                                    }
                                                                    className="w-full min-h-[42px] p-2 text-sm text-left text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D] flex items-center justify-between gap-2"
                                                                  >
                                                                    <div className="flex flex-wrap gap-2">
                                                                      {filters.cohort.length > 0 ? (
                                                                        filters.cohort.map((cohort) => (
                                                                          <span
                                                                            key={cohort}
                                                                            className="inline-flex items-center gap-1 bg-[#45C74D] text-white text-xs px-2 py-1 rounded-full"
                                                                          >
                                                                            {cohort}
                                                                            <span
                                                                              role="button"
                                                                              tabIndex={0}
                                                                              onClick={(e) => {
                                                                                e.stopPropagation();
                                                                                toggleCohort(cohort);
                                                                              }}
                                                                              onKeyDown={(e) => {
                                                                                if (e.key === "Enter" || e.key === " ") {
                                                                                  e.preventDefault();
                                                                                  e.stopPropagation();
                                                                                  toggleCohort(cohort);
                                                                                }
                                                                              }}
                                                                              className="font-bold leading-none cursor-pointer"
                                                                            >
                                                                              ×
                                                                            </span>
                                                                          </span>
                                                                        ))
                                                                      ) : (
                                                                        <span className="text-gray-400">Select Cohort</span>
                                                                      )}
                                                                    </div>
                                                                    <span className="text-gray-500 text-xs">▼</span>
                                                                  </button>

                                                                  {isCohortDropdownOpen && (
                                                                    <div className="absolute z-20 mt-1 w-full max-h-52 overflow-auto bg-white border border-gray-200 rounded-lg shadow-md py-1">
                                                                      {cohortOptions.length === 0 ? (
                                                                        <div className="px-3 py-2 text-sm text-gray-500">
                                                                          No cohorts found
                                                                        </div>
                                                                      ) : (
                                                                        cohortOptions.map((option) => (
                                                                          <label
                                                                            key={option}
                                                                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm"
                                                                          >
                                                                            <input
                                                                              type="checkbox"
                                                                              checked={filters.cohort.includes(option)}
                                                                              onChange={() => toggleCohort(option)}
                                                                              className="accent-[#45C74D]"
                                                                            />
                                                                            <span>{option}</span>
                                                                          </label>
                                                                        ))
                                                                      )}
                                                                    </div>
                                                                  )}
                                                                </div>
                                                            </div>
                                                            <div className="mt-7">
                                                                <div>Mentors Associated</div>
                                                                <div className="mt-2">
                                                                  <input
                                                                    value={filters.mentor}
                                                                    onChange={(e) => updateFilter("mentor", e.target.value)}
                                                                    type="text"
                                                                    placeholder="Mentor name"
                                                                    className="block w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                                                                  />
                                                                </div>
                                                            </div>
                                                        </div>
                                                </div>
                                                <div className="grid grid-cols-2 mt-5 items-center">
                                                        <button
                                                          type="button"
                                                          onClick={clearFilters}
                                                          className="underline text-sm text-[#45C74D] text-left"
                                                        >
                                                          Clear Filter
                                                        </button>
                                                        <div className="flex justify-end">
                                                          <button
                                                            type="button"
                                                            onClick={goNext}
                                                            className="px-6 bg-[#45C74D] rounded-lg text-white py-2 flex justify-center item-center text-sm"
                                                          >
                                                            Next
                                                          </button>
                                                        </div>
                                                </div>
                                              </>
                                            )}

                                            {step === 2 && (
                                              <>
                                                <div className="mt-6 font-semibold text-sm text-gray-700">
                                                  Filtered Start-ups
                                                </div>
                                                <div className="mt-2 text-sm text-[#45C74D] flex items-center gap-2 flex-wrap">
                                                  <span className="inline-block w-2 h-2 rounded-full bg-[#45C74D]" />
                                                  {filteredStartups.length} Start-ups Found
                                                  <span className="text-gray-500">|</span>
                                                  <span className="text-gray-600">
                                                    Showing {startupsVisibleInStep2.length}
                                                    {step2SearchQuery.trim() ? " (search)" : ""}
                                                  </span>
                                                  <span className="text-gray-500">|</span>
                                                  <span className="text-gray-600">
                                                    {selectedStartupIds.size} Selected
                                                  </span>
                                                </div>

                                                {filteredStartups.length === 0 ? (
                                                  <div className="py-14 text-center text-gray-500">
                                                    No start-ups match your filters.
                                                  </div>
                                                ) : (
                                                  <>
                                                    <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
                                                      <input
                                                        type="search"
                                                        value={step2SearchQuery}
                                                        onChange={(e) => setStep2SearchQuery(e.target.value)}
                                                        placeholder="Search start-up by name, ID, cohort, or sector…"
                                                        className="flex-1 min-w-0 max-w-xl p-2.5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#45C74D] focus:border-[#45C74D]"
                                                      />
                                                      <button
                                                        type="button"
                                                        onClick={toggleSelectAllVisibleInStep2}
                                                        disabled={startupsVisibleInStep2.length === 0}
                                                        className="shrink-0 px-5 py-2.5 text-sm font-medium rounded-lg border border-[#45C74D] text-[#45C74D] hover:bg-[#45C74D]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                                                      >
                                                        {allVisibleStep2Selected
                                                          ? "Deselect all"
                                                          : "Select all"}
                                                      </button>
                                                    </div>

                                                    {startupsVisibleInStep2.length === 0 ? (
                                                      <div className="py-12 text-center text-gray-500 text-sm">
                                                        No start-ups match your search. Try a different term.
                                                      </div>
                                                    ) : (
                                                  <div className="grid grid-cols-4 gap-4 mt-4">
                                                    {startupsVisibleInStep2.map((s) => {
                                                      const id = s.startup_id ?? s.id;
                                                      const checked = selectedStartupIds.has(id);
                                                      return (
                                                        <button
                                                          key={id}
                                                          type="button"
                                                          onClick={() => toggleSelected(id)}
                                                          className="border rounded-lg p-3 flex items-center gap-3 hover:shadow-sm transition bg-white text-left"
                                                        >
                                                          <div className="flex-shrink-0">
                                                            <span
                                                              className={`inline-flex items-center justify-center w-5 h-5 rounded-md border ${
                                                                checked
                                                                  ? "bg-[#45C74D] border-[#45C74D] text-white"
                                                                  : "bg-white border-gray-300 text-transparent"
                                                              }`}
                                                            >
                                                              ✓
                                                            </span>
                                                          </div>
                                                          <div className="min-w-0">
                                                            <div className="text-sm font-semibold text-gray-800 truncate">
                                                              {s.startup_name || "Start-up Name"}
                                                            </div>
                                                            <div className="text-xs text-gray-500 truncate">
                                                              {s.startup_cohort || s.program || "—"}
                                                            </div>
                                                          </div>
                                                        </button>
                                                      );
                                                    })}
                                                  </div>
                                                    )}
                                                  </>
                                                )}

                                                <div className="flex justify-center gap-4 mt-8">
                                                  <button
                                                    type="button"
                                                    onClick={goBack}
                                                    className="px-6 border border-gray-300 rounded-lg text-gray-700 py-2 text-sm"
                                                  >
                                                    Back
                                                  </button>
                                                  <button
                                                    type="button"
                                                    onClick={goNext}
                                                    disabled={selectedStartupIds.size === 0}
                                                    className="px-6 bg-[#45C74D] rounded-lg text-white py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                  >
                                                    Next
                                                  </button>
                                                </div>
                                              </>
                                            )}

                                            {step === 3 && (
                                              <>
                                                <div className="mt-6 font-semibold text-sm text-gray-700">
                                                  Select Field To Export
                                                </div>
                                                <div className="mt-2 text-sm text-gray-600 mb-5">
                                                  Selected start-ups:{" "}
                                                  <span className="font-semibold">{selectedStartupIds.size}</span>
                                                </div>

                                                <div className="grid grid-cols-4 gap-y-6 gap-x-8">
                                                  <label className="flex items-center gap-3 cursor-pointer text-sm text-gray-700">
                                                    <input
                                                      type="checkbox"
                                                      checked={isAllDetailsSelected}
                                                      onChange={toggleAllDetails}
                                                      className="accent-[#45C74D] h-4 w-4"
                                                    />
                                                    <span>All Details</span>
                                                  </label>
                                                  {exportFieldOptions.map((field) => (
                                                    <label
                                                      key={field}
                                                      className="flex items-center gap-3 cursor-pointer text-sm text-gray-700"
                                                    >
                                                      <input
                                                        type="checkbox"
                                                        checked={selectedExportFields.has(field)}
                                                        onChange={() => toggleExportField(field)}
                                                        className="accent-[#45C74D] h-4 w-4"
                                                      />
                                                      <span>{field}</span>
                                                    </label>
                                                  ))}
                                                </div>

                                                <div className="flex justify-center gap-4 mt-8">
                                                  <button
                                                    type="button"
                                                    onClick={goBack}
                                                    className="px-6 border border-gray-300 rounded-lg text-gray-700 py-2 text-sm"
                                                  >
                                                    Back
                                                  </button>
                                                  <button
                                                    type="button"
                                                    disabled={selectedExportFields.size === 0}
                                                    onClick={handleGenerateReport}
                                                    className="px-6 bg-[#45C74D] rounded-lg text-white py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                                  >
                                                    Generate Report
                                                  </button>
                                                </div>
                                              </>
                                            )}
                                          </>
                                        )}
                           </div>   
                </div>  
            </div>
        </div>
    </div>
  )
}
export default Reports