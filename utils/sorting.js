export function sortall(trains, from, to, filter) {
  if (filter.type == "duration") {
    if (filter.order == "asc") {
      let sortTrains = [];
      for (let i = 0; i < trains.length; i++) {
        sortTrains.push({
          ...trains[i],
          duration: getduration(from, to, trains[i].stations),
        });
      }
      console.log(sortTrains, "trains");
      return sortTrains.sort((a, b) => a.duration - b.duration);
    } else if (filter.order == "dsc") {
      let sortTrains = [];
      for (let i = 0; i < trains.length; i++) {
        sortTrains.push({
          ...trains[i],
          duration: getduration(from, to, trains[i].stations),
        });
      }
      console.log(sortTrains, "trains");
      return sortTrains.sort((a, b) => b.duration - a.duration);
    }
  } else if (filter.type == "arrival") {
    let s = sortTrains(from, to, trains, filter.order, filter.type);
    return s;
  } else if (filter.type == "departure") {
    let s = sortTrains(from, to, trains, filter.order, filter.type);
    return s;
  } else {
    return trains;
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
    let hourduration = end[0] - start[0];
    let minuteduration = end[1] - start[1];
    let duration = hourduration * 60 + minuteduration;
    return duration;
  }
}

export function sortTrains(a, b, trains, d, type) {
  if (type == "arrival") {
    if (d == "asc") {
      let sortedtrains = trains.sort(
        (c, d) => getttime(a, c.stations) - getttime(a, d.stations)
      );
      return sortedtrains;
    }
    if (d == "dsc") {
      let sortedtrains = trains.sort(
        (c, d) => getttime(b, d.stations) - getttime(b, c.stations)
      );
      return sortedtrains;
    }
    let sortedtrains = trains.filter((t) => gettimenew(a, b, t.stations));
    return sortedtrains;
  } else if (type == "departure") {
    if (d == "asc") {
      let sortedtrains = trains.sort(
        (c, d) => getttime(a, c.stations) - getttime(a, d.stations)
      );
      return sortedtrains;
    }
    if (d == "dsc") {
      let sortedtrains = trains.sort(
        (c, d) => getttime(b, d.stations) - getttime(b, c.stations)
      );
      return sortedtrains;
    }
    let sortedtrains = trains.filter((t) => gettimenew(a, b, t.stations));
    return sortedtrains;
  } else {
    return trains;
  }
}

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
