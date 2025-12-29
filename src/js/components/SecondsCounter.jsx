import { useEffect, useState, useRef } from "react";

export default function SecondsCounter({ seconds = 0 }) {
  const [count, setCount] = useState(Number(seconds) || 0);
  const [isRunning, setIsRunning] = useState(true);
  const [targetTime, setTargetTime] = useState("");
  const intervalRef = useRef(null);
  const alertShown = useRef(false);

  // Iniciar contador
  const startCounter = () => {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      setCount((prev) => prev + 1);
    }, 1000);
  };

  // Pausar
  const pauseCounter = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
  };

  // Resumir
  const resumeCounter = () => {
    setIsRunning(true);
    startCounter();
  };

  // Resetear
  const resetCounter = () => {
    pauseCounter();
    setCount(0);
    alertShown.current = false;
  };

  // Arranca solo
  useEffect(() => {
    startCounter();
    return () => clearInterval(intervalRef.current);
  }, []);

  // 🎯 ALERTA cuando llega al tiempo objetivo
  useEffect(() => {
    if (
      targetTime !== "" &&
      count === Number(targetTime) &&
      !alertShown.current
    ) {
      alert(`⏰ ¡Se alcanzó el tiempo objetivo: ${targetTime} segundos!`);
      alertShown.current = true;
    }
  }, [count, targetTime]);

  const digits = String(count).padStart(6, "0").split("");

  return (
    <div className="text-center">
      {/* CONTADOR */}
      <div
        className="counter d-flex justify-content-center align-items-center mb-3"
        style={{ fontSize: "60px" }}
      >
        <div className="digit">
          <i className="fas fa-clock"></i>
        </div>

        {digits.map((digit, index) => (
          <div key={index} className="digit">
            {digit}
          </div>
        ))}
      </div>

      {/* INPUT DEL TIEMPO OBJETIVO */}
      <div className="mb-3">
        <input
          type="number"
          className="form-control text-center"
          placeholder="Enter target seconds (e.g. 10)"
          value={targetTime}
          onChange={(e) => {
            setTargetTime(e.target.value);
            alertShown.current = false;
          }}
        />
      </div>

      {/* BOTONES */}
      <div className="d-flex justify-content-center gap-3">
        <button className="btn btn-warning" onClick={pauseCounter}>
          Pause
        </button>

        <button className="btn btn-success" onClick={resumeCounter}>
          Resume
        </button>

        <button className="btn btn-danger" onClick={resetCounter}>
          Reset
        </button>
      </div>
    </div>
  );
}

