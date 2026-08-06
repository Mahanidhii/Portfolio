'use strict';

module.exports = function handler(_req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
};
