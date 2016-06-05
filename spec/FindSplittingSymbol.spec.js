describe("FindSplittingSymbol", function(){
	var FindSplittingSymbol, found, notFound, result
	beforeEach(function(){
		FindSplittingSymbol = src.__get__("FindSplittingSymbol")
		found = jasmine.createSpy("found")
		found.and.returnValue("test found return value")
		notFound = jasmine.createSpy("notFound")
		notFound.and.returnValue("test not found return value")
	})
	
	describe("when the string does not contain the symbol", function(){
		beforeEach(function(){
			result = FindSplittingSymbol("onetwothreefourfivesixseveneight", "twenty", found, notFound)
		})
		
		it("does not call the found callback", function(){
			expect(found).not.toHaveBeenCalled();
		})
		
		it("calls the not found callback once", function(){
			expect(notFound.calls.count()).toEqual(1)
		})
		
		it("returns its return value", function(){
			expect(result).toEqual("test not found return value")
		})
	})
	
	describe("when the string contains the symbol once", function(){
		beforeEach(function(){
			result = FindSplittingSymbol("onetwotwentythreefourfivesixseveneight", "twenty", found, notFound)
		})
		
		it("calls the found callback once", function(){
			expect(found.calls.count()).toEqual(1)
		})
		
		it("passes the left and right sides of the symbol to the callback", function(){
			expect(found).toHaveBeenCalledWith("onetwo", "threefourfivesixseveneight")
		})
		
		it("does not call the not found callback", function(){
			expect(notFound).not.toHaveBeenCalled();
		})
		
		it("returns its return value", function(){
			expect(result).toEqual("test found return value")
		})
	})
	
	describe("when the string contains the symbol multiple times", function(){
		beforeEach(function(){
			result = FindSplittingSymbol("onetwotwentythreefourfivetwentysixseventwentyeight", "twenty", found, notFound)
		})
		
		it("calls the found callback once", function(){
			expect(found.calls.count()).toEqual(1)
		})
		
		it("passes the left and right sides of the first instance of the symbol to the callback", function(){
			expect(found).toHaveBeenCalledWith("onetwo", "threefourfivetwentysixseventwentyeight")
		})
		
		it("does not call the not found callback", function(){
			expect(notFound).not.toHaveBeenCalled();
		})
		
		it("returns its return value", function(){
			expect(result).toEqual("test found return value")
		})
	})
})