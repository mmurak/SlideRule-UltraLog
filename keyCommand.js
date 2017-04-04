function convertGaugePoints(val) {
	if (val.match(/^\d+\.?\d*([eE][+-]?\d+)?$/)) {	// numeric check
		//
	} else {
		switch (val.toUpperCase()) {
			case "E" :					// E
				val = 2.7182818;
				break;
			case "PI" :					// PI
				val = 3.1415926;
				break;
			case "RS" :					// ρ″ = 180*60*60/PI
				val = 2.062648;
				break;
			case "RM" :					// ρ′ = 180*60/PI
				val = 3.437747;
				break;
			case "R" :					// R = 180/PI
				val = 5.729578;
				break;
			case "C" :					// speed of light
				val = 2.997925;
				break;
			case "G" :					// g
				val = 9.806650;
				break;
			default:
				val = 0.0;			// not registered
		}
	}
	return val;
}



function KeyCommand(e) {
	e = e || window.event;
	//	alert(e.keyCode);
	shift   = typeof e.modifiers == 'undefined' ? e.shiftKey : e.modifiers & Event.SHIFT_MASK; 
	// Immediate Command
	if (e.keyCode == 27) {		// ESC
		ClearField();
	} else if ((e.keyCode == 187)||(e.keyCode == 61)) {		// = (syntax sugar of LX and RX)
		if (currentStatorPos > currentSliderPos) {		// protruding right?
			destSliderPos = 0;
			destStatorPos = destSliderPos - currentSliderPos + currentStatorPos;
		} else if (currentStatorPos < currentSliderPos) {		// protruding left?
			destSliderPos = magnification;
			destStatorPos = destSliderPos - currentSliderPos + currentStatorPos;
		}
		SliderOp();
//	} else if ((e.keyCode == 189)||(e.keyCode == 173)) {		// - (slider swap and disable negative input)
	} else if (e.keyCode == 191) {		// / (slider swap and disable negative input)
		if (currentStatorPos < 0) {
			destStatorPos += magnification;
		} else if (currentStatorPos > magnification) {
			destStatorPos -= magnification;
		} else if (currentSliderPos > currentStatorPos) {		// protruding to left
			destSliderPos -= magnification;
		} else if (currentSliderPos < currentStatorPos) {		// protruding to right
			destSliderPos += magnification;
		}
		SliderOp();
	} else if (e.keyCode == 9) {		// TAB (flip scale)
		FlipScale();
	} else if (e.keyCode == 37) {		// left arrow
		if (shift) {
			ScrollFullLeft();
		} else {
			ScrollHalfLeft();
		}
	} else if (e.keyCode == 39) {		// right arrow
		if (shift) {
			ScrollFullRight();
		} else {
			ScrollHalfRight();
		}
	} else if (e.keyCode == 38) {		// up arrow - Close slider with fixed stator
		destSliderPos = currentStatorPos;
		SliderOp();
	} else if (e.keyCode == 40) {		// down arrow - Close stator with fixed slider
		destStatorPos = currentSliderPos;
		SliderOp();
	} else if (e.keyCode == 13) {		// RETURN --- Command with RETURN
		cursorMode = false;
		comLine = document.getElementById('entry').value.trim();
		// sanitize
		comLine = comLine.replace(/[^a-zA-Z0-9\.\-\s\|]/, '');
		// separate command and parameters
		comLine.match(/(\S+)\s*(.*)/);
		scaleID = RegExp.$1;
		val = RegExp.$2;
		val = val.trim();
		// convert gauge point to value / number to straight value
		if (val.match(/^\d+\.?\d*([eE][+-]?\d+)?$/)) {	// numeric check
			// vacant
		} else {
			val = convertGaugePoints(val);
		}
		// set hairline mode flag
		if (scaleID.match(/^[hH]\D/)) {
			cursorMode = true;
			scaleID = scaleID.substring(1);
		}
		switch(scaleID.toUpperCase()) {
			case "LX" :			// slider left index
				destSliderPos = 0;
				if (cursorMode) {
					destStatorPos = destSliderPos - currentSliderPos + currentStatorPos;
				}
				break;
			case "RX" :			// slider right index
				destSliderPos = magnification;
				if (cursorMode) {
					destStatorPos = destSliderPos - currentSliderPos + currentStatorPos;
				}
				break;
			case "LL00" :
				destStatorPos = ScaleLL00(val);
				SyncSlider();
				break;
			case "LL01" :
				destStatorPos = ScaleLL01(val);
				SyncSlider();
				break;
			case "LL02" :
				destStatorPos = ScaleLL02(val);
				SyncSlider();
				break;
			case "LL03" :
				destStatorPos = ScaleLL03(val);
				SyncSlider();
				break;
			case "DF" :
				destStatorPos = ScaleCFDF(val);
				SyncSlider();
				break;
			case "CF" :
				destSliderPos = ScaleCFDF(val);
				SyncStatorIfNecessary();
				break;
			case "CIF" :
				destSliderPos = ScaleCIF(val);
				SyncStatorIfNecessary();
				break;
			case "SH1" :
				destSliderPos = ScaleSH1(val);
				SyncStatorIfNecessary();
				break;
			case "SH2" :
				destSliderPos = ScaleSH2(val);
				SyncStatorIfNecessary();
				break;
			case "CH" :
				destSliderPos = ScaleCH(val);
				SyncStatorIfNecessary();
				break;
			case "TH" :
				destSliderPos = ScaleTH(val);
				SyncStatorIfNecessary();
				break;
			case "LN" :
				destSliderPos = ScaleLN(val);
				SyncStatorIfNecessary();
				break;
			case "L" :
				destSliderPos = ScaleL(val);
				SyncStatorIfNecessary();
				break;
			case "CI" :
				destSliderPos = ScaleCI(val);
				SyncStatorIfNecessary();
				break;
			case "C" :
				destSliderPos = ScaleCD(val);
				SyncStatorIfNecessary();
				break;
			case "D" :
				destStatorPos = ScaleCD(val);
				SyncSlider();
				break;
			case "LL3" :
				destStatorPos = ScaleLL3(val);
				SyncSlider();
				break;
			case "LL2" :
				destStatorPos = ScaleLL2(val);
				SyncSlider();
				break;
			case "LL1" :
				destStatorPos = ScaleLL1(val);
				SyncSlider();
				break;
			case "LL0" :
				destStatorPos = ScaleLL0(val);
				SyncSlider();
				break;
			case "CONST" :
				destStatorPos = ScaleCD(val);
				SyncSlider();
				break;
			case "R1" :
				destStatorPos = ScaleR1(val);
				SyncSlider();
				break;
			case "R2" :
				destStatorPos = ScaleR2(val);
				SyncSlider();
				break;
			case "K" :
				destStatorPos = ScaleK(val);
				SyncSlider();
				break;
			case "A" :
				destStatorPos = ScaleAB(val);
				SyncSlider();
				break;
			case "B" :
				destSliderPos = ScaleAB(val);
				SyncStatorIfNecessary();
				break;
			case "T1" :
				destSliderPos = ScaleT1(val);
				SyncStatorIfNecessary();
				break;
			case "T2" :
				destSliderPos = ScaleT2(val);
				SyncStatorIfNecessary();
				break;
			case "ST" :
				destSliderPos = ScaleST(val);
				SyncStatorIfNecessary();
				break;
			case "S" :
				destSliderPos = ScaleS(val);
				SyncStatorIfNecessary();
				break;
			case "P" :
				destSliderPos = ScaleP(val);
				SyncStatorIfNecessary();
				break;
			case "H1" :
				destSliderPos = ScaleH1(val);
				SyncStatorIfNecessary();
				break;
			case "H2" :
				destSliderPos = ScaleH2(val);
				SyncStatorIfNecessary();
				break;
			case "DI" :
				destStatorPos = ScaleDI(val);
				SyncSlider();
				break;
			case "Q1" :
				destStatorPos = ScaleQ1(val);
				SyncSlider();
				break;
			case "Q2" :
				destStatorPos = ScaleQ2(val);
				SyncSlider();
				break;
			case "Q3" :
				destStatorPos = ScaleQ3(val);
				SyncSlider();
				break;
			default :
		}
		SliderOp();
	}
}
