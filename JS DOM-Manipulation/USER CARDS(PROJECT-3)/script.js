const animalData = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww",
    altText: "fox",
    title: "FOX",
    category: "Nature: Wild",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1661900213349-c6e616eda162?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGFuaW1hbGxpb258ZW58MHx8MHx8fDA%3D",
    altText: "lion",
    title: "LION",
    category: "Nature: Wild",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1674718744840-0b747b7d53a6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODh8fHJhYmJpdHxlbnwwfHwwfHx8MA%3D%3D",
    altText: "rabbit",
    title: "RABBIT",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://plus.unsplash.com/premium_photo-1666690195791-9b812e5382b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWxlcGhhbnRzfGVufDB8fDB8fHww",
    altText: "elephant",
    title: "ELEPHANT",
    category: "Nature: Wild",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww",
    altText: "dog",
    title: "DOG",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1506755855567-92ff770e8d00?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
    altText: "cat",
    title: "CAT",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1721327900411-b315dce4388e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGFtc3RlcnxlbnwwfHwwfHx8MA%3D%3D",
    altText: "hamster",
    title: "HAMSTER",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1511823991948-4d877be80581?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBhcnJvdHxlbnwwfHwwfHx8MA%3D%3D",
    altText: "parrot",
    title: "PARROT",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1606137029647-71daa7c9c5c8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGdvbGRmaXNofGVufDB8fDB8fHww",
    altText: "goldfish",
    title: "GOLDFISH",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG9yc2V8ZW58MHx8MHx8fDA%3D",
    altText: "horse",
    title: "HORSE",
    category: "Nature: Domestic",
    stat: "Not Pet",
    buttonText: "Add Pet",
  },
];

function data() {
  var sum = "";
  animalData.forEach(function (elem, idx) {
    sum += `  <div class="card">
                <img id="image" src="${elem.imageSrc}"
                    alt="${elem.altText}">
                <h1>${elem.title}</h1>
                <h2>${elem.category}</h2>
                <h3>Status:${elem.stat}</h3>
                <button id=${idx}>${elem.buttonText}</button>    
            </div>`;
  });

  let main = document.querySelector("#main");
  main.innerHTML = sum;
}

data();
function data() {
  var sum = "";
  animalData.forEach(function (elem, idx) {
    sum += `  <div class="card">
                <img id="image" src="${elem.imageSrc}"
                    alt="${elem.altText}">
                <h1>${elem.title}</h1>
                <h2>${elem.category}</h2>
                <h3>${elem.stat}</h3>
                <button id=${idx} style="background-color: ${
      elem.stat === "Not Pet" ? "#4CAF50" : "#FF5733"
    }">${elem.buttonText}</button>    
            </div>`;
  });

  let main = document.querySelector("#main");
  main.innerHTML = sum;
}

data();

main.addEventListener("click", function (dets) {
  if (dets.target.tagName === "BUTTON") {
    let gold = animalData[dets.target.id];
    let button = dets.target;

    if (gold.stat === "Not Pet") {
      gold.stat = "Adopted";
      gold.buttonText = "Remove Pet";
      button.style.backgroundColor = "#FF5733"; // red for Remove Pet
    } else {
      gold.stat = "Not Pet";
      gold.buttonText = "Add Pet";
      button.style.backgroundColor = "yellowgreen"; // green for Add Pet
    }

    data(); // Re-render with updated data
  }
});

