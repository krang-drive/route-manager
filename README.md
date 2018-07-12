Package bot is going to send a notification to route manager that packages are ready at a facility using a facilityId
  I have to query the facilitydb and get everything in an array of packages
    I need to send everything to Route calculator which will give me a deliveryRoute object
      Post the delivery routeId database
        notify the drive schedule through post


        use /api to post

        {
          data : [packages],
          facilityId : id
        }
