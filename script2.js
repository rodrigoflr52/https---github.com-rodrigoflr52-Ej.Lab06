(function () {


  function giphySearch(keyword) {
    return fetch(`http://api.giphy.com/v1/gifs/search?q=${keyword}&api_key=${GIPHY_KEY}&limit=5`)
      .then(response => response.json());
  }

  function appendImage(img) {
    let $div = $('<div class="img-wrapper"></div>');
    $('<div class="inner"></div>').append(img).appendTo($div);
    $('#animals').append($div)
  }
  
  function showLoader() {
    $('.loader-wrapper').addClass('hide');
  }
 
  function hideLoader() {
    $('.loader-wrapper').removeClass('hide');
  }
 

  function onImgLoad(img) {
    return new Promise((resolve, reject) => {
      img.onload = resolve;
    });
  }

  (function listenOnFormSubmit() {
    $('#animal-form').submit(async (ev) => {
      ev.preventDefault();

      let $input = $('#add-animal');

      main($input.val());
    });
  })();

  async function main(keyword) {
    const result = await giphySearch(keyword);
    $('#animals').html('');
    showLoader();

    let promises = [];
    result.data.forEach(gif => {
      let img = new Image();
      img.src = gif.images.original.url;
      promises.push(onImgLoad(img));

      appendImage(img);
    });

    await Promise.all(promises);
    hideLoader();
}})();
