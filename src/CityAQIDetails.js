import React, { useState } from "react";
import { useAQIAPIs } from "./useAQIAPIs";

import { TOKEN, FEED_AQI_BASE_URL } from "./AQIConst";
import "./CityAQI.css";
import { Line } from "react-chartjs-2";
import { Pie, Doughnut } from "react-chartjs-2";

const CityAQIDetails = (props) => {
  const [info, error] = useAQIAPIs(
    `${FEED_AQI_BASE_URL}${props.uid}/?token=${TOKEN}`
  );
  // console.log(info.data);
  const [reding, setreding] = useState()

  const names = {
    pm25: "particulate matter 25(pm 25)",
    pm10: "particulate matter 10(pm 10)",
    o3: "Ozone",
    no2: "Nitrogen Dioxide",
    so2: "Sulphur Dioxide",
    co: "Carbon Monoxyde",
    t: "Temperature",
    w: "Wind",
    r: "Rain (precipitation)",
    h: "Relative Humidity",
    d: "Dew",
    p: "Atmostpheric Pressure",
  };

  const forecast = {
    pm10: "Particulate matter 10(pm 10)",
    pm25: "Particulate matter 25(pm 25)",
    o3: "Ozone",
    uvi: "Ultraviolet Index",
  };

  const getSpectrum = (iaqi) => {
    let ret = [];
    Object.entries(iaqi).map(function (item) {
      let obj = {};
      let key = names[item[0]] ? names[item[0]] : item[0];
      obj["key"] = key;
      obj["value"] = item[1].v;
      ret.push(obj);
      // setreding(ret)
      // console.log(ret)
    });
    return ret;
  };

  const getForcast = (forcast) => {
    console.log(forcast);
    let ret = [];
    Object.entries(forcast).map(function (item) {
      let obj = {};
      let key = forecast[item[0]] ? forecast[item[0]] : item[0];
      obj["key"] = key;
      obj["value"] = item[1];
      ret.push(obj);
      // console.log(ret)
    });
    return ret;
  };

  const colorize = (name, value) => {
    if (
      [
        "particulate matter 2.5(pm 2.5)",
        "particulate matter 10(pm 10)",
        "Ozone",
        "Nitrogen Dioxide",
        "Sulphur Dioxide",
        "Carbon Monoxyde",
      ].indexOf(name) < 0
    ) {
      return "";
    }
    if (value >= 0 && value <= 50) {
      return "good";
    } else if (value >= 51 && value <= 100) {
      return "moderate";
    } else if (value >= 101 && value <= 150) {
      return "unhealthy-sentitive";
    } else if (value >= 151 && value <= 200) {
      return "unhealthy";
    } else if (value >= 201 && value <= 300) {
      return "very-unhealthy";
    } else if (value >= 301) {
      return "hazardous";
    }
  };

  return (
    <React.Fragment>
      {error}
      {/* <h1>Chart Diagram</h1>
      {info.data ? (
        <div className="details">
          <span>
            Prominent Pollutant is, <b>{names[info.data.dominentpol]}</b>
          </span>
          <hr />
          <ul>
            {getSpectrum(info.data.iaqi).map((spectrum, i) => (
              <li key={i}>
                <span
                  className={`dot ${colorize(spectrum.key, spectrum.value)}`}
                ></span>
                <span>{spectrum.key}</span>: <span>{spectrum.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span>Loading...</span>
      )} */}
      <h1>Present Day</h1>
      {info.data ? (
        <div className="details">
          <span>
            Prominent Pollutant is, <b>{names[info.data.dominentpol]}</b>
          </span>
          <hr />
          <ul>
            {getSpectrum(info.data.iaqi).map((spectrum, i) => (
              <li key={i}>
                <span
                  className={`dot ${colorize(spectrum.key, spectrum.value)}`}
                >
                </span>
                <span>{spectrum.key}</span>: <span>{spectrum.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span>Loading...</span>
      )}
      <h1>THE FORECAST WEATHER </h1>
      {info.data ? (
        <div className="details">
          <ul>
            {getForcast(info.data.forecast.daily).map((spectrum, i) => (
              <li key={i}>
                <span
                  className={`dot ${colorize(spectrum.key, spectrum.value)}`}
                ></span>
                <span>{spectrum.key}</span>: avg :{" "}
                <span>{spectrum.value[3]["avg"]}</span>&nbsp;
                <span>, max : {spectrum.value[3]["max"]}</span>&nbsp;
                <span>, min : {spectrum.value[3]["min"]}</span>&nbsp;
                <span>{`(${spectrum.value[3]["day"]})`}</span>&nbsp;
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <span></span>
      )}
    </React.Fragment>
  );
};

export default CityAQIDetails;
