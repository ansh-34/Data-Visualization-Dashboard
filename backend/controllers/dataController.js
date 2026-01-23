const Data = require('../models/Data');

// @desc    Get all data with filters
// @route   GET /api/data
// @access  Public
const getData = async (req, res) => {
  try {
    const {
      end_year,
      topic,
      sector,
      region,
      pestle,
      source,
      swot,
      country,
      city
    } = req.query;

    // Build filter object
    const filter = {};

    if (end_year) filter.end_year = end_year;
    if (topic) filter.topic = topic;
    if (sector) filter.sector = sector;
    if (region) filter.region = region;
    if (pestle) filter.pestle = pestle;
    if (source) filter.source = source;
    if (swot) filter.swot = swot;
    if (country) filter.country = country;
    if (city) filter.city = city;

    const data = await Data.find(filter);
    
    res.json({
      success: true,
      count: data.length,
      data: data
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

// @desc    Get unique filter values
// @route   GET /api/filters
// @access  Public
const getFilters = async (req, res) => {
  try {
    const [
      endYears,
      topics,
      sectors,
      regions,
      pestles,
      sources,
      swots,
      countries,
      cities
    ] = await Promise.all([
      Data.distinct('end_year'),
      Data.distinct('topic'),
      Data.distinct('sector'),
      Data.distinct('region'),
      Data.distinct('pestle'),
      Data.distinct('source'),
      Data.distinct('swot'),
      Data.distinct('country'),
      Data.distinct('city')
    ]);

    // Normalize values to strings and drop empties/nulls to avoid trim errors
    const sanitizeValues = (arr) =>
      arr
        .map((item) => (item === null || item === undefined ? '' : String(item)))
        .filter((item) => item.trim() !== '');

    res.json({
      success: true,
      regions: sanitizeValues(regions).sort(),
      topics: sanitizeValues(topics).sort(),
      sectors: sanitizeValues(sectors).sort(),
      pestles: sanitizeValues(pestles).sort(),
      sources: sanitizeValues(sources).sort(),
      countries: sanitizeValues(countries).sort(),
      endYears: sanitizeValues(endYears).sort(),
      swots: sanitizeValues(swots).sort(),
      cities: sanitizeValues(cities).sort()
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
};

module.exports = {
  getData,
  getFilters
};
