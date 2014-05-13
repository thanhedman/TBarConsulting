//asynch loads the possible options for the most recent selection
function loadOptions(e) {
	chestOption = $(this).data("value");
	loader(chestOption, "cup");
	loader(chestOption, "hips");
}

function loader(chestOption, part) {
var target = part + "Container";
	if ( true ) {
		//example: body/chest1/hips should call hips1.png - hips3.png
		var path = "body/" + ["chest" + chestOption, part, part].join('/');
	} else {
		alert("parameter mismatch");
		return false;
	}
	var i = 1;
	if (part == 'cup') { var j=4; }
	else { var j=3; }
	//if no only 1 option exists, remove placeholder then add new elements
	if ($("." + part).length == 0) {
		while (i <= j+1) {
			//eg create <img src="/size4/waist4/chest2/cup1.png" class="cup" id="cup1"/> unless it's image 1, set as invisible
			if (i > 1) { var img = $("<img />").attr('src', path + i + '.png').addClass(part).attr('id', part + i).load(loadCallback(target, img));}
			else { var img = $("<img />").attr('src', path + i + '.png').addClass(part).attr('id', part + i).addClass("selected").load(loadCallback(target, img));}
			i++;
		}
	//if multiple option images have been loaded
	} else {
		console.log("resourcing images from " + path)
		//set them each to the appropriate src
		while (i <= j) {
			var img = $("#" + part + i).attr('src', path + i + ".png")
				.load(function() {
					//if image isn't image like, let someone know
					if (!this.complete || typeof this.naturalWidth == "undefined" || this.naturalWidth == 0) {
						console.log('broken image!');
					} else {
						
					}
				});
			i++;
		}
	}
}

//swap to the selected option for the bodypart passed to the function
function swapBodypart(e) {
	part = $(this).data("part");
	var option = $(this).data("value");
	var oldOption = $("." + part + "Option.selection").data("value");
	$("." + part + "Option.selection").removeClass("selection");
	$("#" + part + option);
	$("#" + part + oldOption).toggle().removeClass("selected");
	$("#" + part + option).toggle().addClass("selected");
	$(this).addClass("selection");
}


//collect all current measurements and POST them
function submit(e){
	var hips = $(".hipsOption.selection").data("value");
	console.log(hips);
	var chest = $(".chestOption.selection").data("value");
	console.log(chest);
	var cup = $(".cupOption.selection").data("value");
	console.log(cup);
	var size = $("#size").data("value");
	console.log(size);
//	var shape = $("#shape").data("value");
	
	$.ajax({
		type: "POST",
		url: "submit.php",
		data: {	command: 'submitSubjective',
				size: size,
				hips: hips,
				chest: chest,
				cup: cup}
	})
	.success(function(data){
		alert("Bra size: " + data.band + data.cupsize + " and bottom size: " + data.bottom);
	});
	
}

function loadCallback(target, img) {
	$("#" + target).append(img);
}

function enableChildren(e) {
	$(".cupOption, .hipsOption").prop("disabled", false);
}

//listeners to enable cup and hips buttons
$(".chestOption").click(enableChildren);
//listeners on click to asynch load the right options
$(".chestOption").click(loadOptions);
//listeners on click to display correct image
$(".chestOption, .hipsOption, .cupOption").click(swapBodypart);
//listener for submit
$("#submit").click(submit);