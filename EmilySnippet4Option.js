//listeners on click to asynch load the right options
$(".waistOption").on("click", loadOptions( $("#size").data("value"), $(this).data("value"), "chest", "chestContainer" ) );
$(".waistOption").on("click", loadOptions( $("#size").data("value"), $(this).data("value"), "hips", "hipsContainer" ) );
$(".chestOption").on("click", loadOptions( $("#size").data("value"), $("#waist").data("value"), "cup", "cupContainer", $(this).data("value") ) );
//listeners on click to display correct image
$(".chestOption").on("click", swapBodypart( "chest" ) );
$(".waistOption").on("click", swapBodypart( "waist" ) );
$(".hipsOption").on("click", swapBodypart( "hips" ) );
$(".cupOption").on("click", swapBodypart( "cup" ) );

//asynch loads the possible options for the most recent selection
function loadOptions(size, waistOption, part, target, chestOption) {
	if ( typeof chestOption == 'undefined' ) {
		//example: /size1/waist1/hips should call hips1.png - hips 4.png
		var path = "/" + ["size" + size, "waist" + waistOption, part].join('/');
	}
	if ( typeof chestOption !== 'undefined' && part == 'cup') {
		//example: /size3/chest2/ should call cup1.png - cup4.png
		var path = "/" + ["size" + size, "waist" + waistOption, "chest" + chestOption, part].join('/');
	} else {
		alert("parameter mismatch");
		return false;
	}
	var i = 1;
	if (part == 'cup') { var j=4; }
	else { var j=3; }
	//if no only 1 option exists, remove placeholder then add new elements
	if ($("."+part).length == 0) {
		while (i <= j) {
			//eg create <img src="/size4/waist4/chest2/cup1.png" class="cup" id="cup1"/> unless it's image 1, set as invisible
			if (i > 1) { var img = $("<img />").attr('src', path + i + '.png').addClass(part).attr('id', part + i).css('display', 'none'); }
			else { var img = $("<img />").attr('src', path + i + '.png').addClass(part).attr('id', part + i).addClass("selection"); }
				//onload callback
			    $("#" + part + i).load(function() {
					//if image isn't image like, let someone know
					if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
						alert('broken image!');
					} else {
						//remove placeholder
						$("#" + part + "Placeholder").remove();
						//add image at target
						$("#" + target).append(img);
					}
				});
			i++;
		}
	//if multiple option images have been loaded
	} else {
		//set them each to the appropriate src
		while (i <= 4) {
			var img = $("#" + part + i).attr('src', path + i + .png);
			i++;
		}
	}
}

//swap to the selected option for the bodypart passed to the function
function swapBodypart( part ) {
	var option = $(this).data("value");
	$(this).addClass("selection");
	$("." + part).css("display", "none");
	$("#" + part + option).fadeToggle();
}


//collect all current measurements and POST them
function submit(){
	var waist = $(".waistOption.selection").data("value");
	var hips = $(".hipsOption.selection").data("value");
	var chest = $(".chestOption.selection").data("value");
	var cup = $(".cupOption.selection").data("value");
	var size = $("#size").data("value");
	var shape = $("#shape").data("value");
	
	$.ajax({
		type: "POST",
		url: "submit",
		data: { shape: shape:
				size: size,
				waist: waist,
				hips: hips,
				chest: chest,
				cup: cup}
	});
}