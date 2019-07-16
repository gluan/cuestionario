$("#flipbook").turn({
    width: 400,
    height: 300,
    autoCenter: true
});

$("#flipbook").bind("turning", function(event, page, view) {
  if (page==1) {
    event.preventDefault(); //will not happen at page 1
  }else{
       alert("Turning the page to: "+page);
  }
});
