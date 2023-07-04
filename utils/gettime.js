export function gettime(a, stations) {
  console.log(a, "stations");
  let station = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      a?.split(" ")?.join("").toLowerCase()
  );
  if (station) {
    console.log(station, "station");
    return (
      station.departs.toUpperCase() + " " + station.stationCode.toUpperCase()
    );
  }
}

export function getduration(a, b, stations) {
  let stationOne = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      a.split(" ").join("").toLowerCase()
  );
  let stationTwo = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      b.split(" ").join("").toLowerCase()
  );
  console.log(stationOne, stationTwo, "station");
  let start = stationOne?.departs.split(":");
  let end = stationTwo?.arrives.split(":");
  if (start?.length > 0 && end?.length > 0) {
    let hourduration = end[0] - start[0] + "H";
    let minuteduration = end[1] - start[1] + "M";
    let duration = hourduration + " " + minuteduration;
    return duration;
  }
}

export function gettimenew(a, b, stations) {
  let stationOne = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      a.split(" ").join("").toLowerCase()
  );
  let stationTwo = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      b.split(" ").join("").toLowerCase()
  );
  console.log(stationOne, stationTwo, "station");
  let start = stationOne?.departs.split(":");
  let end = stationTwo?.arrives.split(":");
  if (start?.length > 0 && end?.length > 0) {
    let hourduration = end[0] - start[0] + "H";
    let minuteduration = end[1] - start[1] + "M";
    let duration = hourduration + " " + minuteduration;
    return start[0] - end[0] < 0 ? true : false;
  }
}

export function sortTrains(a, b, trains) {
  console.log(trains, "sorting");
  let sortedtrains = trains.filter((t) => gettimenew(a, b, t.stations));
  console.log(sortedtrains, "sorted");
  return sortedtrains;
}
