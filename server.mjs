import http from "http";
import fs from "fs";

let arr = [];

for (let i = 1; i <= 100; i++) {
  arr[i] = { page: i, content: i + " th content" };
}

let server = http.createServer();

server.on("request", (req, res) => {
  console.log(req.url);

  if (req.url.includes("/page")) {
    let page = req.url.split("/").pop();
    res.end(
      JSON.stringify({ details: arr.slice(page * 10 + 1, page * 10 + 11) })
    );
  }

  if (req.url == "/") fs.readFile("./page.html", (err, dat) => res.end(dat));

  if (req.url == "/first") {
    res.end(
      JSON.stringify({
        details: arr.slice(1, 10 + 1),
        totalLength: Math.floor(arr.length / 10),
      })
    );
  }
});

server.listen(8080, () => {
  console.log("on 8080");
});
