export default function getStockData(data, instances) {
  let s_data = [];
  let keys = Object.keys(data);
  console.log("length", keys.length);
  if (!instances) {
    instances = keys.length;
  } else {
    instances = Math.min(keys.length, instances);
  }

  for (var row = 0; row < instances; row++) {
    if (row > 1 && data[keys[row]]["3. low"] < data[keys[row - 1]]["3. low"]) {
      s_data.push({
        time: keys[row],
        high: data[keys[row]]["2. high"],
        low: data[keys[row]]["3. low"],
        trend: "D",
      });
    } else {
      s_data.push({
        time: keys[row],
        high: data[keys[row]]["2. high"],
        low: data[keys[row]]["3. low"],
        trend: "I",
      });
    }
  }
  return s_data;
}
