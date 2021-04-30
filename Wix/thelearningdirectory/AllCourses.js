import wixData from 'wix-data';
var dnow = new Date();
var plan3;
var plan4;
var change = 0;
var size = 0;

$w.onReady(async function () {
	$w("#dropdown1").options.push({
		"value": '',
		"label": 'All'
	})
	filterData();
	await getDataPlan3();
	getDataPlan4();
});

export function button30_click(event) {
	let category = $w('#dropdown1').value;
	let keywork = $w('#input1').value;
	let dnow = new Date();
	var filter = wixData.filter();
	if(category.length !== 0){
		filter = filter.eq("category", category).and(filter.ge("dateFinalCourse", dnow));
	}
	if( keywork.length !== 0){
		filter = filter.contains("title", keywork).and(filter.ge("dateFinalCourse", dnow));
	}

	$w("#dataset17").setFilter(filter)
}

function filterData() {
	let filter = wixData.filter();
	let sort = wixData.sort();
	filter = filter.eq('active',true).and(filter.eq('plan','3f7325a4-5b0f-45dd-9397-b9a3ce1f2dd4')).and(filter.ge('dateFinalCourse', dnow));
	$w('#dataset17').setFilter(filter);
	//console.log(filter);
}

function getDataPlan3() {
	
	let filterPlan3 = wixData.query("AllCourses");
	return filterPlan3.eq('plan','13b985c8-bef6-454e-90bf-7fb562ff6cb3').and(filterPlan3.ge('dateFinalCourse', dnow)).and(filterPlan3.eq('active',true)).find().then(results => {
		plan3 = results.items;
		size = plan3.length;
		
		if(size > 2){
			$w('#sImage0').src = plan3[change].image;
			$w('#sTitle0').text = plan3[change].title;
			$w('#sShortDescription0').text = plan3[change].shortDescription;
			$w('#sButton0').link = plan3[change]['link-allcourses-title'];
			change++
			$w('#sImage1').src = plan3[change].image;
			$w('#sTitle1').text = plan3[change].title;
			$w('#sShortDescription1').text = plan3[change].shortDescription;
			$w('#sButton1').link = plan3[change]['link-allcourses-title'];
		}else{
			switch (size){
				case 0:
					$w('#boxPlan3').collapse();
					$w('#left').collapse();
					$w('#right').collapse();
					$w('#boxLeft').collapse();
					$w('#boxRight').collapse();
					break;
				case 1:
					$w('#boxRight').hide();
					$w('#right').hide();
					$w('#left').hide();
					$w('#sImage0').src = plan3[change].image;
					$w('#sTitle0').text = plan3[change].title;
					$w('#sShortDescription0').text = plan3[change].shortDescription;
					$w('#sButton0').link = plan3[change]['link-allcourses-title'];
					break;
				case 2:
					$w('#right').hide();
					$w('#left').hide();

					$w('#sImage0').src = plan3[change].image;
					$w('#sTitle0').text = plan3[change].title;
					$w('#sShortDescription0').text = plan3[change].shortDescription;
					$w('#sButton0').link = plan3[change]['link-allcourses-title'];
					change++

					$w('#sImage1').src = plan3[change].image;
					$w('#sTitle1').text = plan3[change].title;
					$w('#sShortDescription1').text = plan3[change].shortDescription;
					$w('#sButton1').link = plan3[change]['link-allcourses-title'];
					break;
			}
		}
		return plan3;
	})
}

export function right_click(event) {
	if(change >= size-1){
		//$w('#right').hide();
	}else{
		$w('#sImage0').src = plan3[change].image;
		$w('#sTitle0').text = plan3[change].title;
		$w('#sShortDescription0').text = plan3[change].shortDescription;
		$w('#sButton0').link = plan3[change]['link-allcourses-title'];
		change++
		if(change >= size-1){
			//$w('#right').hide();
			$w('#sImage1').src = plan3[change].image;
			$w('#sTitle1').text = plan3[change].title;
			$w('#sShortDescription1').text = plan3[change].shortDescription;
			$w('#sButton1').link = plan3[change]['link-allcourses-title'];
		}else{
			$w('#sImage1').src = plan3[change].image;
			$w('#sTitle1').text = plan3[change].title;
			$w('#sShortDescription1').text = plan3[change].shortDescription;
			$w('#sButton1').link = plan3[change]['link-allcourses-title'];
		}
	}
}

export function left_click(event) {
	console.log(change);
	change--
	if(change < 1){
		//$w('#left').hide();
		change = 1;
	}else{
		$w('#sImage1').src = plan3[change].image;
		$w('#sTitle1').text = plan3[change].title;
		$w('#sShortDescription1').text = plan3[change].shortDescription;
		$w('#sButton1').link = plan3[change]['link-allcourses-title'];
		change--
		if(change <= 1){
			//$w('#left').hide();
			$w('#sImage0').src = plan3[change].image;
			$w('#sTitle0').text = plan3[change].title;
			$w('#sShortDescription0').text = plan3[change].shortDescription;
			$w('#sButton0').link = plan3[change]['link-allcourses-title'];
		} else{
			$w('#sImage0').src = plan3[change].image;
			$w('#sTitle0').text = plan3[change].title;
			$w('#sShortDescription0').text = plan3[change].shortDescription;
			$w('#sButton0').link = plan3[change]['link-allcourses-title'];
		}
	}
	change++;
	console.log(change);
}


function getDataPlan4() {
	let filterPlan4 = wixData.query("Banner");
	return filterPlan4.eq('active',true).and(filterPlan4.ge('dateFinal',dnow)).find().then(results => {
		plan4 = results.items;
		let sizePlan4 = plan4.length;

		switch (sizePlan4){
			case 0:
				$w('#slideshow1').collapse();
				$w('#slideshow4').collapse();
				break;
			
			case 1:
				$w('#slideshow1').collapse();
				$w('#imageUno').alt = plan4[0].title;
				$w('#imageUno').src = plan4[0].image;
				$w('#imageUno').link = plan4[0].link;
				break;

			case 2:
				//banner 1
				$w('#imageUno').alt = plan4[0].title;
				$w('#imageUno').src = plan4[0].image;
				$w('#imageUno').link = plan4[0].link;
				//banner 2
				$w('#imageDos').alt = plan4[1].title;
				$w('#imageDos').src = plan4[1].image;
				$w('#imageDos').link = plan4[1].link;
				break;
		}
	})
}