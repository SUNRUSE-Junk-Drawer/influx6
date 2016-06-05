describe("ParseFloatTree", function(){
	it("empty", function(){
		expect(src.__get__("ParseFloatTree")("")).toBeNull()
	})
	
	it("a period", function(){
		expect(src.__get__("ParseFloatTree")("$")).toBeNull()
	})

	it("one digit", function(){
		expect(src.__get__("ParseFloatTree")("4")).toBeNull()
	})
	
	it("multiple digits", function(){
		expect(src.__get__("ParseFloatTree")("4728")).toBeNull()
	})
	
	it("0.", function(){
		expect(src.__get__("ParseFloatTree")("0.")).toEqual({
			constant: "float",
			value: 0
		})
	})

	it("0..", function(){
		expect(src.__get__("ParseFloatTree")("0..")).toBeNull()
	})
	
	it("0.0", function(){
		expect(src.__get__("ParseFloatTree")("0.0")).toEqual({
			constant: "float",
			value: 0
		})
	})
	
	it("0..0", function(){
		expect(src.__get__("ParseFloatTree")("0..0")).toBeNull()
	})
	
	it(".0", function(){
		expect(src.__get__("ParseFloatTree")(".0")).toEqual({
			constant: "float",
			value: 0
		})
	})
	
	it("..0", function(){
		expect(src.__get__("ParseFloatTree")("..0")).toBeNull()
	})
	
	it("000.0", function(){
		expect(src.__get__("ParseFloatTree")("000.0")).toEqual({
			constant: "float",
			value: 0
		})
	})
	
	it("0.000", function(){
		expect(src.__get__("ParseFloatTree")("0.000")).toEqual({
			constant: "float",
			value: 0
		})
	})
	
	it("4.", function(){
		expect(src.__get__("ParseFloatTree")("4.")).toEqual({
			constant: "float",
			value: 4
		})
	})
	
	it("004.", function(){
		expect(src.__get__("ParseFloatTree")("004.")).toEqual({
			constant: "float",
			value: 4
		})
	})
	
	it("400.", function(){
		expect(src.__get__("ParseFloatTree")("400.")).toEqual({
			constant: "float",
			value: 400
		})
	})
	
	it("4.7", function(){
		expect(src.__get__("ParseFloatTree")("4.7")).toEqual({
			constant: "float",
			value: 4.7
		})
	})
	
	it(".4", function(){
		expect(src.__get__("ParseFloatTree")(".4")).toEqual({
			constant: "float",
			value: 0.4
		})
	})
	
	it(".400", function(){
		expect(src.__get__("ParseFloatTree")(".400")).toEqual({
			constant: "float",
			value: 0.4
		})
	})
	
	it(".004", function(){
		expect(src.__get__("ParseFloatTree")(".004")).toEqual({
			constant: "float",
			value: 0.004
		})
	})
	
	it("432.7", function(){
		expect(src.__get__("ParseFloatTree")("432.7")).toEqual({
			constant: "float",
			value: 432.7
		})
	})
	
	it("4.732", function(){
		expect(src.__get__("ParseFloatTree")("4.732")).toEqual({
			constant: "float",
			value: 4.732
		})
	})
	
	it("425.734", function(){
		expect(src.__get__("ParseFloatTree")("425.734")).toEqual({
			constant: "float",
			value: 425.734
		})
	})
})