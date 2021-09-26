import React, { useEffect } from "react";

import CityAQI from "./CityAQI";
import NoDataFound from "./NoDataFound";
import CsvDownload from "react-json-to-csv";
import './CityAQI.css'

const CityAQIList = (props) => {
  let cityList = [];
  if (props.data) {
    cityList = props.data;
    console.log(cityList)
  }
  // console.log(JSON.stringify(cityList))

  return (
    <div className="cityList">
      <CsvDownload data={cityList} filename="data.csv" />
      <ul>
        {cityList.length > 0 ? (
          cityList.map((cityInfo, i) => (
            <li key={i}>
              <CityAQI cityInfo={cityInfo} />
            </li>
          ))
        ) : (
          <NoDataFound />
        )}
      </ul>
    </div>
  );
};

export default CityAQIList;
