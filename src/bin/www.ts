#!/usr/bin/env node

// Module dependencies.
import http from "http";
import app from "../app";
import debug from "debug";
import conectToDb from "../connectToDb/connectToDb";

const debugInstance = debug("src:server");

// Get port from environment and store in Express.
const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

// Create HTTP server.
const server = http.createServer(app);

/********************************************************************
 ** Waits for database to connect, if seccussful, listens for request
 ** or logs an error if there is a problem **************************
 ********************************************************************/
conectToDb({ port, server, onError, onListening }).catch((err) =>
  console.log(err)
);

// Normalize a port into a number, string, or false.
function normalizePort(val: string) {
  const port = parseInt(val, 10);

  // named pipe
  if (isNaN(port)) return val;
  // port number
  if (port >= 0) return port;

  return false;
}

// Event listener for HTTP server "error" event.
export interface CustomError extends Error {
  syscall: string;
  code: string;
}

function onError(error: CustomError) {
  if (error.syscall !== "listen") throw error;

  const bind =
    typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
    default:
      throw error;
  }
}

// Event listener for HTTP server "listening" event.
function onListening() {
  const addr = server.address();
  const bind =
    typeof addr === "string"
      ? "pipe " + addr
      : "port " + addr?.port;
  debugInstance("Listening on " + bind);
}
