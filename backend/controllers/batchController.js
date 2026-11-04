const batches = require('../data/batches');

const allowedStatuses = new Set(['Running', 'Upcoming', 'Completed']);

function getBatches(req, res) {
  const { search = '', status = '', centre = '' } = req.query;
  const page = Number.parseInt(req.query.page || '1', 10);
  const limit = Number.parseInt(req.query.limit || '5', 10);

  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1 || limit > 100) {
    return res.status(400).json({ error: 'page must be at least 1 and limit must be between 1 and 100' });
  }
  if (status && !allowedStatuses.has(status)) {
    return res.status(400).json({ error: `status must be one of: ${[...allowedStatuses].join(', ')}` });
  }

  const normalizedSearch = search.trim().toLowerCase();
  const normalizedCentre = centre.trim().toLowerCase();
  const filtered = batches.filter((batch) => {
    const matchesSearch = !normalizedSearch
      || [batch.batchCode, batch.course].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesStatus = !status || batch.status === status;
    const matchesCentre = !normalizedCentre || batch.centre.toLowerCase() === normalizedCentre;
    return matchesSearch && matchesStatus && matchesCentre;
  });

  const totalRecords = filtered.length;
  const start = (page - 1) * limit;
  const items = filtered.slice(start, start + limit);

  return res.json({
    success: true,
    data: items,
    pagination: { page, limit, totalRecords, totalPages: Math.ceil(totalRecords / limit) },
  });
}

module.exports = { getBatches };
