describe("ParseFloatTree", function(){
	it("empty", function(){
		expect(src.__get__("ParseFloatTree")("", 35)).toBeNull()
	})
	
	it("a period", function(){
		expect(src.__get__("ParseFloatTree")("$", 35)).toBeNull()
	})

	it("one digit", function(){
		expect(src.__get__("ParseFloatTree")("4", 35)).toBeNull()
	})
	
	it("multiple digits", function(){
		expect(src.__get__("ParseFloatTree")("4728", 35)).toBeNull()
	})
	
	it("0.", function(){
		expect(src.__get__("ParseFloatTree")("0.", 35)).toEqual({
			constant: "float",
			value: 0,
            starts: 35,
            ends: 37
		})
	})

	it("0..", function(){
		expect(src.__get__("ParseFloatTree")("0..", 35)).toBeNull()
	})
	
	it("0.0", function(){
		expect(src.__get__("ParseFloatTree")("0.0", 35)).toEqual({
			constant: "float",
			value: 0,
            starts: 35,
            ends: 38
		})
	})
	
	it("0..0", function(){
		expect(src.__get__("ParseFloatTree")("0..0", 35)).toBeNull()
	})
	
	it(".0", function(){
		expect(src.__get__("ParseFloatTree")(".0", 35)).toEqual({
			constant: "float",
			value: 0,
            starts: 35,
            ends: 37
		})
	})
	
	it("..0", function(){
		expect(src.__get__("ParseFloatTree")("..0", 35)).toBeNull()
	})
	
	it("000.0", function(){
		expect(src.__get__("ParseFloatTree")("000.0", 35)).toEqual({
			constant: "float",
			value: 0,
            starts: 35,
            ends: 40
		})
	})
	
	it("0.000", function(){
		expect(src.__get__("ParseFloatTree")("0.000", 35)).toEqual({
			constant: "float",
			value: 0,
            starts: 35,
            ends: 40
		})
	})
	
	it("4.", function(){
		expect(src.__get__("ParseFloatTree")("4.", 35)).toEqual({
			constant: "float",
			value: 4,
            starts: 35,
            ends: 37
		})
	})
	
	it("004.", function(){
		expect(src.__get__("ParseFloatTree")("004.", 35)).toEqual({
			constant: "float",
			value: 4,
            starts: 35,
            ends: 39
		})
	})
	
	it("400.", function(){
		expect(src.__get__("ParseFloatTree")("400.", 35)).toEqual({
			constant: "float",
			value: 400,
            starts: 35,
            ends: 39
		})
	})
	
	it("4.7", function(){
		expect(src.__get__("ParseFloatTree")("4.7", 35)).toEqual({
			constant: "float",
			value: 4.7,
            starts: 35,
            ends: 38
		})
	})
	
	it(".4", function(){
		expect(src.__get__("ParseFloatTree")(".4", 35)).toEqual({
			constant: "float",
			value: 0.4,
            starts: 35,
            ends: 37
		})
	})
	
	it(".400", function(){
		expect(src.__get__("ParseFloatTree")(".400", 35)).toEqual({
			constant: "float",
			value: 0.4,
            starts: 35,
            ends: 39
		})
	})
	
	it(".004", function(){
		expect(src.__get__("ParseFloatTree")(".004", 35)).toEqual({
			constant: "float",
			value: 0.004,
            starts: 35,
            ends: 39
		})
	})
	
	it("432.7", function(){
		expect(src.__get__("ParseFloatTree")("432.7", 35)).toEqual({
			constant: "float",
			value: 432.7,
            starts: 35,
            ends: 40
		})
	})
	
	it("4.732", function(){
		expect(src.__get__("ParseFloatTree")("4.732", 35)).toEqual({
			constant: "float",
			value: 4.732,
            starts: 35,
            ends: 40
		})
	})
	
	it("425.734", function(){
		expect(src.__get__("ParseFloatTree")("425.734", 35)).toEqual({
			constant: "float",
			value: 425.734,
            starts: 35,
            ends: 42
		})
	})
})