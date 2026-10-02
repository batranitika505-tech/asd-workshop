const cache = {};
const TTL = 60000;

const cacheMiddleware = (req, res, next) => {
    if (req.method !== 'GET') {
        return next();
    }

    const key = req.originalUrl || req.url;
    const cachedEntry = cache[key];

    if (cachedEntry) {
        const age = Date.now() - cachedEntry.createdAt;

        if (age < TTL) {
            res.setHeader('X-Cache', 'HIT');
            return res.json(cachedEntry.value);
        } else {
            delete cache[key];
        }
    }

    res.setHeader('X-Cache', 'MISS');

    const originalJson = res.json.bind(res);
    res.json = (body) => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
            cache[key] = {
                value: body,
                createdAt: Date.now()
            };
        }
        return originalJson(body);
    };

    next();
};

const invalidateCache = () => {
    for (const key in cache) {
        delete cache[key];
    }
};

module.exports = {
    cacheMiddleware,
    invalidateCache
};
