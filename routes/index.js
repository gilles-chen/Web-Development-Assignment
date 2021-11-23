const express = require("express");
//const personController = require("../controller/person");
//const cityController = require("../controller/city");
const db = require("../database/database");

const router = express.Router();
//router.post("/person", personController.createPerson);
//router.post("/city", cityController.createCity);

/**
 * @api {post} /city Post a new city
 * @apiName PostCity
 * @apiGroup City
 *
 * @apiParam {JSON} city - New City
 *
 * @apiSuccess {String} city.name City name
 * @apiSuccess {String} city.country City country code
 * @apiSuccess {String} city.district City district name
 * @apiSuccess {Number} city.population City population
 *
 * @apiSuccessExample Success-Response:
 *    {
 *      "Name": "Berlin",
 *      "CountryCode": "BER",
 *      "District": "Berlin",
 *      "Population": 3500000
 *    }
 *
 * @apiError BadRequest The entered JSON does not match the required format.
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 400 Bad Request
 *  {
 *   "error": "Bad Request"
 * }
 */
router.post("/city", (req, res) => {
  const city = {
    name: req.body.Name,
    countryCode: req.body.CountryCode,
    district: req.body.District,
    population: req.body.Population,
  };

  db("city")
    .insert({
      Name: city.name,
      CountryCode: city.countryCode,
      District: city.district,
      Population: city.population,
    })
    .then((data) => res.send(city));
});

/**
 * @api {get} /:city Get a city from the database
 * @apiName GetCity
 * @apiGroup City
 *
 * @apiSuccess {String} city.name City name
 * @apiSuccess {String} city.country City country code
 * @apiSuccess {String} city.district City district name
 * @apiSuccess {Number} city.population City population
 *
 * @apiSuccessExample Success-Response:
 *    {
 *      "Name": "Berlin",
 *      "CountryCode": "BER",
 *      "District": "Berlin",
 *      "Population": 3500000
 *    }
 *
 * @apiError CityNotFound City does not exist in Database
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 *  {
 *   "error": "CityNotFound"
 * }
 */
router.get("/:city", async (req, res) => {
  const city = req.params.city;
  db("city")
    .select("Name", "CountryCode", "District", "Population")
    .from("city")
    .where("Name", city)
    .then(function (data) {
      res.send(data);
    });
});

/**
 * @api {put} /:city Update a city from the database
 * @apiName UpdateCity
 * @apiGroup City
 *
 * @apiParam {JSON} city - Updated city JSON
 *
 * @apiSuccess  {boolean} success True if the city was updated successfully.
 *
 * @apiSuccessExample Success-Response: true
 *
 * @apiError CityNotFound City does not exist in Database - return false
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 *  {
 *   "error": "CityNotFound"
 * }
 */
router.put("/:city", async (req, res) => {
  const name = req.params.city;
  db("city")
    .where("Name", name)
    .update({ Population: req.body.population })
    .select()
    .then(() => {
      db("city")
        .where("Name", name)
        .select("*")
        .then((rows) => {
          res.send(rows);
        });
    });
});

/**
 * @api {delete} /:city Update a city from the database
 * @apiName UpdateCity
 * @apiGroup City
 *
 * @apiSuccess True if the city was updated successfully.
 *
 * @apiSuccess {String} city.name City name
 * @apiSuccess {String} city.country City country code
 * @apiSuccess {String} city.district City district name
 * @apiSuccess {Number} city.population City population
 *
 * @apiError CityNotFound City does not exist in Database
 *
 * @apiErrorExample Error-Response:
 *   HTTP/1.1 404 Not Found
 *  {
 *   "error": "CityNotFound"
 * }
 */
router.delete("/:city", async (req, res) => {
  const name = req.params.city;

  const result = db("city")
    .del()
    .where({
      Name: name,
    })
    .then((count) => {
      if (count > 0) {
        res.send(true);
      } else {
        res.send(false);
      }
    });
});

module.exports = router;
