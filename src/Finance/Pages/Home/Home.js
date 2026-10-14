import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../Components/Sidebar";
import { SkeletonLoader } from "../../../components/SkeletonLoader";
import {
  ApiFetchFunding,
  ApiFetchFundingProject,
  ApiFetchFundingProjectData,
} from "../../../API/API";
import ProjectFundingDetail from "../Startup/ProjectFundingDetails";
import Navbar from "../../Components/Navbar";
import AddFundingWallet from "../Startup/AddFundingWallet";
import AddFunding from "../../../pages/Home/Funding/AddFunding";
// import { MdViewModule } from "react-icons/md";
// import { BsListUl } from "react-icons/bs";
import { Landmark, Scale, Wallet } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../../../components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

function wrapProjectName(name) {
  const words = String(name || "").split(" ");
  const lines = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 18 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines;
}

function ProjectAxisTick({ x, y, payload }) {
  const lines = wrapProjectName(payload?.value);

  return (
    <g transform={`translate(${x},${y})`}>
      <text textAnchor="middle" fill="#64748b" fontSize={11}>
        {lines.map((line, index) => (
          <tspan key={`${line}-${index}`} x={0} dy={index === 0 ? 14 : 14}>
            {line}
          </tspan>
        ))}
      </text>
    </g>
  );
}

function FundingBar(props) {
  const { x, y, width, height, fill, payload, dataKey, index = 0, animate } = props;
  const value = Number(payload?.[dataKey] || 0);
  if (!value || width <= 0) return null;

  const minHeight = 12;
  const drawnHeight = Math.max(Math.abs(height), minHeight);
  const drawnY = value > 0 ? y + height - drawnHeight : y;

  return (
    <rect
      x={x}
      y={drawnY}
      width={width}
      height={drawnHeight}
      fill={fill}
      rx={4}
      ry={4}
      style={
        animate
          ? {
              transformBox: "fill-box",
              transformOrigin: "bottom",
              animation: "funding-bar-rise 900ms cubic-bezier(0.22, 1, 0.36, 1) both",
              animationDelay: `${index * 45}ms`,
            }
          : undefined
      }
    />
  );
}

