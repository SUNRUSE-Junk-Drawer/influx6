describe("ParseTree", function(){
	var ParseTree, result, ParseBooleanTree, ParseIntegerTree, ParseFloatTree, ParseBinaryTree, ParseUnaryTree, BinaryOperatorPrecedence, UnaryOperatorPrecedence
	var booleanResult, integerResult, floatResult, unaryResults, binaryResults
	var originalUnaryOperatorPrecedence = ["testUnaryA", "testUnaryB", "testUnaryC"]
	var originalBinaryOperatorPrecedence = ["testBinaryA", "testBinaryB", "testBinaryC", "testBinaryD"]
	
	beforeEach(function(){
		booleanResult = null
		integerResult = null
		floatResult = null
		unaryResults = {
			testUnaryA: null,
			testUnaryB: null,
			testUnaryC: null
		}
		binaryResults = {
			testBinaryA: null,
			testBinaryB: null,
			testBinaryC: null,
			testBinaryD: null
		}
		ParseTree = src.__get__("ParseTree")
		ParseBooleanTree = jasmine.createSpy("ParseBooleanTree")
		ParseBooleanTree.and.callFake(function(str, starts){
			expect(str).toEqual("test string")
            expect(starts).toEqual(35)
			return booleanResult
		})
		src.__set__("ParseBooleanTree", ParseBooleanTree)
		ParseIntegerTree = jasmine.createSpy("ParseIntegerTree")
		ParseIntegerTree.and.callFake(function(str, starts){
			expect(str).toEqual("test string")
            expect(starts).toEqual(35)
			return integerResult
		})
		src.__set__("ParseIntegerTree", ParseIntegerTree)
		ParseFloatTree = jasmine.createSpy("ParseFloatTree")
		ParseFloatTree.and.callFake(function(str, starts){
			expect(str).toEqual("test string")
            expect(starts).toEqual(35)
			return floatResult
		})
		src.__set__("ParseFloatTree", ParseFloatTree)
		ParseBinaryTree = jasmine.createSpy("ParseBinaryTree")
		ParseBinaryTree.and.callFake(function(str, starts, symbol){
			expect(str).toEqual("test string")
            expect(starts).toEqual(35)
			expect(binaryResults[symbol]).not.toBeUndefined("Unexpected binary symbol \"" + symbol + "\"")
			return binaryResults[symbol]
		})
		src.__set__("ParseBinaryTree", ParseBinaryTree)
		ParseUnaryTree = jasmine.createSpy("ParseUnaryTree")
		ParseUnaryTree.and.callFake(function(str, starts, symbol){
			expect(str).toEqual("test string")
            expect(starts).toEqual(35)
			expect(unaryResults[symbol]).not.toBeUndefined("Unexpected unary symbol \"" + symbol + "\"")
			return unaryResults[symbol]
		})
		src.__set__("ParseUnaryTree", ParseUnaryTree)
		src.__set__("BinaryOperatorPrecedence", BinaryOperatorPrecedence = JSON.parse(JSON.stringify(originalBinaryOperatorPrecedence)))
		src.__set__("UnaryOperatorPrecedence", UnaryOperatorPrecedence = JSON.parse(JSON.stringify(originalUnaryOperatorPrecedence)))
	})
	
	describe("when no tree type can be matched", function(){
		beforeEach(function(){
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns null", function(){
			expect(result).toBe(null)
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
	
	describe("when the tree is a valid boolean literal", function(){
		beforeEach(function(){
			booleanResult = "test boolean expression"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression", function(){
			expect(result).toEqual("test boolean expression")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
	
	describe("when the tree is a valid integer literal", function(){
		beforeEach(function(){
			integerResult = "test integer expression"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression", function(){
			expect(result).toEqual("test integer expression")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
	
	describe("when the tree is a valid float literal", function(){
		beforeEach(function(){
			floatResult = "test float expression"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression", function(){
			expect(result).toEqual("test float expression")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
	
	describe("when the tree is a valid binary operator", function(){
		beforeEach(function(){
			binaryResults["testBinaryB"] = "test binary expression b"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression", function(){
			expect(result).toEqual("test binary expression b")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
	
	describe("when the tree is a valid unary operator", function(){
		beforeEach(function(){
			unaryResults["testUnaryB"] = "test unary expression b"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression", function(){
			expect(result).toEqual("test unary expression b")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
	
	describe("when the tree is both a valid unary operator and binary operator", function(){
		beforeEach(function(){
			binaryResults["testBinaryC"] = "test binary expression c"
			unaryResults["testUnaryB"] = "test unary expression b"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression for the binary operator", function(){
			expect(result).toEqual("test binary expression c")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		}) 	
	})
	
	describe("when the tree is a two different valid binary operators", function(){
		beforeEach(function(){
			binaryResults["testBinaryB"] = "test binary expression b"
			binaryResults["testBinaryC"] = "test binary expression c"
			result = ParseTree("   \t   \n  test string   \n    \t", 35)
		})
	
		it("returns the generated expression for the first binary operator", function(){
			expect(result).toEqual("test binary expression b")
		})
		
		it("does not modify the operator precedence", function(){
			expect(BinaryOperatorPrecedence).toEqual(originalBinaryOperatorPrecedence)
			expect(UnaryOperatorPrecedence).toEqual(originalUnaryOperatorPrecedence)
		})
	})
})