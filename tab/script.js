// Helper Functions

var container = document.getElementById("container");

function makeTitle(headline) {
  // Create elements
  var title = document.createElement("div");
  var header = document.createElement("h3");
  // Set style properties
  title.style.fontFamily = "Verdana, Geneva, sans-serif";
  title.style.font.weight = "bold";
  // Set the text and then append elements to one another
  header.innerHTML = headline.toUpperCase();
  title.appendChild(header);
  container.appendChild(title);
}

function makeSumList(summaryList) {
  // Create elements
  var summary = document.createElement("div");
  var unorder = document.createElement("ul");
  // Set style properties
  summary.style.fontFamily = "Segoe UI, Tahoma, Geneva, Verdana, sans-serif";
  // Iterate through list of summary sentences and create <li> items
  for (const bullet of summaryList) {
    var bulletPoint = document.createElement("li");
    bulletPoint.innerHTML = bullet;
    unorder.appendChild(bulletPoint);
  }
  // Add complete list to summary div and then to container
  summary.appendChild(unorder);
  container.appendChild(summary);
}

function makeSourceData(sourceDict) {
  // Create citation string
  var citation = "<i>";
  citation += "Source: <b>" + sourceDict["publisher"];
  citation += "</b> Date: <b>" + sourceDict["publish_date"] + "</b></i><br/>";
  console.log(citation);
  // Create link element
  var link = document.createElement("a");
  link.setAttribute("href", sourceDict["link"]);
  link.innerHTML = "Link to Original Article";
  // Add citation to a "source" div, add to container
  var source = document.createElement("div");
  source.innerHTML = citation;
  source.appendChild(link);
  container.appendChild(source);
}

function safeLoad(xhr) {
  // Ensure safety of XMLHttpRequest
  return xhr.readyState === xhr.DONE && xhr.status === 200;
}

// Main to make page

var compressed = new XMLHttpRequest();
compressed.open(
  "GET",
  "https://raw.githubusercontent.com/lenghuang/New-Tab-News/master/tab/dummy.json"
);
compressed.onload = function () {
  if (safeLoad(compressed)) {
    console.log("Loaded!");
    var jsonData = JSON.parse(compressed.responseText);
    var article = jsonData; // extra step just to maintain naming of possible loop
    for (const article of jsonData) {
      console.log(article["title"]);
      makeTitle(article["title"]);
      makeSumList(article["summary"]);
      makeSourceData(article["source"]);
    }
  } else {
    console.log("Not loaded :(");
  }
};
compressed.send();
