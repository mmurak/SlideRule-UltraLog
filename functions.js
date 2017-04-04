function regularise(value, minValue, maxValue, factor) {
	if (value <= 0) {
		value = minValue;
	}
	while(value < minValue) {
		value *= factor;
	}
	while(value > maxValue) {
		value /= factor;
	}
	return value;
}

function rangeChecker(value, minValue, maxValue, message) {
	while ((value < minValue) || (value > maxValue)) {
		value = window.prompt(message);
		if (value === null) {
			value = minValue;
		}
		value = convertGaugePoints(value);
	}
	return value;
}

function ScaleLL00(val) {
	val = rangeChecker(val, 0.9890, 0.9990, "LL00: 0.9890〜0.9990");
	return Math.round(Math.log10(Math.log(val) * -1000.0) * magnification);
}

function ScaleLL01(val) {
	val = rangeChecker(val, 0.900, 0.99005, "LL01: 0.900〜0.99005");
	return Math.round(Math.log10(Math.log(val) * -100.0) * magnification);
}

function ScaleLL02(val) {
	val = rangeChecker(val, 0.350, 0.910, "LL02: 0.350〜0.910");
	return Math.round(Math.log10(Math.log(val) * -10.0) * magnification);
}

function ScaleLL03(val) {
	val = rangeChecker(val, 0.00001, 0.400, "LL03: 1.0e-5〜0.400");
	return Math.round(Math.log10(Math.log(val) * -1.0) * magnification);
}

function ScaleCFDF(val) {
	val = regularise(val, Math.PI, Math.PI * 10.0, 10.0);
	return Math.round(Math.log10(val / Math.PI) * magnification);
}

function ScaleCIF(val) {
	val = regularise(val, Math.PI, Math.PI * 10.0, 10.0);
	return Math.round(Math.log10(100.0 / (val * Math.PI)) * magnification);
}

function ScaleSH1(val) {
	val = rangeChecker(val, 0.1, 0.9, "SH1: 0.1〜0.9");
	return Math.round(Math.log10((Math.exp(val) - Math.exp(-val)) * 10.0 / 2.0) * magnification);
}

function ScaleSH2(val) {
	val = rangeChecker(val, 0.85, 3.0, "SH2: 0.85〜3.0");
	return Math.round(Math.log10((Math.exp(val) - Math.exp(-val)) / 2.0) * magnification);
}

function ScaleCH(val) {
	val = rangeChecker(val, 0.0, 3.0, "CH: 0.0〜3.0");
	return Math.round(Math.log10((Math.exp(val) + Math.exp(-val)) / 2.0) * magnification);
}

function ScaleTH(val) {
	val = rangeChecker(val, 0.1, 3.5, "TH: 0.1〜3.5");
	return Math.round(Math.log10(((Math.exp(val) - Math.exp(-val)) / (Math.exp(val) + Math.exp(-val))) * 10.0) * magnification);
}

function ScaleLN(val) {
	val = rangeChecker(val, 0.0, 2.31, "Ln: 0.0〜2.31");
	return Math.round(Math.log10(Math.exp(val)) * magnification);
}

function ScaleL(val) {
	val = rangeChecker(val, 0.0, 1.0, "L: 0.0〜1.0");
	return Math.round(val * magnification);
}

function ScaleCI(val) {
	val = regularise(val, 1.0, 10.0, 10.0);
	return Math.round(Math.log10(10.0 / val) * magnification);
}

function ScaleCD(val) {
	val = regularise(val, 1.0, 10.0, 10.0);
	return Math.round(Math.log10(val) * magnification);
}

function ScaleLL3(val) {
	val = rangeChecker(val, 2.5, 1.0e5, "LL3: 2.5〜1.0e5");
	return Math.round(Math.log10(Math.log(val)) * magnification);
}

function ScaleLL2(val) {
	val = rangeChecker(val, 1.1, 3.0, "LL2: 1.1〜3.0");
	return Math.round(Math.log10(Math.log(val) * 10.0) * magnification);
}

function ScaleLL1(val) {
	val = rangeChecker(val, 1.010, 1.110, "LL1: 1.010〜1.110");
	return Math.round(Math.log10(Math.log(val) * 100.0) * magnification);
}

function ScaleLL0(val) {
	val = rangeChecker(val, 1.0010, 1.0110, "LL0: 1.0010〜1.0110");
	return Math.round(Math.log10(Math.log(val) * 1000.0) * magnification);
}

function ScaleR1(val) {
	val = rangeChecker(val, 1.0, 3.17, "R1: 1.0〜3.17");
	return Math.round(Math.log10(val * val) * magnification);
}

function ScaleR2(val) {
	val = rangeChecker(val, 3.1, 10.0, "R2: 3.1〜10.0");
	return Math.round(((Math.log10(val * val)) - 1.0) * magnification);
}

function ScaleK(val) {
	val = regularise(val, 1.0, 1000.0);
	return Math.round(Math.log10(Math.pow(val, 1.0/3.0)) * magnification);
}

function ScaleAB(val) {
	val = regularise(val, 1.0, 100.0, 100.0);
	return Math.round(Math.log10(Math.pow(val, 1.0/2.0)) * magnification);
}

function ScaleT1(val) {
	val = rangeChecker(val, 5.5, 45, "T1: 5.5〜45.0");
	return Math.round(Math.log10(Math.tan(val * Math.PI / 180.0) * 10.0) * magnification);
}

function ScaleT2(val) {
	val = rangeChecker(val, 45, 84.3, "T2: 45.0〜84.3");
	return Math.round(Math.log10(Math.tan(val * Math.PI / 180.0)) * magnification);
}

function ScaleST(val) {
	val = rangeChecker(val, 0.55, 6.0, "ST: 0.55〜6.0");
	return Math.round(Math.log10(Math.sin(val * Math.PI / 180.0) * 100.0) * magnification);
}

function ScaleS(val) {
	val = rangeChecker(val, 5.5, 90.0, "S: 5.5〜90.0");
	return Math.round(Math.log10(Math.sin(val * Math.PI / 180.0) * 10.0) * magnification);
}

function ScaleP(val) {
	val = rangeChecker(val, 0.0, 0.995, "P: 0.0〜0.995");
	return Math.round(Math.log10(Math.sqrt(1.0 - (val * val)) * 10.0) * magnification);
}

function ScaleH1(val) {
	val = rangeChecker(val, 1.005, 1.45, "H1: 1.005〜1.45");
	return Math.round(Math.log10(Math.sqrt((val * val) - 1.0) * 10.0) * magnification);
}

function ScaleH2(val) {
	val = rangeChecker(val, 1.4, 10.05, "H2: 1.4〜10.05");
	return Math.round(Math.log10(Math.sqrt((val * val) - 1.0)) * magnification);
}

function ScaleDI(val) {
	val = regularise(val, 1.0, 10.0, 10.0);
	return Math.round(Math.log10(10.0 / val) * magnification);
}

function ScaleQ1(val) {
	val = rangeChecker(val, 1.0, 2.16, "Q1: 1.0〜2.16");
	return Math.round(Math.log10(val) * 3.0 * magnification);
}

function ScaleQ2(val) {
	val = rangeChecker(val, 2.15, 4.65, "Q2: 2.15〜4.65");
	return Math.round(((Math.log10(val) * 3.0) - 1.0) * magnification);
}

function ScaleQ3(val) {
	val = rangeChecker(val, 4.64, 10.0, "Q3: 4.64〜10.0");
	return Math.round(((Math.log10(val) * 3.0) - 2.0) * magnification);
}

