const express      = require('express');
const axios        = require('axios');
const cookieParser = require('cookie-parser');
const lodash       = require('lodash');

const app     = express();
const VARIANT = process.env.VARIANT || 'v5';

app.use(cookieParser());
app.use(express.json());

app.get('/', (_req, res) => res.json({
  variant:  VARIANT,
  node:     process.version,
  versions: {
    express:         require('express/package.json').version,
    axios:           require('axios/package.json').version,
    'cookie-parser': require('cookie-parser/package.json').version,
    cookie:          require('cookie/package.json').version,
    lodash:          require('lodash/package.json').version,
  }
}));
app.get('/health',      (_req, res) => res.json({ status: 'healthy', variant: VARIANT }));
app.get('/cookie-demo', (req, res)  => res.json({ variant: VARIANT, cookies: req.cookies }));
app.get('/axios-demo',  async (_req, res) => {
  try   { const r = await axios.get('http://httpbin.org/get'); res.json({ variant: VARIANT, status: 'ok', upstream: r.data.url }); }
  catch (e) { res.json({ variant: VARIANT, status: 'error', message: e.message }); }
});
app.get('/lodash-demo', (_req, res) => {
  const data = [3,1,4,1,5,9,2,6];
  res.json({ variant: VARIANT, sorted: lodash.sortBy(data), chunk: lodash.chunk(data, 3) });
});

app.listen(process.env.PORT || 3000, () => console.log('[' + VARIANT + '] running'));
