describe("ParseBooleanTree", function(){
	it("empty", function(){
		expect(src.__get__("ParseBooleanTree")("", 35)).toBeNull()
	})
	
	it("starts with true", function(){
		expect(src.__get__("ParseBooleanTree")("truefish", 35)).toBeNull()
	})

	it("ends with true", function(){
		expect(src.__get__("ParseBooleanTree")("fishtrue", 35)).toBeNull()
	})
	
	it("starts with false", function(){
		expect(src.__get__("ParseBooleanTree")("falsefish", 35)).toBeNull()
	})

	it("ends with false", function(){
		expect(src.__get__("ParseBooleanTree")("fishfalse", 35)).toBeNull()
	})
	
	it("starts with true with a space", function(){
		expect(src.__get__("ParseBooleanTree")("true fish", 35)).toBeNull()
	})

	it("ends with true with a space", function(){
		expect(src.__get__("ParseBooleanTree")("fish true", 35)).toBeNull()
	})
	
	it("starts with false with a space", function(){
		expect(src.__get__("ParseBooleanTree")("false fish", 35)).toBeNull()
	})

	it("ends with false with a space", function(){
		expect(src.__get__("ParseBooleanTree")("fish false", 35)).toBeNull()
	})
	
	it("true", function(){
		expect(src.__get__("ParseBooleanTree")("true", 35)).toEqual({
			constant: "boolean",
			value: true,
            starts: 35,
            ends: 39
		})
	})
	
	it("false", function(){
		expect(src.__get__("ParseBooleanTree")("false", 35)).toEqual({
			constant: "boolean",
			value: false,
            starts: 35,
            ends: 40
		})
	})
})