import ReactApexChart from "react-apexcharts";

export default function ExchangeChart({ series, categories }) {
  const chartOptions = {
    chart: {
      type: "area",
      toolbar: {
        show: true,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
      },
    },
    colors: ["#00a63e"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 3,
    },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 5,
      colors: ["#00a63e"],
      strokeColors: "#00a63e",
      strokeWidth: 2,
      hover: {
        size: 7,
      },
    },
    xaxis: {
      categories,
      labels: {
        rotate: -45,
        style: {
          fontSize: "12px",
          colors: "#00a63e",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          fontSize: "12px",
          colors: "#00a63e",
        },
      },
    },
    tooltip: {
      theme: "light",
      x: {
        format: "dd MMM",
      },
    },
    title: {
      text: "Andamento storico del cambio",
      align: "center",
      style: {
        fontSize: "20px",
        color: "#00a63e",
      },
    },
    grid: {
      borderColor: "#eee",
      row: {
        colors: ["#0f172b", "transparent"],
        opacity: 0.5,
      },
    },
  };

  return (
    <div className="my-5">
      <ReactApexChart
        options={chartOptions}
        series={[{ name: "Cambio", data: series }]}
        type="area"
        height={350}
      />
    </div>
  );
}
