const router = require('express').Router();
const axios = require('axios');

module.exports = router;

router.get('/test', async (req, res, next) => {
  try {
    const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon/25');
    const { name, species, weight } = data;
    res.send({
      properties: Object.getOwnPropertyNames(data),
      name,
      species,
      weight,
    });
  } catch (error) {
    next(error);
  }
});
