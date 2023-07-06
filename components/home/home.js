import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getduration, gettime } from "@/utils/gettime";
import { AutoSuggest } from "./reactsuggest";
import Link from "next/link";
import { sortTrains } from "@/utils/gettime";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

export function Home() {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [trains, setTrains] = useState([]);
  const [filterByduration, setFilterByDuration] = useState("n");
  useEffect(() => {
    if (filterByduration == "asc") {
      setTrains([...sortTrains(from, to, trains)]);
    }
    if (filterByduration == "dsc") {
      setTrains([...sortTrains(from, to, trains)]);
    }
    if (filterByduration == "depasc") {
      setTrains([...sortTrains(from, to, trains, "depasc")]);
    }
    if (filterByduration == "depdsc") {
      setTrains([...sortTrains(from, to, trains, "depdsc")]);
    }
  }, [filterByduration]);
  const handleSort = () => {
    setFilterByDuration(
      filterByduration == "n"
        ? "asc"
        : filterByduration == "dsc"
        ? "asc"
        : "dsc"
    );
  };
  const handleduSort = () => {
    setFilterByDuration(
      filterByduration == "n"
        ? "depasc"
        : filterByduration == "depdsc"
        ? "depasc"
        : "depdsc"
    );
  };
  const getTrains = async () => {
    const data = await axios.get(
      `http://127.0.0.1:8000/todos/between/${from}/${to}`
    );
    console.log(data, "data");
    setTrains([...data.data]);
  };
  return (
    <>
      <div className="searchcontainer p-4">
        <h3 className="text-center text-white text-capitalize">
          Check train between stations
        </h3>
        <div className="searchform p-2">
          <AutoSuggest placeholder="From Station" froom setFrom={setFrom} />
          <AutoSuggest placeholder="To Station" too setTo={setTo} />
          {new Date().toDateString()}
          <button className="searchtrainsbtn" onClick={() => getTrains()}>
            search trains
          </button>
        </div>
      </div>
      <div className="trains container-fluid p-6">
        <div className="row">
          <div className="col-3">
            <div className="filters">
              <h5>Quick filters</h5>
              <div className="select">
                <div className="selectbox">
                  <input
                    type="checkbox"
                    id="subscribeNews"
                    name="subscribe"
                    value="newsletter"
                  />
                  <label>AC Only</label>
                </div>
                <div className="selectbox">
                  <input
                    type="checkbox"
                    id="subscribeNews"
                    name="subscribe"
                    value="newsletter"
                  />
                  <label>Confirm Seats</label>
                </div>
                <div className="selectbox">
                  <input
                    type="checkbox"
                    id="subscribeNews"
                    name="subscribe"
                    value="newsletter"
                  />
                  <label>5PM-11PM</label>
                </div>
              </div>
              <h5>Filter By Time</h5>
              <div className="d-flex">
                <div className="d-flex flex-wrap time justify-content-between">
                  <div className="border px-2 my-1 w-40 rounded">
                    <img src="./sunrise.svg" alt="" />
                    05AM-11AM
                  </div>
                  <div className="border px-2 my-1 w-40 rounded">
                    <img src="./brightness-alt-high.svg" alt="" />
                    11AM-05PM
                  </div>
                  <div className="border px-2 my-1 w-40 rounded">
                    <img src="./sunset.svg" alt="" />
                    05PM-11PM
                  </div>
                  <div className="border px-2 my-1 w-40 rounded ">
                    <img src="./moon-stars.svg" alt="" />
                    11PM-05AM
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9">
            <h5
              style={{
                color: "#000",
                textTransform: "capitalize",
                marginBottom: "20px",
                fontWeight: "600",
              }}
            >
              {from} to {to} Trains ({trains.length} Trains)
            </h5>

            <div className="container-fluid headers">
              <div className="row">
                <div className="col-6">Sort by :</div>
                <div className="col-2" onClick={() => handleduSort()}>
                  {filterByduration == "depasc" ? (
                    <AiOutlineArrowDown />
                  ) : filterByduration == "depdsc" ? (
                    <AiOutlineArrowUp />
                  ) : null}{" "}
                  Departure
                </div>
                <div className="col-2" onClick={() => handleSort()}>
                  {filterByduration == "asc" ? (
                    <AiOutlineArrowDown />
                  ) : filterByduration == "dsc" ? (
                    <AiOutlineArrowUp />
                  ) : null}{" "}
                  Duration
                </div>
                <div className="col-2">Arrival</div>
              </div>
            </div>

            {trains.length > 0 &&
              sortTrains(from, to, trains).map((t) => (
                <Link href={`/train/${t.trainNumber}`}>
                  <div className="train d-flex justify-content-between">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-6">
                          <h5>
                            <span className="place">
                              {t.trainNumber} {t.from} - {t.to}
                            </span>{" "}
                            {t.trainName}
                          </h5>
                        </div>
                        <div className="col-2">
                          <h5>{gettime(from, t.stations)}</h5>
                          <p className="d">{from}</p>
                        </div>
                        <div className="col-2">
                          <p>{getduration(from, to, t.stations)}</p>
                        </div>
                        <div className="col-2">
                          <h5>{gettime(to, t.stations)}</h5>
                          <p className="a">{to}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
