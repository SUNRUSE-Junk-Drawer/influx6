describe("ParseBinaryTree", function(){
	var ParseBinaryTree, FindSplittingSymbol, ParseTree, result
	beforeEach(function(){
		ParseBinaryTree = src.__get__("ParseBinaryTree")
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
			result = ParseBinaryTree("test string", 35, "test symbol")
		})
	
		it("returns null", function(){
			expect(result).toBe(null)
		})
	})
	
	describe("when a symbol is present", function(){
		describe("but the left side is not a valid expression", function(){		
			beforeEach(function(){
				FindSplittingSymbol.and.callFake(function(str, starts, symbol, found, notFound){
					expect(str).toEqual("test string")
                    expect(starts).toEqual(35)
					expect(symbol).toEqual("test symbol")
					return found("test left string", "test right string", 182)
				})
				ParseTree.and.callFake(function(str){
					switch(str){
						case "test left string": return null
						case "test right string": return "test right expression"
						default: fail("unexpected ParseTree of \"" + str + "\"")
					}
				})
				result = ParseBinaryTree("test string", 35, "test symbol")
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
					return found("test left string", "test right string", 182)
				})
				ParseTree.and.callFake(function(str){
					switch(str){
						case "test left string": return "test left expression"
						case "test right string": return null
						default: fail("unexpected ParseTree of \"" + str + "\"")
					}
				})
				result = ParseBinaryTree("test string", 35, "test symbol")
			})
			
			it("returns null", function(){
				expect(result).toBe(null)
			})
		})
		
		describe("and the left and right sides are valid expressions", function(){
			beforeEach(function(){
				FindSplittingSymbol.and.callFake(function(str, starts, symbol, found, notFound){
					expect(str).toEqual("test string")
                    expect(starts).toEqual(35)
					expect(symbol).toEqual("test symbol")
					return found("test left string", "test right string", 182)
				})
				ParseTree.and.callFake(function(str){
					switch(str){
						case "test left string": return "test left expression"
						case "test right string": return "test right expression"
						default: fail("unexpected ParseTree of \"" + str + "\"")
					}
				})
				result = ParseBinaryTree("test string", 35, "test symbol")
			})
			
			it("returns an object combining the expressions", function(){
				expect(result).toEqual({
					binary: "test symbol",
					left: "test left expression",
					right: "test right expression"
				})
			})
		})
	})
})