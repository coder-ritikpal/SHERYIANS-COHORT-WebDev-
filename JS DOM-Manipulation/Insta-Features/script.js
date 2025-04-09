const arrStory = [
  {
    dp: "https://media.istockphoto.com/id/183412466/photo/eastern-bluebirds-male-and-female.webp?a=1&b=1&s=612x612&w=0&k=20&c=JUCOERTWv4Pl56KcNfVLaAVBrncwugHEhTYI8zl-d7g=",
    story:
      "https://plus.unsplash.com/premium_photo-1666777247125-c8915ef41287?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fGJpcmR8ZW58MHx8MHx8fDA%3D",
  },
  {
    dp: "https://images.unsplash.com/photo-1620065263283-f084beb12754?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGFrZXN8ZW58MHx8MHx8fDA%3D",
    story:
      "https://images.unsplash.com/photo-1669604120699-eeba651ac235?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bGFrZXN8ZW58MHx8MHx8fDA%3D",
  },
  {
    dp: "https://images.unsplash.com/photo-1578507065211-1c4e99a5fd24?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZmlzaHxlbnwwfHwwfHx8MA%3D%3D",
    story:
      "https://images.unsplash.com/photo-1639814475596-5b3bf7b5e04c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTZ8fGdvbGQlMjBmaXNofGVufDB8fDB8fHww",
  },
  {
    dp: "https://plus.unsplash.com/premium_photo-1669725687221-6fe12c2da6b1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGlvbnxlbnwwfHwwfHx8MA%3D%3D",
    story:
      "https://images.unsplash.com/photo-1583499871880-de841d1ace2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGxpb258ZW58MHx8MHx8fDA%3D",
  },
  {
    dp: "https://plus.unsplash.com/premium_photo-1674986175088-2d7dda41f7f8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zmxvd2Vyc3xlbnwwfHwwfHx8MA%3D%3D",
    story:
      "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D",
  },
];

var img = ""
arrStory.forEach(function (elem, idx) {
    img += `  <div id="story">
                <img id="${idx}" src="${elem.dp}" alt="">
            </div>`;
})

var stories = document.querySelector('#stories')
stories.innerHTML = img;

stories.addEventListener("click", function (dets) {
    let gold=arrStory[dets.target.id]
    document.querySelector('#full-screen').style.display = 'block'
    document.querySelector("#full-screen").style.backgroundImage = `url(${gold.story})`;

    setTimeout(() => {
         document.querySelector("#full-screen").style.display = "none";
    }, 2000);
})