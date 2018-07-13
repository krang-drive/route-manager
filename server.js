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

  facilityRequest = client.get('http://facility-db:8080/api/facilityId', (data, response) => {
    var allPackages = data; // All Packages by FacilityID
    var args = {
      data: {
        data: allPackages,
        facilityId: facilityId
      },
      headers: { "Content-Type": "application/json" }
    };
    routeCalculatorRequest = client.post('http://routeCalculator:8080/api', args, (data, response) => {
      var deliveryRouteObject = data;
      var args = {
        data: { data: deliveryRouteObject },
        headers: { "Content-Type": "application/json" }
      };
      driverStoreRequest = client.post('http://driverStore:8080/api', args, (data,response) => {
        var args = {
          data: facilityId,
          headers: { "Content-Type": "text/plain" }
        }
        driverSchedulerRequest = client.post('http://driveScheduler:8080/api', args, (data, response) => {
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
