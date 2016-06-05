describe("parseExpression", function(){
	var ParseExpression, result, originalInput, input, BinaryOperatorFunctions, UnaryOperatorFunctions, ParseFunctionExpression
	var originalBinaryOperatorFunctions = {
        testBinaryOperatorA: "test binary function names a",
        testBinaryOperatorB: "test binary function names b",
        testBinaryOperatorC: "test binary function names c"
    }
	var originalUnaryOperatorFunctions = {
        testUnaryOperatorA: "test unary function names a",
        testUnaryOperatorB: "test unary function names b",
        testUnaryOperatorC: "test unary function names c"
    }
	beforeEach(function(){
		ParseExpression = src.__get__("ParseExpression")
        src.__set__("ParseFunctionExpression", ParseFunctionExpression = jasmine.createSpy("ParseFunctionExpression"))
        ParseFunctionExpression.and.callFake(function(){ fail("Unexpected call to ParseFunctionExpression") })
        src.__set__("BinaryOperatorFunctions",BinaryOperatorFunctions = JSON.parse(JSON.stringify(originalBinaryOperatorFunctions)))
        src.__set__("UnaryOperatorFunctions", UnaryOperatorFunctions = JSON.parse(JSON.stringify(originalUnaryOperatorFunctions)))
	})
	describe("constant", function(){
		beforeEach(function(){
			originalInput = {
				constant: "test constant type",
				value: "test constant value"
			}
			input = JSON.parse(JSON.stringify(originalInput))
			result = ParseExpression(input)
		})
		it("returns the expected output", function(){
			expect(result).toEqual(originalInput)
		})
		it("does not modify the input", function(){
			expect(input).toEqual(originalInput)
		})
		it("does not modify static data", function(){
			expect(BinaryOperatorFunctions).toEqual(originalBinaryOperatorFunctions)
            expect(UnaryOperatorFunctions).toEqual(originalUnaryOperatorFunctions)
		})
	})
	describe("binary", function(){
		beforeEach(function(){
			originalInput = {
				binary: "testBinaryOperatorB",
                left: "test left operand",
                right: "test right operand"
			}
			input = JSON.parse(JSON.stringify(originalInput))
            ParseFunctionExpression.and.callFake(function(operandTrees, functionNames){
                expect(operandTrees).toEqual(["test left operand", "test right operand"])
                expect(functionNames).toEqual("test binary function names b")
                return "test parsed function"
            })
			result = ParseExpression(input)
		})
		it("returns the expected output", function(){
			expect(result).toEqual("test parsed function")
		})
		it("does not modify the input", function(){
			expect(input).toEqual(originalInput)
		})
		it("does not modify static data", function(){
			expect(BinaryOperatorFunctions).toEqual(originalBinaryOperatorFunctions)
            expect(UnaryOperatorFunctions).toEqual(originalUnaryOperatorFunctions)
		})
	})
	describe("unary", function(){
		beforeEach(function(){
			originalInput = {
				unary: "testUnaryOperatorB",
				operand: "test operand"
			}
			input = JSON.parse(JSON.stringify(originalInput))
            ParseFunctionExpression.and.callFake(function(operandTrees, functionNames){
                expect(operandTrees).toEqual(["test operand"])
                expect(functionNames).toEqual("test unary function names b")
                return "test parsed function"
            })
			result = ParseExpression(input)
		})
		it("returns the expected output", function(){
			expect(result).toEqual("test parsed function")
		})
		it("does not modify the input", function(){
			expect(input).toEqual(originalInput)
		})
		it("does not modify static data", function(){
			expect(BinaryOperatorFunctions).toEqual(originalBinaryOperatorFunctions)
            expect(UnaryOperatorFunctions).toEqual(originalUnaryOperatorFunctions)
		})
	})
})