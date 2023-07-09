import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getduration, gettime } from "@/utils/gettime";
import Link from "next/link";
import { Darumadrop_One } from "next/font/google";
import { filterstations } from "@/utils/filtering";

export function TrainDetail({ data }) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [train, setTrain] = useState([]);
  const [stations, setStations] = useState([]);
  console.log(data, "data");
  useEffect(() => {
    setStations(data[0].stations);
    setTrain(data[0]);
  }, [data]);
  return (
    <>
      <div className="table timelinecontainer">
        <div className="traindetail">
          <p>
            {train.trainName} ({train.trainNumber}) Train Time Table
          </p>
          <p>DAILY</p>
        </div>
        <div className="tableheader">
          <div>Arrival</div>
          <div>Station</div>
          <div>Departure</div>
        </div>
        <div id="content">
          <ul class="timeline">
            {stations.map((s, index) => (
              <>
                {filterstations(stations, index) ? (
                  <div className="dayheader">
                    {filterstations(stations, index)}
                  </div>
                ) : null}

                <li class="event" data-date={s.stationCode}>
                  <p>{s.stationName}</p>
                  <h5>{s.departs}</h5>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default TrainDetail;
