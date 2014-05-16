//asynch loads the possible options for the most recent selection
function loadOptions(e) {
	chestOption = $(this).data("value");
	loader(chestOption, "cup");
	loader(chestOption, "hips");
}

function loader(chestOption, part) {
	//example: body/chest1/hips should call hips1.png - hips3.png
	var path = "body/" + ["chest" + chestOption, part, part].join('/');
	var i = 1;
	if (part == 'cup') { var j=4; }
	else { var j=3; }
	//if no only 1 option exists, remove placeholder then add new elements
	while (i <= j+1) {
		//create <img src="/size4/waist4/chest2/cup1.png" class="cup" id="cup1"/> 
		var img = $("<img />").attr('src', path + i + '.png').addClass(part).attr('id', part + i);
		i++;
	}
}

//swap to the selected option for the bodypart passed to the function
function swapBodypart(e) {
	part = $(this).data("part");
	$("." + part + "Option.selection").removeClass("selection");
	$(this).addClass("selection");
	var chestOption = $(".chestOption.selection").data("value");
	if (part == 'chest') {
		var cupOption = $(".cupOption.selection").data("value");
		var hipsOption = $(".hipsOption.selection").data("value");
		var chestImg = "body/chest" + chestOption + "/chest" + chestOption + ".png";
		var cupImg = "body/chest" + chestOption + "/cup/cup" + cupOption + ".png";
		var hipsImg = "body/chest" + chestOption + "/hips/hips" + hipsOption + ".png";
		$("#bodyContainer").css('background-image', "url(" + chestImg +  ")");
		$("#cupContainer").css('background-image', "url(" + cupImg + ")");
		$("#hipsContainer").css('background-image', "url(" + hipsImg + ")");
	} else {
		var option = $("." + part + "Option.selection").data("value");
		var img = "body/chest" + chestOption + "/" + part + "/" + part + option + ".png";
		console.log("swapping to " + img);
		$("#" + part + "Container").css('background-image', "url(" + img +  ")");
	}
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
		url: "ThanDemo/submit.php",
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
	$(".cupOption, .hipsOption, #submit").prop("disabled", false);
}

function resize(e) {
	$(".sizeOption").removeClass("selection");
	$(this).addClass("selection");
	newSize = $(this).data("value");
	$("#size").data("value", newSize);
}

//listeners to enable cup and hips buttons
$(".chestOption").click(enableChildren);
//listeners on click to asynch load the right options
$(".chestOption").click(loadOptions);
//listeners on click to display correct image
$(".chestOption, .hipsOption, .cupOption").click(swapBodypart);
//listeners on click to set size data value
$(".sizeOption").click(resize);
//listener for submit
$("#submit").click(submit);