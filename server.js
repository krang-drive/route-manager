"use strict"

const express = require('express');
const app = express();
const Client = require('node-rest-client').Client;

var client = new Client();

app.post('/', (req,res) => {
  var facilityId = req.body;

  client.get('facility-db/api/facilityId', (data, response) => {
    var allPackages = data; // All Packages by FacilityID
    var args = {
      data: {
        data: allPackages,
        facilityId: facilityId
      },
      headers: { "Content-Type": "application/json" }
    };
    client.post('routeCalculator/api', args, (data, response) => {
      var deliveryRouteObject = data;
      var args = {
        data: deliveryRouteObject,
        headers: { "Content-Type": "application/json" }
      };
      client.post('driverStore/api', args, (data,response) => {
        var args = {
          data: facilityId,
          headers: { "Content-Type": "text/plain" }
        }
        client.post('driveScheduler/api', args, (data, response) => {
          console.log("Done!")
        });
      });
    });
  });
});
