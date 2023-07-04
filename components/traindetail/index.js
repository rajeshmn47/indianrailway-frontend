import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getduration, gettime } from "@/utils/gettime";
import Link from "next/link";
import { Darumadrop_One } from "next/font/google";

export function TrainDetail({ data }) {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [trains, setTrains] = useState([]);
  const [stations, setStations] = useState([]);
  console.log(data, "data");
  useEffect(() => {
    setStations(data[0].stations);
  }, [data]);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Arrival</th>
            <th>Station</th>
            <th>Departure</th>
          </tr>
        </thead>
        <tbody>
          {stations.map((s) => (
            <tr>
              <td>{s.stationCode}</td>
              <td>{s.stationName}</td>
              <td>{s.departs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TrainDetail;
