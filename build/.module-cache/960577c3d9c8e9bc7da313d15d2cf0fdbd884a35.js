var images = ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg', 'image5.jpg'];
$('html').css({'background-image': 'url(images/' + images[Math.floor(Math.random() * images.length)] + ')'});