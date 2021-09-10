const express = require("express");

const studentRouter = require("../api/students/student-router");

const server = express();

server.use(express.json());

server.use("/api/students", studentRouter)

module.exports = server
