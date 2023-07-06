export function getttime(a, stations) {
  let station = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      a?.split(" ")?.join("").toLowerCase()
  );
  if (station) {
    console.log(parseInt(station.departs.split(":")[0]), "station");
    return parseInt(station.departs.split(":")[0]);
  }
}
export function gettime(a, stations) {
  let station = stations.find(
    (s) =>
      s.stationName.split(" ").join("").toLowerCase() ==
      a?.split(" ")?.join("").toLowerCase()
  );
  if (station) {
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
  let start = stationOne?.departs.split(":");
  let end = stationTwo?.arrives.split(":");
  if (start?.length > 0 && end?.length > 0) {
    let hourduration = end[0] - start[0] + "H";
    let minuteduration = end[1] - start[1] + "M";
    let duration = hourduration + " " + minuteduration;
    return start[0] - end[0] < 0 ? true : false;
  }
}

export function sortTrains(a, b, trains, d) {
  if (d == "depasc") {
    let sortedtrains = trains.sort(
      (c, d) => getttime(a, c.stations) - getttime(a, d.stations)
    );
    return sortedtrains;
  }
  if (d == "depdsc") {
    let sortedtrains = trains.sort(
      (c, d) => getttime(b, d.stations) - getttime(b, c.stations)
    );
    return sortedtrains;
  }
  let sortedtrains = trains.filter((t) => gettimenew(a, b, t.stations));
  return sortedtrains;
}
