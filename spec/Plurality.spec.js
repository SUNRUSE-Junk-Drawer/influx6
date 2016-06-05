describe("Plurality", function(){
	function Run(originalInput, recursionMap, result, throws){
		var Plurality, input, recursion, Functions, originalFunctions
		beforeEach(function(){
			input = JSON.parse(JSON.stringify(originalInput))
			Plurality = src.__get__("Plurality")
			recursion = jasmine.createSpy("recursion")
			recursion.and.callFake(function(expression){
				expect(recursionMap[expression]).not.toBeUndefined("Unexpected recursion using expression \"" + expression + "\"")
				return recursionMap[expression]
			})
			src.__set__("Plurality", recursion)
			originalFunctions = {
				"test map function": {
					plurality: "map"
				},
				"test reduce function": {
					plurality: "reduce"
				},
				"test concatenate function": {
					plurality: "concatenate"
				}
			}
			src.__set__("Functions", Functions = JSON.parse(JSON.stringify(originalFunctions)))
		})
		it("does not modify the input", function(){
			try {
				Plurality(input)
			} catch(ex) {}
			expect(input).toEqual(originalInput)
		})
		it("does not modify Functions", function(){
			try {
				Plurality(input)
			} catch(ex) {}
			expect(Functions).toEqual(originalFunctions)
		})
		if(throws) {
			it("throws the expected exception", function(){
				expect(function(){
					Plurality(input)
				}).toThrow(throws)
			})
		} else {
			it("returns the expected value", function(){
				expect(Plurality(input)).toEqual(result)
			})
		}
	}
	describe("a constant", function(){
		Run({
			constant: "test constant",
			value: "test value"
		}, {}, 1)
	})
	describe("a map function call where all arguments have a plurality of 1", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 1,
			testArgumentB: 1,
			testArgumentC: 1
		}, 1)
	})
	describe("a map function call where all arguments have an equal plurality", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 4,
			testArgumentC: 4
		}, 4)
	})
	describe("a map function call where some arguments are plural and some are not", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 1,
			testArgumentC: 4
		}, 4)
	})
	describe("another map function call where some arguments are plural and some are not", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 1,
			testArgumentB: 4,
			testArgumentC: 1
		}, 4)
	})
	describe("a map function call where arguments have differing plurality", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 1,
			testArgumentC: 3
		}, null, {
			reason: "invalidPlurality"
		})
	})
	describe("a map function call with one argument with a plurality of 1", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA"]
		}, {
			testArgumentA: 1
		}, 1)
	})
	describe("a map function call with one argument with a plurality of 4", function(){
		Run({
			call: "test map function",
			with: ["testArgumentA"]
		}, {
			testArgumentA: 4
		}, 4)
	})
	describe("a reduce function call where all arguments have a plurality of 1", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 1,
			testArgumentB: 1,
			testArgumentC: 1
		}, 1)
	})
	describe("a reduce function call where all arguments have an equal plurality", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 4,
			testArgumentC: 4
		}, 1)
	})
	describe("a reduce function call where some arguments are plural and some are not", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 1,
			testArgumentC: 4
		}, 1)
	})
	describe("another reduce function call where some arguments are plural and some are not", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 1,
			testArgumentB: 4,
			testArgumentC: 1
		}, 1)
	})
	describe("a reduce function call where arguments have differing plurality", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 1,
			testArgumentC: 3
		}, null, {
			reason: "invalidPlurality"
		})
	})
	describe("a reduce function call with one argument with a plurality of 1", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA"]
		}, {
			testArgumentA: 1
		}, 1)
	})
	describe("a reduce function call with one argument with a plurality of 4", function(){
		Run({
			call: "test reduce function",
			with: ["testArgumentA"]
		}, {
			testArgumentA: 4
		}, 1)
	})
	describe("a concatenate function call where all arguments have a plurality of 1", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 1,
			testArgumentB: 1,
			testArgumentC: 1
		}, 3)
	})
	describe("a concatenate function call where all arguments have an equal plurality", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 4,
			testArgumentC: 4
		}, 12)
	})
	describe("a concatenate function call where some arguments are plural and some are not", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 1,
			testArgumentC: 4
		}, 9)
	})
	describe("another concatenate function call where some arguments are plural and some are not", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 1,
			testArgumentB: 4,
			testArgumentC: 1
		}, 6)
	})
	describe("a concatenate function call where arguments have differing plurality", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA", "testArgumentB", "testArgumentC"]
		}, {
			testArgumentA: 4,
			testArgumentB: 1,
			testArgumentC: 3
		}, 8)
	})
	describe("a concatenate function call with one argument with a plurality of 1", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA"]
		}, {
			testArgumentA: 1
		}, 1)
	})
	describe("a concatenate function call with one argument with a plurality of 4", function(){
		Run({
			call: "test concatenate function",
			with: ["testArgumentA"]
		}, {
			testArgumentA: 4
		}, 4)
	})
})