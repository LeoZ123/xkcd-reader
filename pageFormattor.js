"use strict";

const xkcdFunction = require("./function");

function isValidId(path) {
  const validId = /\/\d+\/?$/;
  return path === "/" || validId.test(path);
}

function parseId(path) {
  const getId = /\d+/;
  const id = path.match(getId);
  return (id && id[0]) || "";
}

function formPage(props) {
  return `
		<!DOCTYPE html>
		<html>
			<head>  
				<meta charset="utf-8">
                <link rel="stylesheet" type="text/css" href="style.css" />
                <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon"> 
			</head>
			<body>
				<div class="content">
					<div class="mainPage">
                        <h1>${props.title}</h1>
                        <a href="${props.url}" alt="${props.title}">
                            <img id="imagePage" src="${props.img}" title="${props.alt}" />
                        </a>
                        <p id="altText">${props.alt}</p>
                        <p id="date">Created Date: ${props.date}</p>
                        <p id="counter">Visited Counter: ${props.counter}</p>
					</div>
					<div>
						<a href="/1">
                            <button>First</button>
                        </a>
                        <a href="/${props.prev}">
                            <button>Previous</button>
                        </a>
                        <a href="/${props.random}">
                            <button>Random</button>
                        </a>
                        <a href="/${props.next}">
                            <button>Next</button>
                        </a>
                        <a href="/">
                            <button>Last</button>
                        </a>
					</div>
				</div>
			</body>
		</html>`.trim();
}

module.exports = function render(req, res) {
  if (isValidId(req.path)) {
    xkcdFunction(parseId(req.path))
      .then(props => {
        return res.status(200).send(formPage(props));
      })
      .catch(err => res.status(500).send(err));
  } else {
    return res.redirect("/");
  }
};