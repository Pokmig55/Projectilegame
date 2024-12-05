body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: linear-gradient(to bottom, #87ceeb, #f0e68c); /* Sky to ground */
  margin: 0;
  padding: 0;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}

canvas {
  border: 2px solid black;
  background: transparent;
}

.controls, .info {
  margin-top: 10px;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  font-size: 16px;
  cursor: pointer;
}

button:hover {
  background-color: #4CAF50;
  color: white;
}

.info p {
  margin: 5px 0;
}
