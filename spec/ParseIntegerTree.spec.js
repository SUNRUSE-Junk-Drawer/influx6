describe("ParseIntegerTree", function(){
	it("empty", function(){
		expect(src.__get__("ParseIntegerTree")("", 35)).toBeNull()
	})

	it("a period", function(){
		expect(src.__get__("ParseIntegerTree")(".", 35)).toBeNull()
	})

	it("a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("$", 35)).toBeNull()
	})
	
	it("a letter", function(){
		expect(src.__get__("ParseIntegerTree")("e", 35)).toBeNull()
	})
	
	it("multiple digits preceded by a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("$7426", 35)).toBeNull()
	})
	
	it("multiple digits followed by a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("7426$", 35)).toBeNull()
	})
	
	it("multiple digits separated by a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("74$26", 35)).toBeNull()
	})
	
	it("multiple digits separated by a space", function(){
		expect(src.__get__("ParseIntegerTree")("74 26", 35)).toBeNull()
	})
	
	it("multiple digits preceded by a letter", function(){
		expect(src.__get__("ParseIntegerTree")("f7426", 35)).toBeNull()
	})
	
	it("multiple digits followed by a letter", function(){
		expect(src.__get__("ParseIntegerTree")("7426f", 35)).toBeNull()
	})
	
	it("multiple digits separated by a letter", function(){
		expect(src.__get__("ParseIntegerTree")("74f26", 35)).toBeNull()
	})
	
	it("multiple digits preceded by a period", function(){
		expect(src.__get__("ParseIntegerTree")(".7426", 35)).toBeNull()
	})
	
	it("multiple digits followed by a period", function(){
		expect(src.__get__("ParseIntegerTree")("7426.", 35)).toBeNull()
	})
	
	it("multiple digits separated by a period", function(){
		expect(src.__get__("ParseIntegerTree")("74.26", 35)).toBeNull()
	})
	
	it("zero", function(){
		expect(src.__get__("ParseIntegerTree")("0", 35)).toEqual({
			constant: "integer",
			value: 0,
            starts: 35,
            ends: 36
		})
	})
	
	it("one digit", function(){
		expect(src.__get__("ParseIntegerTree")("7", 35)).toEqual({
			constant: "integer",
			value: 7,
            starts: 35,
            ends: 36
		})
	})
	
	it("multiple digits", function(){
		expect(src.__get__("ParseIntegerTree")("7426", 35)).toEqual({
			constant: "integer",
			value: 7426,
            starts: 35,
            ends: 39
		})
	})
	
	it("multiple digits preceded by zeroes", function(){
		expect(src.__get__("ParseIntegerTree")("0007426", 35)).toEqual({
			constant: "integer",
			value: 7426,
            starts: 35,
            ends: 42
		})
	})
	
	it("multiple digits followed by zeroes", function(){
		expect(src.__get__("ParseIntegerTree")("7426000", 35)).toEqual({
			constant: "integer",
			value: 7426000,
            starts: 35,
            ends: 42
		})
	})
})