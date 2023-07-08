import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { getduration, gettime } from "@/utils/gettime";
import { AutoSuggest } from "./reactsuggest";
import Link from "next/link";
import { sortTrains } from "@/utils/gettime";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import url from "../../constants";
import { sortall } from "@/utils/sorting";
import { filterall } from "@/utils/filtering";

export function Home() {
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [trains, setTrains] = useState([]);
  const [filterByduration, setFilterByDuration] = useState("n");
  const [sort, setSort] = useState({
    order: "",
    field: "",
    type: "",
  });
  const [filter, setFilter] = useState({ from: "", to: "" });
  console.log(process.env.NEXT_PUBLIC_API_URL, "URL");
  console.log(trains, "trains");
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
  useEffect(() => {
    setTrains([...sortall(trains, from, to, sort)]);
  }, [sort]);
  useEffect(() => {
    setTrains([...filterall(trains, from, to, filter)]);
  }, [filter]);
  const handleSort = (field) => {
    setSort({
      field: field,
      type: field,
      order: filter.order == "asc" ? "dsc" : "asc",
    });
  };

  const handleFilter = (start, end) => {
    setFilter({
      from: start,
      to: end,
    });
  };

  const handleduSort = (field) => {
    setFilterByDuration(
      filterByduration == "n"
        ? "depasc"
        : filterByduration == "depdsc"
        ? "depasc"
        : "depdsc"
    );
    setFilter({
      field: field,
      type: field,
      order: filter.order == "asc" ? "dsc" : "asc",
    });
  };
  const getTrains = async () => {
    const data = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/todos/between/${from}/${to}`
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
                  <div
                    className="border px-2 my-1 w-40 rounded"
                    onClick={() => handleFilter(5, 11)}
                  >
                    <img src="./sunrise.svg" alt="" />
                    05AM-11AM
                  </div>
                  <div
                    className="border px-2 my-1 w-40 rounded"
                    onClick={() => handleFilter(11, 17)}
                  >
                    <img src="./brightness-alt-high.svg" alt="" />
                    11AM-05PM
                  </div>
                  <div
                    className="border px-2 my-1 w-40 rounded"
                    onClick={() => handleFilter(17, 23)}
                  >
                    <img src="./sunset.svg" alt="" />
                    05PM-11PM
                  </div>
                  <div
                    className="border px-2 my-1 w-40 rounded"
                    onClick={() => handleFilter(23, 5)}
                  >
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
                <div className="col-2" onClick={() => handleSort("departure")}>
                  {filter.type == "departure" && filter.order == "dsc" ? (
                    <AiOutlineArrowDown />
                  ) : filter.order == "asc" && filter.type == "departure" ? (
                    <AiOutlineArrowUp />
                  ) : null}{" "}
                  Departure
                </div>
                <div className="col-2" onClick={() => handleSort("duration")}>
                  {filter.type == "duration" && filter.order == "asc" ? (
                    <AiOutlineArrowDown />
                  ) : filter.order == "dsc" && filter.type == "duration" ? (
                    <AiOutlineArrowUp />
                  ) : null}{" "}
                  Duration
                </div>
                <div className="col-2" onClick={() => handleSort("arrival")}>
                  {filter.type == "arrival" && filter.order == "asc" ? (
                    <AiOutlineArrowDown />
                  ) : filter.order == "dsc" && filter.type == "arrival" ? (
                    <AiOutlineArrowUp />
                  ) : null}{" "}
                  Arrival
                </div>
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
