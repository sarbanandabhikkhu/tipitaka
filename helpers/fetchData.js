async function fetchData(url, callback) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return callback(data);
  } catch (error) {
    console.error(error);
  }
}

export default fetchData;
