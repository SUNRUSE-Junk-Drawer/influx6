describe("ParseUnaryTree", function(){
	var ParseUnaryTree, FindSplittingSymbol, ParseTree, result
	beforeEach(function(){
		ParseUnaryTree = src.__get__("ParseUnaryTree")
		FindSplittingSymbol = jasmine.createSpy("FindSplittingSymbol")
		src.__set__("FindSplittingSymbol", FindSplittingSymbol)
		ParseTree = jasmine.createSpy("ParseTree")
		ParseTree.and.callFake(function(str){
			fail("unexpected ParseTree of \"" + str + "\"")
		})
		src.__set__("ParseTree", ParseTree)
	})
	
	describe("when no symbols are present", function(){
		beforeEach(function(){
			FindSplittingSymbol.and.callFake(function(str, starts, symbol, found, notFound){
				expect(str).toEqual("test string")
                expect(starts).toEqual(35)
				expect(symbol).toEqual("test symbol")
				return notFound()
			})
			result = ParseUnaryTree("test string", 35, "test symbol")
		})
	
		it("returns null", function(){
			expect(result).toBe(null)
		})
	})
	
	describe("when a symbol is present", function(){
		describe("but the left side is not empty", function(){		
			beforeEach(function(){
				FindSplittingSymbol.and.callFake(function(str, starts, symbol, found, notFound){
					expect(str).toEqual("test string")
                    expect(starts).toEqual(35)
					expect(symbol).toEqual("test symbol")
					return found("test left string", "test right string", 181)
				})
				ParseTree.and.callFake(function(str, starts){
					expect(str).toEqual("test right string")
                    expect(starts).toEqual(181)
					return "test right expression"
				})
				result = ParseUnaryTree("test string", 35, "test symbol")
			})
		
			it("returns null", function(){
				expect(result).toBe(null)
			})
		})
		
		describe("but the right side is not a valid expression", function(){
			beforeEach(function(){
				FindSplittingSymbol.and.callFake(function(str, starts, symbol, found, notFound){
					expect(str).toEqual("test string")
                    expect(starts).toEqual(35)
					expect(symbol).toEqual("test symbol")
					return found("test left string", "test right string", 181)
				})
				ParseTree.and.callFake(function(str, starts){
					expect(str).toEqual("test right string")
                    expect(starts).toEqual(181)
                    return "test right expression"
				})
				result = ParseUnaryTree("test string", 35, "test symbol")
			})
			
			it("returns null", function(){
				expect(result).toBe(null)
			})
		})
		
		describe("and the left side is empty and the right side is a valid expression", function(){
			beforeEach(function(){
				FindSplittingSymbol.and.callFake(function(str, starts, symbol, found, notFound){
					expect(str).toEqual("test string")
                    expect(starts).toEqual(35)
					expect(symbol).toEqual("test symbol")
					return found("    \n     \t    ", "test right string", 181)
				})
				ParseTree.and.callFake(function(str, starts){
					expect(str).toEqual("test right string")
                    expect(starts).toEqual(181)
					return "test right expression"
				})
				result = ParseUnaryTree("test string", 35, "test symbol")
			})
			
			it("returns an object combining the expressions", function(){
				expect(result).toEqual({
					unary: "test symbol",
					operand: "test right expression",
                    starts: 50,
                    ends: 61
				})
			})
		})
	})
})