function formatINR(value) {
  return `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

function CountUpAmount({ value, className }) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);

  useEffect(() => {
    const target = Number(value || 0);
    const from = fromRef.current;
    if (from === target) {
      setDisplay(target);
      return undefined;
    }

    const duration = 900;
    const start = performance.now();
    let frame = 0;

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setDisplay(Math.round(from + (target - from) * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value]);

  return <div className={className}>{formatINR(display)}</div>;
}

function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animateBars, setAnimateBars] = useState(true);
  const [showw, setShoww] = useState(false);
  const [funding, setFunding] = useState({});
  // const [viewMode, setViewMode] = useState("card");
  const [fundingSummary, setFundingSummary] = useState({});
  const [selectedproject, setSelectedProject] = useState(null);
  const [showFundingModal, setShowFundingModal] = useState(false);
  const [showFundingWalletForm, setShowFundingWalletForm] = useState(false);
  const [showStartupFundingForm, setShowStartupFundingForm] = useState(false);
  const handleFundingWalletClick = () => setShowFundingWalletForm(true);
  const handleFundingWalletClose = () => setShowFundingWalletForm(false);
  const handleStartupFundingClick = () => setShowStartupFundingForm(true);
  const handleStartupFundingClose = () => setShowStartupFundingForm(false);
  const handleFundingModalClose = () => setShowFundingModal(false);

  const projectsDetail = [
    {
      name: "Nirmaan Seed Funding",
      id: "SB1920497ALUMCIEHOC",
    },
    { name: "Shankar Endownment Fund", id: "SB25260212CPALUMCIEHOC" },
    { name: "Nirmaan External", id: "CR23241466CPAAAACIEHOC" },
    { name: "AI for Healthcare", id: "SB21220983CPIITMCIEHOC" },
    { name: "UGFIR", id: "SB20210439CPIITMCIEHOC" },
    { name: "PGFIR", id: "SB1920720CPIITMCIEHOC" },
    { name: "Nirmaan the Pre-Incubator", id: "LM23242568MEIITMMEHOLX" },
    {
      name: "Amex Program for Innovation & Entrepreneurship",
      id: "CR/24-25/1670/ME/AMEX/008469",
    },
  ];

  useEffect(() => {
    setShoww(true);
  }, []);


  const FetchData = async () => {
    try {
      const fundingcount = await ApiFetchFundingProject();
      const totalfunding = fundingcount || {};
      setFunding(totalfunding);
      setIsLoaded(true);
    } catch (err) {
      console.log(err);
    }
  };

  const FundingSummary = (projectRows, startupRows = []) => {
    const summary = {};

    const ensure = (name) => {
      const projectName = String(name || "").trim();
      if (!projectName) return null;
      if (!summary[projectName]) {
        summary[projectName] = { disbursed: 0, utilized: 0 };
      }
      return summary[projectName];
    };

    projectRows.forEach((item) => {
      const bucket = ensure(item.project_name);
      if (!bucket) return;

      if (item.funding_type === "Funding Disbursed") {
        bucket.disbursed += Number(item.amount || 0);
      }

      if (item.funding_type === "Funding Utilized") {
        bucket.utilized += Number(item.amount || 0);
      }
    });

    startupRows.forEach((item) => {
      if (item.funding_type !== "Funding Disbursed") return;
      const bucket = ensure(item.project_name);
      if (!bucket) return;
      bucket.utilized += Number(item.amount || 0);
    });

    return summary;
  };

  const fetchFundingSummary = async () => {
    try {
      const [projectRes, startupRes] = await Promise.all([
        ApiFetchFundingProjectData(),
        ApiFetchFunding(),
      ]);
      const projectRows = projectRes?.rows || [];
      const startupRows = startupRes?.rows || [];
      setFundingSummary(FundingSummary(projectRows, startupRows));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      FetchData();
      fetchFundingSummary();
    }, 2000);
  }, []);

  useEffect(() => {
    if (!isLoaded) return undefined;
    const timer = setTimeout(() => setAnimateBars(false), 1500);
    return () => clearTimeout(timer);
  }, [isLoaded]);

  const amountTotals = projectsDetail.reduce(
    (totals, project) => {
      const disbursed = Number(fundingSummary[project.name]?.disbursed || 0);
      const utilized = Number(fundingSummary[project.name]?.utilized || 0);
      totals.overall += disbursed;
      totals.allocated += utilized;
      return totals;
    },
    { overall: 0, allocated: 0 }
  );
  const balanceAmount = amountTotals.overall - amountTotals.allocated;

  const projectChartData = projectsDetail.map((project) => {
    const allocated = Number(fundingSummary[project.name]?.disbursed || 0);
    const utilized = Number(fundingSummary[project.name]?.utilized || 0);
    return {
      project: project.name,
      allocated,
      utilized,
      balance: allocated - utilized,
    };
  });

  const projectChartConfig = {
    allocated: { label: "Allocated", color: "#45C74D" },
    utilized: { label: "Utilized", color: "#EF4444" },
    balance: { label: "Balance", color: "#1D4ED8" },
  };

  const handleNavbarSelection = (index) => {
    setSelectedIndex(index);
  };

  const handleFundingModalClick = (project) => {
    FetchData();
    setShowFundingModal(true);
    setSelectedProject(project);
    setShowFundingModal(true);
  };
  return (
    <div className="flex ">
      <div className="">
        <SideBar />
      </div>
      <div className="ml-[221px] flex-grow">
        <div>
          <Navbar
            onSelectionChange={handleNavbarSelection}
            selectedIndex={selectedIndex}
          />
        </div>
        <div className="bg-gray-100 flex-grow overflow-y-auto">
          {selectedIndex === 0 && (
            <div className={`px-10 py-5 content ${showw ? "visible" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  {
                    label: "Overall amount",
                    value: amountTotals.overall,
                    icon: Landmark,
                    valueClass: "text-[#45C74D]",
                    iconWrap: "bg-[#45C74D]/10 text-[#45C74D]",
                  },
                  {
                    label: "Allocated amount",
                    value: amountTotals.allocated,
                    icon: Wallet,
                    valueClass: "text-red-500",
                    iconWrap: "bg-red-50 text-red-500",
                  },
                  {
                    label: "Balance amount",
                    value: balanceAmount,
                    icon: Scale,
                    valueClass: "text-green-600",
                    iconWrap: "bg-green-50 text-green-600",
                  },
                ].map(({ label, value, icon: Icon, valueClass, iconWrap }) => (
                  <Card key={label} className="shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {label}
                      </CardTitle>
                      <span
                        className={`flex h-8 w-8 items-center justify-center rounded-md ${iconWrap}`}
                      >
                        <Icon className="h-4 w-4" />
                      </span>
                    </CardHeader>
                    <CardContent>
                      {isLoaded ? (
                        <CountUpAmount
                          value={value}
                          className={`text-2xl font-semibold tracking-tight tabular-nums ${valueClass}`}
                        />
                      ) : (
                        <div className="h-8 w-40 animate-pulse rounded-md bg-muted" />
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="mb-6 shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Project funding comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoaded ? (
                    <ChartContainer
                      config={projectChartConfig}
                      className="h-[460px] w-full"
                    >
                      <BarChart
                        data={projectChartData}
                        margin={{ top: 12, right: 12, left: 12, bottom: 8 }}
                        barGap={6}
                        barCategoryGap="22%"
                      >
                        <CartesianGrid
                          vertical={false}
                          strokeDasharray="3 3"
                          stroke="#E5E7EB"
                        />
                        <XAxis
                          dataKey="project"
                          axisLine={false}
                          tickLine={false}
                          interval={0}
                          height={78}
                          tick={<ProjectAxisTick />}
                        />
                        <YAxis hide />
                        <ChartTooltip
                          cursor={{ fill: "rgba(69, 199, 77, 0.08)" }}
                          content={
                            <ChartTooltipContent
                              formatter={(value) => formatINR(value)}
                            />
                          }
                        />
                        <ChartLegend content={<ChartLegendContent />} />
                        <Bar
                          dataKey="allocated"
                          fill="var(--color-allocated)"
                          shape={(bar) => (
                            <FundingBar {...bar} animate={animateBars} />
                          )}
                          maxBarSize={26}
                          isAnimationActive={false}
                        />
                        <Bar
                          dataKey="utilized"
                          fill="var(--color-utilized)"
                          shape={(bar) => (
                            <FundingBar {...bar} animate={animateBars} />
                          )}
                          maxBarSize={26}
                          isAnimationActive={false}
                        />
                        <Bar
                          dataKey="balance"
                          fill="var(--color-balance)"
                          shape={(bar) => (
                            <FundingBar {...bar} animate={animateBars} />
                          )}
                          maxBarSize={26}
                          isAnimationActive={false}
                        />
                      </BarChart>
                    </ChartContainer>
                  ) : (
                    <div className="h-[460px] animate-pulse rounded-lg bg-muted" />
                  )}
                </CardContent>
              </Card>
              <div className="grid grid-cols-2 gap-5 mb-8 w-full ">
                <div className="border bg-white  rounded-xl col-span-2 ">
                  <div className="py-2 px-7 text-xl underline underline-offset-[13px] decoration-gray-200 ">
                    Funding Dashboard
                  </div>
                  {/* <div className="py-2 px-7 text-lg ">Overview</div> */}
                  <div className="flex flex-wrap items-center justify-between gap-3 py-2 px-7">
                    <div className="text-2xl text-[#45C74D]">Nirmaan</div>
                    <div className="flex flex-wrap items-center gap-3">
                      <button
                        className="bg-[#45C74D] text-white px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#36a03d] transition"
                        onClick={handleFundingWalletClick}
                      >
                        Add funding to wallet
                      </button>
                      <button
                        className="bg-white text-[#45C74D] border border-[#45C74D] px-5 py-2 rounded-lg text-base font-semibold shadow hover:bg-[#45C74D] hover:text-white transition"
                        onClick={handleStartupFundingClick}
                      >
                        Add funding to startup
                      </button>
                      {/* Card / list toggle commented out — list view only
                      <div className="flex gap-2 border border-gray-300 rounded-lg p-1 bg-white">
                        <button
                          type="button"
                          onClick={() => setViewMode("card")}
                          className={`p-2 rounded transition-all ${
                            viewMode === "card"
                              ? "bg-[#45C74D] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          title="Card View"
                        >
                          <MdViewModule />
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode("list")}
                          className={`p-2 rounded transition-all ${
                            viewMode === "list"
                              ? "bg-[#45C74D] text-white"
                              : "text-gray-600 hover:bg-gray-100"
                          }`}
                          title="List View"
                        >
                          <BsListUl />
                        </button>
                      </div>
                      */}
                    </div>
                  </div>

                  {/* Card view commented out
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-7 py-2">
                    {projectsDetail.map((project, index) => {
                      const disbursed =
                        fundingSummary[project.name]?.disbursed || 0;
                      const utilized =
                        fundingSummary[project.name]?.utilized || 0;
                      const balance = disbursed - utilized;

                      return (
                        <div
                          key={project.id || index}
                          className="shadow-md border border-sm rounded-lg p-3 min-w-[220px]"
                        >
                          <div className="text-center">
                            <div className="text-xs text-gray-500">
                              Total Amount
                            </div>
                            <div className="text-2xl font-semibold">
                              {isLoaded ? (
                                <>{formatINR(disbursed)}</>
                              ) : (
                                <SkeletonLoader />
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between mt-3">
                            <div>
                              <div className="text-sm text-gray-500">
                                Fund Utilized
                              </div>
                              <div className="text-sm font-medium text-red-500">
                                {formatINR(utilized)}
                              </div>
                            </div>

                            <div className="text-right">
                              <div className="text-sm text-gray-500">
                                Balance
                              </div>
                              <div className="text-sm font-semibold text-green-600">
                                {formatINR(balance)}
                              </div>
                            </div>
                          </div>

                          <div className="mt-1 text-center font-medium">
                            <div className="text-lg">{project.name}</div>
                          </div>

                          <div className="flex gap-1 text-sm justify-center">
                            <div>ID -</div>
                            <div className="text-[#45C74D]">{project.id}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  */}
                    <div className="px-7 pb-6 overflow-x-auto">
                      <table className="min-w-full border-collapse text-left text-sm">
                        <thead>
                          <tr className="border-b border-gray-200 bg-gray-50 text-gray-600">
                            <th className="py-3 px-4 font-semibold">
                              Project name
                            </th>
                            <th className="py-3 px-4 font-semibold">Project ID</th>
                            <th className="py-3 px-4 font-semibold text-right">
                              Total disbursed
                            </th>
                            <th className="py-3 px-4 font-semibold text-right">
                              Fund utilized
                            </th>
                            <th className="py-3 px-4 font-semibold text-right">
                              Balance
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {projectsDetail.map((project, index) => {
                            const disbursed =
                              fundingSummary[project.name]?.disbursed || 0;
                            const utilized =
                              fundingSummary[project.name]?.utilized || 0;
                            const balance = disbursed - utilized;

                            return (
                              <tr
                                key={project.id || index}
                                className="border-b border-gray-100 hover:bg-gray-50/80"
                              >
                                <td className="py-3 px-4 font-medium text-gray-900 max-w-[280px]">
                                  {project.name}
                                </td>
                                <td className="py-3 px-4 text-[#45C74D] font-mono text-xs whitespace-nowrap">
                                  {project.id}
                                </td>
                                <td className="py-3 px-4 text-right font-medium tabular-nums">
                                  {isLoaded ? (
                                    formatINR(disbursed)
                                  ) : (
                                    <SkeletonLoader />
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right font-medium text-red-600 tabular-nums">
                                  {isLoaded ? (
                                    formatINR(utilized)
                                  ) : (
                                    <SkeletonLoader />
                                  )}
                                </td>
                                <td className="py-3 px-4 text-right font-semibold text-green-600 tabular-nums">
                                  {isLoaded ? (
                                    formatINR(balance)
                                  ) : (
                                    <SkeletonLoader />
                                  )}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {showFundingModal && (
        <ProjectFundingDetail
          onClose={handleFundingModalClose}
          selectedProject={selectedproject}
        />
      )}
      {showFundingWalletForm && (
        <AddFundingWallet
          onClose={handleFundingWalletClose}
          onSuccess={fetchFundingSummary}
        />
      )}
      {showStartupFundingForm && (
        <AddFunding
          onClose={handleStartupFundingClose}
          onSuccess={fetchFundingSummary}
        />
      )}
    </div>
  );
}
export default Home;
