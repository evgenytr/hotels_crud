const url = require('url');
const storage = require('../storage/storage');
const userRoutes = require('./routes/userRoutes');

const router = (req, res) => {
    const parsedUrl = url.parse(req.url,true);
    const pathname = parsedUrl.pathname
    
    if(pathname==="/users" || pathname.indexOf("/users/")==0) {
        userRoutes(req,res,storage);
        return;
    }

    res.setHeader("Content-Type", "application/json");
    res.writeHead(404);
    res.end(JSON.stringify({message:`route ${pathname} not found`}))
}

module.exports = router;