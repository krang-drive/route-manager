"use strict"

const express = require('express');
const app = express();
const Client = require('node-rest-client').Client;

var client = new Client();


app.get('/', (req, res) => {
  res.send("Connection Succesful!");
});

app.post('/facility', (req, res) => {
  var facilityId = req.body;

  var facilityRequest = client.get('http://facility-store:8080/facility/:facilityId', (data, response) => {
    var allPackages = data; // All Packages by FacilityID
    var args = {
      data: allPackages,
      headers: { "Content-Type": "application/json" }
    };
    var routeCalculatorRequest = client.post('http://route-calculator:8080/api', args, (data, response) => {
      var deliveryRouteObject = data;
      var args = {
        data: {allRoutes: deliveryRouteObject},
        headers: { "Content-Type": "application/json" }
      };
      var driverStoreRequest = client.post('http://route-store:8080/routeAll', args, (data,response) => {
        var args = {
          data: facilityId,
          headers: { "Content-Type": "text/plain" }
        }
        var driverSchedulerRequest = client.post('http://drive-scheduler:8080/api', args, (data, response) => {
          console.log("Done!")
        });
        driverSchedulerRequest.on('error', (err) => {
          console.log("Error sending post request to the Driver Scheduler");
        });

      });
      driverStoreRequest.on('error', (err) => {
        console.log("Error sending post request to the Driver Store");
      });
    });
    routeCalculator.on('error', (err) => {
      console.log("Error sending post request to the Route Calculator");
    });

  });
  facilityRequest.on('error', (err) => {
    console.log("Error receiving get request from Facility Database");
  });
  res.send("sent")
});
app.listen(8080, () => console.log("App started on port 8080"));
