"use strict"

const express = require('express');
const app = express();
const Client = require('node-rest-client').Client;

var client = new Client();


app.get('/', (req, res) => {
  res.send("Connection Succesful!");
});

app.post('/', (req, res) => {
  var facilityId = req.body;

  facilityRequest = client.get('facility-db/api/facilityId', (data, response) => {
    var allPackages = data; // All Packages by FacilityID
    var args = {
      data: {
        data: allPackages,
        facilityId: facilityId
      },
      headers: { "Content-Type": "application/json" }
    };
    routeCalculatorRequest = client.post('routeCalculator/api', args, (data, response) => {
      var deliveryRouteObject = data;
      var args = {
        data: { data: deliveryRouteObject },
        headers: { "Content-Type": "application/json" }
      };
      driverStoreRequest = client.post('driverStore/api', args, (data,response) => {
        var args = {
          data: facilityId,
          headers: { "Content-Type": "text/plain" }
        }
        driverSchedulerRequest = client.post('driveScheduler/api', args, (data, response) => {
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

});
app.listen(8080, () => console.log("App started on port 8080"));
