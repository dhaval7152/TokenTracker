
const geTokenData = async () => {
  try {
    let account="0x0fadb24C9A7ac088c329C4Fa87730D3B2df2f525"
    const response = await fetch(`http://localhost:2000/getToken/${account}`, {
      method: "GET",
    });
    /* eslint-disable */
    const json = await response.json();

    if(json.from!=account){
        console.log(json);
    }
  } catch (error) {
    console.error("While fetching Data Something went wrong");
  }
};

setInterval(() => {
    geTokenData()
}, 5000);