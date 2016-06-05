describe("ParseBooleanTree", function(){
	it("empty", function(){
		expect(src.__get__("ParseBooleanTree")("")).toBeNull()
	})
	
	it("starts with true", function(){
		expect(src.__get__("ParseBooleanTree")("truefish")).toBeNull()
	})

	it("ends with true", function(){
		expect(src.__get__("ParseBooleanTree")("fishtrue")).toBeNull()
	})
	
	it("starts with false", function(){
		expect(src.__get__("ParseBooleanTree")("falsefish")).toBeNull()
	})

	it("ends with false", function(){
		expect(src.__get__("ParseBooleanTree")("fishfalse")).toBeNull()
	})
	
	it("starts with true with a space", function(){
		expect(src.__get__("ParseBooleanTree")("true fish")).toBeNull()
	})

	it("ends with true with a space", function(){
		expect(src.__get__("ParseBooleanTree")("fish true")).toBeNull()
	})
	
	it("starts with false with a space", function(){
		expect(src.__get__("ParseBooleanTree")("false fish")).toBeNull()
	})

	it("ends with false with a space", function(){
		expect(src.__get__("ParseBooleanTree")("fish false")).toBeNull()
	})
	
	it("true", function(){
		expect(src.__get__("ParseBooleanTree")("true")).toEqual({
			constant: "boolean",
			value: true
		})
	})
	
	it("false", function(){
		expect(src.__get__("ParseBooleanTree")("false")).toEqual({
			constant: "boolean",
			value: false
		})
	})
})