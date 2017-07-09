let config;
try {
    const confFilePath = process.env.CONF_FILE;
    if (!confFilePath) throw new Error('CONF_FILE environment variable must be set with configuration file path');
    config = require(confFilePath);
} catch(e) {
    console.error(`Configuration file not found.`, e.message);
    process.exit(1);
}

export default config;