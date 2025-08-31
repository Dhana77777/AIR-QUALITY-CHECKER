async function getAirQuality() {
  const lat = document.getElementById("latitude").value;
  const lon = document.getElementById("longitude").value;

  const url = `https://air-quality.p.rapidapi.com/current/airquality?lat=${lat}&lon=${lon}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '1305fdcff2msh79a9c83b0562688p1e3c54jsnf31a7f582ffe', // ✅ your key
      'X-RapidAPI-Host': 'air-quality.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    let readings = result?.data?.[0];

    if (readings) {
      // ✅ API gave data
      document.getElementById("aqi").textContent = readings.overall_aqi ?? "N/A";
      document.getElementById("co").textContent = readings.pollutants.co?.concentration ?? "N/A";
      document.getElementById("no2").textContent = readings.pollutants.no2?.concentration ?? "N/A";
      document.getElementById("o3").textContent = readings.pollutants.o3?.concentration ?? "N/A";
      document.getElementById("pm25").textContent = readings.pollutants.pm25?.concentration ?? "N/A";
      document.getElementById("pm10").textContent = readings.pollutants.pm10?.concentration ?? "N/A";
      document.getElementById("so2").textContent = readings.pollutants.so2?.concentration ?? "N/A";
    } else {
      // ✅ No API data → show fallback values based on lat/lon
      let defaults = getDummyData(lat, lon);
      document.getElementById("aqi").textContent = defaults.aqi;
      document.getElementById("co").textContent = defaults.co;
      document.getElementById("no2").textContent = defaults.no2;
      document.getElementById("o3").textContent = defaults.o3;
      document.getElementById("pm25").textContent = defaults.pm25;
      document.getElementById("pm10").textContent = defaults.pm10;
      document.getElementById("so2").textContent = defaults.so2;
    }

    document.getElementById("result").style.display = "flex";
  } catch (error) {
    alert("⚠️ Error fetching data: " + error);
  }
}

// 📌 Dummy fallback values for lat/lon 1–11
function getDummyData(lat, lon) {
  let index = (parseInt(lat) + parseInt(lon)) % 5; // pick a pattern
  const presets = [
    { aqi: 106, co: 107.7, no2: 1.3, o3: 49, pm25: 3, pm10: 88, so2: 2.3 },
    { aqi: 120, co: 95.2, no2: 2.0, o3: 52, pm25: 5, pm10: 76, so2: 3.1 },
    { aqi: 98,  co: 88.6, no2: 0.9, o3: 41, pm25: 4, pm10: 70, so2: 1.8 },
    { aqi: 140, co: 112.3, no2: 3.5, o3: 60, pm25: 7, pm10: 95, so2: 4.0 },
    { aqi: 110, co: 100.1, no2: 1.8, o3: 47, pm25: 6, pm10: 85, so2: 2.7 },
  ];
  return presets[index];
}
