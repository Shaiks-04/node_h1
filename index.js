const http = require('http');
const fs = require('fs');
function requestListener(req, res) {
    const url = req.url;
    const requestBody = [];
    if (url === '/message') {
        req.on('data', (chunk) => {
            requestBody.push(chunk)
        })

        req.on('end', () => {
            const parsedBody = Buffer.concat(requestBody).toString()
            const data = parsedBody.split('=')[1]
            console.log(parsedBody);
            fs.writeFileSync('message.txt', data);
        })
    }

    if (url === '/') {
        res.write('<html>');
        res.write("<body>")
        res.write("<h1>Node</h1>");
        res.write("<p>Node.js is an open-source, server-side JavaScript runtime environment that allows you to run JavaScript code on the server. It provides an event-driven, non-blocking I/O model, making it efficient and scalable for building network applications.</p>");
        res.write("<p>With Node.js, you can develop web servers, command-line tools, APIs, and various other types of applications using JavaScript. It utilizes the V8 JavaScript engine, the same engine that powers the Google Chrome browser, to execute JavaScript code.</p>");
        res.write("<p>One of the core modules in Node.js is the http module, which allows you to create and handle HTTP servers and clients. It provides the necessary functions and classes to interact with HTTP protocols, send requests, and receive responses.Using the http module, you can create an HTTP server that listens for incoming requests, handles them, and sends appropriate responses. This allows you to build web applications, APIs, or any other network-based services.</p>");
        res.write("<h2>Http Request in Node:</h2>");
        res.write("<p>To make HTTP requests in Node.js, there is a built-in module HTTP in Node.js to transfer data over the HTTP. To use the HTTP server in the node, we need to require the HTTP module. The HTTP module creates an HTTP server that listens to server ports and gives a response back to the client. Node.js has a built-in module called HTTP, which allows Node.js to transfer data over the Hyper Text Transfer Protocol (HTTP). To include the HTTP module, use the require() method:</p>")
        res.write("</body>");
        res.write("</html>");

        return res.end();
    }

    if (url === '/login') {
        res.write('<html>');
        res.write('<head>');
        res.write("<body>");
        res.write("<form action='/message' method='POST'>");
        res.write("<input placeholder='Enter Your Name' name='message'/>");
        res.write("<br/>");
        res.write("<button>Login</button>");
        res.write("</form>");
        res.write("</body>");
        res.write("</html>");

        return res.end();
    }

    if (url === '/js-data') {
        res.write(JSON.stringify([{
            module: "Node.js",
            Details: "Node.js is an open-source, server-side JavaScript runtime environment that allows you to run JavaScript code on the server. It provides an event-driven, non-blocking I/O model, making it efficient and scalable for building network applications.",
        }]))
        return res.end();
    }

    res.write("This is message:default!!!!!");
    res.end();
}

const Port = 3000;

const server = http.createServer(requestListener);
server.listen(Port, () => {
    try {
        console.log(`server is running on port no.${Port}`);
    }
    catch (err) {
        console.log(err);
    }
});