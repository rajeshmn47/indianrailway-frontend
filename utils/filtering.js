export function filterall(trains, from, to, filter) {
  let trainsfiltered = [];
  for (let i = 0; i < trains.length; i++) {
    let station = trains[i].stations.find(
      (s) =>
        s?.stationName.split(" ").join("").toLowerCase() ==
        from?.split(" ")?.join("").toLowerCase()
    );
    if (station?.arrives?.split(":")[0] < filter.from) {
      trainsfiltered.push(trains[i]);
    }
  }
  return trainsfiltered;
}
