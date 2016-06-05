describe("ParseIntegerTree", function(){
	it("empty", function(){
		expect(src.__get__("ParseIntegerTree")("")).toBeNull()
	})

	it("a period", function(){
		expect(src.__get__("ParseIntegerTree")(".")).toBeNull()
	})

	it("a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("$")).toBeNull()
	})
	
	it("a letter", function(){
		expect(src.__get__("ParseIntegerTree")("e")).toBeNull()
	})
	
	it("multiple digits preceded by a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("$7426")).toBeNull()
	})
	
	it("multiple digits followed by a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("7426$")).toBeNull()
	})
	
	it("multiple digits separated by a symbol", function(){
		expect(src.__get__("ParseIntegerTree")("74$26")).toBeNull()
	})
	
	it("multiple digits separated by a space", function(){
		expect(src.__get__("ParseIntegerTree")("74 26")).toBeNull()
	})
	
	it("multiple digits preceded by a letter", function(){
		expect(src.__get__("ParseIntegerTree")("f7426")).toBeNull()
	})
	
	it("multiple digits followed by a letter", function(){
		expect(src.__get__("ParseIntegerTree")("7426f")).toBeNull()
	})
	
	it("multiple digits separated by a letter", function(){
		expect(src.__get__("ParseIntegerTree")("74f26")).toBeNull()
	})
	
	it("multiple digits preceded by a period", function(){
		expect(src.__get__("ParseIntegerTree")(".7426")).toBeNull()
	})
	
	it("multiple digits followed by a period", function(){
		expect(src.__get__("ParseIntegerTree")("7426.")).toBeNull()
	})
	
	it("multiple digits separated by a period", function(){
		expect(src.__get__("ParseIntegerTree")("74.26")).toBeNull()
	})
	
	it("zero", function(){
		expect(src.__get__("ParseIntegerTree")("0")).toEqual({
			constant: "integer",
			value: 0
		})
	})
	
	it("one digit", function(){
		expect(src.__get__("ParseIntegerTree")("7")).toEqual({
			constant: "integer",
			value: 7
		})
	})
	
	it("multiple digits", function(){
		expect(src.__get__("ParseIntegerTree")("7426")).toEqual({
			constant: "integer",
			value: 7426
		})
	})
	
	it("multiple digits preceded by zeroes", function(){
		expect(src.__get__("ParseIntegerTree")("0007426")).toEqual({
			constant: "integer",
			value: 7426
		})
	})
	
	it("multiple digits followed by zeroes", function(){
		expect(src.__get__("ParseIntegerTree")("7426000")).toEqual({
			constant: "integer",
			value: 7426000
		})
	})
})