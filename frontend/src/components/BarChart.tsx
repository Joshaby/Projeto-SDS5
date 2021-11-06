import axios from "axios";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { SaleSuccess } from "types/sale";
import { round } from "utils/format";
import { BASE_URL } from "utils/requests";

type SeriesData = {
    name: string,
    data: number[]
}

type ChartData = {
    series: SeriesData[],
    labels: {
        categories: string[]
    }
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
    });

    useEffect(() => {
        axios.get(`${BASE_URL}/sales/success-by-seller`).then(response => {
            const data = response.data as SaleSuccess[];
            const myCategories = data.map(x => x.sellerName);
            const myData = data.map(x => round(100 * x.deals / x.visited, 1));
            setChartData({
                labels: {
                    categories: myCategories
                },
                series: [
                    {
                        name: "% Success",
                        data: myData
                    }
                ]
            });
        });
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };

    return (
        <ReactApexChart 
            options={{...options, xaxis: chartData.labels}}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;