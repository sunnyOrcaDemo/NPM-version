// npm-node_modules demo app
// Intentionally uses multiple versions of vulnerable packages
// for Orca Security scanning demonstration

const express    = require('express');       // express@4.17.1 (older)
const axios      = require('axios');         // axios@0.21.1  (older, CVE-2021-3749)
const cookieParser = require('cookie-parser'); // cookie-parser@1.4.3 (older, pulls cookie@0.3.1)

const app  = express();
app.use(cookieParser());
app.use(express.json());

// Root — list all loaded package versions
app.get('/', (req, res) => {
  res.json({
    service: 'npm-node_modules demo',
    purpose: 'Orca Security cloud-to-dev vulnerability demo',
    packages: {
      express:       require('express/package.json').version,
      axios:         require('axios/package.json').version,
      'cookie-parser': require('cookie-parser/package.json').version,
      cookie:        require('cookie/package.json').version,
    },
  });
});

// Simulate cookie parsing (exposes cookie@0.3.1 path)
app.get('/cookie-demo', (req, res) => {
  res.json({ cookies: req.cookies });
});

// Simulate axios HTTP call (exposes axios CVE path)
app.get('/axios-demo', async (req, res) => {
  try {
    const response = await axios.get('http://httpbin.org/get');
    res.json({ status: 'ok', data: response.data });
  } catch (e) {
    res.json({ status: 'error', message: e.message });
  }
});

app.get('/health', (_req, res) => res.json({ status: 'healthy' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`npm-node_modules demo running on port ${PORT}`));
