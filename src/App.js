import "./App.css";
import { IoSearchOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [term, setTerm] = useState("Jakarta");
  const [data, setData] = useState();
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${term}&appid=49d841c6657f87a97d759a2e949b3c70&units=metric`
    )
      .then((res) => res.json())
      .then((result) => {
        if (result.cod == 200) {
          setData(result);
        }
        if (result.cod == 404) {
          setError(result.message);
        }
        if (result.cod == 200) {
          setError("");
        }
      });
  }, [term]);

  return (
    <div
      className={`${
        data && data.weather[0].icon.slice(-1) === "d" ? "bg-day" : "bg-night"
      } w-full h-screen flex flex-col items-center`}
    >
      <div className="relative">
        <div className=" w-full flex justify-center pt-[5rem] ">
          <div className="flex justify-between gap-3">
            <input
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search..."
              className="py-2 px-4 rounded-xl focus:shadow-lg focus:shadow-slate-900 w-[15rem] sm:w-[24rem] outline-none text-[1rem] "
            />
            <div
              onClick={() => {
                setTerm(input);
                setInput("");
              }}
              className=" bg-white rounded-full p-2 flex justify-center items-center md:hover:scale-105 group "
            >
              <IoSearchOutline className="text-[1.5rem] text-slate-400  md:group-hover:text-slate-900 " />
            </div>
          </div>
        </div>
        {error && (
          <p className="text-red-500 font-semibold absolute animate-pulse capitalize md:bottom-[-4rem] bottom-[-2rem]">
            {error}
          </p>
        )}
      </div>
      <div className="mt-5">
        {data && (
          <img
            src={require(`./assets/${data && data.weather[0].icon}.png`)}
            className="w-[10rem]"
            alt="dwq"
          />
        )}
      </div>
      <div className="text-white text-6xl font-semibold">
        {data && data.main.temp} &deg;C
      </div>
      <div className="text-white mt-5 text-3xl">{data && data.name}</div>
      <div className="text-white mt-5 text-lg">Precipitations</div>
      <div className="text-white text-lg flex gap-x-5">
        <p>Min : {data && data.main.temp_min} &deg;C</p>
        <p>Max : {data && data.main.temp_max} &deg;C</p>
      </div>
      <div className="flex gap-x-10 mt-10  bg-white/10 py-4 px-5 rounded-full">
        <div className="flex gap-x-1 text-white">
          <img src={require(`./assets/rain.png`)} alt="" />
          <p>{data && data.clouds.all} %</p>
        </div>
        <div className="flex gap-x-1 text-white">
          <img src={require(`./assets/humidity.png`)} alt="" />
          <p>{data && data.main.humidity} %</p>
        </div>
        <div className="flex gap-x-2 text-white">
          <img src={require(`./assets/wind.png`)} alt="" />
          <p>{data && data.wind.speed} km/h</p>
        </div>
      </div>
    </div>
  );
}

export default App;
