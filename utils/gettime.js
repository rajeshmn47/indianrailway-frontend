export function gettime(a, stations) {
  let station = stations.find(
    (s) => s.stationName.split(" ").join("").toLowerCase() == a.toLowerCase()
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
    (s) => s.stationName.split(" ").join("").toLowerCase() == a.toLowerCase()
  );
  let stationTwo = stations.find(
    (s) => s.stationName.split(" ").join("").toLowerCase() == b.toLowerCase()
  );
  console.log(stationOne, stationTwo, "station");
  let start = stationOne.departs.split(":");
  let end = stationTwo.arrives.split(":");
  let hourduration = end[0] - start[0] + "H";
  let minuteduration = end[1] - start[1] + "M";
  let duration = hourduration + " " + minuteduration;
  return duration;
}
