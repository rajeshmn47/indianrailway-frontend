export function filterall(trains, from, to, filter) {
  console.log(trains, from, to, filter);
  let trainsfiltered = [];
  for (let i = 0; i < trains.length; i++) {
    let station = trains[i].stations.find(
      (s) =>
        s?.stationName.split(" ").join("").toLowerCase() ==
        from?.split(" ")?.join("").toLowerCase()
    );
    console.log(station.arrives, "arrives");
    if (
      parseInt(station?.departs?.split(":")[0]) > parseInt(filter.from) &&
      parseInt(station?.departs?.split(":")[0]) < parseInt(filter.to)
    ) {
      trainsfiltered.push(trains[i]);
    }
  }
  return trainsfiltered;
}

export function filterstations(stations, i) {
  if (!(stations[i].day == stations[i - 1]?.day)) {
    return `Day ${stations[i].day}`;
  }
}
